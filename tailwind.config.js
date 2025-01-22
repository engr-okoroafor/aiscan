module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        neonGreen: '#00FF00',
        neonBrown: '#8B4513',
      },
      gradientColorStops: {
        multicolor1: ['#ff7e5f', '#feb47b'],
        multicolor2: ['#6a11cb', '#2575fc'],
      },
      boxShadow: {
        neon: '0 0 10px 3px #00FF00, 0 0 20px 5px #00FF00',
      },
    },
  },
  plugins: [],
};
