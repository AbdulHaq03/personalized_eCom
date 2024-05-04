import { useContext } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";

const UserDashboard = () => {
    const user = JSON.parse(localStorage.getItem('users'));
    const context = useContext(myContext);
    const { loading, getAllOrder } = context;

    return (
        <Layout className="dark">
            <div className="container mx-auto px-4 py-5 lg:py-8">
                {/* Top */}
                <div className="top">
                    {/* main */}
                    <div className="bg-gray-900 py-5 rounded-xl border border-gray-700">
                        {/* image */}
                        <div className="flex justify-center">
                            <img src="https://ideogram.ai/api/images/direct/4cdy-u4wRJ-SGPuy0UwlBw.png" className="w-24 h-24 rounded-full border-4 border-white" alt="" />
                        </div>
                        {/* text */}
                        <div className="text-center text-white mt-4">
                            <h1 className="text-lg font-bold">Name: {user?.name}</h1>
                            <h1 className="text-lg font-bold">Email: {user?.email}</h1>
                            <h1 className="text-lg font-bold">Date: {user?.date}</h1>
                            <h1 className="text-lg font-bold">Role: {user?.role}</h1>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="bottom mt-8">
                    {/* main 1 */}
                    <div className="mx-auto my-4 max-w-6xl px-2 md:my-6 md:px-0">
                        {/* text */}
                        <h2 className="text-3xl lg:text-4xl font-bold text-black">Order Details</h2>

                        <div className="flex justify-center">
                            {loading && <Loader />}
                        </div>

                        {/* main 2 */}
                        {getAllOrder.filter((obj) => obj.userid === user?.uid).map((order, index) => (
                            <div key={index} className="mt-8 bg-gray-900 rounded-xl border border-gray-700">
                                {/* main 3 */}
                                {order.cartItems.map((item, index) => {
                                    const { id, date, quantity, price, title, productImageUrl, category } = item;
                                    const { status } = order;
                                    return (
                                        <div key={index} className="flex">
                                            {/* left */}
                                            <div className="w-1/2 border-r border-gray-700 p-8">
                                                <div className="grid grid-cols-2 sm:grid-cols-1">
                                                    <div className="mb-4">
                                                        <div className="text-sm font-semibold text-white">Order Id</div>
                                                        <div className="text-sm font-medium text-gray-300">#{id}</div>
                                                    </div>

                                                    <div className="mb-4">
                                                        <div className="text-sm font-semibold text-white">Date</div>
                                                        <div className="text-sm font-medium text-gray-300">{date}</div>
                                                    </div>

                                                    <div className="mb-4">
                                                        <div className="text-sm font-semibold text-white">Total Amount</div>
                                                        <div className="text-sm font-medium text-gray-300">Rs. {price * quantity}</div>
                                                    </div>

                                                    <div className="mb-4">
                                                        <div className="text-sm font-semibold text-white">Order Status</div>
                                                        <div className="text-sm font-medium text-green-500 uppercase">{status}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* right */}
                                            <div className="flex-1">
                                                <div className="p-8">
                                                    <ul className="-my-7 divide-y divide-gray-700">
                                                        <li className="flex flex-col justify-between space-x-5 py-7 md:flex-row">
                                                            <div className="flex flex-1 items-stretch">
                                                                <div className="flex-shrink-0">
                                                                    <img className="h-40 w-40 rounded-lg border border-gray-200 object-contain" src={productImageUrl} alt="img" />
                                                                </div>
                                                                <div className="ml-5 flex flex-col justify-between">
                                                                    <div className="flex-1">
                                                                        <p className="text-sm font-bold text-white">{title}</p>
                                                                        <p className="mt-1.5 text-sm font-medium text-gray-300">{category}</p>
                                                                    </div>
                                                                    <p className="mt-4 text-sm font-medium text-gray-300">x {quantity}</p>
                                                                </div>
                                                            </div>
                                                            <div className="ml-auto flex flex-col items-end justify-between">
                                                                <p className="text-right text-sm font-bold text-white">Rs. {price}</p>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default UserDashboard;
