function classNames(...names) {
	if (!Array.isArray(names) || !names.length) return '';
	return names.filter(name => !!name).join(' ');
}

export { classNames };
