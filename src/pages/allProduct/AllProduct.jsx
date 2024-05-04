import { useNavigate } from "react-router";
import Layout from "../../components/layout/Layout";
import { useContext, useEffect } from "react";
import myContext from "../../context/myContext";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";

import React from 'react';

const AllProduct = () => {
    // Group products by trendingProductName
    const navigate = useNavigate();

    const context = useContext(myContext);
    const {getAllProduct} = context;

    function groupProductsByCategory(products) {
        return products.reduce((acc, product) => {
            const key = product.category;
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(product);
            return acc;
        }, {});
    }

    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const addCart = (item) => {
        // console.log(item)
        dispatch(addToCart(item));
        toast.success("Add to cart")
    }

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Delete cart")
    }

    // console.log(cartItems)

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems])

    return (
        <Layout>
        <div className="mt-10">
            {/* Heading  */}
            <div className="">
                <h1 className="text-center mb-5 text-2xl font-semibold text-gray-800">All Available Products</h1>
            </div>

            {/* main  */}
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-5 mx-auto">
                    {/* Assuming getAllProduct is an array of products */}
                    {/* Group products by category */}
                    {Object.entries(groupProductsByCategory(getAllProduct)).map(([category, products]) => {
                        const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);
                        return (
                            <div key={category}>
                                {/* Category header with cool design */}
                                <div className="mb-8 mt-6">
                                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{capitalizedCategory}</h2>
                                    <div className="h-1 w-100 bg-gradient-to-r from-purple-700 to-pink-500 rounded-full"></div>
                                </div>
                                {/* Products grid */}
                                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                                    {products.map((item) => {
                                        const { id, title, description, price, productImageUrl } = item;
                                        return (
                                            <div key={id} className="group rounded-lg overflow-hidden shadow-lg bg-color-black transform transition-transform hover:scale-105">
                                                <div className="overflow-hidden">
                                                    <img onClick={()=> navigate(`/productinfo/${id}`)} className="h-64 w-full object-contain object-center" src={productImageUrl} alt={title} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                                                </div>
                                                <div className="p-6 flex flex-col justify-between">
                                                    Zonify
                                                    <div>
                                                        <h1 onClick={()=> navigate(`/productinfo/${id}`)} className="text-lg font-semibold text-gray-900 mb-3">{title}</h1>
                                                        <p onClick={()=> navigate(`/productinfo/${id}`)} className="text-sm text-gray-600 mb-4">{description.slice(0, 200) + '...'}</p>
                                                        <span onClick={()=> navigate(`/productinfo/${id}`)} className="text-lg font-bold text-gray-900">Rs. {price}</span>
                                                    </div>
                                                    {cartItems.some((p) => p.id === item.id)
                                                    ?
                                                        <button onClick={() => deleteCart(item)} className="transition transform translate-y-8 ease-in-out absolute bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none opacity-0 group-hover:opacity-100 bottom-12 right-4">
                                                                Delete From Cart
                                                        </button>
                                                        :
                                                        <button onClick={() => addCart(item)} className="transition transform translate-y-8 ease-in-out absolute bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none opacity-0 group-hover:opacity-100 bottom-12 right-4">
                                                                Add To Cart
                                                        </button>
                                                    }
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
        </section>

        </div>
        </Layout>
    );
}

export default AllProduct;


