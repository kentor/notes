import React from 'react/addons';

const NewNoteForm = React.createClass({
  mixins: [
    React.addons.PureRenderMixin,
  ],

  handleKeyDown(e) {
    if (e.ctrlKey && e.key === 'Enter') {
      this.handleSubmit(e);
    }
  },

  handleSubmit(e) {
    e.preventDefault();
    const node = React.findDOMNode(this.refs.newNote);
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
