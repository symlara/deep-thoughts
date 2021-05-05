import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//add these two library import statements
//special type of React component that we'll use to provide data to all of the other components

import { ApolloProvider } from '@apollo/react-hooks';
// We'll use the second, ApolloClient, to get that data when we're ready to use it.
import ApolloClient from 'apollo-boost';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import SingleThought from './pages/SingleThought';
import Profile from './pages/Profile';
import Signup from './pages/Signup';

const client = new ApolloClient({
  request: operation => {
    const token = localStorage.getItem('id_token');

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  },
  uri: '/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
      <div className='flex-column justify-flex-start min-100-vh'>
      <Header />
      <div className='container'>
        <Switch>
         <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/profile/:username?" component={Profile} />
        <Route exact path="/thought/:id" component={SingleThought} />

        <Route component={NoMatch} />
        </Switch>
      </div>
      <Footer />
    </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
