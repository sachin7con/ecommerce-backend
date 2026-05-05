import express from "express";
import crypto from "crypto";
import razorpay from "../config/razorpay.js";

const router = express.Router();

// CREATE ORDER
router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.json(order);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Order creation failed",
    });
  }
});

// VERIFY PAYMENT
router.post("/verify", async (req, res) => {

  try {

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const body =
      razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {

      res.json({
        success: true,
        message: "Payment verified",
      });

    } else {

      res.status(400).json({
        success: false,
        message: "Invalid signature",
      });
    }

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Verification failed",
    });
  }
});

export default router;