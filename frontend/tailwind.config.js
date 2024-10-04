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
        
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(5px) translateY(-5px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(-5px) translateY(5px)'},
        },
        rotate: {
          '0% ': { transform: 'rotate(0deg)' },

          '100% ': { transform: 'rotate(360deg)' },
          
        },
        rightShake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(50px) ' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(-50px) '},
        },
        go45: {
          '0%': {
            transform: 'translateX(0px) translateY(0px) rotate(0deg)'
          },
          '100%': {
            transform: 'translateX(2500px) translateY(-1300px) rotate(20deg)'
          },
        },
        go_45: {
          '0%': {
            transform: 'translateX(0px) translateY(0px) rotate(180deg)'
          },
          '100%': {
            transform: 'translateX(-1500px) translateY(1700px) rotate(0deg)'
          },
        },
        mirror: {
          '0%': { transform: 'scaleX(1) rotate(-45deg)' },
          '49%': { transform: 'scaleX(1) rotate(-45deg)' },  
          '50%': { transform: 'scaleX(-1) rotate(45deg)' },  
          '51%': { transform: 'scaleX(-1) rotate(45deg)' },  
          '99%': { transform: 'scaleX(-1) rotate(45deg)' },  
          '100%': { transform: 'scaleX(1) rotate(-45deg)' },  
        },
        
      },
      animation: {
        'spin-slow': 'spin 60s linear infinite',
        'spin-medium': 'spin 30s linear infinite',
        'spin-fast': 'spin 10s linear infinite',
        'shake': 'shake 6s ease-in-out infinite',
        'rightShake': 'rightShake 60s ease-in-out infinite',
        'go45': 'go45 5s ease-in-out infinite',
        'go_45': 'go_45 15s ease-in-out infinite',
        'mirror': 'mirror 2s infinite ease-in-out',
        'rotate': 'rotate 4s infinite linear',
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
