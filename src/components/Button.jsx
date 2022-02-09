function Button({ text, style, className, value, disabled, onClick }) {
	return (
		<button
			className={className}
			value={value || text}
			style={style}
			onClick={e => onClick && onClick(e)}
			disabled={!!disabled}
		>
			{text}
		</button>
	);
}

export default Button;
