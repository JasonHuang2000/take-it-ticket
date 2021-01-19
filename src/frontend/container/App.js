import StartUp from './startUp.js';
import Options from './options.js';
import MyDrawer from './drawer';
import Booking from './booking';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { useState } from 'react';
import moment from 'moment';
import Modal from '@material-ui/core/Modal';
import SignIn from '../component/signIn';
import SignUp from '../component/signUp';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
			'Arial Black',
			'Roboto',
    ].join(','),
  },
});

export default function App() {

	// Name, User ID, Password
	const [name, setName] = useState('');
	const [ID, setID] = useState('');
	const [password, setPassword] = useState('');
	const [signIn, setSignIn] = useState(false);
	// handling function
	const handleNameChange = (e) => {
		setName(e.target.value);
	}
	const handleIDChange = (e) => {
		setID(e.target.value);
		const res = User.find({userid: ID}, (err) => {
			if (err) throw err
		})

		if (res === null) {
			setIDtaken(false);
		} else {
			setIDtaken(true);
		}
	}
	const handlePswdChange = (e) => {
		setPassword(e.target.value);
	}
	const handleLogIn = () => {
		console.log('in');
		handleToggleMenu(false);
		setSignIn(true);
	}
	const handleLogOut = () => {
		console.log('out');
		handleToggleMenu(false);
		setSignIn(false);
		setName('');
		setID('');
		setPassword('');
	}

	// SignIn/SignUp page
	const [signInOpen, setSignInOpen] = useState(false);
	const [signUpOpen, setSignUpOpen] = useState(false);
	// handling function
	const handleSignInClick = () => {
		handleToggleMenu(false);
		setSignInOpen(true);
		setSignUpOpen(false);
	}
	const handleSignInClose = () => {
		setSignInOpen(false);
	}
	const handleSignUpClick = () => {
		setSignUpOpen(true);
		setSignInOpen(false);
	}
	const handleSignUpClose = () => {
		setSignUpOpen(false);
	}

	// entered pages
	const [enterOption, setEnterOption] = useState(false);
	const [enterBooking, setEnterBooking] = useState(false);
	// handling function
	const handleEnterOption = () => {
		setSignInOpen(false);
		setSignUpOpen(false);
		setEnterOption(true);
	}

	// Date and Time (pre-set to current time)
	const [date, setDate] = useState(moment().format().slice(0,10));
	const [time, setTime] = useState(moment().format().slice(11,16));
	// handling function
	const handleDateChange = (e) => {
		setDate(e.target.value);
	}
	const handleTimeChange = (e) => {
		setTime(e.target.value);
	}

	// departure station
	const [departure, setDeparture] = useState('');
	// handling function
	const handleDepartureChange = (e) => {
		setDeparture(e.target.value);
	}

	// menu drawer
	const [menuOpen, setMenuOpen] = useState(false);
	// handling function
	const handleToggleMenu = (opened) => {
		setMenuOpen(opened);
	}

	return (
		<ThemeProvider theme={theme}>
			<Modal
				open={signInOpen}
				onClose={handleSignInClose}
			>
				<SignIn
					onSignUpClick={handleSignUpClick}
					onIDChange={handleIDChange}
					onPswdChange={handlePswdChange}
					onEnterOption={handleEnterOption}
					IDtaken={IDtaken}
				/>
			</Modal>
			<Modal
				open={signUpOpen}
				onClose={handleSignUpClose}
			>
				<SignUp
					onBackClick={handleSignInClick}
					onNameChange={handleNameChange}
					onIDChange={handleIDChange}
					onPswdChange={handlePswdChange}
				/>
			</Modal>
			{ !enterOption ? (
				<>
					<MyDrawer
						opened={menuOpen}
						signIn={signIn}
						handleToggleMenu={handleToggleMenu}
						onLogInClick={handleSignInClick}
						onLogOutClick={handleLogOut}
					/>
					<StartUp 
						onSignInClick={handleSignInClick}
					/>
				</>
			) : ( !enterBooking ? (
				<Options />
			) : (
				<Booking 
					_date={date}
					_time={time}
					_departure={departure}
					onDateChange={handleDateChange}
					onTimeChange={handleTimeChange}
					onDepartureChange={handleDepartureChange}
				/>
			)) }
		</ThemeProvider>
	);
}
