import { useState, useEffect } from 'react';
import _ from 'lodash-es';
import dayjs from 'dayjs';
import styles from './Calendar.module.css';
import { DateButton, DeleteButton } from './buttons';
import { classNames } from '/src/functions/helpers';

function createMonth(monthIndex) {
	const month = dayjs().month(monthIndex).hour(0).minute(0).second(0);
	// Monday of first week in month
	const first = month.date(1).day(1);
	// Sunday of last week in month
	const last = month.date(month.daysInMonth()).day(7);
	const diff = last.diff(first, 'day') || 30;

	return _.times(diff, i => {
		const date = !i ? first : first.add(i, 'day');
		return { date, value: date.format('YYYY-MM-DD') };
	});
}

function Calendar({ id, title, month, completed, onClick, onDelete }) {
	const [monthIndex] = useState(
		typeof month !== 'number' || Number.isNaN(month)
			? dayjs().month()
			: month
	);
	const [dates] = useState(createMonth(monthIndex));

	function handleDateClick(e) {
		const { value } = e.target;
		const date = dates.find(date => date.value === value);
		if (!date) return;
		onClick && onClick({ id, value });
	}

	function createTitleSection() {
		return (
			<div className={classNames(styles['title-container'])}>
				<h4 className={styles.month}>
					{dayjs().month(monthIndex).format('MMMM')}
				</h4>
				<h5 className={styles.title}>{title}</h5>
			</div>
		);
	}

	function createWeekdaySection() {
		return (
			<div className={classNames(styles.grid, styles.weekdays)}>
				{['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
					<h5 key={`weekday_header_${i}`}>{day}</h5>
				))}
			</div>
		);
	}

	function createMonthSection() {
		return (
			<div className={classNames(styles.grid, styles.dates)}>
				{dates.map(({ date, value }) => {
					return (
						<DateButton
							key={value}
							date={date}
							value={value}
							completed={completed.includes(value)}
							onClick={handleDateClick}
						/>
					);
				})}
			</div>
		);
	}

	return (
		<div className={styles.calendar}>
			{createTitleSection()}
			{createWeekdaySection()}
			{createMonthSection()}
			<DeleteButton
				className={styles.delete}
				onClick={() => onDelete && onDelete({ id })}
			/>
		</div>
	);
}

export default Calendar;
