import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import OrderConfirmation from "./OrderConfirmation";

function ConfirmationPage() {
  const [orderData, setOrderData] = useState(null);
  const { id } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch(`/api/orders/${id}`);
      const data = await response.json();
      setOrderData(data);
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    if (orderData) {
      setIsLoaded(true);
    }
  }, [orderData]);

  if (!isLoaded) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return <div>{isLoaded && <OrderConfirmation order={orderData} />}</div>;
}

export default ConfirmationPage;
