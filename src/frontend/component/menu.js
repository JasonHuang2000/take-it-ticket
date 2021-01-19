import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ScheduleIcon from '@material-ui/icons/Schedule';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import AssignmentIcon from '@material-ui/icons/Assignment';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		color: 'rgb(80,80,80)',
	},
	title: {
		marginBottom: '10px',
	},
	icon: {
		margin: theme.spacing(1,1),
	},
	text: {
		margin: theme.spacing(1,7,1,0),
	},
	footer: {
		position: 'fixed',
		left: '0',
		bottom: '0',
		width: '250px',
		height: '70px',
		margin: '0px 25px 25px 25px',
	},
	button: {
		height: '100%',
	}
}));

export default function Menu(props) {

	const classes = useStyles();
	const { signIn, onLogInClick, onLogOutClick } = props;

	return (
		<div className={classes.root}>
			<List>
				<ListItem 
					key='Title'
					className={classes.title}
				>
					<ListItemText 
						primary='Options' 
						primaryTypographyProps={{
							variant: 'h5',
						}}
				/>
				</ListItem>
				<Divider />
				<ListItem 
					button 
					key='Booking Records'
				>
					<ListItemIcon className={classes.icon}>
						<AssignmentIcon />
					</ListItemIcon>
					<ListItemText primary='Booking Records' className={classes.text} />
				</ListItem>
				<ListItem 
					button 
					key='Book Tickets'
				>
					<ListItemIcon className={classes.icon}>
						<DoneOutlineIcon />
					</ListItemIcon>
					<ListItemText primary='Book Tickets' className={classes.text} />
				</ListItem>
				<ListItem 
					button 
					key='Shifts Schedule'
				>
					<ListItemIcon className={classes.icon}>
						<ScheduleIcon />
					</ListItemIcon>
					<ListItemText primary='Shifts Schedule' className={classes.text} />
				</ListItem>
				<Divider />
				{ signIn ? (
					<ListItem 
						key='Log In'
						className={classes.footer}
					>
						<Button
							type="submit"
							variant="contained"
							fullWidth
							color="primary"
							className={classes.button}
							startIcon={<LockOutlinedIcon />}
							onClick={onLogOutClick}
						>
								Log Out
						</Button>
					</ListItem>
				) : (
					<ListItem 
						key='Log Out'
						className={classes.footer}
					>
						<Button
							type="submit"
							variant="contained"
							fullWidth
							color="primary"
							className={classes.button}
							startIcon={<LockOpenOutlinedIcon />}
							onClick={onLogInClick}
						>
							Log In
						</Button>
					</ListItem>
				)}
      </List>
    </div>
  );
}
