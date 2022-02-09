import { useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Calendar from './components/Calendar';
import InputForm from './components/InputForm';
import './App.css';

const LOCAL_STORAGE_KEY = 'activity-tracker-activities-storage';

function createActivity(title) {
	return {
		uid: uuidv4(),
		title: title,
		completed: [],
	};
}

function getStoredActivities() {
	try {
		const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
		if (!stored) {
			localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([]));
			return [];
		}
		return JSON.parse(stored);
	} catch (e) {
		return [];
	}
}

function storeActivities(activities) {
	try {
		const json = JSON.stringify(activities);
		localStorage.setItem(LOCAL_STORAGE_KEY, json);
	} catch (e) {
		console.error(e);
	}
}

console.log(getStoredActivities());

function App() {
	const [activities, setActivities] = useState(getStoredActivities());

	const handleSubmit = useCallback(
		input => {
			setActivities([...activities, createActivity(input)]);
		},
		[activities, setActivities]
	);

	const handleActivityDateClick = useCallback(
		({ uid, value }) => {
			const activity = activities.find(a => a.uid === uid);
			if (!activity) return;
			const { completed } = activity;
			const i = completed.indexOf(value);
			i < 0 ? completed.push(value) : completed.splice(i, 1);
			activity.completed = [...completed];
			setActivities([...activities]);
		},
		[activities, setActivities]
	);

	const handleActivityDelete = useCallback(
		({ uid }) => {
			const i = activities.findIndex(a => a.uid === uid);
			if (i < 0) return;
			activities.splice(i, 1);
			setActivities([...activities]);
		},
		[activities, setActivities]
	);

	useEffect(() => {
		storeActivities(activities);
	}, [activities, setActivities]);

	return (
		<div className="App">
			<header className="content">
				<InputForm
					placeholder="Add an activity"
					onSubmit={handleSubmit}
				/>
			</header>
			<main className="content">
				{activities.map(({ uid, title, completed }) => {
					return (
						<Calendar
							key={uid}
							uid={uid}
							title={title}
							completed={completed}
							onClick={handleActivityDateClick}
							onDelete={handleActivityDelete}
						/>
					);
				})}
			</main>
		</div>
	);
}

export default App;
