import { useDispatch, useSelector } from "react-redux";
import classes from "./CartButton.module.css";
import { toggle } from "../../store/ui-slice";

const CartButton = () => {
  const dispatch = useDispatch();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  function toggleCartHandler() {
    dispatch(toggle());
  }

  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
