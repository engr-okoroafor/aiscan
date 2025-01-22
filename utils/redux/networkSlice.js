import { createSlice } from '@reduxjs/toolkit';

export const networkSlice = createSlice({
  name: 'networks',
  initialState: {
    networks: [],
    analysis: '',
  },
  reducers: {
    setNetworks: (state, action) => {
      state.networks = action.payload;
    },
    setAnalysis: (state, action) => {
      state.analysis = action.payload;
    },
  },
});

export const { setNetworks, setAnalysis } = networkSlice.actions;
export default networkSlice.reducer;
