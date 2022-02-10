import { useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useLocalStorage from './hooks/useLocalStorage';
import Calendar from './components/Calendar';
import InputForm from './components/InputForm';
import './App.css';

function createActivity(title) {
	return {
		id: uuidv4(),
		title: title,
		completed: [],
	};
}

function App() {
	const [activities, setActivities] = useLocalStorage(
		'activity-tracker-stored-activities'
	);

	const handleSubmit = useCallback(
		input => {
			setActivities([...activities, createActivity(input)]);
		},
		[activities, setActivities]
	);

	const handleActivityDateClick = useCallback(
		({ id, value }) => {
			const activity = activities.find(a => a.id === id);
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
		({ id }) => {
			const i = activities.findIndex(a => a.id === id);
			if (i < 0) return;
			activities.splice(i, 1);
			setActivities([...activities]);
		},
		[activities, setActivities]
	);

	return (
		<div className="App">
			<header className="content">
				<InputForm
					placeholder="Add an activity"
					onSubmit={handleSubmit}
				/>
			</header>
			<main className="content">
				{activities.map(({ id, title, completed }) => {
					console.log(id);
					return (
						<Calendar
							key={id}
							id={id}
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
