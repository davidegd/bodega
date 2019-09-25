import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Dashboard from '../Components/Dashboard';

export default class bodega extends Component {
	constructor(props) {
		super(props);
		
	}
	render() {
		if (localStorage.getItem('token') === null) return <Redirect to="/" />;
		return (<div><Dashboard /></div>);
	}
}
