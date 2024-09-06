// const express = require("express");
// const snap = require("./midtrans");
// const router = express.Router();

// router.post("/create-transaction", async (req, res) => {
//   try {
//     const { order_id, gross_amount, customer_name, email } = req.body;

//     let parameter = {
//       transaction_details: {
//         order_id: order_id,
//         gross_amount: gross_amount,
//       },
//       customer_details: {
//         first_name: customer_name,
//         email: email,
//       },
//     };

//     const transaction = await snap.createTransaction(parameter);
//     const transactionToken = transaction.token;

//     res.json({ token: transactionToken });
//   } catch (error) {
//     console.error("Error creating transaction:", error);
//     res.status(500).json({ error: "Transaction creation failed" });
//   }
// });

// module.exports = router;
