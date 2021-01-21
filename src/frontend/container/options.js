import Option from '../component/option';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { useState } from 'react';

import Background from '../img/3.jpg';

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100%',
		display: 'flex',
    flexWrap: 'wrap',
		backgroundImage: `url(${Background})`,
		justifyContent: 'center',
	},
	optionContainer: {
		margin: theme.spacing(0,3,0,3),
		width: theme.spacing(48),
		height: theme.spacing(72),
		position: 'relative',
		transform: 'translateY(-50%)',
		borderRadius: '10px',
		'&:hover': {
			boxShadow: '10px 10px 5px grey',
		},
	},
	schedule: {
		transition: 'top 1s ease-in-out 0s',
	},
	book: {
		transition: 'top 1s ease-in-out .3s',
	},
	record: {
		transition: 'top 1s ease-in-out .6s',
	},
	before: {
		top: '100%',
	},
	after: {
		top: '50%',
	}
}));

export default function Options(props) {

	const classes = useStyles();
	const optionInfos = [{
		idx: 0,
		title: 'SHIFTS SCHEDULE',
		content: 'Shift Information. Including time, seat and more.',
		Name: classes.schedule,
	}, {
		idx: 1,
		title: 'BOOK TICKETS',
		content: 'Click here to book ticket!',
		Name: classes.book,
	}, {
		idx: 2,
		title: 'BOOKING RECORDS',
		content: 'Check your booking history.',
		Name: classes.record,
	}];

	const [paperClass, setPaperClass] = useState(classes.before);
	const changePaperClass = () => {
		setPaperClass(classes.after);
	}

	return (
		<Container maxWidth="xl" className={classes.root}>
			{ optionInfos.map( (info) => {
					setTimeout(() => changePaperClass(), 10);
					return (
						<Paper elevation={3} className={`${classes.optionContainer} ${info.Name} ${paperClass}`}>
							<Option 
								optionInfo={info}
								onBookOptionClick={props.onBookOptionClick}
							/>
						</Paper>
					);
				}) 
			}
		</Container>
	);
}
