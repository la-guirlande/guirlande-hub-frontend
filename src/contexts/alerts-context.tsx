import { createContext, FC, useState } from 'react';

/**
 * Alerts context props.
 */
interface AlertsContextProps {
  alerts: JSX.Element[];
  setAlerts: React.Dispatch<React.SetStateAction<JSX.Element[]>>;
}

/**
 * Alerts context.
 * 
 * This context is used to show alert components.
 * 
 * To use the alert system, see the `Alerts` hook.
 */
export const AlertsContext = createContext<AlertsContextProps>({ alerts: [], setAlerts: null });
AlertsContext.displayName = 'Alerts';

/**
 * Alerts context provider.
 */
export const AlertsContextProvider: FC = ({ children }) => {
  const [alerts, setAlerts] = useState<JSX.Element[]>([]);
  return (
    <AlertsContext.Provider value={{ alerts, setAlerts }}>
      <div className="fixed left-0 top-0 z-10 w-full space-y-2">
        {alerts.map((alert, i) => (
          <div key={i}>
            {alert}
          </div>
        ))}
      </div>
      {children}
    </AlertsContext.Provider>
  );
}
