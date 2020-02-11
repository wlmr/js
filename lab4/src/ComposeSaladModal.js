import React, { Component } from 'react';
import ComposeSalad from "./ComposeSalad";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';


const backendServer = "http://localhost:8080/";

const options = {
  method: 'GET'
};

async function fetchData(url) {
  //console.log("fetching from " + url);
  let response = await fetch(url, options);
  if (response.error) {
    throw new Error(response.error);
  }
  //console.log("parsing from " + url);
  let data = await response.text();
  //let data = await response.json();
  
  return JSON.parse(data);
}


class ComposeSaladModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      inventoryFetched: false
    };
    this.buildInventory();
  }


  buildInventory() {
    /** Asynchronously fetches the inventory from the backend and adds components to
     * the inventory object.
     * 
     * 
     */
    let types = ['foundation', 'protein', 'extra', 'dressing'];
    types.forEach(typeName => 
      {
        let typeUrl = backendServer + typeName + "s";
        fetchData(typeUrl)
        .then(typeItems => 
          {
            typeItems.forEach(typeItem => 
              { 
                let itemUrl = typeUrl + "/" + typeItem
                fetchData(itemUrl).then(itemObject => 
                  {   
                    this.props.inventory[typeItem] = itemObject;
                  });
  
              });
          });
      });
      let newState = this.state;
      newState.inventoryFetched = true;
      this.setState(newState); 
      
  }


  handleClose = () => this.setState({ show: false });
  handleShow = () => {
    if(this.state.inventoryFetched) {
      this.setState({ show: true })
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
