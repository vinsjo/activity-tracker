import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import styles from './Calendar.module.css';
import { DateButton, DeleteButton } from './buttons';

function createMonth() {
	const now = dayjs();
	const last = now.date(now.daysInMonth()).day(7);
	let current = now.date(1).day(1);
	const dates = [];
	while (current.valueOf() <= last.valueOf()) {
		dates.push({
			date: current,
			value: current.format('YYYY-MM-DD'),
			completed: false,
		});
		current = current.add(1, 'day');
	}
	return dates;
}

function Calendar({ id, title, completed, onClick, onDelete }) {
	const [dates, setDates] = useState(createMonth());

	useEffect(() => {
		if (!completed || !Array.isArray(completed)) return;
		setDates(
			dates.map(date => {
				date.completed = completed.includes(date.value);
				return { ...date };
			})
		);
	}, [completed]);

	function handleDateClick(e) {
		const { value } = e.target;
		const date = dates.find(date => date.value === value);
		if (!date) return;
		onClick && onClick({ id, value });
	}

	function createWeekdays() {
		return ['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
			<h5 key={`weekday_header_${i}`} className={styles.weekday}>
				{day}
			</h5>
		));
	}

	function createDateGrid() {
		return dates.map(({ date, value, completed }) => (
			<DateButton
				key={value}
				date={date}
				value={value}
				completed={completed}
				onClick={handleDateClick}
			/>
		));
	}

	return (
		<div className={styles.calendar}>
			<h3 className={styles.title}>{title}</h3>
			<DeleteButton
				className={styles.delete}
				onClick={() => onDelete && onDelete({ id })}
			/>
			<div className={styles.grid}>{createWeekdays()}</div>
			<div className={styles.grid}>{createDateGrid()}</div>
		</div>
	);
}

export default Calendar;
