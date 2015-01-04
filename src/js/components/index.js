var Appconfig = require('../appconfig');
var Link = require('react-router').Link;
var Note = require('./note');
var NoteActions = require('../actions/NoteActions');
var NoteStore = require('../stores/NoteStore');
var React = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var Reflux = require('reflux');

function escapeRegexp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

var Index = React.createClass({
  mixins: [React.addons.LinkedStateMixin, Reflux.ListenerMixin],

  statics: {
    willTransitionTo(transition) {
      if (Appconfig.authRequired && !Appconfig.user) {
        transition.redirect('login');
      }
    },
  },

  getInitialState() {
    return { notes: NoteStore.getAll(), newNote: '', filter: '' };
  },

  componentWillMount() {
    this.listenTo(NoteStore, () => {
      var notes = NoteStore.getAll();
      if (this.state.notes !== notes) {
        NoteStore.persist();
        this.setState({ notes });
      }
    });

    this.firebaseRef = Appconfig.firebaseRef.child('notes');

    this.firebaseRef.on('child_added', (snapshot) => {
      var noteName = snapshot.key();
      var note = snapshot.val();
      NoteActions.noteAdded(noteName, note);
    });

    this.firebaseRef.on('child_removed', (snapshot) => {
      var noteName = snapshot.key();
      NoteActions.noteRemoved(noteName);
    });

    this.firebaseRef.on('child_changed', (snapshot) => {
      var noteName = snapshot.key();
      var note = snapshot.val();
      NoteActions.noteChanged(noteName, note);
    });
  },

  componentWillUnmount() {
    this.firebaseRef.off('child_added');
    this.firebaseRef.off('child_removed');
    this.firebaseRef.off('child_changed');
    NoteStore.clearAll();
  },

  submitNewNote() {
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

  handleKeyDown(e) {
    if (e.keyCode == 13 && e.ctrlKey) {
      this.submitNewNote();
      e.preventDefault(); // prevents new line from pressing enter
    }
  },

  toggleLocalHidden(note) {
    NoteActions.toggleLocalHidden(note);
  },

  toggleHidden(note) {
    this.firebaseRef.child(note.get('name'))
      .update({ hidden: !note.get('hidden') });
  },

  delete(note) {
    this.firebaseRef.child(note.get('name')).remove();
  },

  render() {
    var notes = this.state.notes.toSeq();

    if (this.state.filter) {
      var filterRegexp = new RegExp(escapeRegexp(this.state.filter), 'i');
      notes = notes.filter(note => note.get('content').match(filterRegexp));
    }

    notes = notes.map((note, name) => (
      <Note note={note}
            key={name}
            onToggleLocalHidden={this.toggleLocalHidden.bind(this, note)}
            onToggleHidden={this.toggleHidden.bind(this, note)}
            onDelete={this.delete.bind(this, note)} />
    )).reverse().toArray();

    var logoutLink;
    if (Appconfig.user) {
      logoutLink = <Link to="logout" className="logout-button">Logout</Link>;
    }

    return (
      <div id="wrapper">
        <aside>
          <div>
            <textarea valueLink={this.linkState('newNote')}
                      onKeyDown={this.handleKeyDown}></textarea>
            <button onClick={this.submitNewNote}>Post</button>
          </div>

          <div>
            <input type="text" valueLink={this.linkState('filter')} />
          </div>

          {logoutLink}
        </aside>

        <ReactCSSTransitionGroup transitionName="fade" transitionEnter={false}
                                 component="ul">
          <li>Notes: {this.state.notes.size}</li>
          {notes}
          <li>Notes: {this.state.notes.size}</li>
        </ReactCSSTransitionGroup>
      </div>
    );
  },
});

module.exports = Index;
