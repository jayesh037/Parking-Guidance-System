import { createSlice } from '@reduxjs/toolkit';

const createLevel = () => Array(18).fill(null);

const parkingSlice = createSlice({
  name: 'parking',
  initialState: {
    levels: {
      A: createLevel(),
      B: createLevel(),
      C: createLevel(),
      D: createLevel(),
      E: createLevel(),
      F: createLevel(),
      G: createLevel(),
      H: createLevel(),
    },
    vehicles: [],
  },
  reducers: {
    addVehicle(state, action) {
      const { level, slotIndex, vehicle } = action.payload;
      if (state.levels[level][slotIndex] === null) {
        const entryTime = new Date().getTime(); // Store entry time in milliseconds
        state.levels[level][slotIndex] = { vehicle, entryTime };
        state.vehicles.push({ level, slotIndex, vehicle, entryTime });
      }
    },
    removeVehicle(state, action) {
      const { level, slotIndex } = action.payload;
      if (state.levels[level][slotIndex]) {
        state.levels[level][slotIndex] = null;
        state.vehicles = state.vehicles.filter(v => 
          !(v.level === level && v.slotIndex === slotIndex)
        );
      }
    },
  },
});

export const { addVehicle, removeVehicle } = parkingSlice.actions;
export default parkingSlice.reducer;
