import React, { useRef, useState } from "react";
import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const notFiveChar = value => value.trim().length !== 6;

const CheckOut = (props) => {
    const [formValidity, setFormValidity] = useState({
        name: true,
        street: true,
        postal: true,
        city: true,
    });

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostal = postalInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const nameIsValid = !isEmpty(enteredName);
        const streetIsValid = !isEmpty(enteredStreet);
        const postalIsValid = !notFiveChar(enteredPostal);
        const cityIsValid = !isEmpty(enteredCity);

        setFormValidity({
            name: nameIsValid,
            street: streetIsValid,
            postal: postalIsValid,
            city: cityIsValid
        });

        const formIsValid =
            nameIsValid &&
            streetIsValid &&
            postalIsValid &&
            cityIsValid;

        if (!formIsValid) {
            return;
        }

        props.onConfirm({
            name:enteredName,
            street:enteredStreet,
            postal:enteredPostal,
            city:enteredCity,
        });


    }


    const nameControlClasses = `${classes.control} ${
       formValidity.name ? '' : classes.invalid
    }`

    const streetControlClasses =`${classes.control} ${
        formValidity.street ? '' : classes.invalid
    }`

    const postalControlClasses = `${classes.control} ${
        formValidity.postal ? '' : classes.invalid
    }`

    const cityControlClasses = `${classes.control} ${
        formValidity.city ? '' : classes.invalid
    } `

    return (
        <form onSubmit={confirmHandler} className={classes.form} >
            <div
                className={nameControlClasses}
            >
                <label htmlFor="name">Your name</label>
                <input type="text" id="name" ref={nameInputRef} />
                {!formValidity.name && <p>please enter your name</p>}
            </div>

            <div className={streetControlClasses}>
                <label htmlFor="street">Street</label>
                <input type="text" id="street" ref={streetInputRef} />
                {!formValidity.street && <p>please enter street Address</p>}
            </div>

            <div className={postalControlClasses}>
                <label htmlFor="postal">Postal Code</label>
                <input type="text" id="postal" ref={postalInputRef} />
                {!formValidity.postal && <p>please enter postal code</p>}
            </div>

            <div className={cityControlClasses}>
                <label htmlFor="city">City</label>
                <input type="text" id="city" ref={cityInputRef} />
                {!formValidity.city && <p>please enter city</p>}
            </div>
            <div className={classes.actions}>
                <button type="button" onClick={props.onCancel} >
                    Cancel
                </button>
                <button className={classes.submit} >Confirm</button>
            </div>

        </form>

    );
}

export default CheckOut;