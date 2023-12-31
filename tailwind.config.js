/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backgroundColor: {
        backgroundPrimary: 'var(--background-primary)',
        backgroundSecondary: 'var(--background-secondary)',
        backgroundShadow: 'var(--background-shadow)',
        backgroundModalShadow: 'var(--background-modal-shadow)',
      },
      colors: {
        textPrimary: 'var(--text-primary)',
      },
      borderColor: {
        borderPrimary: 'var(--border-primary)',
      },
      keyframes: {
        fade: {
          'from': {
            opacity: '0',
            transform: 'translateX(-20px)'
          },
          'to': {
            opacity: '1',
            transform: 'translateX(0px)'
          }
        },
        load: {
          '50%': {
            width: '100%'
          },
          '100%': {
            width: '0',
            right: '0',
            left: 'unset'
          }
        },
        scrollLeft: {
          '0%': {
            transform: 'translateX(0)'
          },
          '100%': {
            transform: 'translateX(-100%)'
          }
        }
      },
      animation: {
        fade: 'fade .3s forwards',
        load: 'load .5s ease-in-out infinite',
        scrollLeft: 'scrollLeft 5s linear infinite',
      }
    },
  },
  plugins: [],
}
