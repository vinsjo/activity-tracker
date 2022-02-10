import { classNames } from '/src/functions/helpers';
import styles from './Button.module.css';

function Button({
	children,
	text,
	className,
	value,
	disabled,
	onClick,
	type = 'button',
}) {
	return (
		<button
			className={classNames(styles.button, className || styles.default)}
			value={value || text}
			onClick={e => onClick && onClick(e)}
			disabled={disabled}
			type={type}
		>
			{children || text}
		</button>
	);
}

export default Button;
