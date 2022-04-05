import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Config from './pages/Config';
import Game from './pages/Game';
import Login from './pages/Login';

export default function App() {
  return (
    <Switch>
      <Route path="/" component={ Login } exact />
      <Route path="/play" component={ Game } />
      <Route path="/config" component={ Config } />
    </Switch>
  );
}
