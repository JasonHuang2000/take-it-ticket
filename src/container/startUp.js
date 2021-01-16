import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Container from '@material-ui/core/Container';
import SignIn from '../component/signIn.js'
import SignUp from '../component/signUp.js'

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100%',
		backgroundImage: 'url("https://images.pexels.com/photos/28614/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260")',
		backgroundSize: 'cover',
	},
	buttonContainer: {
		height: '100%',
		backgroundColor: 'rgba(255, 255, 255, 0.5)',
	},
	button: {
		width: '60%',
		top: '30%',
		left: '50%',
		transform: 'translate(-50%)',
		marginBottom: theme.spacing(2),
	},
}));

export default function StartUp(props) {
	const classes = useStyles();
	const [signIn, setSignIn] = useState(false);
	const [signUp, setSignUp] = useState(false);

	const handleSignInClick = () => {
		setSignIn(true);
	}
	const handleSignInClose = () => {
		setSignIn(false);
	}
	const handleSignUpClick = () => {
		setSignUp(true);
		setSignIn(false);
	}
	const handleSignUpClose = () => {
		setSignUp(false);
	}
	const handleBackClick = () => {
		setSignUp(false);
		setSignIn(true);
	}

	return (
		<Container maxWidth='xl' className={classes.root}>
			<Container maxWidth='sm' className={classes.buttonContainer}>
				<Button
					variant="contained"
					color="primary"
					className={classes.button}
					onClick={handleSignInClick}
				>
					LOGIN
				</Button>
				{ !signUp ? (
					<Modal
						open={signIn}
						onClose={handleSignInClose}
					>
						<SignIn
							onSignUpClick={handleSignUpClick}
							onIDChange={props.onIDChange}
							onPswdChange={props.onPswdChange}
						/>
					</Modal>
				 ) : (
					<Modal
						open={signUp}
						onClose={handleSignUpClose}
					>
						<SignUp
							onBackClick={handleBackClick}
					 		onNameChange={props.onNameChange}
							onIDChange={props.onIDChange}
							onPswdChange={props.onPswdChange}
						/>
					</Modal>
				) }
				<Button
					variant="contained"
					color="default"
					className={classes.button}
				> 
					Look Up
				</Button>
			</Container>
		</Container>
	);
}
