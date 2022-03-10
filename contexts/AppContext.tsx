import { createContext, useState } from 'react';


export type Currency = 'USD' | 'EUR' | 'GBP';

type ContextValues = {
  currency: Currency,
}

type AppContext = {
  context: ContextValues,
  setCurrency: (currency: Currency) => void,
};

const DEFAULT_CONTEXT_VALUES: ContextValues = {
  currency: 'USD',
};

export const defaultAppContext: AppContext = {
  context: DEFAULT_CONTEXT_VALUES,
  setCurrency: () => {
  },
};

export const AppContext = createContext(defaultAppContext);

type Props = {
  children: any,
}


export const AppContextProvider = ({ children }: Props) => {
  const [context, setContext] = useState<ContextValues>(DEFAULT_CONTEXT_VALUES);

  const setCurrency = (currency: Currency) => {
    setContext({
      ...context,
      currency: currency,
    });
  };

  return (
    <AppContext.Provider value={{ context, setCurrency }}>
      {children}
    </AppContext.Provider>
  );
};