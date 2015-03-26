var API = require('../api');
var Appconfig = require('../appconfig');
var FilterBox = require('./FilterBox.jsx');
var NewNoteForm = require('./NewNoteForm.jsx');
var NoteActions = require('../actions/NoteActions');
var Note = require('./Note.jsx');
var NoteStore = require('../stores/NoteStore');
var React = require('react/addons');
var Reflux = require('reflux');
var UserStore = require('../stores/UserStore');
var { Link } = require('react-router');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Index = React.createClass({
  mixins: [React.addons.LinkedStateMixin, Reflux.ListenerMixin],

  statics: {
    willTransitionTo(transition) {
      if (Appconfig.authRequired && !UserStore.user()) {
        transition.redirect('login');
      }
    },
  },

  getInitialState() {
    return { notes: NoteStore.getAll() };
  },

  componentWillMount() {
    API.start();

    this.listenTo(NoteStore, () => {
      var notes = NoteStore.getAll();
      if (this.state.notes !== notes) {
        NoteStore.persist();
        this.setState({ notes });
      }
    });
  },

  componentWillUnmount() {
    API.stop();
    NoteStore.clearAll();
  },

  expandAll() {
    NoteActions.expandAll();
  },

  resetLocalHidden() {
    NoteActions.resetLocalHidden();
  },

  render() {
    var { notes } = this.state;

    var logoutLink;
    if (UserStore.user()) {
      logoutLink = <Link to="logout" className="logout-button">Logout</Link>;
    }

    return (
      <div id="wrapper">
        <aside>
          <NewNoteForm />
          <FilterBox />
          {logoutLink}
        </aside>

        <ReactCSSTransitionGroup transitionName="fade" transitionEnter={false}
                                 component="ul">
          <li className="note-head">
            <span>Notes: {notes.size}</span>
            <span>
              <a onClick={this.resetLocalHidden}>☆</a>
              {' '}
              <a onClick={this.expandAll}>★</a>
            </span>
          </li>
          {notes.toIndexedSeq().map(note => (
            <Note note={note} key={note.get('name')} />
          )).reverse()}
          <li>Notes: {notes.size}</li>
        </ReactCSSTransitionGroup>
      </div>
    );
  },
});

module.exports = Index;
