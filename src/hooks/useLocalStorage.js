import { useState, useEffect, useCallback } from 'react';
import { json_decode, json_encode } from '/src/functions/helpers';

function useLocalStorage(key) {
	const [data, setData] = useState([]);
	const setStorage = useCallback(
		value => {
			const json = json_encode(value);
			if (!json) return;
			localStorage.setItem(key, json);
			setData(value);
		},
		[key, data, setData]
	);

	useEffect(() => {
		const data = json_decode(localStorage.getItem(key));
		setStorage(data || []);
	}, [key]);

	return [data, setStorage];
}

export default useLocalStorage;
