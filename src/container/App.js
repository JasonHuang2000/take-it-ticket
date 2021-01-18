import StartUp from './startUp.js';
import Options from './options.js';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { useState } from 'react';

import User from '../../server/models/user'

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

	// entered options menu
	const [enterOption, setEnterOption] = useState(false);
	// handling function
	const handleEnterOption = () => {
		console.log("hi");
		setEnterOption(true);
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
			) : (
				<Options />
			) }
		</ThemeProvider>
	);
}
