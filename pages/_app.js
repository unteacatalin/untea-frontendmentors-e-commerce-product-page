import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

import '../styles/globals.css';
import theme from '../components/ui/theme';
import { ProductStoreProvider } from '../store/store-context';

export const muiCache = createCache({
  key: 'mui',
  prepend: true,
});

function MyApp({ Component, pageProps }) {
  return (
    <CacheProvider value={muiCache}>
      <ThemeProvider theme={theme}>
        <ProductStoreProvider>
          <Component {...pageProps} />
        </ProductStoreProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
