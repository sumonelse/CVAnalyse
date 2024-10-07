/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            boxShadow: {
                primary: "var(--primary-shadow)",
                secondary: "var(--secondary-shadow)",
            },
        },
    },
    plugins: [],
}
