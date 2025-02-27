/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        sans:['inter','sans-serif']
      },
      colors:{
        iconblue:'#3B9AB8',
        stroke:'#E5E5E5'
      },
      gridTemplateColumns:{
        mainColsxl:"200px repeat(6,180px)",
        mainCols2xl:"200px repeat(6,180px)",
        userContent:"709px 1fr",
      },
    },
  },
  plugins: [],
}

