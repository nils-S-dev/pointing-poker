/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "src/**/*.{js,ts,jsx,tsx,}"],
  theme: {
    fontFamily: {
      'roboto': ['Roboto', 'system-ui', 'sans-serif']
    },
    extend: {
      colors: {
        'steel': {
          DEFAULT: '#111921',
          50: '#4F759A',
          100: '#486B8D',
          200: '#3B5672',
          300: '#2D4257',
          400: '#1F2D3C',
          500: '#111921',
          600: '#000000',
          700: '#000000',
          800: '#000000',
          900: '#000000',
          950: '#000000'
        },
        'sky': {
          DEFAULT: '#1A7CE7',
          50: '#C0DBF8',
          100: '#AED1F6',
          200: '#89BBF3',
          300: '#64A6EF',
          400: '#3F91EB',
          500: '#1A7CE7',
          600: '#1361B6',
          700: '#0E4683',
          800: '#082B50',
          900: '#03101E',
          950: '#000204'
        },
      }
    },
  },
  plugins: [],
}

