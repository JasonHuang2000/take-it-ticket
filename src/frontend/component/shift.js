import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

import { useEffect } from 'react';
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
	},
	headerText: {
		color: 'grey',
		flex: '1',
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

// const rows = [{trainNum: 1, date: {year: 2020, month: 12, day: 12}, departure: "a", arrival: "b", departtime: 1010, arrivetime: 1110}];
const rows = []

export default function Shift(props) {
  const classes = useStyles();
  const { shiftData, departure, dest } = props;
	
  useEffect(() => {
    // console.log(shiftData)
		if (shiftData !== undefined && shiftData.shift !== null) {
      let i;
      for (i = 0; i < (shiftData.shift.length < 5 ? shiftData.shift.length : 5); i++) {
        rows.push(createData(shiftData.shift[i]))
      }
    }
	})

  return (
		<Container className={classes.root}>
			<div className={classes.header}>
				<Typography variant="subtitle2" className={classes.headerText}>Train No.</Typography>
				<Typography variant="subtitle2" className={classes.headerText}>{`${departure}`}</Typography>
				<ArrowRightAltIcon style={{ color: 'grey', fontSize: '22px' }}/>
				<Typography variant="subtitle2" className={classes.headerText}>{`${dest}`}</Typography>
			</div>
		</Container>
  );
}
