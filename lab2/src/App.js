import inventory from './inventory.ES6';
import React, { Component } from 'react';
import './App.css';
import ComposeSaladModal from './ComposeSaladModal';
import ViewOrder from './ViewOrder';
import { Order, Salad } from './salad.js';
import Container from 'react-bootstrap/Container';
import logo from "./pepe.png";



class App extends Component {

  constructor(props) {
    super(props);
    let o = new Order();

    //for testing
    let s = new Salad('Salad + Quinoa','Marinerad bönmix','Avocado','Örtvinägrett');
    o.addSalad(s);
    this.state = {order: o};
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
          <h1>Aloha Snackbar&#129313;</h1>
          <p>Here you can order custom made salads!</p>
        </div>
        <Container fluid>
          <ComposeSaladModal inventory={inventory} submitSalad={this.outputSalad} />
          <ViewOrder order={this.state.order} />
          <img src={logo} class="img-fluid" alt="pepe"></img>
        </Container>
        </React.Fragment>
    );
  }
}

export default App;
