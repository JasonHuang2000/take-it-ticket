import React from "react";
import { useState } from "react";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(3),
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "80%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  back: {
    marginBottom: theme.spacing(5),
  },
  signbox: {
    marginTop: "12px",
  },
}));

export default function SignUpBody(props) {
  const classes = useStyles();
  const [showPwd, setshowPwd] = useState(false);

  const handleClickShowPwd = (e) => {
    if (showPwd) {
      setshowPwd(false);
    } else {
      setshowPwd(true);
    }
  };

  return (
    <Container maxWidth="sm">
      <CssBaseline />
      <Paper className={classes.paper}>
        <Typography className={classes.title} component="h1" variant="h5">
          Sign Up
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            error={props.nameEmp}
            helperText={props.nameEmp ? "Please enter your name" : ""}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Your Name"
            id="name"
            autoFocus
            onChange={props.onNameChange}
            className={classes.signbox}
          />
          <TextField
            error={props.IDtaken}
            helperText={props.IDtaken ? "This ID is taken." : ""}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="ID"
            label="User ID"
            onChange={props.onIDChange}
            className={classes.signbox}
          />
          <FormControl
            variant="outlined"
            fullWidth
            required
            className={classes.signbox}
          >
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              margin="normal"
              required
              fullWidth
              name="password"
              label="PasswordD"
              type={showPwd ? "text" : "password"}
              id="password"
              onChange={props.onPswdChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPwd}
                  >
                    {showPwd ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={props.onSignUpClick}
          >
            SIGN UP
          </Button>
          <Grid container>
            <Grid item xs></Grid>
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
