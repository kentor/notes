import API from '../api';
import appconfig from '../appconfig';
import Login from './Login';
import NotesIndex from './NotesIndex';
import React from 'react';
import { connect } from 'react-redux';

const Root = React.createClass({
  componentWillMount() {
    if (!appconfig.authRequired) return;
    API.authenticate();
  },

  isAuthenticated() {
    return !appconfig.authRequired || this.props.user;
  },

  render() {
    return (
      this.isAuthenticated() ?
        <NotesIndex />
      :
        <Login onRequestLogin={API.login.bind(API)} />
    );
  },
});

function mapStateToProps(state) {
  return {
    user: state.get('session'),
  };
}

export default connect(mapStateToProps)(Root);
