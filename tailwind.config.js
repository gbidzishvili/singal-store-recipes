module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      margin: {
        "center-auto": "0 auto",
        active:
          " text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500",
      },
    },
  },
  plugins: [],
};
