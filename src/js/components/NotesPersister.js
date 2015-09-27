import PureRenderMixin from 'react-addons-pure-render-mixin';
import React from 'react';

const NotesPersister = React.createClass({
  mixins: [
    PureRenderMixin,
  ],

  render() {
    localStorage.setItem('notes', JSON.stringify(this.props.notes));
    return null;
  },
});

export default NotesPersister;
