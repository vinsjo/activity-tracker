import { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Button from './Button';
import styles from './CalendarDate.module.css';

function CalendarDate({ date, value, completed, onClick }) {
	const [className, setClassName] = useState([styles.date]);

	useEffect(() => {
		const classNames = [styles.date];
		if (dayjs().format('YYYYMMDD') === dayjs(date).format('YYYYMMDD')) {
			classNames.push(styles.current);
		}
		if (completed) {
			classNames.push(styles.completed);
		}
		setClassName(classNames.join(' '));
	}, [date, completed]);

	return (
		<Button
			text={dayjs(date).date()}
			value={value}
			className={className}
			onClick={onClick}
			disabled={dayjs().month() !== dayjs(date).month()}
		/>
	);
}

export default CalendarDate;
