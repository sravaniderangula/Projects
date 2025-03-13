import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthProvider from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Products from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import ProtectedRoutes from './routes/protectedRoute';
import CartPage from './pages/Cart';
import WishlistPage from './pages/Wishlist';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route element={<ProtectedRoutes/>}>
                        <Route path="/home" element={<Products />} />
                        <Route path="/product/:id" element={<ProductDetails />} />
                        <Route path='/cart' element={<CartPage />} />
                        <Route path='/wishlist' element={<WishlistPage/>} />

                    </Route>
                    <Route path="/login" element={<Login />} />
                    <Route path='/signup' element={<SignUp />} />

                </Routes>
                <Footer />
            </Router>
        </AuthProvider>
    );
}

export default App;
