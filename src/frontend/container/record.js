import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

import Background from '../img/3.jpg';

const useStyles = makeStyles((theme) => ({
  container: {
		position: 'absolute',
		top: '0',
		left: '0',
		width: '100%',
		height: '100%',
		backgroundImage: `url(${Background})`,
		textAlign: 'center',
		display: 'block',
		zIndex: '0',
	},
	bigPaper: {
		margin: 'auto',
		marginTop: theme.spacing(5),
		marginBottom: theme.spacing(5),
		display: 'block',
		height: '90%',
		width: '60%',
		textAlign: 'center',
		borderRadius: '10px',
		justifyContent: 'center',
		opacity: '1',
		transition: 'opacity .5s ease-in-out',
		backgroundColor: 'rgb(230,230,230)',
	},
	after: {
		opacity: '1',
	},
	titleHeader: {
		display: 'flex',
	},
	title: {
		margin: '20px auto',
		height: '10%',
		width: '100%',
		textAlign: 'center',
		fontWeight: 'bold',
	}, 
	recordContainer: {
		display: 'block',
	},
	header: {
		marginTop: '24px',
		display: 'flex',
		width: '700px',
		margin: '0 auto',
		marginBottom: '30px',
	},
	headerText: {
		color: 'grey',
		flex: '3',
	}, 
	main: {
		display: 'block',
	},
	paper: {
		display: 'flex',
		width: '700px',
		margin: '0 auto',
		marginTop: '20px',
		marginBottom: '10px',
		'&:hover': {
			boxShadow: '5px 5px 5px grey',
			cursor: 'pointer',
		}
	},
	paperText: {
		flex: '3',
		marginTop: '10px',
		marginBottom: '10px',
	},
}));

function createData(outdata) {
	const trainNum = outdata.trainNum;
	const { carriage, seatNum } = outdata.seat;
	const departure = outdata.departure;
	const arrival = outdata.arrival;
  return { trainNum, carriage, seatNum, departure, arrival };
}

let rows = [];

export default function Record(props) {

  const classes = useStyles();
	const { name, userData, userLoading } = props
	const [opClass, setOpClass] = useState('');

	// while ( userLoading ) {}
	// setOpClass(classes.after);

  useEffect(() => {
		if (userData !== undefined && userData.user !== null) {
      let i;
			const history = userData.user.history;
      for (i = 0; i < history.length; i++) {
        rows.push(createData(history[i]))
      }
    }
	})

	return (
		<div className={classes.container}>
			<Paper className={`${classes.bigPaper} ${opClass}`}>
				<div className={classes.titleHeader}>
					<Typography variant="h4" className={classes.title}>
					{ `${name}'s Booking Records` }
					</Typography> 
				</div>
				<div className={classes.recordContainer}>
					<div className={classes.header}>
						<Typography variant="subtitle2" className={classes.headerText}>Train No.</Typography>
						<Typography variant="subtitle2" className={classes.headerText}>Departure</Typography>
						<ArrowRightAltIcon style={{ color: 'grey', fontSize: '22px' }}/>
						<Typography variant="subtitle2" className={classes.headerText}>Destination</Typography>
						<Typography variant="subtitle2" className={classes.headerText} style={{ flex: '2' }}>Carriage No.</Typography>
						<Typography variant="subtitle2" className={classes.headerText} style={{ flex: '2' }}>Seat No.</Typography>
					</div>
					<div className={classes.main}>
						{
							rows.map( (val, idx) => {
								const { trainNum, carriage, seatNum, departure, arrival } = val;
								return (
									<Paper className={classes.paper}>
										<Typography variant="subtitle1" className={classes.paperText}>{`${trainNum}`}</Typography>
										<Typography variant="subtitle1" className={classes.paperText}>{`${departure}`}</Typography>
										<ArrowRightAltIcon style={{ fontSize: '22px', margin: 'auto 0' }}/>
										<Typography variant="subtitle1" className={classes.paperText}>{`${arrival}`}</Typography>
										<Typography variant="subtitle1" className={classes.paperText} style={{ flex: '2' }}>{`${carriage}`}</Typography>
										<Typography variant="subtitle1" className={classes.paperText} style={{ flex: '2' }}>{`${seatNum}`}</Typography>
									</Paper>
								);
							})
						}
					</div>
				</div>
			</Paper>
		</div>
	);
}
