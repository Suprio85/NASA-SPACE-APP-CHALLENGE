/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        spin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'spin-slow': 'spin 60s linear infinite',
        'spin-medium': 'spin 30s linear infinite',
        'spin-fast': 'spin 10s linear infinite',
      }
    },
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
    function ({ addUtilities }) {
      addUtilities({
        '.no-scrollbar': {
          '-ms-overflow-style': 'none', /* Internet Explorer 10+ */
          'scrollbar-width': 'none', /* Firefox */
        },
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none', /* Safari and Chrome */
        },
      });
    },
  ],
}
