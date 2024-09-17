import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "./customer/components/Navigation";
import Footer from "./customer/components/pages/Footer";
import ProductOverview from "./customer/components/pages/ProductOverwiew";
import Checkout from "./customer/components/pages/Checkout";
import Payment from "./customer/components/pages/Payment";
import Registration from "./customer/components/pages/Registration";
import Productlist from "./customer/components/pages/Productlist";
import Sign from "./customer/components/pages/Sign";
import CartPage from "./customer/components/pages/CartPage";
import CartFetch from "./customer/components/pages/CartFetch";
import Main from "./customer/components/pages/Main";
import Cart1 from "./customer/components/pages/Cart1";
import OrderConfirmation from "./customer/components/pages/OrderConfirmation";
import Order from "./customer/components/pages/Order";
import Review from "./customer/components/pages/Review";
import { createContext, useReducer } from "react";
import { initialState, reducer } from "./reducer/useReducer";
import Logout from "./customer/components/pages/Logout";


// import { UserProvider } from "./customer/components/pages/userContext";

export const userContext = createContext();

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <userContext.Provider value={{ state, dispatch }}>
        <Router>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/navigation" element={<Navigation />} />
            <Route path="/ProductOverview" element={<ProductOverview />} />
            <Route path="/Checkout" element={<Checkout />} />
            <Route path="/Payment" element={<Payment />} />
            <Route path="/Registration" element={<Registration />} />
            <Route path="/Productlist" element={<Productlist />} />
            <Route path="/Footer" element={<Footer />} />
            <Route path="/sign" element={<Sign />} />
            <Route path="/cartpage" element={<CartPage />} />
            <Route path="/cartfetch" element={<CartFetch />} />
            <Route path="/main" element={<Main />} />
            <Route path="/cart1" element={<Cart1 />} />
            <Route path="/order" element={<OrderConfirmation />} />
            <Route path="/summary" element={<Order />} />
            <Route path="/review" element={<Review />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </Router>
      </userContext.Provider>
    </>
  );
};

export default App;
