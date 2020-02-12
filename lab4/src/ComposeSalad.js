import React, { Component } from 'react';
import { Salad } from './salad.js';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';



function SingleSaladSection(props) {
  return (
    <Form.Group>
      <Form.Label>Välj {props.name}</Form.Label>
      <Form.Control as="select" defaultValue={"default"} onChange={props.onChange}>
      <option value="default" disabled></option>
        {props.values.map(i => (
          <option key={i} value={i}>
            {i + " +" + props.inventory[i].price + "kr"}
          </option>))}
      </Form.Control>
    </Form.Group>
  );
}


function MultiSaladSection(props) {
  return (
    <Form.Group>
      <Form.Label>Välj {props.name}</Form.Label>
      {props.values.map(i => (
        <Form.Check type="checkbox" name={i} id={i} key={i} onChange={props.onChange}
          label={i + " +" + props.inventory[i].price + "kr"} />))}
    </Form.Group>
  );
}



class ComposeSalad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      salad: new Salad(),
      inventory : props.inventory
    };
  }

  updateFoundation = e => {
    const name = e.target.value;
    const item = this.state.inventory[name];
    var s = this.state.salad;
    s.addFoundation(name, item);
    var newState = {salad: s, inventory: this.state.inventory};
    this.setState(newState);
  }

  updateProteins = e => {
    const { name, checked } = e.target;
    var s = this.state.salad;
    const item = this.state.inventory[name];
    checked ? s.addProtein(name, item) : s.removeProtein(name);
    var newState = {salad: s, inventory: this.state.inventory};
    this.setState(newState);
  }

  updateExtras = e => {
    const { name, checked } = e.target;
    var s = this.state.salad;
    const item = this.state.inventory[name];
    checked ? s.addExtra(name, item) : s.removeExtra(name);
    var newState = {salad: s, inventory: this.state.inventory};
    this.setState(newState);
  }

  updateDressing = e => {
    const name = e.target.value;
    var s = this.state.salad;
    const item = this.state.inventory[name];
    s.addDressing(name, item);
    var newState = {salad: s, inventory: this.state.inventory};
    this.setState(newState);
  }

  handleSubmit = e => {
    e.preventDefault();
    var newState = {salad: new Salad(), inventory: this.state.inventory};
    this.setState(newState);
    this.props.handleSubmit(this.state.salad);
    
  }


  render() {
    const inventory = this.props.inventory;
    if (!inventory) alert("inventory is undefined in ComposeSalad");
    const foundations = Object.keys(inventory).filter(name => inventory[name].foundation);
    const proteins = Object.keys(inventory).filter(name => inventory[name].protein);
    const extras = Object.keys(inventory).filter(name => inventory[name].extra);
    const dressings = Object.keys(inventory).filter(name => inventory[name].dressing);

    return (
      <Form>
        <SingleSaladSection name="bas"        values={foundations}  inventory={inventory} onChange={this.updateFoundation} />
        <MultiSaladSection  name="proteiner"  values={proteins}     inventory={inventory} onChange={this.updateProteins} />
        <MultiSaladSection  name="extras"     values={extras}       inventory={inventory} onChange={this.updateExtras} />
        <SingleSaladSection name="dressing"   values={dressings}    inventory={inventory} onChange={this.updateDressing} />
        <Button variant="primary" type="submit" onClick={this.handleSubmit}>
          Skapa Sallad
        </Button>
      </Form>
    );
  }
}

export default ComposeSalad;