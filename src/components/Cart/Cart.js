import { useContext, useState } from 'react';
import React from 'react';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import CheckOut from './Checkout';

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);

  const [isSubmit, setIsSubmit] = useState(false);
  const [didSumit, setDidSubmit] = useState(false);


  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  }


  const userDataHandler = async (userData) => {
    setIsSubmit(true);
    await fetch('https://react-http-ba874-default-rtdb.firebaseio.com/orders.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderedItem: cartCtx.items
      })
    });

    setIsSubmit(false);
    setDidSubmit(true);

    cartCtx.clearCart();
  };


  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>
      {hasItems && <button className={classes.button} onClick={orderHandler} >Order</button>}
    </div>
  );

  const cartModelContent =
    <React.Fragment>
      {cartItems}
      <div className={classes.total} >
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <CheckOut onConfirm={userDataHandler} onCancel={props.onClose} />}
      {!isCheckout && modalActions}

    </React.Fragment>

  const isSubmitingModelContent = <p>Sending order data..</p>;


  const didSumitModelContent =
    <React.Fragment>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
       
        <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>
      
      </div>

    </React.Fragment>


  return (
    <Modal onClose={props.onClose}>
      {!isSubmit && !didSumit && cartModelContent}
      {isSubmit && isSubmitingModelContent}
      {!isSubmit && didSumit && didSumitModelContent}
    </Modal>
  );
};

export default Cart;
