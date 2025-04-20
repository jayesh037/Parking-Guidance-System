import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addVehicle } from '../redux/parkingSlice';

const AddVehicle = () => {
    const [vehicle, setVehicle] = useState('');
    const [slotIndex, setSlotIndex] = useState(0);
    const dispatch = useDispatch();
    
    // Get the number of slots from the Redux store
    const slots = useSelector((state) => state.parking.slots);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Ensure slot index is valid
        if (slotIndex >= 0 && slotIndex < slots.length) {
            dispatch(addVehicle({ slotIndex: parseInt(slotIndex), vehicle }));
            setVehicle('');
            setSlotIndex(0);
        } else {
            alert(`Invalid slot number! Please choose a number between 0 and ${slots.length - 1}.`);
        }
    };

    return (
        <form className="add-vehicle-form" onSubmit={handleSubmit}>
            <h2>Add New Vehicle</h2>
            <input
                type="text"
                className="form-input"
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}
                placeholder="Vehicle Number"
                required
            />
            <input
                type="number"
                className="form-input"
                value={slotIndex}
                onChange={(e) => setSlotIndex(e.target.value)}
                placeholder="Slot Number (0-9)"
                min="0"
                max={slots.length - 1} // Set max to the last slot index
                required
            />
            <button type="submit" className="submit-btn">Park Vehicle</button>
        </form>
    );
};

export default AddVehicle;
