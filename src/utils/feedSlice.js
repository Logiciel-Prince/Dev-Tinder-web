import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
    initialState: null,
    reducers: {
        addFeed: (state, action) => {
            return action.payload;
        },
        removeFeed: (state, action) => {
            return null;
        },
        removeUserFromFeed: (state, action) => {
            if (state) {
                return state.filter((user) => user._id !== action.payload);
            }
            return state;
        }
    }
});

export const { addFeed, removeFeed, removeUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;