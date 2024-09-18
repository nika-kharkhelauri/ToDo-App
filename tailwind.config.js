/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: "Roboto",
      },
      boxShadow: {
        inputShadow: "0px 1px 8px 0px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
};
