/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: ["./src/**/*.{html,js}"],
	theme: {
		extend: {
			colors: {
				'warning': '#ffc107',
				'dark': '#212529',
				'dark-trans': 'rgba(0, 0, 0, 0.3)',
				'light': '#f8f9fa',
				'light-trans': 'rgba(0, 0, 0, 0.047)',
				'info': 'rgb(13,202,240)',
				'info-trans': 'rgba(13 202 240)',
				'danger': '#dc3545',
				'sec': '#6c757d',
			}
		},
	},
	plugins: [],

	// MY EDITS
}
