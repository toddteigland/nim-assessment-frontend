import React from "react";
import styles from "./styles/OrderConfirmation.module.css";

function OrderConfirmation({ order }) {
  const nameArray = order.name.split(" ");
  const initials =
    nameArray[0][0] + (nameArray.length > 1 ? nameArray[1][0] : "");

  const totalPrice = order.items.reduce(
    (acc, curr) => acc + curr.item.price * curr.quantity,
    0
  );

  return (
    <div className={styles.pageContainer}>
      <div className={styles.orderContainer}>
        <div className={styles.header}>
          <h2>Thank you. Your order has been received.</h2>
        </div>
        <div className={styles.userHeader}>
          <div className={styles.userAvatar}>
            <div className={styles.avatar}>{initials.toUpperCase()}</div>
          </div>
          <div className={styles.user}>
            <p>{order.name}</p>
            <p>{order.phone}</p>
            <p>{order.address}</p>
          </div>
        </div>
        <div>
          <div className={styles.summary}>
            <table>
              <thead>
                <tr>
                  <th>Order Number:</th>
                  <th>Date:</th>
                  <th>Total:</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{order.id}</td>
                  <td>
                    {order.createdAt
                      ? order.createdAt.substring(0, 10)
                      : "N/A "}
                  </td>
                  <td>${totalPrice}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <div className={styles.bottom}>
              <div className={styles.orderDetails}>
                <h3>Order Details</h3>
                <div className={styles.itemList}>
                  {order.items.map((item) => (
                    <ul key={item.item.id}>
                      <div className={styles.items}>
                        <li>{item.quantity}</li>
                        <li>{item.item.name}</li>
                        <li>${item.item.price}</li>
                      </div>
                    </ul>
                  ))}
                </div>
              </div>
              <div className={styles.progress}>
                <h3>Your order is on its way!</h3>
                <img
                  src="https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?ixlib=
                rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&
                  fit=crop&w=3215&q=80"
                  alt="Man delivering food on motorcycle"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation;
