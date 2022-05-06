import React, { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = props => {

    const [btnHighlight, setBtnHighlight] = useState(false);

    const cartCtx = useContext(CartContext);

    const numberOfCartItems = cartCtx.items.reduce((a,b) => a + b.amount, 0);

    const btnClasses = `${classes.button} ${btnHighlight ? classes.bump:''}`;

    useEffect(() => {
        if(cartCtx.items.length === 0){
            return ;
        }
        setBtnHighlight(true);

        const timer = setTimeout(() => {
            setBtnHighlight(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [cartCtx.items]);
    

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span>
                <CartIcon className={classes.icon} />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>
                {numberOfCartItems}
            </span>
        </button>
    );
};

export default HeaderCartButton;