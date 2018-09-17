import API from '../api';
import Login from './Login';
import NotesIndex from './NotesIndex';
import React from 'react';
import { connect } from 'react-redux';

class Root extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.user !== nextProps.user) {
      if (nextProps.user) {
        window.localStorage.setItem('user', JSON.stringify(nextProps.user));
      } else {
        window.localStorage.removeItem('user');
      }
    }
  }

  isAuthenticated() {
    return (
      !API.authRequired ||
      window.localStorage.getItem('user') ||
      this.props.user
    );
  }

  render() {
    return this.isAuthenticated() ? <NotesIndex /> : <Login />;
  }
}

function mapStateToProps(state) {
  return {
    user: state.get('session'),
  };
}

export default connect(mapStateToProps)(Root);
