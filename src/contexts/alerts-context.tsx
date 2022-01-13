import { createContext, FC, useEffect, useRef, useState } from 'react';

/**
 * Alerts context props.
 */
interface AlertsContextProps {
  alerts: JSX.Element[];
  push: (alert: JSX.Element) => void;
}

/**
 * Alerts context.
 * 
 * This context is used to show alert components.
 */
export const AlertsContext = createContext<AlertsContextProps>({ alerts: [], push: null });
AlertsContext.displayName = 'Alerts';

/**
 * Alerts context provider.
 */
export const AlertsContextProvider: FC = ({ children }) => {
  const mounted = useRef(false);
  const [alerts, setAlerts] = useState<JSX.Element[]>([]);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    }
  }, []);

  const push = (alert: JSX.Element) => {
    setAlerts(prevState => [...prevState, alert]);
    setTimeout(() => {
      if (mounted.current) {
        setAlerts(prevState => prevState.slice(1));
      }
    }, 10000);
  }

  return (
    <AlertsContext.Provider value={{ alerts, push }}>
      {alerts.length > 0 && (
        <div className="fixed left-0 top-0 z-10 w-full space-y-2">
          {alerts.map((alert, i) => (
            <div key={i}>
              {alert}
            </div>
          ))}
        </div>
      )}
      {children}
    </AlertsContext.Provider>
  );
}
