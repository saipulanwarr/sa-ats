import { createSlice } from "@reduxjs/toolkit";

export const atsSlice = createSlice({
  name: "ats",
  initialState: {
    negara: {},
    pelabuhan: {},
    barang: {},
  },
  reducers: {
    addNegara: (state, action) => {
      state.negara = action.payload;
    },
    addPelabuhan: (state, action) => {
      state.pelabuhan = action.payload;
    },
    addBarang: (state, action) => {
      state.barang = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addNegara, addPelabuhan, addBarang } = atsSlice.actions;

export default atsSlice.reducer;
