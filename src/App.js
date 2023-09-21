import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import DriverListing from './component/DriverListing';
import DriverCreate from './component/DriverCreate';
import DriverEdit from './component/DriverEdit';

function App() {
  return (
    <div className="App">
      <h1>Driver management</h1>
     <BrowserRouter>
        <Routes>
          <Route path='/' element={<DriverListing/>}></Route>
          <Route path='/driver/create' element={<DriverCreate/>}></Route>
          <Route path='/driver/edit/:id' element={<DriverEdit/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
 
}

export default App;
