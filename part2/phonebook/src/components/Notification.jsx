import { clsx } from "clsx";
import "./Notification.css";

export const Notification = ({ children, type = "info" }) => {
  return (
    <div
      className={clsx("notification", {
        [type]: ["success", "error", "info"].includes(type),
      })}
    >
      {children}
    </div>
  );
};
