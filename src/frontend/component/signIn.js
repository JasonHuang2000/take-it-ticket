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
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: '0px',
	},
	title: {
		marginTop: theme.spacing(3),
	},
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(8),
  },
	paper_before: {
    marginTop: theme.spacing(-60),
	},
	paper_after: {
    marginTop: theme.spacing(8),
	},
  form: {
    width: '80%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
	signUp: {
		marginBottom: theme.spacing(5),
	},
}));


export default function SignIn(props) {
  const classes = useStyles();
  const [showPwd, setshowPwd] = useState(false);

  const handleClickShowPwd = (e) => {
    if (showPwd) {
      setshowPwd(false)
    } else {
      setshowPwd(true)
    }
  }

  const handleMouseDownPwd = (e) => {
    if (showPwd) {
      setshowPwd(false)
    } else {
      setshowPwd(true)
    }
  }


	return (
		<Container maxWidth='sm' >
      <CssBaseline />
      <Paper className={classes.paper}>
        <Typography className={classes.title} component="h1" variant="h5">
					Log In
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="ID"
            label="Your User ID"
            name="ID"
            autoFocus
						onChange={props.onIDChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            // type="password"
            type={showPwd ? 'text' : 'password'}
            id="password"
            onChange={props.onPswdChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPwd}
                  onMouseDown={handleMouseDownPwd}
                >
                  {showPwd ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
						onClick={props.onEnterOption}
          >
						Log In
          </Button>
					<Grid container>
            <Grid item xs>
            </Grid>
            <Grid item className={classes.signUp}>
              <Link href="#" variant="body2" onClick={props.onSignUpClick}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
		</Container>
	);
}
