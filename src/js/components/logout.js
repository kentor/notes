import Appconfig from '../appconfig';
import React from 'react';
import Router from 'react-router';

var Logout = React.createClass({
  mixins: [Router.Navigation],

  componentWillMount() {
    Appconfig.firebaseRef.unauth();
    this.transitionTo('login');
  },

  render() {
    return <div></div>;
  },
});

export default Logout;
