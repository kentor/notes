import Appconfig from '../appconfig';
import React from 'react';
import Router from 'react-router';
import { RouteHandler } from 'react-router';
import UserActions from '../actions/UserActions';

var App = React.createClass({
  mixins: [Router.Navigation],

  componentWillMount() {
    if (!Appconfig.authRequired) return;

    Appconfig.firebaseRef.onAuth((jsonUser) => {
      if (jsonUser) {
        UserActions.loggedIn(jsonUser);
        setTimeout(() => {
          this.transitionTo('index');
        }, 0);
      } else {
        UserActions.loggedOut();
        this.transitionTo('login');
      }
    });
  },

  render() {
    return <RouteHandler />;
  },
});

export default App;
