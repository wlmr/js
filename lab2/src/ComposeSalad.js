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
      salad: new Salad()
    };
  }

  updateFoundation = e => {
    const value = e.target.value;
    var s = this.state.salad;
    s.addFoundation(value);
    this.setState({ salad: s });
  }

  updateProteins = e => {
    const { name, checked } = e.target;
    var s = this.state.salad;
    checked ? s.addProtein(name) : s.removeProtein(name);
    this.setState({ salad: s });
  }

  updateExtras = e => {
    const { name, checked } = e.target;
    var s = this.state.salad;
    checked ? s.addExtra(name) : s.removeExtra(name);
    this.setState({ salad: s });
  }

  updateDressing = e => {
    const value = e.target.value;
    var s = this.state.salad;
    s.addDressing(value);
    this.setState({ salad: s });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ salad: new Salad() });
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