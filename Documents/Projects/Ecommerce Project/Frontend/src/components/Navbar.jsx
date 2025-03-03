import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import LogoIcon from '../assets/logo.svg';
import HomeIcon from '../assets/home.svg';
import ProductIcon from '../assets/product.svg';
import CartIcon from '../assets/cart.svg';
import WishlistIcon from '../assets/wishlist.svg';
import MenuIcon from '../assets/menu.svg';
import CloseIcon from '../assets/close.svg';

export default function Navbar() {
    const { user, logoutUser, isTokenExpired } = useContext(AuthContext);
    const [isopen, SetIsOpen] = useState(false);

    useEffect(() => {
        if (isTokenExpired()) {
            logoutUser();
        }
    }, [logoutUser, isTokenExpired]);

    return (
        <nav className='bg-gray-900 text-white p-4'>
            <div className='flex justify-between items-center'>
                {/* Logo */}
                <Link to='/home' className='font-bold text-2xl flex items-center'>
                    <img src={LogoIcon} alt="logo" className='w-6 h-6 mr-4 text-white' />
                    ShopNest
                </Link>

                {/* Desktop Menu */}
                <div className='hidden md:flex items-center space-x-6'>
                    <Link to='/home' className='text-lg font-bold flex items-center hover:text-gray-300'>
                        <img src={HomeIcon} alt='Home' className='w-5 h-5 mr-2 text-white' />
                        Home
                    </Link>
                    <Link to='/product' className='text-lg font-bold flex items-center hover:text-gray-300'>
                        <img src={ProductIcon} alt='Product' className='w-5 h-5 mr-2 text-white' />
                        Products
                    </Link>
                    <Link to='/wishlist' className='text-lg font-bold flex items-center hover:text-gray-300'>
                        <img src={WishlistIcon} alt='Wishlist' className='w-5 h-5 mr-2 text-red-600' />
                        Wishlist
                    </Link>
                    <Link to='/cart' className='text-lg font-bold flex items-center hover:text-gray-300'>
                        <img src={CartIcon} alt='Cart' className='w-5 h-5 mr-2 text-white' />
                        Cart
                    </Link>
                    {user ? (
                        <button onClick={logoutUser} className='px-4 py-2 bg-rose-500 hover:bg-rose-700 text-white font-bold'>
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link to='/login' className='px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold'>
                                Login
                            </Link>
                            <Link to='/signup' className='px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold'>
                                SignUp
                            </Link>
                        </>

                    )}
                </div>

                {/* Mobile Menu Button */}
                <button className='md:hidden' onClick={() => SetIsOpen(!isopen)} aria-label='Toggle menu'>
                    <img src={isopen ? CloseIcon : MenuIcon} alt='Menu' className='w-6 h-6' />
                </button>
            </div>

            {/* Mobile Menu */}
            {isopen && (
                <div className='md:hidden flex flex-col space-y-4 p-4'>
                    <Link to='/home' className='text-lg font-bold flex items-center hover:text-gray-300'>
                        <img src={HomeIcon} alt='Home' className='w-5 h-5 mr-2' />
                        Home
                    </Link>
                    <Link to='/product' className='text-lg font-bold flex items-center hover:text-gray-300'>
                        <img src={ProductIcon} alt='Product' className='w-5 h-5 mr-2' />
                        Products
                    </Link>
                    <Link to='/wishlist' className='text-lg font-bold flex items-center hover:text-gray-300'>
                        <img src={WishlistIcon} alt='Wishlist' className='w-5 h-5 mr-2' />
                        Wishlist
                    </Link>
                    <Link to='/cart' className='text-lg font-bold flex items-center hover:text-gray-300'>
                        <img src={CartIcon} alt='Cart' className='w-5 h-5 mr-2' />
                        Cart
                    </Link>
                    {user ? (
                        <button onClick={() => { SetIsOpen(false); logoutUser(); }}
                            className='px-4 py-2 bg-rose-500 hover:bg-rose-700 text-white font-bold'>
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link to='/login' className='px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold'>
                                Login
                            </Link>
                            <Link to='/signup' className='px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold'>
                                SignUp
                            </Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}
