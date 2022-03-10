import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ErrorCard from "./ErrorCard";
import WarningCard from "./WarningCard";
import SuccessCard from "./SuccessCard";
import InfoCard from "./InfoCard";

type AlertProps = {
  id: number,
  children: any,
  type?: "error" | "warning" | "success" | "info";
  duration?: number,
};

const Alert = ({
  id,
  type = 'error',
  children,
  duration = 10000
}: AlertProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          key={id}
          layout
          animate={{ x: 0, opacity: 1 }}
          initial={{ x: 150, opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{
            x: { type: "spring", stiffness: 150 },
            opacity: { ease: "easeOut", duration: 0.25 }
          }}
          onClick={() => setIsVisible(false)}
          className={`block mb-4 w-[250px] relative z-50`}
        >
          {type === 'error' && (
            <ErrorCard showCloseIcon={true}>
              {children}
            </ErrorCard>
          )}

          {type === 'warning' && (
            <WarningCard showCloseIcon={true}>
              {children}
            </WarningCard>
          )}

          {type === 'success' && (
            <SuccessCard showCloseIcon={true}>
              {children}
            </SuccessCard>
          )}

          {type === 'info' && (
            <InfoCard showCloseIcon={true}>
              {children}
            </InfoCard>
          )}
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default Alert;
