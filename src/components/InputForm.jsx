import { useState } from 'react';
import { Button } from './buttons';
import styles from './InputForm.module.css';

function InputForm({ placeholder, onSubmit }) {
	const [input, setInput] = useState('');

	const handleChange = e => {
		setInput(e.target.value);
	};
	const handleSubmit = e => {
		e.preventDefault();
		const value = input.trim();
		if (!value.length) return;
		onSubmit && onSubmit(value);
		setInput('');
	};

	return (
		<form
			className={styles.form}
			onSubmit={handleSubmit}
			autoComplete="off"
		>
			<input
				className={styles.input}
				id="input"
				type="text"
				onChange={handleChange}
				value={input}
				placeholder={placeholder || ''}
			/>
			<Button className={styles.button} type="submit" text="Submit" />
		</form>
	);
}

export default InputForm;
