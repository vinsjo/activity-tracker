import { useState, useEffect, useCallback } from 'react';

function useLocalStorage(key) {
	const [data, setData] = useState([]);

	const setStorage = useCallback(
		value => {
			try {
				const json = JSON.stringify(value);
				localStorage.setItem(key, json);
				setData(value);
			} catch (e) {
				console.error(e);
			}
		},
		[key, data, setData]
	);

	useEffect(() => {
		try {
			const data = JSON.parse(localStorage.getItem(key));
			setStorage(data);
		} catch (e) {
			console.error(e);
		}
	}, [key]);

	return [data, setStorage];
}

export default useLocalStorage;
