import API from '../api';
import Appconfig from '../appconfig';
import FilterBox from './FilterBox.jsx';
import NewNoteForm from './NewNoteForm.jsx';
import Note from './Note.jsx';
import NoteStore from '../stores/NoteStore';
import React from 'react/addons';
import Reflux from 'reflux';
import UserStore from '../stores/UserStore';
import { Link } from 'react-router';

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

  render() {
    var notes = this.state.notes.toSeq();

    notes = notes.map((note, name) => (
      <Note note={note} key={name} />
    )).reverse().toArray();

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
          <li>Notes: {this.state.notes.size}</li>
          {notes}
          <li>Notes: {this.state.notes.size}</li>
        </ReactCSSTransitionGroup>
      </div>
    );
  },
});

export default Index;
