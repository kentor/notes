var NoteActions = require('../actions/NoteActions');
var React = require('react/addons');

var NewNoteForm = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState() {
    return { note: '' };
  },

  handleKeyDown(e) {
    if (e.keyCode === 13 && e.ctrlKey) {
      this.submit();
      e.preventDefault(); // prevents new line from pressing enter
    }
  },

  submit() {
    var note = this.state.note.trim();
    this.setState({ note: '' });
    if (!note) return;
    NoteActions.createNote(note);
  },

  render() {
    return (
      <div>
        <textarea valueLink={this.linkState('note')}
                  onKeyDown={this.handleKeyDown}></textarea>
        <button onClick={this.submit}>Post</button>
      </div>
    );
  },
});

module.exports = NewNoteForm;
