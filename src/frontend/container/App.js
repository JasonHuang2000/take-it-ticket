import StartUp from './startUp.js';
import Options from './options.js';
import Menu from '../component/menu';
import Booking from './booking';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { useState } from 'react';
import moment from 'moment';

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

	// entered pages
	const [enterOption, setEnterOption] = useState(false);
	const [enterMenu, setEnterMenu] = useState(false);
	const [enterBooking, setEnterBooking] = useState(true);
	// handling function
	const handleEnterOption = () => {
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

	return (
		<ThemeProvider theme={theme}>
			{ !enterOption ? (
				<StartUp 
					onNameChange={handleNameChange}
					onIDChange={handleIDChange}
					onPswdChange={handlePswdChange}
					onEnterOption={handleEnterOption}
				/>
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
