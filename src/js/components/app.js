import Appconfig from '../appconfig';
import React from 'react';
import Router from 'react-router';
import { RouteHandler } from 'react-router';

var App = React.createClass({
  mixins: [Router.Navigation],

  componentWillMount() {
    if (!Appconfig.authRequired) return;

    Appconfig.firebaseRef.onAuth((jsonUser) => {
      if (jsonUser) {
        Appconfig.user = jsonUser;
        localStorage.setItem('user', JSON.stringify(jsonUser));
        this.transitionTo('index');
      } else {
        Appconfig.user = null;
        localStorage.removeItem('user');
        this.transitionTo('login');
      }
    });
  },

  render() {
    return <RouteHandler />;
  },
});

export default App;
