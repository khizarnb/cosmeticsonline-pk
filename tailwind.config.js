/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: '#000000',
          pure: '#000000',
          surface: '#111111',
          muted: '#262626',
        },
        ivory: {
          DEFAULT: '#F9F7F4',
          light: '#FFFFFF',
          base: '#F9F7F4',
          dark: '#EFEAE2',
        },
        nude: {
          DEFAULT: '#E8D6C9',
          light: '#F5ECE6',
          base: '#E8D6C9',
          dark: '#D5BCAB',
        },
        roseTaupe: {
          DEFAULT: '#C8A5A1',
          light: '#DEC5C2',
          base: '#C8A5A1',
          dark: '#B08B87',
        },
        mauve: {
          DEFAULT: '#7A4E5A',
          light: '#9E6E7C',
          base: '#7A4E5A',
          dark: '#5C3642',
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
      },
      letterSpacing: {
        widest: '.18em',
        luxury: '.25em',
        ultra: '.35em',
      },
      boxShadow: {
        'luxury': '0 10px 30px -10px rgba(0, 0, 0, 0.05)',
        'luxury-hover': '0 20px 35px -10px rgba(122, 78, 90, 0.12)',
        'drawer': '-10px 0 30px rgba(0, 0, 0, 0.15)',
      }
    },
  },
  plugins: [],
}
