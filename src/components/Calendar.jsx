import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import styles from './Calendar.module.css';
import CalendarDate from './CalendarDate';

function createDates() {
	const now = dayjs();
	const last = now.date(now.daysInMonth()).day(7);
	let current = now.date(1).day(1);
	const dates = [];
	while (current.valueOf() <= last.valueOf()) {
		dates.push({
			key: uuidv4(),
			date: current,
			completed: false,
		});
		current = current.add(1, 'day');
	}
	return dates;
}

function Calendar() {
	const [dates, setDates] = useState(createDates());

	const handleClick = e => {
		const { value } = e.target;
		const item = dates.find(({ key }) => key === value);
		if (!item) return;
		item.completed = !item.completed;
		setDates([...dates]);
	};

	return (
		<div className={styles.calendar}>
			<div className={styles.grid}>
				{['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
					<h4 key={`weekday_${i}`} className={styles.weekday}>
						{day}
					</h4>
				))}
			</div>
			<div className={styles.grid}>
				{dates.map(({ key, date, completed }) => {
					return (
						<CalendarDate
							key={key}
							value={key}
							date={date}
							completed={completed}
							onClick={handleClick}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default Calendar;
