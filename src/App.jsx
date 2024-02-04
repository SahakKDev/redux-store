import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";

import { fetchCartData, sendCartData } from "./store/cart-actions";

function App() {
  const dispatch = useDispatch();
  const firstUpdate = useRef(true);

  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const totalQuantity = cart.totalQuantity;
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (firstUpdate.current) {
      setTimeout(() => (firstUpdate.current = false), 0);
      return;
    }

    if (cart.hasChanged) {
      dispatch(sendCartData(cart));
    }
  }, [dispatch, cart]);

  return (
    <>
      {notification && (
        <Notification
          key={totalQuantity}
          message={notification.message}
          title={notification.title}
          status={notification.status}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
