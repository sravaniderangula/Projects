import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthProvider from './context/AuthContext'; // ✅ Default import for AuthProvider
import Navbar from './components/Navbar';
// import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
// import Products from './pages/Products';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <Routes>
                    {/* <Route path="/home" element={<Home />} /> */}
                    <Route path="/login" element={<Login />} />
                    <Route path='/signup' element={<SignUp/>}/>
                    {/* <Route path="/product" element={<Products />} /> */}
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
