import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/layout/Layout";
import { Trash } from 'lucide-react'
import { decrementQuantity, deleteFromCart, incrementQuantity } from "../../redux/cartSlice";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import BuyNowModal from "../../components/buyNowModal/BuyNowModal";
import { Navigate } from "react-router";
import { useNavigate } from "react-router";

const CartPage = () => {
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Deleted from cart");
    }

    const handleIncrement = (id) => {
        dispatch(incrementQuantity(id));
    };

    const handleDecrement = (id) => {
        dispatch(decrementQuantity(id));
    };

    const cartItemTotal = cartItems.reduce((total, item) => total + item.quantity, 0);
    const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // user
    const user = JSON.parse(localStorage.getItem('users'))

    // Buy Now Function
    const [addressInfo, setAddressInfo] = useState({
        name: "",
        address: "",
        pincode: "",
        mobileNumber: "",
        time: Timestamp.now(),
        date: new Date().toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }
        )
    });

    const buyNowFunction = () => {
        // validation 
        if (addressInfo.name === "" || addressInfo.address === "" || addressInfo.pincode === "" || addressInfo.mobileNumber === "") {
            return toast.error("All Fields are required")
        }

        // Order Info 
        const orderInfo = {
            cartItems,
            addressInfo,
            email: user.email,
            userid: user.uid,
            status: "confirmed",
            time: Timestamp.now(),
            date: new Date().toLocaleString(
                "en-US",
                {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                }
            )
        }
        try {
            const orderRef = collection(fireDB, 'order');
            addDoc(orderRef, orderInfo);
            setAddressInfo({
                name: "",
                address: "",
                pincode: "",
                mobileNumber: "",
            })
            toast.success("Order Placed Successfull")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Layout className="dark">
            <div className="container mx-auto px-4 max-w-7xl px-2 lg:px-0">
                <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
                    <h1 className="text-3xl font-bold tracking-tight text-black sm:text-4xl mb-8">
                        Shopping Cart
                    </h1>
                    <form className="lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-18">
                        <section aria-labelledby="cart-heading" className="rounded-lg bg-white lg:col-span-8">
                            <h2 id="cart-heading" className="sr-only">
                                Items in your shopping cart
                            </h2>
                            <ul role="list" className="divide-y divide-black">
                                {cartItems.length > 0 ?
                                    cartItems.map((item, index) => (
                                        <li key={index} className="flex py-6 sm:py-6">
                                            <div className="flex-shrink-0">
                                                <img
                                                    src={item.productImageUrl}
                                                    alt="Product"
                                                    onClick={() => navigate(`/productinfo/${item.id}`)}
                                                    className="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center cursor-pointer"
                                                />
                                            </div>

                                            <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                                                <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                                    <div>
                                                        <div className="flex justify-between">
                                                            <h3 className="text-sm font-semibold text-black">
                                                                {item.title}
                                                            </h3>
                                                        </div>
                                                        <div className="mt-1 flex text-sm">
                                                            <p className="text-sm text-black">{item.category}</p>
                                                        </div>
                                                        <div className="mt-1 flex items-end">
                                                            <p className="text-sm font-medium text-black">
                                                                ₹{item.price}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mb-2 flex">
                                                <div className="min-w-24 flex">
                                                    <button onClick={() => handleDecrement(item.id)} type="button" className="h-7 w-7 bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-gray-100">
                                                        -
                                                    </button>
                                                    <input
                                                        type="text"
                                                        className="mx-1 h-7 w-9 rounded-md border text-center bg-gray-700 text-gray-300"
                                                        value={item.quantity}
                                                    />
                                                    <button onClick={() => handleIncrement(item.id)} type="button" className="flex h-7 w-7 items-center justify-center bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-gray-100">
                                                        +
                                                    </button>
                                                </div>
                                                <div className="ml-6 flex text-sm">
                                                    <button onClick={() => deleteCart(item)} type="button" className="flex items-center space-x-1 px-2 py-1 pl-0">
                                                        <Trash size={12} className="text-red-500" />
                                                        <span className="text-xs font-medium text-red-500">Remove</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                    :
                                    <h1 className="text-center text-xl font-medium text-gray-400">Cart Empty :(</h1>
                                }
                            </ul>
                        </section>

                        <section aria-labelledby="summary-heading" className="mt-16 rounded-lg bg-gray-800 lg:col-span-4 lg:mt-0 lg:p-0">
                            <h2 id="summary-heading" className="border-b border-white px-4 py-3 text-lg font-medium text-gray-100 sm:p-4">
                                Price Details
                            </h2>
                            <div>
                                <dl className="space-y-1 px-2 py-4">
                                    <div className="flex items-center justify-between">
                                        <dt className="text-sm text-gray-400">Price ({cartItemTotal} item)</dt>
                                        <dd className="text-sm font-medium text-gray-100">Rs. {cartTotal}</dd>
                                    </div>
                                    <div className="flex items-center justify-between py-4">
                                        <dt className="flex text-sm text-gray-400">
                                            <span>Delivery Charges</span>
                                        </dt>
                                        <dd className="text-sm font-medium text-green-500">Free</dd>
                                    </div>
                                    <div className="flex items-center justify-between border-y border-dashed py-4 ">
                                        <dt className="text-base font-medium text-gray-100">Total Amount</dt>
                                        <dd className="text-base font-medium text-gray-100">Rs. {cartTotal}</dd>
                                    </div>
                                </dl>
                                <div className="px-2 pb-4 font-medium text-green-500">
                                    <div className="flex gap-4 mb-6">
                                        {user
                                                ? <BuyNowModal
                                                    addressInfo={addressInfo}
                                                    setAddressInfo={setAddressInfo}
                                                    buyNowFunction={buyNowFunction}
                                                /> : <Navigate to={'/login'}/>
                                            }
                                    </div>
                                </div>
                            </div>
                        </section>
                    </form>
                </div>
            </div>
        </Layout>
    );
}

export default CartPage;
