import React from 'react';
import { useSelector } from 'react-redux';

const VehicleList = () => {
    const vehicles = useSelector((state) => state.parking.vehicles);

    return (
        <div className="vehicle-list">
            <h2 className='parked-vehicle'>Parked Vehicles</h2>
            {vehicles.length > 0 ? (
                <ul>
                    {vehicles.map((vehicle, index) => (
                        <li key={index}>
                            {vehicle.vehicle} - {vehicle.level}{vehicle.slotIndex + 1}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No vehicles parked.</p>
            )}
        </div>
    );
};

export default VehicleList;