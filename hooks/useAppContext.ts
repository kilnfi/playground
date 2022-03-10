import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";


export const useAppContext = () => {
  const { context, setCurrency } = useContext(AppContext);

  return { context, setCurrency };
};