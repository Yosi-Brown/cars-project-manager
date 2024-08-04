// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [
//     require('daisyui'),
//   ],
// }

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // או 'media'
  theme: {
    extend: {},
  },
  
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      'light', // התמה המובנית
      'dark', // התמה המובנית
      {
        
        // mytheme: { // תמה מותאמת אישית
        //   "primary": "#a991f7",
        //   "secondary": "#f6d860",
        //   "accent": "#37cdbe",
        //   "neutral": "#3d4451",
        //   "base-100": "#ffffff",
        //   "base-200": "#f9fafb",
        //   "base-300": "#d1d5db",
        //   "info": "#2094f3",
        //   "success": "#009485",
        //   "warning": "#ff9900",
        //   "error": "#ff5724",
        //   "dark": {
        //     "primary": "#000000",
        //     "secondary": "#1c1c1e",
        //     "accent": "#27272a",
        //     "neutral": "#2d2d2d",
        //     "base-100": "#121212",
        //   },
        // },
      },
    ],
  },
}
