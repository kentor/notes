import Api from '../api';
import Appconfig from '../appconfig';
import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';
import UserStore from '../stores/UserStore';
import { RouteHandler } from 'react-router';

var App = React.createClass({
  mixins: [
    Reflux.ListenerMixin,
    Router.Navigation,
  ],

  componentWillMount() {
    if (!Appconfig.authRequired) return;

    Api.authenticate();

    this.listenTo(UserStore, () => {
      if (UserStore.user()) {
        this.transitionTo('index');
      } else {
        this.transitionTo('login');
      }
    });
  },

  render() {
    return <RouteHandler />;
  },
});

export default App;
