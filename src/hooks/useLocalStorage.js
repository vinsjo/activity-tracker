import { useState, useCallback } from 'react';
import PIRI from 'pirify';

function storeData(data, storageKey) {
	try {
		if (!data) throw 'No data received';
		const json = PIRI.encode(data);
		localStorage.setItem(storageKey, json);
		return true;
	} catch (e) {
		console.error(e);
		return false;
	}
}
function getStoredData(storageKey) {
	const data = (() => {
		try {
			const decoded = PIRI.decode(localStorage.getItem(storageKey));
			if (!Array.isArray(decoded)) throw 'Invalid PIRI format';
			return decoded;
		} catch (e) {
			console.error(e);
			return null;
		}
	})();
	if (!data) {
		storeData([]);
		return [];
	}
	return data;
}

/**
 * @param {String} storageKey  key to an item in localStorage
 */
function useLocalStorage(storageKey) {
	const [storedData, setStoredData] = useState(() =>
		getStoredData(storageKey)
	);

	const updateData = useCallback(
		data => {
			if (!storeData(data, storageKey)) return;
			setStoredData(data);
		},
		[storageKey, storedData, setStoredData]
	);

	return [storedData, updateData];
}

export default useLocalStorage;
