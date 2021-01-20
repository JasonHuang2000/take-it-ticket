import StartUp from './startUp.js';
import Options from './options.js';
import MyDrawer from './drawer';
import Booking from './booking';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import moment from 'moment';
import Modal from '@material-ui/core/Modal';
import SignIn from '../component/signIn';
import SignUp from '../component/signUp';

import MD5 from 'crypto-js/md5'

import { useQuery, useMutation } from '@apollo/react-hooks'
import { ALLUSER_QUERY, USER_QUERY, FINDSEAT_QUERY, ALLSHIFT_QUERY, SHIFT_QUERY } from '../graphql/query.js';
import { CREATE_SHIFT_MUTATION, CREATE_USER_MUTATION, DELETE_SHIFT_MUTATION, DELETE_USER_MUTATION, UPDATE_SEAT_MUTATION } from '../graphql/mutation.js'

const theme = createMuiTheme({
  typography: {
    fontFamily: [
			'Roboto',
			'Arial',
			'American Typewriter',
			'Arial Black',
    ].join(','),
  },
});

export default function App() {

	// Name, User ID, Password
	const [name, setName] = useState('');
	const [ID, setID] = useState('');
	const [password, setPassword] = useState('');
	const [signIn, setSignIn] = useState(false);
	const [IDtaken, setIDtaken] = useState(false)
	const [nameEmp, setnameEmp] = useState(false)
	const [pwdEmp, setpwdEmp] = useState(false)
	const [idEmp, setIdEmp] = useState(false)
	const [wrongPwd, setWrongPwd] = useState(false)
	const [wrongID, setWrongID] = useState(false)

	// grqphql
	const { loading, error, data, refetch } = useQuery(USER_QUERY, {variables: {id: ID}})
	const [createUser] = useMutation(CREATE_USER_MUTATION);
	const [deleteUser] = useMutation(DELETE_USER_MUTATION);

	useEffect(() => {
		if (data !== undefined) {
			if (data.user === null) {
				setIDtaken(false);
			} else {
				setIDtaken(true);
			}
		}
		if (name !== "") {
			setnameEmp(false)
		}
		if (password !== "") {
			setpwdEmp(false)
		}
		if (ID !== "") {
			setIdEmp(false)
		}
	})

	// handling function
	const handleNameChange = (e) => {
		setName(e.target.value);
	}
	const handleIDChange = (e) => {
		setID(e.target.value);
	}
	const handlePswdChange = (e) => {
		setPassword(e.target.value);
	}
	const handleLogIn = () => {
		handleToggleMenu(false);
		setSignIn(true);
	}
	const handleLogOut = () => {
		handleToggleMenu(false);
		setSignIn(false);
		setName('');
		setID('');
		setPassword('');
		setEnterOption(false);
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
		const savedPwd = MD5(password).toString();
		if (data.user === null) {
			setWrongID(true)
			setSignInOpen(true);
		} else if (data.user.password !== savedPwd) {
			setWrongID(false)
			setWrongPwd(true)
			setSignInOpen(true);
		} else if (data.user.userid === ID && savedPwd === data.user.password) {
			setSignIn(true)
			setSignInOpen(false);
			setSignUpOpen(false);
			setEnterOption(true);
			setName(data.user.name);
		}
	}
	const handleSignUp = () => {
		if (name === "") {
			setnameEmp(true)
		}
		if (password === "") {
			setpwdEmp(true)
		}
		if (ID === "") {
			setIdEmp(true)
		}
		if (!IDtaken && !idEmp && !nameEmp && !pwdEmp) {
			const savedPwd = MD5(password).toString();

			createUser({
				variables: {
					name: name,
					userid: ID,
					password: savedPwd,
				}
			})

			// setName("")
			// setID("")
			// setPassword("")
			
			// get in option
			setSignIn(true);
			setSignInOpen(false);
			setSignUpOpen(false);
			setEnterOption(true);
		}
	}
	const handleDelete = () => {
		deleteUser({
			variables: {
				id: ID,
			}
		});
		setEnterOption(false);
		setMenuOpen(false);
		data.user = null;
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
	const [dest, setDest] = useState('');
	const handleDepartureChange = (e) => {
		setDeparture(e.target.value);
	}
	const handleDestChange = (e) => {
		setDest(e.target.value);
	}

	// menu drawer
	const [menuOpen, setMenuOpen] = useState(false);
	const handleToggleMenu = (opened) => {
		setMenuOpen(opened);
	}

	// booking-tickets options
	const [reserved, setReserved] = useState(false);
	const handleBookOptionClick = (r) => {
		setMenuOpen(false);
		setEnterOption(true);
		setEnterBooking(true);
		setReserved(r);
	}

	console.log(signInOpen)
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
					wrongID={wrongID}
					wrongPwd={wrongPwd}
					idEmp={idEmp}
				/>
			</Modal>
			<Modal
				open={signUpOpen}
				onClose={handleSignUpClose}
			>
				<SignUp
					onBackClick={handleSignInClick}
					onSignUpClick={handleSignUp}
					onNameChange={handleNameChange}
					onIDChange={handleIDChange}
					onPswdChange={handlePswdChange}
					IDtaken={IDtaken}
					nameEmp={nameEmp}
					pwdEmp={pwdEmp}
				/>
			</Modal>
			<MyDrawer
				opened={menuOpen}
				signIn={signIn}
				username={name}
				handleToggleMenu={handleToggleMenu}
				onLogInClick={handleSignInClick}
				onLogOutClick={handleLogOut}
				onDeleteClick={handleDelete}
				onBookOptionClick={handleBookOptionClick}
			/>
			{ !enterOption ? (
				<>
					<StartUp 
						onSignInClick={handleSignInClick}
					/>
				</>
			) : ( !enterBooking ? (
				<Options 
					onBookOptionClick={handleBookOptionClick}
				/>
			) : (
				<Booking 
					_date={date}
					_time={time}
					_departure={departure}
					_dest={dest}
					onDateChange={handleDateChange}
					onTimeChange={handleTimeChange}
					onDepartureChange={handleDepartureChange}
					onDestChange={handleDestChange}
					reserved={reserved}
				/>
			)) }
		</ThemeProvider>
	);
}
