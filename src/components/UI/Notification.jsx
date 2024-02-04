import { useEffect } from "react";
import classes from "./Notification.module.css";
import { useDispatch } from "react-redux";
import { clearNotification } from "../../store/ui-slice";

const Notification = ({ status, title, message }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const timerId = setTimeout(() => {
      dispatch(clearNotification());
    }, 2000);

    return () => {
      clearTimeout(timerId);
    };
  }, [dispatch]);

  let specialClasses = "";

  if (status === "error") {
    specialClasses = classes.error;
  }
  if (status === "success") {
    specialClasses = classes.success;
  }

  const cssClasses = `${classes.notification} ${specialClasses}`;

  return (
    <section className={cssClasses}>
      <h2>{title}</h2>
      <p>{message}</p>
    </section>
  );
};

export default Notification;
