import { v4 as uuidv4 } from 'uuid';

function getUniqueKeys(count) {
	if (!count || !typeof count !== 'number') [];
	const keys = [];
	while (keys.length < count) keys.push(uuidv4());
	return keys;
}

export { getUniqueKeys };