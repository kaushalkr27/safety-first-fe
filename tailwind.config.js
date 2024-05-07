/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './App.js',
        './components/**/*.js',
        './screens/**/*.js',
    ],
    theme: {
        extend: {
            colors: {
                purple: '#7C54D5',
                gray: '#9ca3af',
            }
        },
    },
    plugins: [],
};
