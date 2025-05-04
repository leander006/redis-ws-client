import { createSlice } from '@reduxjs/toolkit';

const RoomSlice = createSlice({
  name: 'room',
  initialState: { rooms: null },
  reducers: {
    setRoom: (state, action) => {
      state.rooms = action.payload;
    },
    clearRoom: (state) => {
      state.rooms = null;
    },
  },
});

export const { setRoom, clearRoom } = RoomSlice.actions;

export default RoomSlice.reducer;
