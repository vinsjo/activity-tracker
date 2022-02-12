import { useState } from 'react';
import _ from 'lodash-es';
import dayjs from 'dayjs';
import { classNames } from '/src/functions';
import { isNum } from 'x-is-type';
import Days from './Days';
import Dates from './Dates';
import styles from './Calendar.module.css';

function Calendar({ className, month, completed, onClick }) {
	const [monthIndex] = useState(!isNum(month) ? dayjs().month() : month);
	const [dates] = useState(() => {
		const month = dayjs().month(monthIndex).hour(0).minute(0).second(0);
		// Monday of first week in month
		const first = month.date(1).day(1);
		// Sunday of last week in month
		const last = month.date(month.daysInMonth()).day(7);
		const diff = last.diff(first, 'day');

		return _.times(diff + 1, i => {
			const date = !i ? first : first.add(i, 'day');
			return { date, value: date.format('YYYY-MM-DD') };
		});
	});

	return (
		<div className={classNames(styles.container, className)}>
			<Days className={styles.grid} />
			<Dates
				className={styles.grid}
				dates={dates}
				onClick={onClick}
				completed={completed}
			/>
		</div>
	);
}

export default Calendar;
