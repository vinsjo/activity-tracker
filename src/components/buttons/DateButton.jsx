import { classNames } from '/src/functions';
import dayjs from 'dayjs';
import Button from './Button';
import styles from './DateButton.module.css';

function DateButton({ date, value, completed, onClick }) {
	return (
		<Button
			text={date.date()}
			value={value}
			onClick={onClick}
			className={classNames(
				styles.date,
				completed ? styles.completed : null,
				dayjs().format('YYYYMMDD') === dayjs(date).format('YYYYMMDD')
					? styles.current
					: null
			)}
			disabled={dayjs().month() !== dayjs(date).month()}
		/>
	);
}

export default DateButton;
