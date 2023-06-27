import React from "react";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
const CartItem = () => {
  return (
    <div className="position-fixed pos-right z-index-10">
      <ShoppingBasketIcon className="icon-cart" />
    </div>
  );
};

export default CartItem;
