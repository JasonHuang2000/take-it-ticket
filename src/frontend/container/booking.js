import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
		width: '30%',
		// height: '100%',
		backgroundColor: 'rgb(230,230,230)',
		justifyContent: 'center',
  },
	title: {
		margin: theme.spacing(10,8,5,8),
	},
  textField: {
		margin: theme.spacing(2,8,2,8),
		width: '200px',
  },
}));

export default function Booking(props) {

  const classes = useStyles();
	const station = ['Taipei', 'Hsinchu', 'Taichung'];

  return (
    <div className={classes.container}>
			<Typography variant="h5" className={classes.title}>Book Your Tickets</Typography>
			<TextField
        id="datetime-local"
        label="Departure Date"
        type="date"
				value={props._date}
				onChange={props.onDateChange}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
			/> 
      <TextField
        id="time"
        label="Departure Time"
        type="time"
				value={props._time}
				onChange={props.onTimeChange}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
      />
			<Divider />
			<TextField
          id="standard-select-currency"
          select
          label="Departure Station"
          value={props._departure}
          onChange={props.onDepartureChange}
					className={classes.textField}
        >
          { station.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
    </div>
  );
}

