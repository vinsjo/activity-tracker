import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import useLocalStorage from './hooks/useLocalStorage';
import Activity from './components/Activity';
import InputForm from './components/InputForm';
import './App.css';

function createActivity(title) {
	return {
		id: uuidv4(),
		title: title,
		month: dayjs().month(),
		completed: [],
	};
}

function App() {
	const [activities, setActivities] = useLocalStorage(
		'activity-tracker-stored-activities'
	);

	function handleSubmit(input) {
		setActivities([...activities, createActivity(input)]);
	}

	function handleDateClick(value, activity) {
		const { completed } = activity;
		const i = completed.indexOf(value);
		i < 0 ? completed.push(value) : completed.splice(i, 1);
		setActivities([...activities]);
	}

	function handleDeleteClick(activity) {
		const i = activities.indexOf(activity);
		if (i < 0) return;
		activities.splice(i, 1);
		setActivities([...activities]);
	}

	return (
		<div className="App">
			<header className="content">
				<InputForm
					placeholder="Add an activity"
					onSubmit={handleSubmit}
				/>
			</header>
			<main className="content">
				{activities.map(activity => {
					return (
						<Activity
							key={activity.id}
							activity={activity}
							onClick={value => handleDateClick(value, activity)}
							onDelete={() => handleDeleteClick(activity)}
						/>
					);
				})}
			</main>
		</div>
	);
}

export default App;
