import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ProductDetail from './ProductDetail';
import OrderDetail from './OrderDetail';
import UserDetail from './UserDetail';
import Layout from '../../components/layout/Layout';
import { useContext } from 'react';
import myContext from '../../context/myContext';

const AdminDashboard = () => {
    const user = JSON.parse(localStorage.getItem('users'));
    const context = useContext(myContext);
    const {getAllProduct, getAllOrder, getAllUser} = context;
    return (
        <Layout>
        <div>
            {/* Top */}
            <div className="top mb-5 px-5 mt-5">
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 py-5 border rounded-lg shadow-md">
                    <h1 className="text-center text-2xl text-white font-bold">Admin Dashboard</h1>
                </div>
            </div>

            <div className="px-5">
                {/* Mid */}
                <div className="mid mb-5">
                    {/* main */}
                    <div className="bg-gradient-to-r from-gray-800 to-gray-900 py-5 rounded-xl border border-gray-300 shadow-md">
                        {/* image */}
                        <div className="flex justify-center">
                            <img src="https://ideogram.ai/api/images/direct/4cdy-u4wRJ-SGPuy0UwlBw.png" alt="" className="w-24 h-24 rounded-full border-4 border-white"/>
                        </div>
                        {/* text */}
                        <div className="">
                            <h1 className="text-center text-white text-lg"><span className="font-bold">Name :</span> {user.name}</h1>
                            <h1 className="text-center text-white text-lg"><span className="font-bold">Email :</span> {user.email}</h1>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="">
                    <Tabs>
                        <TabList className="flex flex-wrap -m-4 text-center justify-center">
                            {/* Total Products */}
                            <Tab className="p-4 md:w-1/3 sm:w-1/2 w-full cursor-pointer">
                                <div className="border bg-gray-50 hover:bg-gray-100 border-gray-100 px-4 py-3 rounded-xl">
                                    <div className="text-black w-12 h-12 mb-3 inline-block">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={50}
                                            height={50}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="feather feather-shopping-cart"
                                        >
                                            <path d="M9 20H21L20 7.5 5 7l1 12.5M3 9h3M3 13h3M7 4l2 2M17 4l-2 2" />
                                        </svg>
                                    </div>
                                    <h2 className="title-font font-medium text-3xl">{getAllProduct.length}</h2>
                                    <p className="text-black font-bold">Total Products</p>
                                </div>
                            </Tab>

                            {/* Total Order */}
                            <Tab className="p-4 md:w-1/4 sm:w-1/2 w-full cursor-pointer">
                                <div className="border bg-gray-50 hover:bg-gray-100 border-gray-100 px-4 py-3 rounded-xl">
                                    <div className="text-black w-12 h-12 mb-3 inline-block">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={50}
                                            height={50}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="feather feather-list"
                                        >
                                            <line x1={8} y1={6} x2={21} y2={6} />
                                            <line x1={8} y1={12} x2={21} y2={12} />
                                            <line x1={8} y1={18} x2={21} y2={18} />
                                            <line x1={3} y1={6} x2={3} y2={6} />
                                            <line x1={3} y1={12} x2={3} y2={12} />
                                            <line x1={3} y1={18} x2={3} y2={18} />
                                        </svg>
                                    </div>
                                    <h2 className="title-font font-medium text-3xl">{getAllOrder.length}</h2>
                                    <p className="text-black font-bold">Total Orders</p>
                                </div>
                            </Tab>

                            {/* Total User */}
                            <Tab className="p-4 md:w-1/3 sm:w-1/2 w-full cursor-pointer">
                                <div className="border bg-gray-50 hover:bg-gray-100 border-gray-100 px-4 py-3 rounded-xl">
                                    <div className="text-black w-12 h-12 mb-3 inline-block">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={50}
                                            height={50}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="feather feather-users"
                                        >
                                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                            <circle cx={9} cy={7} r={4} />
                                            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                        </svg>
                                    </div>
                                    <h2 className="title-font font-medium text-3xl">{getAllUser.length}</h2>
                                    <p className="text-black font-bold">Total Users</p>
                                </div>
                            </Tab>
                        </TabList>

                        <TabPanel>
                            <div className='mb-10'>
                                <ProductDetail />
                            </div>
                        </TabPanel>

                        <TabPanel>
                            <div className='mb-10'>
                                <OrderDetail />
                            </div>
                        </TabPanel>

                        <TabPanel>
                            <div className='mb-10'>
                                <UserDetail />
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        </div>
        </Layout>
    );
}

export default AdminDashboard;
