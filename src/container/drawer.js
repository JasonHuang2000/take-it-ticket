import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import Menu from '../component/menu';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(1,1,1,1),
		position: 'absolute',
		width: '100%',
		zIndex: '1000',
	},
	button: {
		marginLeft: theme.spacing(1),
		width: '50px',
		fontSize: '18px',
	},
	homeButton: {
		marginLeft: '10px',
		fontSize: '18px',
	}
}));

export default function MyDrawer(props) {
	
	const classes = useStyles();
	const { opened, handleToggleMenu, signIn, onLogInClick, onLogOutClick, username, onDeleteClick, onBookOptionClick, onHomeClick, enterOption, onRecordClick } = props;

	return (
		<div className={classes.root}>
			<IconButton onClick={() => handleToggleMenu(true)} className={classes.button}>
				<MenuIcon />
			</IconButton>
			{ enterOption ? (
				<Button
					className={classes.homeButton}
					onClick={onHomeClick}
				>
					Take-it Ticket
				</Button>
			) : ( <></> )}
			<Drawer open={opened} onClose={() => handleToggleMenu(false)} className={classes.drawer}>
				<Menu 
					signIn={signIn}
					username={username}
					onLogInClick={onLogInClick}
					onLogOutClick={onLogOutClick}
					onDeleteClick={onDeleteClick}
					onBookOptionClick={onBookOptionClick}
					onRecordClick={onRecordClick}
				/>
			</Drawer>
    </div>
	);
}
