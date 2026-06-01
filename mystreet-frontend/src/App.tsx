import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Brands from './pages/Brands';
import NewArrivals from './pages/NewArrivals';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

function App() {
  console.log("Current path:", window.location.pathname);
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-red-100 selection:text-red-900">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation/:id" element={<OrderConfirmation />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/new-arrivals" element={<NewArrivals />} />
            {/* Other routes will be added in subsequent phases */}
            <Route path="*" element={
              <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <h2 className="text-4xl font-semibold mb-4 uppercase">Debug: Page Not Found</h2>
                <p className="text-gray-500">Requested Path: {window.location.pathname}</p>
              </div>
            } />
          </Routes>
        </main>
        
        <footer className="bg-gray-50 border-t border-gray-100 py-12 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-1">
                <div className="w-6 h-6 bg-slate-900 rounded flex items-center justify-center mr-1">
                  <span className="text-white font-black text-xs italic">M</span>
                </div>
                <span className="text-xl font-black tracking-tighter text-slate-900 uppercase">
                  MyStreeT<span className="text-red-600">.</span>
                </span>
              </div>
              <p className="text-gray-500 text-sm">
                © 2026 MyStreeT Sneaker Shop. Built for Foundation Certification.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-slate-900 transition-colors">Privacy</a>
                <a href="#" className="text-gray-400 hover:text-slate-900 transition-colors">Terms</a>
                <a href="#" className="text-gray-400 hover:text-slate-900 transition-colors">Contact</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
