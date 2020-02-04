import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';

class ViewOrder extends Component {
    constructor(props) {
        super(props);
        this.state = { order: props.order };
    }

    render() {
        return (
            <Container>
                <h4>Din beställning</h4>
                <ListGroup action="true">
                    {this.state.order.basket.map((s, index) => (
                        <li class="list-group-item d-flex justify-content-between align-items-center" key={"order" + index}>
                            {(index + 1) + " " + Object.keys(s['f']) + "," + Object.keys(s['p']) + "," + Object.keys(s['e']) + "," + Object.keys(s['d'])}
                            <span class="badge badge-primary badge-pill">{s.price() + " kr"}</span>
                        </li>))}
                </ListGroup>
            </Container>
        )
    }
}

export default ViewOrder;