import { useContext } from "react";
import { AlertContext } from "../contexts/AlertContext";


export const useAlerts = () => {
  const { addAlert } = useContext(AlertContext);

  return { addAlert };
};