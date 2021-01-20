import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

import { useEffect, useState, useRef } from 'react';
import { Container } from '@material-ui/core';

const useStyles = makeStyles({
	root: {
		display: 'block',
	},
	header: {
		marginTop: '16px',
		display: 'flex',
		width: '600px',
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
		width: '600px',
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
		width: '500px',
		height: '150px',
		scrollBehavior: 'smooth',
		overflowX: 'auto',
		overflowY: 'hidden',
		whiteSpace: 'nowrap',
	},
	button: {

	},
	carContainer: {
		width: '2000px',
		display: 'flex',
	},
	car: {
		width: '500px',
		padding: '0 55px',
		margin: '11px auto',
		display: 'flex',
		flexWrap: 'wrap',
	}, 
	seat: {
		height: '25px',
		width: '25px',
		margin: '3px 6px 3px 6px',
		backgroundColor: 'rgb(180,180,180)',
		borderRadius: '3px',
		'&:hover': {
			backgroundColor: 'rgb(210,210,210)',
			cursor: 'pointer',
		}
	},
	seatDisable: {
		height: '25px',
		width: '25px',
		margin: '3px 6px 3px 6px',
		backgroundColor: 'rgb(240,240,240)',
		borderRadius: '3px',
	}, 
	bigContainer: {
		display: 'flex',
		margin: '0 auto',
		width: '600px',
	}
});

function createData(outdata) {
  const trainNum = outdata.trainNum
  const date = outdata.schedule.date
  const departure = outdata.departure
  const arrival = outdata.arrival
  const departtime = outdata.schedule.depart
  const arrivetime = outdata.schedule.arrive
	const seats = outdata.seats
  return { trainNum, date, departure, departtime, arrival, arrivetime, seats };
}

// let rows = [{trainNum: 1, date: {year: 2020, month: 12, day: 12}, departure: "a", arrival: "b", departtime: { hour: 10, minute: 10 }, arrivetime: { hour: 11, minute: 10 } }, {trainNum: 1, date: {year: 2020, month: 12, day: 12}, departure: "a", arrival: "b", departtime: { hour: 10, minute: 10 }, arrivetime: { hour: 11, minute: 10 } }];
let rows = []

export default function Shift(props) {
  const classes = useStyles();
  const { shiftData, departure, dest } = props;
	const [seatOpened, setSeatOpened] = useState(new Array(5).fill(false));
	const [currentIdx, setCurrentIdx] = useState(0);
	const ref0 = useRef(null);
	const ref1 = useRef(null);
	const ref2 = useRef(null);
	const ref3 = useRef(null);

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
	const handlePreviousClick = () => {
		if ( currentIdx === 1 ) ref0.current.scrollIntoView();
		else if ( currentIdx === 2 ) ref1.current.scrollIntoView();
		else if ( currentIdx === 3 ) ref2.current.scrollIntoView();
		setCurrentIdx(currentIdx-1);
	}
	const handleNextClick = () => {
		if ( currentIdx === 0 ) ref1.current.scrollIntoView();
		else if ( currentIdx === 1 ) ref2.current.scrollIntoView();
		else if ( currentIdx === 2 ) ref3.current.scrollIntoView();
		setCurrentIdx(currentIdx+1);
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
					console.log(seats);
					return (
						<>
							<Paper className={classes.paper} onClick={ () => handleSeatOpened(idx) }>
								<Typography variant="subtitle1" className={classes.paperText}>{`${trainNum}`}</Typography>
								<Typography variant="subtitle1" className={classes.paperText}>{`${d_hour}:${d_minute}`}</Typography>
								<ArrowRightAltIcon style={{ fontSize: '22px', margin: '10px 0 10px 0' }}/>
								<Typography variant="subtitle1" className={classes.paperText}>{`${a_hour}:${a_minute}`}</Typography>
							</Paper>
							<Collapse in={seatOpened[idx]} timeout="auto" unmountOnExit>
								<div className={classes.bigContainer}>
									<IconButton aria-label="previos" disabled={currentIdx === 0} onClick={handlePreviousClick}>
										<KeyboardArrowLeftIcon />
									</IconButton>
									<Paper className={classes.seatPaper}>
										<div className={classes.carContainer}>
											<div className={classes.car} ref={ref0}>
												{ seats.slice(0, 40).map((val, idx) => {
													const class_name = val ? classes.seat : classes.seatDisable;
													return (
														<div
															className={class_name}
														></div>
													)
												}) }
											</div>
											<div className={classes.car} ref={ref1}>
												{ seats.slice(40, 80).map((val, idx) => {
													const class_name = val ? classes.seat : classes.seatDisable;
													return (
														<div
															className={class_name}
														></div>
													)
												}) }
											</div>
											<div className={classes.car} ref={ref2}>
												{ seats.slice(40, 80).map((val, idx) => {
													const class_name = val ? classes.seat : classes.seatDisable;
													return (
														<div
														className={class_name}
													></div>
													)
												}) }
											</div>
											<div className={classes.car} ref={ref3}>
												{ seats.slice(40, 80).map((val, idx) => {
													const class_name = val ? classes.seat : classes.seatDisable;
													return (
														<div
															className={class_name}
														></div>
													)
												}) }
											</div>
										</div>
									</Paper>
									<IconButton aria-label="next" disabled={currentIdx === 3} onClick={handleNextClick}>
										<KeyboardArrowRightIcon />
									</IconButton>
								</div>
							</Collapse>
						</>
					);
				}) }
			</div>
		</Container>
  );
}
