import Option from '../component/option';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100%',
		display: 'flex',
    flexWrap: 'wrap',
		backgroundColor: 'rgb(224,224,224)',
		justifyContent: 'center',
	},
	optionContainer: {
		margin: theme.spacing(0,3,0,3),
		width: theme.spacing(48),
		height: theme.spacing(72),
		position: 'relative',
		top: '50%',
		transform: 'translateY(-50%)',
		borderRadius: '10px',
		'&:hover': {
			boxShadow: '10px 10px 5px grey',
		},
	}
}));

export default function Options() {

	const classes = useStyles();
	const optionInfos = [{
		idx: 0,
		title: 'SHIFTS SCHEDULE',
		content: 'Shift Information. Including time, seat and more.'
	}, {
		idx: 1,
		title: 'BOOK TICKETS',
		content: 'Click here to book ticket!',
	}, {
		idx: 2,
		title: 'BOOKING RECORDS',
		content: 'Check your booking history.'
	}];

	return (
		<Container maxWidth="xl" className={classes.root}>
			{ optionInfos.map( (info) => {
					return (
						<Paper elevation={3} className={classes.optionContainer}>
							<Option optionInfo={info}/>
						</Paper>
					);
				}) 
			}
		</Container>
	);
}
