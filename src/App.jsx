import { useState } from 'react';
import Calendar from './components/Calendar';
import './App.css';

function App() {
	// const [activities, setActivities] = useState([]);
	return (
		<div className="App">
			<h1>Activity Tracker</h1>
			<Calendar />
		</div>
	);
}

export default App;
