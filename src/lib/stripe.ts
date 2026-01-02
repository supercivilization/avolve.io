import Stripe from "stripe";

// Initialize Stripe with API key
export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-12-15.clover",
      typescript: true,
    })
  : null;

// Price IDs - Create these in Stripe Dashboard or via CLI
// stripe products create --name="Avolve 365 Monthly" --description="Monthly AI accountability partner subscription"
// stripe prices create --product=prod_xxx --unit-amount=28800 --currency=usd --recurring[interval]=month
// stripe products create --name="Avolve 365 Annual" --description="Annual AI accountability partner subscription (save $568)"
// stripe prices create --product=prod_xxx --unit-amount=288800 --currency=usd --recurring[interval]=year
export const STRIPE_PRICES = {
  monthly: process.env.STRIPE_PRICE_MONTHLY || "",
  yearly: process.env.STRIPE_PRICE_YEARLY || "",
};

export const PLANS = {
  monthly: {
    name: "Monthly",
    price: 288,
    period: "month" as const,
    description: "Flexible monthly billing. Cancel anytime.",
    priceId: STRIPE_PRICES.monthly,
  },
  yearly: {
    name: "Annual",
    price: 2888,
    period: "year" as const,
    originalPrice: 3456,
    savings: 568,
    description: "Best value. 2 months free.",
    priceId: STRIPE_PRICES.yearly,
  },
};
