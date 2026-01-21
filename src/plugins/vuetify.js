// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    defaultTheme: 'reviewTheme',
    themes: {
      reviewTheme: {
        dark: false,
        colors: {
          background: '#0b1020',
          surface: '#111a33',
          primary: '#7c3aed',
          secondary: '#06b6d4',
          success: '#22c55e',
          warning: '#f59e0b',
          error: '#ef4444',
          info: '#38bdf8',
        },
      },
    },
  },
  defaults: {
    VCard: {
      rounded: 'xl',
      elevation: 10,
    },
    VTextField: {
      variant: 'outlined',
      density: 'comfortable',
      hideDetails: 'auto',
    },
    VBtn: {
      rounded: 'lg',
    },
  },
})
