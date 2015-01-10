import React from 'react';
import Router from 'react-router';
import UserActions from '../actions/UserActions';

var Logout = React.createClass({
  mixins: [Router.Navigation],

  componentWillMount() {
    UserActions.logout();
    this.transitionTo('login');
  },

  render() {
    return <div></div>;
  },
});

export default Logout;
