import { createSlice } from '@reduxjs/toolkit';

const MessageSlice = createSlice({
  name: 'message',
  initialState: { messages: null },
  reducers: {
    setMessage: (state, action) => {
      state.messages = action.payload;
    },
    clearClear: (state) => {
      state.messages = null;
    },
  },
});

export const { setMessage, clearClear } = MessageSlice.actions;

export default MessageSlice.reducer;
