import React, { Component } from 'react';
import ComposeSalad from "./ComposeSalad";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
//import getInventory from './Inventory.js'





const backendServer = "http://localhost:8080/";

async function fetchData(url) {
  let response = await fetch(url);
  return response;
}


async function getIngredients(topic) {

    async function getIngredientData(topicName, ingredientName) {
    let url = backendServer + topicName + "s/" + ingredientName
    let response = await fetchData(url);
    let text = await response.json();
    return {url: url, key: ingredientName, value: text}; 
}

    let nextStep = Promise.all(topic.value.map(x => getIngredientData(topic.key, x)));
    return nextStep;
}

async function getTopics() {

    async function getTopicData(topicName) {
      let url = backendServer + topicName + "s";
      let response = await fetchData(url);
      let text = await response.json();
      return {url: url, key: topicName, value: text};
    }

    let topics = ['protein', 'extra', 'dressing', 'foundation'];
    let allt = await Promise.all(topics.map(x => getTopicData(x)));
    let nextstep = await Promise.all(allt.map(x => getIngredients(x)));
    return [].concat.apply([], nextstep);
}



class ComposeSaladModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      inventoryFetched: false
    };
  }

  componentDidMount() {

    getTopics().then(resultList => {
      resultList.forEach(x => {
          this.props.inventory[x.key] = x.value;
      });
    }).then(() => {
      let newState = this.state;
      newState.inventoryFetched = true;
      this.setState(newState);
    });

    /*
    var postFetch = () => {
      let newState = {show: false, inventoryFetched: true};
      this.setState(newState);
      console.log("Finished fetching inventory!");
    };
    buildInventory(this.props.inventory, postFetch);
    */
  }


  handleClose = () => {
    let newState = this.state;
    newState.show = false;
    this.setState(newState);
  };

  handleShow = () => {
    if(this.state.inventoryFetched) {
      this.setState({ show: true, inventoryFetched: true });
    }
  };

  handleSubmit = s => {
    this.handleClose();
    this.props.submitSalad(s);
  }

  render() {
    return (
      <Container> 
        <Button variant="primary" onClick={this.handleShow}>
          Komponera sallad
        </Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Gör Din Egen Sallad!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ComposeSalad inventory={this.props.inventory} handleSubmit={this.handleSubmit}/>
          </Modal.Body>
        </Modal>
      </Container>
    );
  }
}

export default ComposeSaladModal;
