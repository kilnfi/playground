import React, { useEffect } from 'react';
import { AlertContextProvider } from '../contexts/AlertContext';
import '../styles/globals.css';
import { AppProps } from '../types/next';
import { SWRConfig } from 'swr';
import { fetcher } from "../api/api";
import { AppContextProvider } from "../contexts/AppContext";

const DEVNET_DEMO_API_KEY = 'skillz_1c7f8581-cbbb-4d83-a5fe-4662e4220fe4';

const Dashboard = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    localStorage.setItem('token', DEVNET_DEMO_API_KEY);
  }, []);

  return (
    <SWRConfig
      value={{
        fetcher: fetcher,
      }}
    >
      <AppContextProvider>
        <AlertContextProvider>
          <Component {...pageProps} />
        </AlertContextProvider>
      </AppContextProvider>
    </SWRConfig>
  );
};

export default Dashboard;
