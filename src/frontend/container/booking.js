import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

const useStyles = makeStyles((theme) => ({
  container: {
		// display: 'table',
		position: 'absolute',
		top: '0',
		left: '0',
		width: '100%',
		height: '100%',
		backgroundColor: 'rgb(230,230,230)',
		// justifyContent: 'center',
	},
	title: {
		width: '100%',
		height: '8%',
		marginTop: theme.spacing(5),
		textAlign: 'center',
	},
	section1: {
		position: 'absolute',
		left: '50%',
		transform: 'translateX(-50%)',
		top: '5%',
		display: 'flex',
    flexWrap: 'wrap',
		height: '30%',
		width: '60%',
		textAlign: 'center',
		borderRadius: '10px',
		justifyContent: 'center',
		transition: 'opacity .5s ease-in-out',
	},
	section2: {
		position: 'absolute',
		left: '50%',
		transform: 'translateX(-50%)',
		top: '40%',
		display: 'flex',
    flexWrap: 'wrap',
		height: '30%',
		width: '60%',
		textAlign: 'center',
		borderRadius: '10px',
		justifyContent: 'center',
		transition: 'opacity .5s ease-in-out',
	},
	before: {
		opacity: '0',
	},
	after: {
		opacity: '1',
	},
  textField: {
		margin: theme.spacing(0,5,0,5),
		width: '250px',
		height: '20%',
		// flex: '1',
  },
	subtitle: {
		margin: theme.spacing(2,2,3,3),
		height: '10%',
		width: '100%',
	}, 
	buttonWrapper: {
		width: '100%',
		height: '35px',
		margin: theme.spacing(2,0,3,0),
	},
	button: {
		width: '120px',
		height: '100%',
		margin: theme.spacing(1,7,1,5),
	}
}));

export default function Booking(props) {

  const classes = useStyles();
	const station = ['Taipei', 'Hsinchu', 'Taichung'];
	const { _date, _time, _departure, _dest, onDateChange, onTimeChange, onDepartureChange, onDestChange } = props;
	const [opClass1, setOpClass1] = useState(`${classes.before}`);
	const [opClass2, setOpClass2] = useState(`${classes.before}`);

	setTimeout(() => setOpClass1(`${classes.after}`), 10);

  return (
    <div className={classes.container}>
			<Paper className={`${classes.section1} ${opClass1}`}>
				<Typography variant="h6" className={classes.subtitle}>1. Select Date and Time</Typography> <hr />
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
							onClick={() => setOpClass2(`${classes.after1click}`)}
					>
						Next
					</Button>
				</div>
			</Paper>
			<Paper className={`${classes.section2} ${opClass2}`}>
				<Typography variant="h6" className={classes.subtitle}>2. Select Departure and Destination</Typography>
				<TextField
					id="departure"
					label="Departure Station"
					select
					value={_departure}
					onChange={onDepartureChange}
					className={classes.textField}
					InputLabelProps={{
						shrink: true,
					}}
				> 
					{ station.map( (option) => {
						return (
							<MenuItem key={option} value={option}>
								{option}
							</MenuItem>
						);
					}) }
				</TextField>
				<ArrowRightAltIcon style={{ fontSize: '45px', marginTop: '8px' }}/>
				<TextField
					id="dest"
					label="Destination Station"
					select
					value={_dest}
					onChange={onDestChange}
					className={classes.textField}
					InputLabelProps={{
						shrink: true,
					}}
				> 
					{ station.map( (option) => {
						return (
							<MenuItem key={option} value={option}>
								{option}
							</MenuItem>
						);
					}) }
				</TextField>
				<div className={classes.buttonWrapper}>
					<Button
							type="submit"
							variant="contained"
							fullWidth
							color="default"
							className={classes.button}
					>
						Next
					</Button>
				</div>
			</Paper>
			<Paper className={classes.section}>
			</Paper>
    </div>
  );
}

