/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx'
  ],
  //Alterar tema padrão
  theme: {
    extend: {
      fontFamily:{
        sans: 'Roboto, sans-serif'
      },
      
      backgroundImage: {
        app: 'url(/app-bg.png)'
      },

      colors:{
        gray:{
          100: '#E1E1E6',
          300: '#8D8D99',
          600: '#323238',
          800: '#202024',
          900: '#121214',
        },
        yellow:{
          500: '#F7DD43',
          700: '#E5CD3D'
        },
        ignite:{
          500: '#129E57'
        }
      }
    },
  },
  plugins: [],
}

//Estiliza todo o content