import './App.css';
import CostumerHome from './Components/CostumerHome';
import Logout from './Components/Logout';
import OneSellerData from './Components/OneSellerData';
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
      <h1>Vegibles</h1>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SellerLogin />} />
          <Route path='/sellerregister' element={<SellerRegister />} />
          <Route path='/sellerhome' element={<SellerHome />} />
          <Route path='/costumerhome' element={<CostumerHome />} />
          {/* <Route path={"/onesellerdata/:id"} element={<OneSellerData />} /> */}
          <Route path='/logout' element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
