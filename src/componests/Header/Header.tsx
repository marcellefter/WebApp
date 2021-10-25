import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import classes from './Header.module.css';

const Header = () => {
    return (
        <div className={classes.header}>
            <div>
                <NavLink to='/posts' activeClassName={classes.active}>Posts</NavLink>
                <NavLink to='/users' activeClassName={classes.active}>Users</NavLink>
            </div>
            <Link to='/login'>Logout</Link>
        </div>
    );
};

export default Header;