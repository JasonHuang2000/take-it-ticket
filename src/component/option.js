import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ScheduleIcon from '@material-ui/icons/Schedule';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { useState } from 'react';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100%', 
		width: '100%',
		textAlign: 'center',
	},
	title: {
		width: '80%',
		marginTop: theme.spacing(5),
		textAlign: 'center',
		margin: 'auto',
	},
	icon: {
		fontSize: '80px',
		display: 'block',
		margin: 'auto',
		marginTop: theme.spacing(5),
	},
	content: {
		fontSize: '16px',
		width: '80%',
		marginTop: theme.spacing(8),
		margin: 'auto',
		textAlign: 'center',
	},
	button: {
		height: '10%',
		width: '80%',
		position: 'absolute',
		bottom: '60px',
		left: '50%',
		transform: 'translateX(-50%)',
	},
	paper: {
		height: '30%',
		width: '21%',
		margin: 'auto',
		position: 'relative',
		top: '30%',
		backgroundColor: 'rgb(214,214,214)',
	}
}));

export default function Option(props) {
	const classes = useStyles();
	const info = props.optionInfo;
	const [open, setOpen] = useState(false);
	
	return (
		<Container className={classes.root} >
			<Typography variant="h4" className={classes.title}>
				{info.title}
			</Typography>
			{	info.idx === 0 ? ( 
				<ScheduleIcon className={classes.icon}/>
			) : ( info.idx === 1 ? ( 
				<DoneOutlineIcon className={classes.icon}/>
			) : ( 
				<AssignmentIcon className={classes.icon}/>
			))}
			<Typography className={classes.content}>
				{info.content}
			</Typography>
			<Button
				type="submit"
				variant="contained"
				fullWidth
				color="default"
				className={classes.button}
			>
				GO!
			</Button>
		</Container>
	);
}
