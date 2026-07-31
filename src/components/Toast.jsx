import { useEffect, useState } from "react";
import { cn } from "../utils/cn.js";

const EXIT_DURATION = 300;

export const Toast = ({message, onClose, duration = 5000, className}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const hideTimer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(hideTimer);
  }, [duration]);

  useEffect(() => {
    if (visible) return;
    const closeTimer = setTimeout(onClose, EXIT_DURATION);
    return () => clearTimeout(closeTimer);
  }, [visible, onClose]);

  return (
    <div
      className={cn(
        "fixed z-50 rounded-md shadow-lg",
        className,
        visible ? "translate-x-0" : "translate-x-full"
      )}
    >
      {message}
    </div>
  );
};
