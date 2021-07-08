import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ScheduleIcon from "@material-ui/icons/Schedule";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import AssignmentIcon from "@material-ui/icons/Assignment";
import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import { useState } from "react";
import Collapse from "@material-ui/core/Collapse";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    color: "rgb(80,80,80)",
  },
  title: {
    marginBottom: "10px",
  },
  icon: {
    margin: theme.spacing(1, 1),
  },
  text: {
    margin: theme.spacing(1, 7, 1, 0),
  },
  footer1: {
    position: "fixed",
    left: "0",
    bottom: "0",
    width: "250px",
    height: "70px",
    margin: "0 18px 20px 18px",
  },
  footer2: {
    position: "fixed",
    left: "0",
    bottom: "0",
    width: "250px",
    height: "70px",
    margin: "0 18px 80px 18px",
  },
  button: {
    height: "90%",
  },
  nested: {
    paddingLeft: theme.spacing(8),
  },
}));

export default function Menu(props) {
  const classes = useStyles();
  const {
    signIn,
    onLogInClick,
    onLogOutClick,
    onDeleteClick,
    onBookOptionClick,
    onRecordClick,
  } = props;
  const [bookOpened, setBookOpened] = useState(false);

  return (
    <div className={classes.root}>
      <List>
        <ListItem key="Title" className={classes.title}>
          <ListItemText
            primary={signIn ? `Hi ${props.username} !` : `Menu`}
            primaryTypographyProps={{
              variant: "h5",
            }}
          />
        </ListItem>
        <Divider />
        <ListItem button key="Booking Records" onClick={onRecordClick}>
          <ListItemIcon className={classes.icon}>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Booking Records" className={classes.text} />
        </ListItem>
        <ListItem
          button
          key="Book Tickets"
          onClick={() => setBookOpened(!bookOpened)}
        >
          <ListItemIcon className={classes.icon}>
            <DoneOutlineIcon />
          </ListItemIcon>
          <ListItemText primary="Book Tickets" className={classes.text} />
        </ListItem>
        <Collapse in={bookOpened} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              button
              className={classes.nested}
              onClick={() => onBookOptionClick(true, false)}
            >
              <ListItemText primary="Reserved Seat" />
            </ListItem>
            <ListItem
              button
              className={classes.nested}
              onClick={() => onBookOptionClick(false, false)}
            >
              <ListItemText primary="Non-reserved Seat" />
            </ListItem>
          </List>
        </Collapse>
        <ListItem
          button
          key="Shifts Schedule"
          onClick={() => onBookOptionClick(true, true)}
        >
          <ListItemIcon className={classes.icon}>
            <ScheduleIcon />
          </ListItemIcon>
          <ListItemText primary="Shifts Schedule" className={classes.text} />
        </ListItem>
        <Divider />
        {signIn ? (
          <div>
            <ListItem key="Delete" className={classes.footer1}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                color="secondary"
                className={classes.button}
                startIcon={<DeleteIcon />}
                onClick={onDeleteClick}
              >
                Delete Account
              </Button>
            </ListItem>
            <ListItem key="Log In" className={classes.footer2}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                color="primary"
                className={classes.button}
                startIcon={<LockOutlinedIcon />}
                onClick={onLogOutClick}
              >
                Log Out
              </Button>
            </ListItem>
          </div>
        ) : (
          <ListItem key="Log Out" className={classes.footer1}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              color="primary"
              className={classes.button}
              startIcon={<LockOpenOutlinedIcon />}
              onClick={onLogInClick}
            >
              Log In
            </Button>
          </ListItem>
        )}
      </List>
    </div>
  );
}
