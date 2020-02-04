import React, { Component } from 'react';
import ComposeSalad from "./ComposeSalad";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';



class ComposeSaladModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });

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
