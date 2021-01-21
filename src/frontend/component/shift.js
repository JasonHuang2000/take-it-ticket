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
		overflowX: 'hidden',
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
	seatChosen: {
		height: '25px',
		width: '25px',
		margin: '3px 6px 3px 6px',
		backgroundColor: 'rgb(255,102,102)',
		borderRadius: '3px',
		'&:hover': {
			backgroundColor: 'rgb(255,204,204)',
			cursor: 'pointer',
		}
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

let rows = []

export default function Shift(props) {
  const classes = useStyles();
  const { shiftData, departure, dest, onSeatChange, seatChosen, enterRecord, setTrainNum } = props;
	const [seatOpened, setSeatOpened] = useState(new Array(5).fill(false));
	const [currentIdx, setCurrentIdx] = useState(0);
	const navRef0 = useRef(null);
	const navRef1 = useRef(null);
	const navRef2 = useRef(null);
	const navRef3 = useRef(null);
	const navRef4 = useRef(null);

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
		setTrainNum(idx)
		const arr = [...seatOpened];
		arr[idx] = !(arr[idx]);
		for ( let i = 0; i < arr.length; i++ ) {
			if ( i !== idx ) {
				arr[i] = false;
			}
		}
		setCurrentIdx(0);
		setSeatOpened(arr);
		onSeatChange(-1, true);
	}
	const handlePreviousClick = (idx) => {
		switch (idx) {
			case 0: 
				navRef0.current.scrollLeft -= 500;
				break;
			case 1: 
				navRef1.current.scrollLeft -= 500;
				break;
			case 2: 
				navRef2.current.scrollLeft -= 500;
				break;
			case 3: 
				navRef3.current.scrollLeft -= 500;
				break;
			case 4: 
				navRef4.current.scrollLeft -= 500;
				break;
			default: break;
		}
		setCurrentIdx(currentIdx-1);
	}
	const handleNextClick = (idx) => {
		switch (idx) {
			case 0: 
				navRef0.current.scrollLeft += 500;
				break;
			case 1: 
				navRef1.current.scrollLeft += 500;
				break;
			case 2: 
				navRef2.current.scrollLeft += 500;
				break;
			case 3: 
				navRef3.current.scrollLeft += 500;
				break;
			case 4: 
				navRef4.current.scrollLeft += 500;
				break;
			default: break;
		}
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
					let navRef;
					switch (idx) {
						case 0: navRef = navRef0; break;
						case 1: navRef = navRef1; break;
						case 2: navRef = navRef2; break;
						case 3: navRef = navRef3; break;
						case 4: navRef = navRef4; break;
						default: break;
					}
					return (
						<>
							<Paper className={classes.paper} onClick={ () => handleSeatOpened(idx) }>
								<Typography variant="subtitle1" className={classes.paperText}>{`${trainNum}`}</Typography>
								<Typography variant="subtitle1" className={classes.paperText}>{`${d_hour}:${d_minute}`}</Typography>
								<ArrowRightAltIcon style={{ fontSize: '22px', margin: '10px 0 10px 0' }}/>
								<Typography variant="subtitle1" className={classes.paperText}>{`${a_hour}:${a_minute}`}</Typography>
							</Paper>
							{ !enterRecord ? (
							<Collapse in={seatOpened[idx]} timeout="auto" unmountOnExit>
								<div className={classes.bigContainer}>
									<IconButton aria-label="previos" disabled={currentIdx === 0} onClick={() => handlePreviousClick(idx)}>
										<KeyboardArrowLeftIcon />
									</IconButton>
									<Paper className={classes.seatPaper} ref={navRef}>
										<div className={classes.carContainer}>
											<div className={classes.car}>
												{ seats.slice(0, 40).map((val, idx) => {
													const class_name = val.available ? ( seatChosen[idx+0] ? classes.seatChosen : classes.seat ) : classes.seatDisable;
													return (
														<div
															className={class_name}
															onClick={() => val.available ? onSeatChange(idx, false) : null}
														></div>
													)
												}) }
											</div>
											<div className={classes.car}>
												{ seats.slice(40, 80).map((val, idx) => {
													const class_name = val.available ? ( seatChosen[idx+40] ? classes.seatChosen : classes.seat ) : classes.seatDisable;
													return (
														<div
															className={class_name}
															onClick={() => val.available ? onSeatChange(idx+40, false) : null}
														></div>
													)
												}) }
											</div>
											<div className={classes.car}>
												{ seats.slice(80, 120).map((val, idx) => {
													const class_name = val.available ? ( seatChosen[idx+80] ? classes.seatChosen : classes.seat ) : classes.seatDisable;
													return (
														<div
															className={class_name}
															onClick={() => val.available ? onSeatChange(idx+80, false) : null}
													></div>
													)
												}) }
											</div>
											<div className={classes.car}>
												{ seats.slice(120, 160).map((val, idx) => {
													const class_name = val.available ? ( seatChosen[idx+120] ? classes.seatChosen : classes.seat ) : classes.seatDisable;
													return (
														<div
															className={class_name}
															onClick={() => val.available ? onSeatChange(idx+120, false) : null}
														></div>
													)
												}) }
											</div>
										</div>
									</Paper>
									<IconButton aria-label="next" disabled={currentIdx === 3} onClick={() => handleNextClick(idx)}>
										<KeyboardArrowRightIcon />
									</IconButton>
								</div>
							</Collapse>
							) : (
								<></>
							)}
						</>
					);
				}) }
			</div>
		</Container>
  );
}
