import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import logo from "../../img/logo_3.jpeg"; // Import the logo image
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    // Toggle mobile menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Close mobile menu on link click
    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    // get user from localStorage 
    const user = JSON.parse(localStorage.getItem('users'));

    // get cart from redux store
    // CartItems
    const cartItems = useSelector((state) => state.cart);

    // logout function 
    const logout = () => {
        localStorage.clear('users');
        navigate("/login")
    }

    // Navbar links
    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/allproduct', label: 'All Product' },
    ];

    if (!user) {
        navLinks.push({ to: '/login', label: 'Login' });
    }

    // If user is admin, add admin-specific links
    if (user && user.role === 'admin') {
        navLinks.push({ to: '/admin-dashboard', label: user.name });
    }

    // If user is not an admin, add user-specific links
    if (user && user.role !== 'admin') {
        navLinks.push({ to: '/user-dashboard', label: user.name });
    }

    // If user is not logged in, add signup and login links
    if (!user) {
        navLinks.push({ to: '/signup', label: 'Signup' });
    }

    // If user is logged in, add logout button
    if (user) {
        navLinks.push({ label: 'Logout', onClick: logout });
    }

    navLinks.push({ to: '/cart', label: 'Cart' + '-' + cartItems.length});

    return (
        <nav className="bg-gradient-to-r from-black via-blue-820 to-black shadow-lg fixed w-full z-50">
            <div className="container mx-auto px-4 py-2 md:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo and Text */}
                    <div className="flex items-center">
                        {!isMenuOpen && ( // Show logo and text only if the menu is not open
                            <Link to={'/'}>
                                <img src={logo} alt="Logo" className="h-20 mr-2 rounded-full border-4 border-white hover:border-yellow-500 transition duration-300 ease-in-out" />
                            </Link>
                        )}
                    </div>

                    {/* Hamburger Menu (for mobile) */}
                    <div className="lg:hidden">
                        <button onClick={toggleMenu} className="text-white focus:outline-none">
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                            </svg>
                        </button>
                    </div>

                    {/* Navbar Links */}
                    <div className={`lg:flex lg:items-center ${isMenuOpen ? 'block' : 'hidden'}`}>
                        <ul className="lg:flex lg:space-x-3 text-white font-medium text-md px-5">
                            {navLinks.map((link, index) => (
                                <li key={index}>
                                    {link.to ? (
                                        <Link to={link.to} onClick={closeMenu} className="hover:text-yellow-500 hover:filter hover:drop-shadow-md">{link.label}</Link>
                                    ) : (
                                        <button onClick={link.onClick} className="hover:text-yellow-500 hover:filter hover:drop-shadow-md">{link.label}</button>
                                    )}
                                </li>
                            ))}
                        </ul>

                        {/* Search Bar */}
                        <div className="mt-4 lg:mt-0">
                            <SearchBar />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
