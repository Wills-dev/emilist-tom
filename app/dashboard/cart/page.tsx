"use client";

import Image from "next/image";
import { useContext } from "react";

import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";

import DashboardNav from "@/components/DashboardComponents/DashboardNav";

import { CartContext } from "@/utils/CartState";
import { Capitalize, numberWithCommas } from "@/helpers";
import { useRemoveMaterialFromCart } from "@/hooks/useRemoveMaterialFromCart";
import { useIncreaseCartItem } from "@/hooks/useIncreaseCartItem";
import { useDecreaseCartItem } from "@/hooks/useDecreaseCartItem";
import { useDiscount } from "@/hooks/useDiscount";
import { useCheckoutCart } from "@/hooks/useCheckoutCart";
import OrderPayment from "@/components/modals/OrderPayment";

const Cart = () => {
  const { cartItems, totalCartQuantity } = useContext(CartContext);

  const { incrementLoading, incrementCartQuantity } = useIncreaseCartItem();
  const { deleteMaterialFromCart, deleteCartLoading } =
    useRemoveMaterialFromCart();
  const { decreaseCartQuantity, decreaseLoading } = useDecreaseCartItem();
  const { handleSubmitDiscount, discount, discountLoading, code, setCode } =
    useDiscount();
  const {
    isLoading,
    handleCheckout,
    open,
    onCancel,
    handleOrderPayment,
    currency,
    setCurrency,
    loading,
    paymentMethod,
    setPaymentMethod,
  } = useCheckoutCart();

  const checkout = () => {
    if (code && discount) {
      handleCheckout(code);
    } else {
      handleCheckout();
    }
  };

  return (
    <main className="relative">
      {deleteCartLoading || discountLoading ? (
        <div className="absolute top-0 left-0 w-full min-h-screen bg-white h-full z-50 opacity-40" />
      ) : null}
      {incrementLoading || decreaseLoading ? (
        <div className="absolute top-0 left-0 w-full min-h-screen bg-white h-full z-50 opacity-40" />
      ) : null}

      <DashboardNav />
      <section className="pt-28 padding-x pb-20">
        <div className="flex-c-b gap-4 pb-6">
          <h1 className=" text-2xl font-bold  max-sm:text-lg pt-6">Cart</h1>
        </div>

        {totalCartQuantity < 1 ? (
          <p className="text-gray-400 text-sm">No item in your cart</p>
        ) : (
          <>
            {/* payment modal */}
            <OrderPayment
              isOpen={open}
              onCancel={onCancel}
              loading={loading}
              paymentMethod={paymentMethod}
              handleOrderPayment={handleOrderPayment}
              cartId={cartItems?._id}
              setPaymentMethod={setPaymentMethod}
              currency={currency}
              setCurrency={setCurrency}
            />
            {/* cart details for web view, the mobile view is below this */}
            <div className="md:block hidden">
              <div className="flex-c-b border-b-1 border-gray-500">
                <p className="flex-1 font-medium text-gray-400 max-sm:text-sm max-md:hidden">
                  Product Details
                </p>
                <div className="flex-1 flex-c-b gap-4 max-md:hidden">
                  <p className=" flex-1 text-center font-medium text-gray-400 max-sm:text-sm ">
                    Quantity
                  </p>
                  <p className=" flex-1 text-center font-medium text-gray-400 max-sm:text-sm">
                    Price
                  </p>
                  <p className=" flex-1 text-center font-medium text-gray-400 max-sm:text-sm ">
                    Total
                  </p>
                </div>
              </div>
              <div
                className="flex flex-col gap-4
         border-b-1 border-gray-500 py-6"
              >
                {cartItems?.products?.map((cart: any) => (
                  <div
                    className="flex items-start justify-between"
                    key={cart?._id}
                  >
                    <div className="flex-1 flex gap-2">
                      <Image
                        src={
                          cart?.productId?.images[0] &&
                          cart?.productId?.images[0]?.imageUrl
                        }
                        width={200}
                        height={200}
                        alt="product-image"
                        className="w-28 h-28 rounded-lg object-cover"
                      />
                      <div className="flex flex-col justify-between">
                        <p className="font-semibold max-sm:text-sm">
                          {cart?.productId?.name &&
                            Capitalize(cart?.productId?.name)}
                        </p>
                        <button
                          className="text-red-400 sm:text-sm text-xs font-medium w-fit text-start"
                          onClick={() =>
                            deleteMaterialFromCart(cart?.productId?._id)
                          }
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="flex-1 flex-c-b gap-4 w-full ">
                      <div className=" flex-1 flex-c justify-center sm:gap-6 gap-3 max-sm:text-sm">
                        <button
                          className="sm:text-2xl text-lg"
                          onClick={() =>
                            decreaseCartQuantity(cart?.productId?._id)
                          }
                        >
                          <CiCircleMinus />
                        </button>
                        <span className="block">
                          {cart?.quantity && numberWithCommas(cart?.quantity)}
                        </span>
                        <button
                          className="sm:text-2xl text-lg"
                          onClick={() =>
                            incrementCartQuantity(cart?.productId?._id)
                          }
                        >
                          <CiCirclePlus />
                        </button>
                      </div>
                      <p className="flex-1 text-center font-medium max-sm:text-sm">
                        {cart?.productId?.currency}
                        {cart?.productId?.price &&
                          numberWithCommas(cart?.productId?.price)}
                      </p>
                      <p className="flex-1 text-center font-medium max-sm:text-sm ">
                        {cart?.productId?.currency}
                        {cart?.price && numberWithCommas(cart?.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap justify-end py-6 gap-4">
                <div className="flex-c-b sm:gap-6 gap-4 px-2 py-3 min-w-44 border-1 border-gray-500 rounded-md">
                  <p className="max-sm:text-sm">Discount</p>
                  <p className="max-sm:text-sm font-bold"> ₦0.00</p>
                </div>
                <div className="flex-c-b sm:gap-6 gap-4 px-2 py-3 min-w-44 border-1 border-gray-500 rounded-md">
                  <p className="max-sm:text-sm">Delivery</p>
                  <p className="max-sm:text-sm font-bold"> ₦0.00</p>
                </div>
                <div className="flex-c-b sm:gap-6 gap-4 px-2 py-3 min-w-44 border-1 border-gray-500 rounded-md">
                  <p className="max-sm:text-sm">Total</p>
                  <p className="max-sm:text-sm font-bold">
                    {" "}
                    ₦
                    {cartItems?.totalAmount
                      ? numberWithCommas(cartItems?.totalAmount)
                      : "0:00"}
                  </p>
                </div>
              </div>
            </div>
            {/* Cart details for mobile view */}
            <div className="md:hidden block">
              <div className="flex flex-col gap-4 border-t-1 border-gray-500">
                {cartItems?.cartItems?.map((cart: any) => (
                  <div
                    className="border-b-1 border-gray-500 py-4"
                    key={cart?._id}
                  >
                    <div className="flex gap-2">
                      <Image
                        src={
                          cart?.productId?.images[0] &&
                          cart?.productId?.images[0]?.imageUrl
                        }
                        width={200}
                        height={200}
                        alt="product-image"
                        className="w-28 h-28 rounded-lg object-cover"
                      />
                      <div className="flex flex-col gap-2">
                        <p className="font-semibold max-sm:text-sm">
                          {cart?.productId?.name &&
                            Capitalize(cart?.productId?.name)}
                        </p>
                        <p className="font-medium max-sm:text-sm">
                          {cart?.productId?.currency}{" "}
                          {cart?.price && numberWithCommas(cart?.price)}
                        </p>
                        <div className="flex-c gap-3 max-sm:text-sm">
                          <button
                            className="text-lg"
                            onClick={() =>
                              decreaseCartQuantity(cart?.productId?._id)
                            }
                          >
                            <CiCircleMinus />
                          </button>
                          <span className="block">
                            {" "}
                            {cart?.quantity && numberWithCommas(cart?.quantity)}
                          </span>
                          <button
                            className=" text-lg"
                            onClick={() =>
                              incrementCartQuantity(cart?.productId?._id)
                            }
                          >
                            <CiCirclePlus />
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      className="text-red-400 text-xs font-medium w-fit text-start pt-4"
                      onClick={() =>
                        deleteMaterialFromCart(cart?.productId?._id)
                      }
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  {" "}
                  <div className="flex-c  gap-4 px-2 py-3">
                    <p className="max-sm:text-sm">Discount</p>
                    <p className="max-sm:text-sm font-bold"> ₦0.00</p>
                  </div>
                  <div className="flex-c gap-4 px-2">
                    <p className="max-sm:text-sm">Delivery</p>
                    <p className="max-sm:text-sm font-bold"> ₦0.00</p>
                  </div>
                </div>
                <div className="flex-c gap-4 px-2 py-3 ">
                  <p className="max-sm:text-sm">Total</p>
                  <p className="max-sm:text-sm font-bold">
                    {" "}
                    ₦
                    {cartItems?.totalAmount
                      ? numberWithCommas(cartItems?.totalAmount)
                      : "0:00"}
                  </p>
                </div>
              </div>
            </div>
            <div className="py-10">
              <p className="max-sm:text-sm font-medium text-gray-400">
                If you have a promotion page, enter it here
              </p>
              <div className="flex-c-b gap-4 flex-wrap sm:pt-6 pt-2 max-md:flex-col">
                <form
                  className=" lg:w-1/2 md:w-2/3 w-full flex-c-b  shadow-lg h-12 rounded-lg"
                  onSubmit={(e) => handleSubmitDiscount(e)}
                >
                  <div className="flex-1 flex-c px-2 rounded-l-lg border-light-gray border-1 focus-within:border-primary-green h-full  max-lg:h-12">
                    <input
                      type="text"
                      placeholder="Please enter promo code"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="focus:outline-none max-md:text-sm w-full bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-primary-green w-fit sm:px-6 px-3 h-full max-lg:h-12 border-primary-green border-1 rounded-r-lg text-white whitespace-nowrap max-sm:text-xs"
                  >
                    Apply Discount
                  </button>
                </form>

                {isLoading ? (
                  <button type="button" className="load-btn">
                    {" "}
                    <span className="loading loading-dots loading-lg"></span>
                  </button>
                ) : (
                  <button
                    type="button"
                    className="custom-btn max-md:mt-10"
                    onClick={checkout}
                  >
                    Checkout
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
};

export default Cart;
