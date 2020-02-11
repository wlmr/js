import inventory from './inventory.ES6';
import React, { Component } from 'react';
import './App.css';
import ComposeSaladModal from './ComposeSaladModal';
import ViewOrder from './ViewOrder';
import { Order, Salad } from './salad.js';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

//import logo from "./pepe.png";



class App extends Component {

  constructor(props) {
    super(props);
    let o = new Order();

    //for testing
    let s = new Salad('Salad + Quinoa', 'Marinerad bönmix', 'Avocado', 'Örtvinägrett');
    o.addSalad(s);
    this.state = { order: o };
  }

  outputSalad = s => {
    var o = this.state.order;
    o.addSalad(s);
    this.setState({ order: o });
  }

  render() {
    const composeSaladElem = (params) => <ComposeSaladModal {...params} inventory={inventory} submitSalad={this.outputSalad} />;
    const viewOrderElem = (params) => <ViewOrder {...params} order={this.state.order} />;
    return (
      <Router>
        <div>
          <div className="jumbotron text-center">
            <Link to="/">
              <h1>зелёный и вкусный&#129313;</h1>
            </Link>
            <p>Here you can order custom made salads!</p>
          </div>
          <ul className="nav nav-pills">
            <li className="nav-item">
              <Link className="nav-link" to="/compose-salad">Komponera din egen sallad</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/view-order">Se order</Link>
            </li>
          </ul>
          <Route path="/compose-salad" render={composeSaladElem}></Route>
          <Route path="/view-order" render={viewOrderElem}></Route>
        </div >
      </Router>
    );
  }
}

export default App;
