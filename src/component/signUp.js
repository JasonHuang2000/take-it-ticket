import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	title: {
		marginTop: theme.spacing(3),
	},
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '80%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
	back: {
		marginBottom: theme.spacing(5),
	},
}));


export default function SignUpBody(props) {
	const classes = useStyles();
	return (
		<Container maxWidth='sm'>
			<CssBaseline />
			<Paper className={classes.paper}>
				<Typography className={classes.title} component="h1" variant="h5">
					Sign Up
				</Typography>
				<form className={classes.form} noValidate>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						label="Your Name"
						id="name"
						autoFocus
						onChange={props.onNameChange}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="ID"
						label="User ID"
						onChange={props.onIDChange}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						id="password"
						onChange={props.onPswdChange}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						SIGN UP
					</Button>
					<Grid container>
						<Grid item xs>
						</Grid>
						<Grid item className={classes.back}>
							<Link href="#" variant="body2" onClick={props.onBackClick}>
								{"Already have an account? Log In"}
							</Link>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</Container>
	);
}
