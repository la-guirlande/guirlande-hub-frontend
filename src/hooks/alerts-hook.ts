import { useContext } from 'react';
import { AlertsContext } from '../contexts/alerts-context';

/**
 * Alerts hook.
 * 
 * This hook is used to create and show alert components.
 * It uses the alerts context internally to push given alert components.
 */
export const useAlerts = () => {
  const { setAlerts } = useContext(AlertsContext);

  const push = (component: JSX.Element) => {
    setAlerts(prevState => [...prevState, component]);
  }

  return { push };
}
