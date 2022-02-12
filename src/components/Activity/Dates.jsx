import { classNames } from '/src/functions';
import { DateButton } from '../buttons';
import styles from './Dates.module.css';

function Dates({ className, dates, onClick, completed }) {
	return (
		<div className={classNames(styles.dates, className)}>
			{dates.map(({ date, value }) => {
				return (
					<DateButton
						key={value}
						date={date}
						value={value}
						className={styles.date}
						completed={completed.includes(value)}
						onClick={() => onClick(value)}
					/>
				);
			})}
		</div>
	);
}

export default Dates;
