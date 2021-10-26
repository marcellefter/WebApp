import React from 'react';
import './App.css';
import Header from './componests/Header/Header';
import { Redirect, Route, Switch } from 'react-router-dom';
import Users from './page/Users';
import Posts from './page/Posts';
import Login from './page/Login';
import EditPost from './page/EditPost';

function App() {
  const user = localStorage.user;

  return (
    <div>
      <Header />
      <Switch>
        <Route path='/' exact>
          <Login />
        </Route>
        {user && (
        <>
          <Route path='/users'>
            <Users />
          </Route>
          <Route path='/posts' exact>
            <Posts />
          </Route>
          <Route path='/edit-posts'>
            <EditPost />
          </Route>
        </>
        )}
        <Route path='*'>
          <Redirect to='/' />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
