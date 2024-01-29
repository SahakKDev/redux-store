import { useDispatch } from "react-redux";
import Card from "../UI/Card";
import classes from "./ProductItem.module.css";
import { addItemToCart } from "../../store/cart-slice";

const ProductItem = ({ id, title, price, description }) => {
  const dispatch = useDispatch();

  const addToCarthandler = () => {
    dispatch(
      addItemToCart({
        id,
        price,
        title,
      })
    );
  };

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addToCarthandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
