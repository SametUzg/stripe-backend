const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const app = express();


app.use(cors());
app.use(express.json());

app.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount, // kuruş cinsinden → 150 TL = 15000
      currency: "try",
      payment_method_types: ["card"]
    });

    res.send({
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.listen(3000, () => console.log("🚀 Stripe sunucu çalışıyor: http://localhost:3000"));

