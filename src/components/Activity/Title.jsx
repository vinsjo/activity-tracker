import { useState } from 'react';
import { classNames } from '/src/functions';
import { isNum, isStr } from 'x-is-type';
import dayjs from 'dayjs';
import styles from './Title.module.css';

function Title({ className, month, title }) {
	const [monthName] = useState(() => {
		const i = isNum(month)
			? month
			: isStr(month) && isNum(parseInt(month))
			? parseInt(month)
			: dayjs().month();
		return dayjs().month(i).format('MMMM');
	});
	return (
		<div className={classNames(styles.container, className)}>
			<h4 className={styles.month}>{monthName}</h4>
			<h5>{title}</h5>
		</div>
	);
}

export default Title;
