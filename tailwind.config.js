module.exports = {
  future: 'all',
  purge: ['{app,pages}/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      height: {
        '1/5': '20%',
      },
      minHeight: {
        ...[14].reduce((acc, cur) => {
          acc[cur] = `${cur * 0.25}rem`
          return acc
        }, {}),
      },
    },
  },
  variants: {
    margin: ['responsive', 'first'],
    padding: ['responsive', 'first'],
  },
  plugins: [
    require('tailwind-css-variables')(
      {
        colors: 'color',
        screens: '', // '',
        fontFamily: '', // 'font',
        fontSize: false, // 'text',
        fontWeight: false, // 'font',
        lineHeight: false, // 'leading',
        letterSpacing: false, // 'tracking',
        backgroundSize: false, // 'bg',
        borderWidth: false, // 'border',
        borderRadius: false, // 'rounded',
        width: false, // 'w',
        height: false, // 'h',
        minWidth: false, // 'min-w',
        minHeight: false, // 'min-h',
        maxWidth: false, // 'max-w',
        maxHeight: false, // 'max-h',
        padding: false, // 'p',
        margin: false, // 'm',
        boxShadow: 'shadows', // 'shadows',
        zIndex: false, // 'z',
        opacity: false, // 'opacity',
      },
      {
        // options
      },
    ),
    require('@tailwindcss/custom-forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
