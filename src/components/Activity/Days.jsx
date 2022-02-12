import { classNames } from '/src/functions';
import styles from './Days.module.css';
import dayjs from 'dayjs';

function ActivityDays({ className }) {
	const now = dayjs();
	return (
		<ul className={classNames(styles.weekdays, className)}>
			{['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
				<li
					className={classNames(
						styles.day,
						now.isSame(dayjs().day(i + 1), 'day')
							? styles.current
							: null
					)}
					key={`weekdays_${i}`}
				>
					{day}
				</li>
			))}
		</ul>
	);
}

export default ActivityDays;
