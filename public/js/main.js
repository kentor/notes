/** @jsx React.DOM */

var Firebase    = require('firebase');
var Markdown    = require('pagedown');
var moment      = require('moment');
var randomColor = require('randomcolor');
var React       = require('react');
require('react/addons');

var Router = require('react-router');
var Routes = Router.Routes;
var Route  = Router.Route;
var Link   = Router.Link;

function transformSnapshotToNote(snapshot) {
  var note = snapshot.val();
  note.name = snapshot.name();
  note.content = Markdown.getSanitizingConverter().makeHtml(note.content);
  note.createdAt = new Date(note.createdAt);
  note.localHidden = note.hidden;
  note.style = { background: randomColor({luminosity: 'light'}) };
  return note;
}

function escapeRegexp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

var Note = React.createClass({
  toggleLocalHidden: function(e) {
    if (window.getSelection().toString() || e.target.tagName.match(/^[ai]$/i)) return;
    this.props.onToggleLocalHidden();
  },

  render: function() {
    var note = this.props.note;
    var cx = React.addons.classSet;
    var noteContentClasses = cx({
      'note-content': true,
      'hidden': note.localHidden,
    });

    return (
      <li className="note" onClick={this.toggleLocalHidden} style={note.style}>
        <div className="controls">
          <time>{moment(note.createdAt).fromNow().replace(' ago', '')}</time>
          <div className="icons">
            <a href="#" onClick={this.props.onToggleHidden}>{note.hidden ? '☼' : '☀'}</a>
            &nbsp;
            <a href="#" className="delete-note" onClick={this.props.onDelete}>✖</a>
          </div>
        </div>
        <div className={noteContentClasses} dangerouslySetInnerHTML={{__html: note.content}} />
      </li>
    );
  }
});

var Index = React.createClass({
  mixins: [React.addons.LinkedStateMixin, AuthenticatedRoute],

  getInitialState: function() {
    return { notes: [], newNote: '', filter: '' };
  },

  componentWillMount: function() {
    this.firebaseRef = firebaseRef.child('notes');

    this.firebaseRef.on('child_added', function(snapshot) {
      this.state.notes.push(transformSnapshotToNote(snapshot));
      this.state.notes.sort(function(a, b) {
        return a.createdAt > b.createdAt ? -1 : 1;
      });
      this.setState({ notes: this.state.notes });
    }.bind(this));

    this.firebaseRef.on('child_removed', function(snapshot) {
      var snapshotName = snapshot.name();
      var newNotesList = this.state.notes.filter(function(note) {
        return note.name !== snapshotName;
      });
      this.setState({ notes: newNotesList });
    }.bind(this));

    this.firebaseRef.on('child_changed', function(snapshot) {
      var snapshotName = snapshot.name();
      var note, i;
      for (i = 0; i < this.state.notes.length; i++) {
        if (this.state.notes[i].name === snapshotName) {
          note = this.state.notes[i];
          break;
        }
      }
      note.hidden = note.localHidden = snapshot.val().hidden;
      this.setState({ notes: this.state.notes });
    }.bind(this));
  },

  updateNewNote: function() {
    this.setState({ newNote: this.refs.textarea.getDOMNode().value });
  },

  submitNewNote: function() {
    if (!this.state.newNote) {
      return;
    }

    this.firebaseRef.push({
      content: this.state.newNote,
      createdAt: (new Date()).toISOString(),
      hidden: false,
    });

    this.setState({ newNote: '' });
  },

  handleKeyDown: function(e) {
    if (e.keyCode == 13 && e.ctrlKey) {
      this.submitNewNote();
      e.preventDefault(); // prevents new line from pressing enter
    }
  },

  toggleLocalHidden: function(note) {
    note.localHidden = !note.localHidden;
    this.setState({ notes: this.state.notes });
  },

  toggleHidden: function(note) {
    this.firebaseRef.child(note.name).update({ hidden: !note.hidden });
  },

  delete: function(note) {
    this.firebaseRef.child(note.name).remove();
  },

  render: function() {
    var notes = this.state.notes;

    if (this.state.filter) {
      var filterRegexp = new RegExp(escapeRegexp(this.state.filter), 'i');
      notes = notes.filter(function(note) {
        return note.content.match(filterRegexp);
      });
    }

    var logoutLink;
    if (user) {
      logoutLink = <Link to="logout" className="logout-button">Logout</Link>;
    }

    return (
      <div id="wrapper">
        <aside>
          <div>
            <textarea valueLink={this.linkState('newNote')} onKeyDown={this.handleKeyDown}></textarea>
            <button onClick={this.submitNewNote}>Post</button>
          </div>

          <div>
            <input type="text" valueLink={this.linkState('filter')} />
          </div>

          {logoutLink}
        </aside>

        <ul>
          <li>Notes: {this.state.notes.length}</li>
          {notes.map(function(note) {
            return (
              <Note note={note}
                    onToggleLocalHidden={this.toggleLocalHidden.bind(this, note)}
                    onToggleHidden={this.toggleHidden.bind(this, note)}
                    onDelete={this.delete.bind(this, note)} />
            );
          }, this)}
          <li>Notes: {this.state.notes.length}</li>
        </ul>
      </div>
    );
  },
});

var user = JSON.parse(localStorage.getItem('user'));
var authRequired = true;
var firebaseRef = new Firebase("https://qdsndc.firebaseio.com");

var App = React.createClass({
  mixins: [Router.Navigation],

  componentWillMount: function() {
    firebaseRef.onAuth(function(jsonUser) {
      if (jsonUser) {
        user = jsonUser;
        localStorage.setItem('user', JSON.stringify(jsonUser));
        this.transitionTo('index');
      } else {
        user = null;
        localStorage.removeItem('user');
        this.transitionTo('login');
      }
    }.bind(this));
  },

  render: function() {
    return <this.props.activeRouteHandler />;
  },
});

var AuthenticatedRoute = {
  statics: {
    willTransitionTo: function(transition) {
      if (authRequired && !user) {
        transition.redirect('login');
      }
    }
  }
};

var Login = React.createClass({
  handleClick: function() {
    firebaseRef.authWithOAuthRedirect('twitter', function() {});
  },

  render: function() {
    return <a className="login-button" onClick={this.handleClick}>Login</a>;
  },
});

var Logout = React.createClass({
  mixins: [Router.Navigation],

  componentWillMount: function() {
    firebaseRef.unauth();
    this.transitionTo('login');
  },

  render: function() {
    return <div></div>;
  }
});

React.renderComponent((
  <Routes>
    <Route name="app" path="/" handler={App}>
      <Route name="index" path="/" handler={Index} />
      <Route name="login" handler={Login} />
      <Route name="logout" handler={Logout} />
    </Route>
  </Routes>
), document.body);
