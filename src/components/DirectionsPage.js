import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { removeVehicle } from "../redux/parkingSlice";
import PaymentGateway from "./PaymentGateway";

const DirectionsPage = () => {
  const { level, slot } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const levels = useSelector((state) => state.parking.levels);
  const [showPayment, setShowPayment] = useState(false);
  const [showPath, setShowPath] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Start the animation after a short delay
    const timer = setTimeout(() => {
      setShowPath(true);
    }, 500);

    // Set complete state after animation ends
    const completeTimer = setTimeout(() => {
      setIsComplete(true);
    }, 3500);

    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, []);

  const handleRemoveVehicle = () => {
    dispatch(removeVehicle({ level: parseInt(level), slot: parseInt(slot) }));
    navigate("/parking");
  };

  const handlePayment = () => {
    setShowPayment(true);
  };

  // Split spots into left and right sides
  const leftSpots = levels[level].slice(0, 9);
  const rightSpots = levels[level].slice(9, 18);

  // Calculate direction indicators and path dimensions
  const selectedSlot = parseInt(slot);
  const isLeftSide = selectedSlot <= 9;
  const direction = isLeftSide ? "left" : "right";
  const spotIndex = isLeftSide ? selectedSlot - 1 : selectedSlot - 10;
  
  // Calculate distances based on spot position
  const verticalDistance = `${(spotIndex * 105) + 50}px`; 
  const horizontalDistance = "312px";  // Fixed horizontal distance to reach spots

  return (
    <div className="directions-page">
      <div className="directions-container">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Parking Directions
        </h2>

        {/* Entry Gate at Top */}
        <div className="gate entry-gate">
          <h3>Entry Gate</h3>
          <div className="gate-icon">🚗</div>
          <div className="gate-arrow">↓</div>
        </div>

        {/* Parking Layout */}
        <div className="parking-layout">
          <div className="level-info">
            <h3 className="text-xl font-semibold mb-4">
              Your Spot: Level {level}, Spot {slot}
            </h3>
            <p className="text-gray-600">
              Follow the highlighted path to reach your spot
            </p>
          </div>

          {/* Animated Path */}

          {/* Parking Spots Grid - Split into left and right */}
          <div className="spots-grid">
            <div className="level-section">
              <h3>Level A</h3>
              <div className="spots-container">
                {/* Left side spots */}
                <div className="spots-side">
                  {leftSpots.map((spot, index) => (
                    <div
                      key={`${level}-${index}`}
                      className={`spot ${spot ? "occupied" : ""} ${
                        index + 1 === parseInt(slot) ? "selected" : ""
                      }`}
                    >
                      <span className="spot-number">
                        {level}
                        {index + 1}
                      </span>
                      {spot && (
                        <>
                          <span className="vehicle-number">{spot.vehicle}</span>
                          {index + 1 === parseInt(slot) && (
                            <button
                              className="remove-btn"
                              onClick={handlePayment}
                            >
                              Remove Vehicle
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>

                {/* Center aisle with path */}
                <div className="center-aisle">
                  <div className={`path-container ${showPath ? "show" : ""}`}>
                    <div 
                      className="path-line"
                      style={{ "--vertical-distance": verticalDistance }}
                    ></div>
                    <div 
                      className={`turn-dot ${isComplete ? "show" : ""}`}
                    ></div>
                    <div 
                      className={`horizontal-line ${direction}`}
                      style={{ 
                        "--horizontal-distance": horizontalDistance,
                        "--vertical-distance": verticalDistance
                      }}
                    ></div>
                    <div 
                      className={`moving-car ${direction}`}
                      style={{ 
                        "--vertical-distance": verticalDistance,
                        "--horizontal-distance": horizontalDistance
                      }}
                    >
                      🚗
                    </div>
                  </div>
                </div>

                {/* Right side spots */}
                <div className="spots-side">
                  {rightSpots.map((spot, index) => (
                    <div
                      key={`${level}-${index + 9}`}
                      className={`spot ${spot ? "occupied" : ""} ${
                        index + 10 === parseInt(slot) ? "selected" : ""
                      }`}
                    >
                      <span className="spot-number">
                        {level}
                        {index + 10}
                      </span>
                      {spot && (
                        <>
                          <span className="vehicle-number">{spot.vehicle}</span>
                          {index + 10 === parseInt(slot) && (
                            <button
                              className="remove-btn"
                              onClick={handlePayment}
                            >
                              Remove Vehicle
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Directions */}
          <div className="directions-info">
            <h3 className="text-xl font-semibold mb-4">
              How to Reach Your Spot
            </h3>
            <ol className="directions-list">
              <li>Enter through the Entry Gate (Top)</li>
              <li>Proceed to Level {level}</li>
              <li>Turn {direction} at the aisle</li>
              <li>Look for Spot {slot}</li>
              <li>Park your vehicle in the marked spot</li>
              <li>Exit through the Exit Gate (Bottom) when leaving</li>
            </ol>
          </div>
        </div>

        {/* Exit Gate at Bottom */}
        <div className="gate exit-gate">
          <h3>Exit Gate</h3>
          <div className="gate-icon">🚗</div>
          <div className="gate-arrow">↑</div>
        </div>
      </div>

      {/* Payment Gateway Modal */}
      {showPayment && (
        <div className="payment-overlay">
          <PaymentGateway
            onClose={() => setShowPayment(false)}
            onSuccess={() => {
              setShowPayment(false);
              handleRemoveVehicle();
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DirectionsPage;
