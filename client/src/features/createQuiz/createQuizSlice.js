/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    questions: [],
};

const questionSlice = createSlice({
    name: 'question',
    initialState,
    reducers: {
        setQuestion: (state, action) => {
            if (state.questions.length === action.payload.index) {
                state.questions.push(action.payload.data);
            } else {
                state.questions[action.payload.index] = action.payload.data;
            }
        },
        deleteQuestion: (state, action) => {
            state.questions.splice(action.payload, 1);
        },
        clearQuestion: (state) => {
            state.questions = [];
        },
    },
});

export const { setQuestion, clearQuestion, deleteQuestion } = questionSlice.actions;
export default questionSlice.reducer;
