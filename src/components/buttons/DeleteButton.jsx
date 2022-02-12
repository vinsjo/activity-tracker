import Button from './Button';
import { MdRemoveCircle } from 'react-icons/md';
import styles from './DeleteButton.module.css';
import { classNames } from '/src/functions';

function DeleteButton({ className, value, disabled, onClick }) {
	return (
		<Button
			className={classNames(styles.button, className || null)}
			value={value}
			disabled={disabled}
			onClick={onClick}
		>
			<MdRemoveCircle />
		</Button>
	);
}

export default DeleteButton;
