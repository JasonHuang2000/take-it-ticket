import { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import Shift from "../component/shift";
import Modal from "@material-ui/core/Modal";

import Background from "../img/3.jpg";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundImage: `url(${Background})`,
    textAlign: "center",
    display: "block",
    scrollBehavior: "smooth",
    overflowY: "hidden",
  },
  title: {
    width: "100%",
    height: "8%",
    marginTop: theme.spacing(5),
    textAlign: "center",
  },
  section: {
    margin: "auto",
    display: "flex",
    flexWrap: "wrap",
    height: "30%",
    width: "60%",
    textAlign: "center",
    borderRadius: "10px",
    justifyContent: "center",
    opacity: "0",
    transition: "opacity .5s ease-in-out",
  },
  time: {
    marginTop: "7.5%",
    marginBottom: "5%",
  },
  location: {
    marginTop: "5%",
    marginBottom: "7.5%",
  },
  shiftSection: {
    margin: "auto",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    display: "block",
    height: "90%",
    width: "60%",
    textAlign: "center",
    borderRadius: "10px",
    justifyContent: "center",
    opacity: "0",
    transition: "opacity .5s ease-in-out",
    backgroundColor: "rgb(230,230,230)",
  },
  after: {
    opacity: "1",
  },
  textField: {
    margin: theme.spacing(0, 5, 0, 5),
    width: "250px",
    height: "20%",
    // flex: '1',
  },
  subtitle: {
    margin: theme.spacing(2, 3, 3, 3),
    height: "10%",
    width: "100%",
    textAlign: "center",
  },
  buttonWrapper: {
    width: "100%",
    height: "35px",
    margin: theme.spacing(2, 0, 3, 0),
  },
  button: {
    width: "120px",
    height: "100%",
    margin: theme.spacing(1, 2, 1, 2),
  },
  returnContainer: {
    width: "20%",
    marginTop: theme.spacing(3),
  },
  header: {
    display: "flex",
  },
  seatButton: {
    marginTop: "30px",
    height: "40px",
    width: "100px",
  },
  mesContainer: {
    height: "50px",
    width: "150px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    display: "flex",
  },
  mes: {
    margin: "auto auto",
    fontWeight: "bold",
  },
}));

export default function Booking(props) {
  const classes = useStyles();
  const station = ["Taipei", "Hsinchu", "Taichung"];
  const {
    _date,
    _time,
    _departure,
    _dest,
    onDateChange,
    onTimeChange,
    onDepartureChange,
    onDestChange,
    reserved,
    shiftData,
    setDest,
    shift,
    setShift,
    setClass,
    shiftLoading,
    onSeatChange,
    seatChosen,
    enterRecord,
  } = props;
  const { one, two, three, setOne, setTwo, setThree } = setClass;

  const [departError, setDepartError] = useState(false);
  const [destError, setDestError] = useState(false);
  const [sameError, setSameError] = useState(false);
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const [trainNum, setTrainNum] = useState(0);

  if (shift && shiftLoading) return null;
  else if (shift) {
    setTimeout(() => {
      bottomRef.current.scrollIntoView();
      setThree(`${classes.after}`);
    }, 100);
  }

  const handleLocationClick = () => {
    setDest(_dest);
    if (_departure === "") {
      setDepartError(true);
    } else {
      setDepartError(false);
    }
    if (_dest === "") {
      setDestError(true);
    } else {
      setDestError(false);
    }
    if (_departure !== "" && _dest !== "") {
      if (_departure === _dest) {
        setDepartError(true);
        setDestError(true);
        setSameError(true);
      } else {
        setTwo(`${classes.after}`);
      }
    }
  };
  const handleTimeClick = () => {
    setShift(true);
  };
  const handleBackClick = () => {
    setTwo("");
  };
  const handleResetClick = () => {
    topRef.current.scrollIntoView();
    setShift(false);
    setTimeout(() => setShift(false), 100);
    handleBackClick();
  };

  setTimeout(() => setOne(`${classes.after}`), 10);

  return (
    <div className={classes.container}>
      <Paper
        className={`${classes.section} ${classes.time} ${one}`}
        ref={topRef}
      >
        <Modal open={props.success} onClose={props.onMesClose}>
          <Paper className={classes.mesContainer}>
            <Typography variant="h5" className={classes.mes}>
              Success !
            </Typography>
          </Paper>
        </Modal>
        <Typography variant="h6" className={classes.subtitle}>
          Select Departure and Destination
        </Typography>
        <TextField
          id="departure"
          label="Departure Station"
          select
          error={departError}
          helperText={
            departError
              ? sameError
                ? "departure and destination cannot be the same"
                : "please choose a departure station "
              : ""
          }
          value={_departure}
          onChange={onDepartureChange}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        >
          {station.map((option) => {
            return (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            );
          })}
        </TextField>
        <ArrowRightAltIcon style={{ fontSize: "45px", marginTop: "8px" }} />
        <TextField
          id="dest"
          label="Destination Station"
          select
          error={destError}
          helperText={
            destError
              ? sameError
                ? "departure and destination cannot be the same"
                : "please choose a destination station "
              : ""
          }
          value={_dest}
          onChange={onDestChange}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        >
          {station.map((option) => {
            return (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            );
          })}
        </TextField>
        <div className={classes.buttonWrapper}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={two === classes.after}
            color="default"
            className={classes.button}
            onClick={handleLocationClick}
          >
            Next
          </Button>
        </div>
      </Paper>

      <Paper className={`${classes.section} ${classes.location} ${two}`}>
        <Typography variant="h6" className={classes.subtitle}>
          Select Date and Time
        </Typography>{" "}
        <hr />
        <TextField
          id="date"
          label="Departure Date"
          type="date"
          value={_date}
          onChange={onDateChange}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="time"
          label="Departure Time"
          type="time"
          value={_time}
          onChange={onTimeChange}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
        />
        <div className={classes.buttonWrapper}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            color="default"
            className={classes.button}
            onClick={handleBackClick}
          >
            Back
          </Button>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            color="primary"
            className={classes.button}
            onClick={handleTimeClick}
          >
            Confirm
          </Button>
        </div>
      </Paper>

      {shift ? (
        <Paper className={`${classes.shiftSection} ${three}`} ref={bottomRef}>
          <div className={classes.header}>
            <div className={classes.returnContainer}>
              <Button
                type="submit"
                color="secondary"
                variant="outlined"
                onClick={handleResetClick}
              >
                Reset
              </Button>
            </div>
            <div className={classes.subtitle}>
              <Typography
                variant="h4"
                className={classes.subtitle}
                style={{ width: "70%" }}
              >
                {enterRecord ? "Shift Schedule" : "Choose Shift"}
              </Typography>
            </div>
          </div>
          <Shift
            shiftData={shiftData}
            departure={_departure}
            dest={_dest}
            onSeatChange={onSeatChange}
            seatChosen={seatChosen}
            enterRecord={enterRecord}
            reserved={reserved}
            setTrainNum={setTrainNum}
          />
          {!enterRecord ? (
            <Button
              type="submit"
              variant="contained"
              fullWidth
              color="primary"
              className={classes.seatButton}
              onClick={() => props.handleConfirm(trainNum, reserved)}
            >
              Confirm
            </Button>
          ) : (
            <></>
          )}
        </Paper>
      ) : (
        <> </>
      )}
    </div>
  );
}
