import { createContext, useContext, useState } from 'react';
import Alert from "../components/UI/Alert";

type AddAlert = {
  message: string,
  type?: 'error' | 'warning' | 'success' | 'info',
  duration?: number,
};

export type AlertProps = {
  id: number,
} & AddAlert;

type AlertContext = {
  alerts: AlertProps[],
  addAlert: (alert: AddAlert) => void,
  removeAlert: (id: number) => void,
};

export const defaultAlertContext: AlertContext = {
  alerts: [],
  addAlert: () => {
  },
  removeAlert: () => {
  },
};

export const AlertContext = createContext(defaultAlertContext);

type Props = {
  children: any,
}

let alertCount = 0;

export const AlertContextProvider = ({ children }: Props) => {
  const [alerts, setAlerts] = useState<AlertProps[]>([]);

  const addAlert = ({
    message,
    type = 'error',
    duration = 10000
  }: AddAlert) => {
    const id = alertCount++;
    const alert = { id, message, type, duration };
    setAlerts([...alerts, alert]);
  };

  const removeAlert = (id: number) => {
    const newAlerts = alerts.filter(alert => alert.id !== id);
    setAlerts(newAlerts);
  };

  const showAlerts: boolean = alerts.length > 0;

  return (
    <AlertContext.Provider value={{ addAlert, removeAlert, alerts }}>
      {children}
      {showAlerts && (
        <div
          className="fixed top-0 right-0 p-8 z-50">
          {alerts.map((alert, index) => (
            <Alert
              key={`alert-${index}`}
              id={alert.id}
              type={alert.type}
              duration={alert.duration}
            >
              {alert.message}
            </Alert>
          ))}
        </div>
      )}
    </AlertContext.Provider>
  );
};