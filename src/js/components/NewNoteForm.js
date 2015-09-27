import PureRenderMixin from 'react-addons-pure-render-mixin';
import React from 'react';

const NewNoteForm = React.createClass({
  mixins: [
    PureRenderMixin,
  ],

  handleKeyDown(e) {
    if (e.ctrlKey && e.key === 'Enter') {
      this.handleSubmit(e);
    }
  },

  handleSubmit(e) {
    e.preventDefault();
    const node = this.refs.newNote;
    const content = node.value.trim();
    if (content) {
      this.props.onSubmit(content);
      node.value = '';
    }
  },

  render() {
    return (
      <form className="NewNote-form" onSubmit={this.handleSubmit}>
        <textarea
          className="NewNote-textarea"
          onKeyDown={this.handleKeyDown}
          ref="newNote"
        />
        <input className="NewNote-button" value="Post" type="submit" />
      </form>
    );
  },
});

export default NewNoteForm;
