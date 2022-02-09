import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import styles from './Calendar.module.css';
import { DateButton, DeleteButton } from './buttons';

function createDates() {
	const now = dayjs();
	const last = now.date(now.daysInMonth()).day(7);
	let current = now.date(1).day(1);
	const dates = [];
	while (current.valueOf() <= last.valueOf()) {
		dates.push({
			key: uuidv4(),
			date: current,
			value: current.format('YYYY-MM-DD'),
			completed: false,
		});
		current = current.add(1, 'day');
	}
	return dates;
}

function Calendar({ uid, title, completed, onClick, onDelete }) {
	const [dates, setDates] = useState(createDates());

	const handleClick = e => {
		const { value } = e.target;
		const date = dates.find(date => date.value === value);
		if (!date) return;
		onClick && onClick({ uid, value });
	};

	useEffect(() => {
		if (!completed || !Array.isArray(completed)) return;
		setDates(
			dates.map(date => {
				date.completed = completed.includes(date.value);
				return { ...date };
			})
		);
	}, [completed]);

	return (
		<div className={styles.calendar}>
			{title ? <h3 className={styles.title}>{title}</h3> : ''}
			{onDelete ? (
				<DeleteButton
					className={styles.delete}
					onClick={() => onDelete({ uid })}
				/>
			) : (
				''
			)}
			<div className={styles.grid}>
				{['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => {
					return (
						<h5 key={`weekday_${i}`} className={styles.weekday}>
							{day}
						</h5>
					);
				})}
			</div>
			<div className={styles.grid}>
				{dates.map(({ key, date, value, completed }) => {
					return (
						<DateButton
							key={key}
							date={date}
							value={value}
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
