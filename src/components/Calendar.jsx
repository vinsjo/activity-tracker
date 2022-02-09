import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import dayjs, { Dayjs } from 'dayjs';
import Button from './Button';
import styles from './Calendar.module.css';

function createCalendarItems() {
	const now = dayjs();
	const last = now.date(now.daysInMonth()).day(7);
	let current = now.date(1).day(1);

	const dates = [];

	while (current.valueOf() <= last.valueOf()) {
		dates.push({
			key: uuidv4(),
			date: current,
			completed: false,
			get current() {
				return this.date.format('YYMMDD') === dayjs().format('YYMMDD');
			},
			get currentMonth() {
				return this.date.month() === dayjs().month();
			},
		});
		current = current.add(1, 'day');
	}
	return dates;
}

function Calendar() {
	const [items, setItems] = useState(createCalendarItems());
	const [weekdays] = useState(
		['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(day => ({
			key: uuidv4(),
			value: day,
		}))
	);
	const handleClick = e => {
		const { value } = e.target;
		const item = items.find(({ key }) => key === value);
		if (!item) return;
		item.completed = !item.completed;
		setItems([...items]);
	};

	return (
		<div className={styles.calendar}>
			<div className={styles.grid}>
				{weekdays.map(({ key, value }) => (
					<h4 key={key} className={styles.weekday}>
						{value}
					</h4>
				))}
			</div>
			<div className={styles.grid}>
				{items.map(
					({ key, date, completed, current, currentMonth }) => {
						const classNames = [styles.date];
						if (current) classNames.push(styles.current);
						if (completed) classNames.push(styles.completed);
						return (
							<Button
								className={classNames.join(' ')}
								text={date.date()}
								value={key}
								disabled={!currentMonth}
								onClick={handleClick}
							/>
						);
					}
				)}
			</div>
		</div>
	);
}

export default Calendar;
