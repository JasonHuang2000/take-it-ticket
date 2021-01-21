// react
import React from 'react';

// material ui
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Background from '../img/2.jpg';

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100%',
		backgroundImage: `url(${Background})`,
		backgroundSize: 'cover',
	},
	buttonContainer: {
		height: '30%',
		width: '350px',
		position: 'absolute',
		top: '50%',
		transform: 'translateY(-50%)',
		left: '65%',
		backgroundColor: 'rgba(255, 255, 255, 0.3)',
		borderRadius: '12px',
	},
	button: {
		width: '60%',
		top: '30%',
		left: '50%',
		transform: 'translate(-50%)',
		marginBottom: theme.spacing(3),
	},
	signin: {
		top: '0%',
		transition: 'top 1s ease-in',
		'&:hover': {
			top: '50%',
		}
	}
}));

export default function StartUp(props) {

	const classes = useStyles();

	return (
		<Container maxWidth='xl' className={classes.root}>
			<Container maxWidth='sm' className={classes.buttonContainer}>
				<Button
					variant="contained"
					color="primary"
					className={classes.button}
					onClick={props.onSignInClick}
				>
					LOG IN
				</Button> <br />
				<Button
					variant="contained"
					color="default"
					className={classes.button}
					onClick={() => props.onBookOptionClick(true, true)}
				> 
					Shift Schedule
				</Button>
			</Container>
		</Container>
	);
}
