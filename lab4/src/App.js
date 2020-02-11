//import inventory from './inventory.ES6';
import React, { Component } from 'react';
import './App.css';
import ComposeSaladModal from './ComposeSaladModal';
import ViewOrder from './ViewOrder';
import { Order, Salad } from './salad.js';
import Container from 'react-bootstrap/Container';
//import logo from "./pepe.png";

const backendServer = `http://localhost:8080/`;

async function buildInventory(inventory) {
  /** Asynchronously fetches the inventory from the backend and adds components to
   * the inventory object.
   * 
   * 
   */
  return;
}

class App extends Component {

  constructor(props) {
    super(props);
    let o = new Order();

    //for testing
    let s = new Salad('Salad + Quinoa','Marinerad bönmix','Avocado','Örtvinägrett');
    o.addSalad(s);
    //this.state = {order: o};
    this.state = {order: o, inventory: {}};
    buildInventory(this.state.inventory);
  }



  outputSalad = s => {
    var o = this.state.order;
    o.addSalad(s);
    console.log("got into outputSalad" + o.basket[0]);
    this.setState({ order: o });
  }
  
  render() {
    return (
      <React.Fragment>
        <div className="jumbotron text-center">
          <h1>зеленый и вкусный&#129313;</h1>
          <p>Here you can order custom made salads!</p>
        </div>
        <Container fluid>
          <ComposeSaladModal inventory={this.state.inventory} submitSalad={this.outputSalad} />
          <ViewOrder order={this.state.order} />
        </Container>
        </React.Fragment>
    );
  }
}

export default App;
