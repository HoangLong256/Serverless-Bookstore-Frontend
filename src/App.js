import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './components/Header/Header';
import Product from './components/Product/Product';
import Order from './components/Order/Order';
import Store from './components/Store/Store';
import ItemDetail from './components/Store/ItemDetail/ItemDetail';
import MyBag from './components/MyBag/MyBag';
import CheckOut from './components/CheckOut/CheckOut';
import Login from './components/Login/Login';
import NotFound from './components/NotFound/NotFound';
function App(props) {
  let switchRoute = '';
  if (props.loginStatus) {
    switchRoute = (
      <Switch>
        <Route path="/order" component={Order} />;
        <Route path="/product" component={Product} />;
        <Route path="/" component={Product} exact />;
        <Route component={NotFound}/>
      </Switch>
    )
  } else {
    switchRoute = (
      <Switch>
        <Route path="/login" component={Login} />;
        <Route path="/checkout" component={CheckOut} />;
        <Route path="/mybag" component={MyBag} />;
        <Route path="/store" component={Store} exact />;
        <Route path="/store/item/:id" component={ItemDetail} />;
        <Route path="/" component={Store} exact />;
        <Route component={NotFound}/>
      </Switch>
    )
  }
  
  return (
    <div className="App">
      <Header />
      {switchRoute}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    loginStatus: state.authStatus.loginStatus
  }
}

export default connect(mapStateToProps)(App);
