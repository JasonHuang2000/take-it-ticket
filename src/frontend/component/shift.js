import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import Collapse from '@material-ui/core/Collapse';

import { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';

const useStyles = makeStyles({
	root: {
		display: 'block',
	},
	header: {
		marginTop: '16px',
		display: 'flex',
		width: '70%',
		margin: '0 auto',
		marginBottom: '30px',
	},
	headerText: {
		color: 'grey',
		flex: '1',
	}, 
	main: {
		display: 'block',
	},
	paper: {
		display: 'flex',
		width: '70%',
		margin: '0 auto',
		marginTop: '20px',
		marginBottom: '10px',
		'&:hover': {
			boxShadow: '5px 5px 5px grey',
			cursor: 'pointer',
		}
	},
	paperText: {
		flex: '1',
		marginTop: '10px',
		marginBottom: '10px',
	},
	seatPaper: {
		margin: '0 auto',
		width: '70%',
		height: '150px',
	}
});

function createData(outdata) {
  const trainNum = outdata.trainNum
  const date = outdata.schedule.date
  const departure = outdata.departure
  const arrival = outdata.arrival
  const departtime = outdata.schedule.depart
  const arrivetime = outdata.schedule.arrive
  return { trainNum, date, departure, departtime, arrival, arrivetime };
}

// let rows = [{trainNum: 1, date: {year: 2020, month: 12, day: 12}, departure: "a", arrival: "b", departtime: { hour: 10, minute: 10 }, arrivetime: { hour: 11, minute: 10 } }, {trainNum: 1, date: {year: 2020, month: 12, day: 12}, departure: "a", arrival: "b", departtime: { hour: 10, minute: 10 }, arrivetime: { hour: 11, minute: 10 } }];
let rows = []

export default function Shift(props) {
  const classes = useStyles();
  const { shiftData, departure, dest } = props;
	const [seatOpened, setSeatOpened] = useState(new Array(5).fill(false));

  useEffect(() => {
		rows = [];
		if (shiftData !== undefined && shiftData.shift !== null) {
      let i;
      for (i = 0; i < (shiftData.shift.length < 5 ? shiftData.shift.length : 5); i++) {
        rows.push(createData(shiftData.shift[i]))
      }
    }
	})
	const handleSeatOpened = (idx) => {
		console.log(seatOpened[idx]);
		const arr = [...seatOpened];
		arr[idx] = !(arr[idx]);
		setSeatOpened(arr);
	}

  return (
		<Container className={classes.root}>
			<div className={classes.header}>
				<Typography variant="subtitle2" className={classes.headerText}>Train No.</Typography>
				<Typography variant="subtitle2" className={classes.headerText}>{`${departure}`}</Typography>
				<ArrowRightAltIcon style={{ color: 'grey', fontSize: '22px' }}/>
				<Typography variant="subtitle2" className={classes.headerText}>{`${dest}`}</Typography>
			</div>
			<div className={classes.main}>
				{	rows.map( (val, idx) => {
					const { trainNum, departtime, arrivetime, seats } = val;
					const { hour: d_hour, minute: d_minute } = departtime;
					const { hour: a_hour, minute: a_minute } = arrivetime;
					return (
						<>
							<Paper className={classes.paper} onClick={ () => handleSeatOpened(idx) }>
								<Typography variant="subtitle1" className={classes.paperText}>{`${trainNum}`}</Typography>
								<Typography variant="subtitle1" className={classes.paperText}>{`${d_hour}:${d_minute}`}</Typography>
								<ArrowRightAltIcon style={{ fontSize: '22px', margin: '10px 0 10px 0' }}/>
								<Typography variant="subtitle1" className={classes.paperText}>{`${a_hour}:${a_minute}`}</Typography>
							</Paper>
							<Collapse in={seatOpened[idx]} timeout="auto" unmountOnExit>
								<Paper className={classes.seatPaper}>
								</Paper>
							</Collapse>
						</>
					);
				}) }
			</div>
		</Container>
  );
}
