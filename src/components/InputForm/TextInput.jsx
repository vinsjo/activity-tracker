import styles from './Form.module.css';

function TextInput({ value, placeholder, onChange }) {
	return (
		<input
			className={styles.input}
			id="input"
			type="text"
			onChange={onChange}
			value={value}
			placeholder={placeholder || ''}
		/>
	);
}

export default TextInput;
