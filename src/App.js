import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import './App.css';
import Navbar from './components/Navbar';
import Contain from './components/Contain';
import Footer from './components/Footer';
import VehicleList from './components/VehicleList';
import Content from './components/Content';
import AboutUs from './components/About_us';
import HowItWorks from './components/HowItWorks';
import ParkingLot from './components/ParkingLot';
import DirectionsPage from './components/DirectionsPage';
import Chatbot from './components/Chatbot';

// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min';


const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="app-container">
          <Navbar />
          <div className="image-container">
            <div className="content-wrapper">
              <Routes>
                <Route path="/" element={
                  <>
                    <Contain />
                    <VehicleList />
                    <AboutUs />
                    <Content />
                    <HowItWorks />
                  </>
                } />
                <Route path="/parking" element={<ParkingLot />} />
                <Route path="/directions/:level/:slot" element={<DirectionsPage />} />
              </Routes>
            </div>
          </div>
          <Footer />
          <Chatbot/>
        </div>
      </Router>
    </Provider>
  );
};

export default App;