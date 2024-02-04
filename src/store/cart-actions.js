import { replaceCart } from "./cart-slice";
import { showNotification } from "./ui-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const getCartData = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/cart.json`
      );

      if (!response.ok) {
        throw new Error("Sending cart dat failed.");
      }

      return response.json();
    };

    try {
      const cart = await getCartData();

      dispatch(
        replaceCart({
          items: cart.items || [],
          totalQuantity: cart.totalQuantity,
        })
      );
    } catch (err) {
      dispatch(
        showNotification({
          status: "error",
          title: "Error!",
          message: "Getting cart data failed!",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/cart.json`,
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart dat failed.");
      }
    };

    try {
      await sendRequest();

      dispatch(
        showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );
    } catch (err) {
      dispatch(
        showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};
