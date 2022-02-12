import _ from 'lodash-es';

import { DeleteButton } from '../buttons';
import Title from './Title';
import Calendar from './Calendar';
import styles from './Activity.module.css';

function Tracker({ activity, onClick, onDelete }) {
	const { title, month, completed } = activity;
	return (
		<div className={styles.activity}>
			<Title className={styles.title} title={title} month={month} />
			<Calendar
				className={styles.calendar}
				month={month}
				completed={completed}
				onClick={onClick}
			/>
			<DeleteButton className={styles.delete} onClick={onDelete} />
		</div>
	);
}

export default Tracker;
