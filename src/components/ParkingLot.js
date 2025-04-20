import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { addVehicle, removeVehicle } from '../redux/parkingSlice';
import PaymentGateway from './PaymentGateway';

const ParkingLot = () => {
    const levels = useSelector((state) => state.parking.levels);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;

    const [vehicleNumber, setVehicleNumber] = useState('');
    const [selectedSlotIndex, setSelectedSlotIndex] = useState(null);
    const [selectedLevel, setSelectedLevel] = useState('A');
    const [showPayment, setShowPayment] = useState(false);
    const [parkingFee, setParkingFee] = useState(0);
    const [selectedVehicle, setSelectedVehicle] = useState(null);

    // Set initial values from chatbot state
    useEffect(() => {
        if (state?.fromChatbot) {
            setSelectedLevel(state.level);
            setSelectedSlotIndex(state.slot);
        }
    }, [state]);

    const calculateParkingFee = (entryTime) => {
        const exitTime = new Date().getTime();
        const timeSpent = exitTime - entryTime;
        const minutesSpent = Math.ceil(timeSpent / (1000 * 60)); // Convert to minutes
        
        // Calculate fee based on time spent
        // ₹10 per minute, ₹200 per hour (whichever is less)
        const perMinuteFee = minutesSpent * 10;
        const perHourFee = Math.ceil(minutesSpent / 60) * 200;
        
        return Math.min(perMinuteFee, perHourFee);
    };

    const handleSlotClick = (index) => {
        setSelectedSlotIndex(index);
    };

    const handleAddVehicle = () => {
        if (vehicleNumber.trim() !== '') {
            dispatch(addVehicle({ 
                level: selectedLevel, 
                slotIndex: selectedSlotIndex, 
                vehicle: vehicleNumber 
            }));
            setVehicleNumber('');
            setSelectedSlotIndex(null);
            // Redirect to DirectionsPage
            navigate(`/directions/${selectedLevel}/${selectedSlotIndex + 1}`);
        } else {
            alert('Please enter a valid vehicle number.');
        }
    };

    const handleRemoveVehicle = (index) => {
        const vehicleInfo = levels[selectedLevel][index];
        if (vehicleInfo) {
            const fee = calculateParkingFee(vehicleInfo.entryTime);
            setParkingFee(fee);
            setSelectedVehicle({ level: selectedLevel, slotIndex: index });
            setShowPayment(true);
        }
    };

    const handlePaymentComplete = () => {
        if (selectedVehicle) {
            dispatch(removeVehicle(selectedVehicle));
            setShowPayment(false);
            setSelectedVehicle(null);
            setParkingFee(0);
        }
    };

    const handlePaymentCancel = () => {
        setShowPayment(false);
        setSelectedVehicle(null);
        setParkingFee(0);
    };

    const handleLevelChange = (e) => {
        setSelectedLevel(e.target.value);
        setSelectedSlotIndex(null);
        setVehicleNumber('');
    };

    return (
        <div className="parking-lot">
            <h2 className="parking-lot-text">Designated Parking Area</h2>
            
            {!state?.fromChatbot && (
                <div className="level-selector">
                    <label htmlFor="level-select">Select Level: </label>
                    <select 
                        id="level-select" 
                        value={selectedLevel} 
                        onChange={handleLevelChange}
                        className="level-dropdown"
                    >
                        {Object.keys(levels).map(level => (
                            <option key={level} value={level}>Level {level}</option>
                        ))}
                    </select>
                </div>
            )}

            <div className="slots-grid">
                {state?.fromChatbot ? (
                    // Show only the selected slot
                    <div 
                        key={state.slot} 
                        className={`parking-spot ${levels[state.level][state.slot] ? 'occupied' : ''}`}
                        onClick={() => handleSlotClick(state.slot)}
                    >
                        <h4>{`${state.level}${state.slot + 1}`}</h4>
                        <p>{levels[state.level][state.slot]?.vehicle || 'Available'}</p>
                        {levels[state.level][state.slot] && (
                            <button 
                                className="remove-btn" 
                                onClick={() => handleRemoveVehicle(state.slot)}
                            >
                                Remove Vehicle
                            </button>
                        )}
                        {selectedSlotIndex === state.slot && !levels[state.level][state.slot] && (
                            <div>
                                <input
                                    type="text"
                                    value={vehicleNumber}
                                    onChange={(e) => setVehicleNumber(e.target.value)}
                                    placeholder="Enter Vehicle Number"
                                    className="form-input"
                                />
                                <button onClick={handleAddVehicle} className="submit-btn">Add Vehicle</button>
                            </div>
                        )}
                    </div>
                ) : (
                    // Show all slots
                    levels[selectedLevel].map((slot, index) => {
                        const slotName = `${selectedLevel}${index + 1}`;
                        const vehicleInfo = slot ? slot.vehicle : null;
                        return (
                            <div 
                                key={index} 
                                className={`parking-spot ${vehicleInfo ? 'occupied' : ''}`} 
                                onClick={() => handleSlotClick(index)}
                            >
                                <h4>{slotName}</h4>
                                <p>{vehicleInfo || 'Available'}</p>
                                {vehicleInfo && (
                                    <button 
                                        className="remove-btn" 
                                        onClick={() => handleRemoveVehicle(index)}
                                    >
                                        Remove Vehicle
                                    </button>
                                )}
                                {selectedSlotIndex === index && !vehicleInfo && (
                                    <div>
                                        <input
                                            type="text"
                                            value={vehicleNumber}
                                            onChange={(e) => setVehicleNumber(e.target.value)}
                                            placeholder="Enter Vehicle Number"
                                            className="form-input"
                                        />
                                        <button onClick={handleAddVehicle} className="submit-btn">Add Vehicle</button>
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </div>

            {showPayment && (
                <div className="payment-overlay">
                    <PaymentGateway
                        amount={parkingFee}
                        onPaymentComplete={handlePaymentComplete}
                        onPaymentCancel={handlePaymentCancel}
                        merchantName="Parking System"
                        upiId="parking@upi"
                        transactionNote="Parking Fee"
                    />
                </div>
            )}
        </div>
    );
};

export default ParkingLot;
