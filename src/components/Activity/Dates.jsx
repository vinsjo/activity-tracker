import { classNames } from '/src/functions';
import dayjs from 'dayjs';
import { Button } from '../buttons';
import styles from './Dates.module.css';

function Dates({ className, dates, onClick, completed }) {
	const now = dayjs();
	return (
		<div className={classNames(styles.dates, className)}>
			{dates.map(({ date, value }) => (
				<Button
					key={value}
					text={date.date()}
					value={value}
					onClick={() => onClick(value)}
					className={classNames(
						styles.button,
						completed.includes(value) ? styles.completed : null,
						now.isSame(date, 'day') ? styles.current : null
					)}
					disabled={!now.isSame(date, 'month')}
				/>
			))}
		</div>
	);
}

export default Dates;
