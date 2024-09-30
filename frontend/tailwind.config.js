/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            boxShadow: {
                primary:
                    "0 4px 6px rgba(14, 165, 233, 0.3), 0 2px 4px rgba(14, 165, 233, 0.2), 0 1px 3px rgba(14, 165, 233, 0.1)",
            },
        },
    },
    plugins: [],
}
