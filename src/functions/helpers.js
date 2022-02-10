import { v4 as uuidv4 } from 'uuid';

function getUniqueKeys(count) {
	if (!count || !typeof count !== 'number') [];
	const keys = [];
	while (keys.length < count) keys.push(uuidv4());
	return keys;
}

function classNames(...names) {
	if (!Array.isArray(names) || !names.length) return '';
	return names.filter(name => !!name).join(' ');
}

function json_encode(data) {
	try {
		const json = JSON.stringify(data);
		return json;
	} catch (e) {
		console.error(e);
		return null;
	}
}

function json_decode(json) {
	try {
		const data = JSON.parse(json);
		return data;
	} catch (e) {
		console.error(e);
		return null;
	}
}

export { getUniqueKeys, classNames, json_decode, json_encode };
