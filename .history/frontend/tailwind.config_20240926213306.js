/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily:{
      bebasNue: ['Bebas Neue'],
      suse: ['SUSE'],
      spaceGrotesk: ['Space Grotesk'],
      NanumGothic: ['Nanum Gothic'],
      Saira :['Saira'],
      Titiliuam:['Titillium Web'],
      Roboto:['Roboto'],
      Opensans:['Open Sans'],
    }
  },
  plugins: [
    require('daisyui'),
  ],
}
