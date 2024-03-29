import './App.css';
import CostumerHome from './Components/CostumerHome';
import Logout from './Components/Logout';
import SellerHome from './Components/SellerHome';
import SellerLogin from './Components/SellerLogin';
import SellerRegister from './Components/SellerRegister';
import {
  BrowserRouter,
  Routes, Route
} from "react-router-dom"
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/sellerlogin' element={<SellerLogin />} />
          <Route path='/sellerregister' element={<SellerRegister />} />
          <Route path='/sellerhome' element={<SellerHome />} />
          <Route path='/' element={<CostumerHome />} />
          <Route path='/logout' element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
