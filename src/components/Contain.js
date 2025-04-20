import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, useAnimation } from "framer-motion";
import ParkingLot from "./ParkingLot";
import { addVehicle } from "../redux/parkingSlice"; // Import the addVehicle action

const BookingForm = ({ onClose, dispatch }) => {
    const levels = useSelector((state) => state.parking.levels);
    const [selectedLevel, setSelectedLevel] = useState('');
    const [selectedSlot, setSelectedSlot] = useState('');
    const [vehicleNumber, setVehicleNumber] = useState('');

    const handleLevelChange = (e) => {
        setSelectedLevel(e.target.value);
        setSelectedSlot('');
        setVehicleNumber('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedLevel && selectedSlot && vehicleNumber.trim() !== '') {
            dispatch(addVehicle({ 
                level: selectedLevel, 
                slotIndex: parseInt(selectedSlot) - 1, 
                vehicle: vehicleNumber 
            }));
            onClose();
        } else {
            alert('Please select a level, slot, and enter a vehicle number.');
        }
    };

    // Get available slots for the selected level
    const availableSlots = selectedLevel 
        ? levels[selectedLevel]
            .map((slot, index) => ({ slot, index }))
            .filter(({ slot }) => slot === null)
            .map(({ index }) => index + 1)
        : [];

    return (
        <div className="booking-form">
            <h2>Book Available Spot</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="level">Select Level:</label>
                    <select
                        id="level"
                        value={selectedLevel}
                        onChange={handleLevelChange}
                        required
                        className="form-input"
                    >
                        <option value="">Choose a level</option>
                        {Object.keys(levels).map(level => (
                            <option key={level} value={level}>Level {level}</option>
                        ))}
                    </select>
                </div>

                {selectedLevel && (
                    <div className="form-group">
                        <label htmlFor="slot">Select Available Spot:</label>
                        <select
                            id="slot"
                            value={selectedSlot}
                            onChange={(e) => setSelectedSlot(e.target.value)}
                            required
                            className="form-input"
                        >
                            <option value="">Choose a spot</option>
                            {availableSlots.map(slot => (
                                <option key={slot} value={slot}>
                                    {selectedLevel}{slot}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                <div className="form-group">
                    <label htmlFor="vehicleNumber">Vehicle Number:</label>
                    <input
                        type="text"
                        id="vehicleNumber"
                        value={vehicleNumber}
                        onChange={(e) => setVehicleNumber(e.target.value)}
                        placeholder="Enter vehicle number"
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-buttons">
                    <button type="submit" className="button confirm-btn">Confirm Booking</button>
                    <button type="button" className="button cancel-btn" onClick={onClose}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

const Contain = () => {
    // Redux state for parking levels
    const levels = useSelector((state) => state.parking.levels);
    const dispatch = useDispatch();

    // Calculate total available slots across all levels
    const totalSlots = Object.values(levels).reduce((acc, level) => acc + level.length, 0);
    const availableSlots = Object.values(levels).reduce((acc, level) => 
        acc + level.filter(slot => slot === null).length, 0);
    const availablePercentage = (availableSlots / totalSlots) * 100;

    // State for booking form visibility
    const [showBookingForm, setShowBookingForm] = useState(false);

    // Animation controls
    const controls = useAnimation();

    useEffect(() => {
        controls.start({ scale: 1, opacity: 1 });
    }, [controls]);

    return (
        <div className="contain">
            <div className="side">
                <div className="box">
                    <motion.div
                        className="pie-chart"
                        style={{ "--percentage": availablePercentage }}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={controls}
                        transition={{ duration: 3, ease: [0.5, 1, 0.5, 1] }}
                    >
                        <div className="chart-center-text">
                            {availablePercentage.toFixed(0)}%
                        </div>
                        <div className="design"></div>
                    </motion.div>
                </div>
                <div className="but">
                    <button
                        type="button"
                        className="button reserve-btn"
                        onClick={() => setShowBookingForm(true)}
                    >
                        Reserve Spot
                    </button>
                </div>
                <div className="avail">
                    <h1>
                        Available Spots: <span className="available-number">{availableSlots}</span>
                    </h1>
                </div>
            </div>

            {showBookingForm && (
                <BookingForm
                    onClose={() => setShowBookingForm(false)}
                    dispatch={dispatch}
                />
            )}

            <div className="image">
                <ParkingLot />
            </div>
        </div>
    );
};

export default Contain;
