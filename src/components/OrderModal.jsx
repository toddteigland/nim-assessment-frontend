import React, { useState } from "react";
import { useNavigate } from "react-router";
import styles from "./styles/OrderModal.module.css";

function OrderModal({ order, setOrderModal }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const [isNameValid, setIsNameValid] = useState(true);
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const [isAddressValid, setIsAddressValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const placeOrder = async () => {
    let valid = true;
    if (!name) {
      setIsNameValid(false);
      valid = false;
    }
    if (!phone) {
      setIsPhoneValid(false);
      valid = false;
    }
    if (!address) {
      setIsAddressValid(false);
      valid = false;
    }
    if (!valid) return;

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        phone,
        address,
        items: order
      })
    });
    const data = await response.json();
    if (response.status === 200) {
      navigate(`/order-confirmation/${data.id}`);
    } else {
      setErrorMessage("Failed to Place Order, please check form.");
    }
  };

  return (
    <>
      <div
        label="Close"
        className={styles.orderModal}
        onKeyPress={(e) => {
          if (e.key === "Escape") {
            setOrderModal(false);
          }
        }}
        onClick={() => setOrderModal(false)}
        role="menuitem"
        tabIndex={0}
      />
      <div className={styles.orderModalContent}>
        <h2>Place Order</h2>
        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">
              Name
              {!isNameValid && (
                <span className={styles.requiredField}>*Required*</span>
              )}
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setIsNameValid(true);
                  setName(e.target.value);
                }}
                type="text"
                id="name"
              />
            </label>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone">
              Phone
              {!isPhoneValid && (
                <span className={styles.requiredField}>*Required*</span>
              )}
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setIsPhoneValid(true);
                  setPhone(e.target.value);
                }}
                type="phone"
                id="phone"
              />
            </label>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="address">
              Address
              {!isAddressValid && (
                <span className={styles.requiredField}>*Required*</span>
              )}
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setIsAddressValid(true);
                  setAddress(e.target.value);
                }}
                type="phone"
                id="address"
              />
            </label>
          </div>
        </form>

        <div className={styles.orderModalButtons}>
          <button
            className={styles.orderModalClose}
            onClick={() => setOrderModal(false)}
          >
            Close
          </button>
          <button
            onClick={() => {
              placeOrder();
            }}
            className={styles.orderModalPlaceOrder}
          >
            Place Order
          </button>
          {errorMessage && <div className={styles.error}>{errorMessage}</div>}
        </div>
      </div>
    </>
  );
}

export default OrderModal;
