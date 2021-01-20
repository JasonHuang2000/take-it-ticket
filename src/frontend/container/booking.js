import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import Shift from '../component/shift';

const useStyles = makeStyles((theme) => ({
  container: {
		position: 'absolute',
		top: '0',
		left: '0',
		width: '100%',
		height: '100%',
		backgroundColor: 'rgb(230,230,230)',
		textAlign: 'center',
		display: 'block',
		scrollBehavior: 'smooth',
		overflowY: 'scroll',
	},
	title: {
		width: '100%',
		height: '8%',
		marginTop: theme.spacing(5),
		textAlign: 'center',
	},
	section: {
		margin: 'auto',
		display: 'flex',
    flexWrap: 'wrap',
		height: '30%',
		width: '60%',
		textAlign: 'center',
		borderRadius: '10px',
		justifyContent: 'center',
		transition: 'opacity .5s ease-in-out',
	},
	time : {
		marginTop: '7.5%',
		marginBottom: '5%',
	}, 
	location: {
		marginTop: '5%',
		marginBottom: '7.5%',
	},
	shiftSection: {
		margin: 'auto',
		marginTop: theme.spacing(5),
		marginBottom: theme.spacing(5),
		display: 'flex',
    flexWrap: 'wrap',
		height: '90%',
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
	const [opClass3, setOpClass3] = useState(`${classes.before}`);
	const [departError, setDepartError] = useState(false);
	const [destError, setDestError] = useState(false);
	const [sameError, setSameError] = useState(false);
	const handleLocationClick = () => {
		if ( _departure === '' ) {
			setDepartError(true);
		} else {
			setDepartError(false);
		}
		if ( _dest === '' ) {
			setDestError(true);
		} else {
			setDestError(false);
		}
		if ( _departure !== '' && _dest !== '' ) {
			if ( _departure === _dest ) {
				setDepartError(true);
				setDestError(true);
				setSameError(true);
			} else {
				setOpClass3(`${classes.after}`);
			}
		}
	}

	setTimeout(() => setOpClass1(`${classes.after}`), 10);

  return (
    <div className={classes.container}>
			<Paper className={`${classes.section} ${classes.time} ${opClass1}`}>
				<Typography variant="h6" className={classes.subtitle}>Select Date and Time</Typography> <hr />
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
							disabled={ opClass2 === classes.after }
							color="default"
							className={classes.button}
							onClick={() => setOpClass2(`${classes.after}`)}
					>
						Next
					</Button>
				</div>
			</Paper>
			<Paper className={`${classes.section} ${classes.location} ${opClass2}`}>
				<Typography variant="h6" className={classes.subtitle}>Select Departure and Destination</Typography>
				<TextField
					id="departure"
					label="Departure Station"
					select
					error={departError}
					helperText={ departError ? ( sameError ? 'departure and destination cannot be the same' : 'please choose a departure station ' ) : '' }
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
					error={destError}
					helperText={ destError ? ( sameError ? 'departure and destination cannot be the same' : 'please choose a destination station ' ) : '' }
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
							color="primary"
							className={classes.button}
							onClick={handleLocationClick}
					>
						Comfirm
					</Button>
				</div>
			</Paper>
			<Paper className={`${classes.shiftSection} ${opClass3}`}>
				<div className={classes.returnContainer}>
					<Button
						type="submit"
						variant="outlined"
					>
						Choose Again
					</Button>
				</div>
				<Shift />
			</Paper>
    </div>
  );
}

