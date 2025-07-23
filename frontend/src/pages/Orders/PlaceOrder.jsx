import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import Message from "../../components/Message";
import ProgressSteps from "../../components/ProgressSteps";
import Loader from "../../components/Loader";
import { clearCartItems } from "../../redux/features/cart/cartSlice";

import {
  useCreateOrderMutation,
  useCreateRazorpayOrderMutation,
  useVerifyRazorpayPaymentMutation,
} from "../../redux/api/orderApiSlice";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const [createRazorpayOrder] = useCreateRazorpayOrderMutation();
  const [verifyRazorpayPayment] = useVerifyRazorpayPaymentMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.shippingAddress.address, navigate]);

  // const placeOrderHandler = async () => {
  //   try {
  //     const razorpayOrder = await createRazorpayOrder({
  //       amount: cart.totalPrice * 100,
  //       currency: "INR",
  //     }).unwrap();


  const placeOrderHandler = async () => {
  try {
    // const usdToInr = 83.5; // 💱 Convert dollars to INR
    const razorpayOrder = await createRazorpayOrder({
      amount: Math.round(Number(cart.totalPrice) * 100), // ✅ INR in paise
      currency: "INR",
    }).unwrap();


  
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        order_id: razorpayOrder.id,
        name: "Khaleel Store",
        description: "Order Payment",
        handler: async (response) => {
          try {
            const verifyRes = await verifyRazorpayPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }).unwrap();

            if (verifyRes.success) {
              const order = await createOrder({
                orderItems: cart.cartItems.map((item) => ({
                  name: item.name,
                  qty: item.qty,
                  image: item.image,
                  price: item.price,
                  product: item.product || item._id,
                })),
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
                isPaid: true,
                paidAt: new Date().toISOString(),
              }).unwrap();

              dispatch(clearCartItems());
              toast.success("✅ Payment successful & Order Placed!");
              navigate(`/order/${order._id}`);
            } else {
              toast.error("❌ Payment verification failed");
            }
          } catch (err) {
            console.error("Verification error:", err);
            toast.error("❌ Payment verification error");
          }
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        theme: { color: "#F472B6" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error("Payment initiation failed:", err);
      toast.error("❌ Payment initiation failed");
    }
  };

  return (
    <>
      <ProgressSteps step1 step2 step3 />

      <div className="container mx-auto mt-8">
        {cart.cartItems.length === 0 ? (
          <Message>Your cart is empty</Message>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <td className="px-1 py-2 text-left">Image</td>
                  <td className="px-1 py-2 text-left">Product</td>
                  <td className="px-1 py-2 text-left">Quantity</td>
                  <td className="px-1 py-2 text-left">Price</td>
                  <td className="px-1 py-2 text-left">Total</td>
                </tr>
              </thead>
              <tbody>
                {cart.cartItems.map((item, index) => (
                  <tr key={index}>
                    <td className="p-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover"
                      />
                    </td>
                    <td className="p-2">
                      <Link to={`/product/${item.product || item._id}`}>
                        {item.name}
                      </Link>
                    </td>
                    <td className="p-2">{item.qty}</td>
                    <td className="p-2">₹{item.price.toFixed(2)}</td>
                    <td className="p-2">
                      ₹{(item.qty * item.price).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-5">Order Summary</h2>
          <div className="flex justify-between flex-wrap p-8 bg-[#181818] rounded-md">
            <ul className="text-lg mb-4">
              <li>
                <strong>Items:</strong> ₹{cart.itemsPrice}
              </li>
              <li>
                <strong>Shipping:</strong> ₹{cart.shippingPrice}
              </li>
              <li>
                <strong>Tax:</strong> ₹{cart.taxPrice}
              </li>
              <li>
                <strong>Total:</strong> ₹{cart.totalPrice}
              </li>
            </ul>

            <div className="mb-4">
              <h2 className="text-2xl font-semibold mb-2">Shipping</h2>
              <p>
                <strong>Address:</strong> {cart.shippingAddress.address},{" "}
                {cart.shippingAddress.city} {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </div>

            <div className="mb-4">
              <h2 className="text-2xl font-semibold mb-2">Payment</h2>
              <strong>Method:</strong> {cart.paymentMethod}
            </div>
          </div>

          <button
            type="button"
            className="bg-pink-500 text-white py-2 px-4 rounded-full text-lg w-full mt-4"
            disabled={cart.cartItems.length === 0}
            onClick={placeOrderHandler}
          >
            Pay Now with Razorpay
          </button>

          {isLoading && <Loader />}
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;
