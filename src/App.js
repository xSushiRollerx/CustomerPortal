import './App.css';

const React = require('react');
const ReactDOM = require('react-dom'); 
//const axios = require('axios');
const jwtToken = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI5NiIsImV4cCI6MTYxOTIzNjQwMCwiaWF0IjoxNjE5MjMyODAwfQ.U5yeGPIv3CPz1zFne8SxLmlNWinAu3XFvyDHw1G8FDo'

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = { order: null, status: null};
    }

	componentDidMount() {
		//let config = {
		//	method: 'get',
		//	url: 'http://localhost:8040/customer/order/active',
		//	headers: { 'authorization': jwttoken }
		//}

		//axios.get(config).then(response => {
		//	this.setstate({ status: response.status })
		//	console.log("response status: ", response.status);
			
		//	if (response.ok) {
		//		this.setstate({ order: response.data })
		//		console.log("order object: ", response.data);
  //          }
			
		//});

		fetch('http://localhost:8040/customer/order/active', { method: 'GET', headers: { 'Authorization': jwtToken } })
			.then(r => r.json().then(data => this.setState({ order: data, status: r.status })));
		
		

	}

	render() {
		console.log("Order Status: ", this.state.status);
		console.log("Order: ", this.state.order);
		if (this.state.status >= 200 && this.state.status < 300) {
			return (
				<Order order={this.state.order} />
			)
		} else if (this.state.status === 403) {
			return (<p>FORBIDDEN</p>);
		} else if (this.state.status > 299) {
			return (<p>Something Went Wrong :(</p>);
		} else {
			return (<p>Loading . . .</p>);
        }

    }
}

class Order extends React.Component {
	render() {
		if (this.props.order !== null || this.props.order.orderItems !== null) {
			const orderitems = this.props.order.orderItems.map(orderitem =>
				<OrderItem orderitem={orderitem} />
			);
			return (
				<table>
					<tbody>
						<tr>
							<th>Name</th>
							<th>Quantity</th>
							<th>Price</th>
						</tr>
						{orderitems}
					</tbody>
				</table>
			)
		} else {
			return (
				<table>
					<tbody>
						<tr>
							<th>Name</th>
							<th>Quantity</th>
							<th>Price</th>
						</tr>
					</tbody>
				</table>);
        }
	}
}


class OrderItem extends React.Component {
	render() {
		return (
			<tr>
				<td>{this.props.orderitem.name}</td>
				<td>{this.props.orderitem.quantity}</td>
				<td>{this.props.orderitem.price} * {this.props.orderitem.quantity}</td>
			</tr>
		)
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('root')
)

export default App;
