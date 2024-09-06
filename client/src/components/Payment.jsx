import React, { useState } from "react";
import axios from "axios";

const PaymentComponent = () => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/md/create-transaction",
        {
          order_id: "ORDER-123",
          gross_amount: 100000,
          customer_name: "John Doe",
          email: "john.doe@example.com",
        }
      );

      const { token } = response.data;
      window.snap.pay(token, {
        onSuccess: function (result) {
          console.log("Payment successful", result);
        },
        onPending: function (result) {
          console.log("Payment pending", result);
        },
        onError: function (result) {
          console.error("Payment error", result);
        },
        onClose: function () {
          console.log("Payment popup closed");
        },
      });
    } catch (error) {
      console.error("Error during payment process:", error);
    }

    setLoading(false);
  };

  return (
    <div>
      <h1>Pembayaran Midtrans</h1>
      <button
        onClick={handlePayment}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {loading ? "Memproses Pembayaran..." : "Bayar Sekarang"}
      </button>
    </div>
  );
};

export default PaymentComponent;
