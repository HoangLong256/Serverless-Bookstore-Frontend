import React from 'react';
import { Navbar, Nav, } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionTypes from '../../redux/actions/actionTypes';
import styles from './Header.moudle.css'
const Header = (props) => {

  let navItem = '';
  if (props.loginStatus) {
    navItem = (
      <Nav className="mr-auto" id={styles.navbar} >
        <NavLink
          className="nav-link" to="/product"
          activeStyle={{ color: '#e48130' }}>Product
        </NavLink>
        <NavLink
          className="nav-link" to="/order"
          activeStyle={{ color: '#e48130' }}>Order
        </NavLink>
        <NavLink
          className="nav-link" to="/home"
          onClick={props.logout}
          activeStyle={{ color: '#e48130' }}>Logout
        </NavLink>
      </Nav>
    );
  } else {
    navItem = (
      <Nav className="mr-auto">
        <NavLink
          className="nav-link" to="/home"
          activeStyle={{ color: '#e48130' }}>Home
        </NavLink>
        <NavLink
          className="nav-link" to="/store"
          activeStyle={{ color: '#e48130' }}>Store
            </NavLink>
        <NavLink
          className="nav-link" to="/mybag"
          activeStyle={{ color: '#e48130' }}>My Bag
            </NavLink>
        <NavLink
          className="nav-link" to="/login" exact
          activeStyle={{ color: '#e48130' }}>Login
            </NavLink>
      </Nav>
    )
  }
  return (
    <Navbar expand="md" className={styles.navbar} variant="dark" style={{
      height: '60px'
    }}>
      <Navbar.Brand style={{
        fontWeight: "bold",
        fontSize: "25px"
      }} >La Librairie
    </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" style={{
        backgroundColor: 'rgb(118, 194, 208)'
      }}>
      {navItem}
      </Navbar.Collapse>
    </Navbar >
  );
};

const mapStateToProps = state => {
  return {
    loginStatus: state.authStatus.loginStatus
  }
}

const mapDispactchToProps = dispatch => {
  return {
    logout: () => dispatch({ type: actionTypes.LOGOUT })
  }
}

export default connect(mapStateToProps, mapDispactchToProps)(Header);