import React from 'react';

class NotesPersister extends React.PureComponent {
  render() {
    localStorage.setItem('notes', JSON.stringify(this.props.notes));
    return null;
  }
}

export default NotesPersister;
