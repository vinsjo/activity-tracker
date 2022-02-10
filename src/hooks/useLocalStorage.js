import { useState, useEffect, useCallback } from 'react';

/**
 * @param {String} storageKey  key to an item in localStorage
 */
function useLocalStorage(storageKey) {
	const [storedData, setStoredData] = useState([]);

	const updateData = useCallback(
		data => {
			try {
				const json = JSON.stringify(data);
				localStorage.setItem(storageKey, json);
				setStoredData(data);
			} catch (e) {
				console.error(e);
			}
		},
		[storageKey, storedData, setStoredData]
	);

	useEffect(() => {
		try {
			const data = JSON.parse(localStorage.getItem(storageKey));
			updateData(data || []);
		} catch (e) {
			console.error(e);
		}
	}, [storageKey]);

	return [storedData, updateData];
}

export default useLocalStorage;
