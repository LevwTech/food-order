import "./HeaderCardButton.css";
import CartIcon from "../Cart/CartIcon.js";
import { useContext } from "react";
import CartContext from "../../store/cart-context";
function HeaderCardButton(props) {
  const cartCtx = useContext(CartContext);
  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  return (
    <button className="button" onClick={props.onClick}>
      <span className="icon">
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className="badge">{numberOfCartItems}</span>
    </button>
  );
}
export default HeaderCardButton;
