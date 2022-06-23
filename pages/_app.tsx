import { SnackbarProvider } from 'notistack';


import '../styles/globals.css'
import { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material'

import { UIProvider } from '../context/ui'
import { EntriesProvider } from '../context/entries/EntriesProvider';

import { darkTheme } from '../themes'



function MyApp({ Component, pageProps }: AppProps) {

  return (
    <SnackbarProvider maxSnack={3}>
      <EntriesProvider>
        <UIProvider >
          <ThemeProvider theme={ darkTheme }>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </UIProvider>
      </EntriesProvider>
    </SnackbarProvider>
  
  )
}

export default MyApp
