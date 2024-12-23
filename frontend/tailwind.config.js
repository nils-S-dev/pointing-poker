/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "src/**/*.{js,ts,jsx,tsx,}"],
  theme: {
    fontFamily: {
      'roboto': ['Roboto', 'system-ui', 'sans-serif']
    },
    extend: {
      colors: {
        transparent: 'transparent',
        'steel': {
          DEFAULT: '#111921',
          50: '#A3BBD0',
          100: '#8CA9C4',
          200: '#5D86AB',
          300: '#42617F',
          400: '#293D50',
          500: '#111921',
          600: '#0F161E',
          700: '#0E141A',
          800: '#0C1117',
          900: '#0A0F14',
          950: '#090D12'
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

