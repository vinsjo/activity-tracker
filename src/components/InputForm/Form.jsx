import { useState } from 'react';
import { Button } from '../buttons';
import TextInput from './TextInput';
import styles from './Form.module.css';

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
			<TextInput
				value={input}
				placeholder={placeholder}
				onChange={handleChange}
			/>
			<Button className={styles.button} type="submit" text="Add" />
		</form>
	);
}

export default InputForm;
