// eslint-disable-next-line no-undef
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  mode: "jit",
  theme: {
    borderWidht: {
      DEFAULT: "1px",
      "0": "0",
      "1": "0.5px",
      "2": "2px",
      "3": "3px",
    },
    extend: {
      colors: {
        "eggwhite": "#eaede6",
        "white": "#ffffff",
        "black": "#000000",
        "darkGreen": "#315e26",
      },
    },
  },
  plugins: [],
};
