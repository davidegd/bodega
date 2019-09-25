import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import './Login.css';
import logoUrl from '../images/logo.png';

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{' '}
			<Link color="inherit" href="https://frubana.com/">
				Frubana ©
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

export default class Login extends Component {
	constructor(props) {
		super(props);
		const token = localStorage.getItem('token');
		let loggedAdmin = true;
		if (token === null) {
			loggedAdmin = false;
		}

		let loggedUser = false;

		this.state = {
			user: '',
			password: '',
			loggedAdmin,
			loggedUser,
		};

		this.onChange = this.onChange.bind(this);
		this.submitForm = this.submitForm.bind(this);
	}

	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value,
		});
	}

	submitForm(e) {
		e.preventDefault();
		const { user, password } = this.state;

		if (user === 'admin' && password === 'admin') {
			localStorage.setItem('token', 'QerYia8asdgasd79342hfSADhfajsAkdf');
			localStorage.setItem('loggedAsAdmin', true);
			localStorage.setItem('loggedAsUser', false);
			this.setState({
				loggedAdmin: true,
			});
		}
		if (user === 'user' && password === 'user') {
			localStorage.setItem('token', 'QerYia8asdgasd79342hfSADhfajsAkdf');
			localStorage.setItem('loggedAsUser', true);
			localStorage.setItem('loggedAsAdmin', false);
			this.setState({
				loggedUser: true,
			});
		}
	}

	render() {
		if (this.state.loggedAdmin && localStorage.getItem('loggedAsAdmin')) {
			return <Redirect to="/dashboard" />;
		} else {
			if (this.state.loggedUser && localStorage.getItem('loggedAsUser')) {
				return <Redirect to="/bodega" />;
			}
		}
		return (
			<div className="image">
				<Container className="root" component="main" maxWidth="xs">
					<CssBaseline />

					<div className="paper">
						<img className="logo" src={logoUrl} alt="" />

						<Typography component="h1" variant="h5">
							Bodega Cachubana
						</Typography>
						<form onSubmit={this.submitForm} className="form" noValidate>
							<TextField
								variant="outlined"
								color="secondary"
								margin="normal"
								required
								fullWidth
								label="Usuario"
								placeholder="Usuario"
								name="user"
								value={this.state.user}
								onChange={this.onChange}
								autoFocus
							/>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								name="password"
								value={this.state.password}
								onChange={this.onChange}
								label="Contraseña"
								type="password"
							/>
							<Button type="submit" fullWidth variant="contained" className="submit">
								Identificarse
							</Button>
							<Box mt={5}>
								<Copyright />
							</Box>
						</form>
					</div>
				</Container>
			</div>
		);
	}
}
