
import React, { Component } from 'react';
import './App.css';
import ComposeSaladModal from './ComposeSaladModal';
import ViewOrder from './ViewOrder';
import { Order } from './salad.js';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class App extends Component {

  constructor(props) {
    super(props);
    let o = new Order();
    this.state = {order: o, inventory: {}};
  }



  outputSalad = s => {
    var o = this.state.order;
    o.addSalad(s);
    console.log("got into outputSalad" + o.basket[0]);
    this.setState({ order: o });
  }
  
  emptyOrders = () => {
    this.state.order.emptyOrders();
    this.forceUpdate();
}

  render() {
    return (
      <React.Fragment>
        <div className="jumbotron text-center">
          <h1>зеленый и вкусный&#129313;</h1>
          <p>Here you can order custom made salads!</p>
        </div>
        <Container fluid>
          <Container >
          <Row>
            <Col>
            <ComposeSaladModal inventory={this.state.inventory} submitSalad={this.outputSalad} />
            </Col>
            <Col>
            <Button variant="primary" onClick={this.emptyOrders}>
          Töm lista
          </Button>
            </Col>
          </Row>
          </Container>
          <ViewOrder order={this.state.order} />
        </Container>
        </React.Fragment>
    );
  }
}

export default App;
