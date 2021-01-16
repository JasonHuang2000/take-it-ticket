import StartUp from './startUp.js';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { useState } from 'react';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
			'Arial Black',
			'Roboto',
    ].join(','),
  },
});

export default function App() {
	
	const [name, setName] = useState('');
	const [ID, setID] = useState('');
	const [password, setPassword] = useState('');

	const handleNameChange = (e) => {
		setName(e.target.value);
	}
	const handleIDChange = (e) => {
		setID(e.target.value);
	}
	const handlePswdChange = (e) => {
		setPassword(e.target.value);
	}

	return (
		<ThemeProvider theme={theme}>
			<StartUp 
				onNameChange={handleNameChange}
				onIDChange={handleIDChange}
				onPswdChange={handlePswdChange}
			/>
		</ThemeProvider>
	);
}
