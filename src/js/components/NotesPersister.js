import React from 'react/addons';

const NotesPersister = React.createClass({
  mixins: [
    React.addons.PureRenderMixin,
  ],

  render() {
    localStorage.setItem('notes', JSON.stringify(this.props.notes));
    return null;
  },
});

export default NotesPersister;
