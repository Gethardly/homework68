import {TaskType} from "../../types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchTasks} from "./tasksThunks";
import {RootState} from "../../app/store";
import axiosApi from "../../axiosApi";


interface TasksState {
  tasks: TaskType[];
  fetchLoading: 'idle' | 'pending' | 'success' | 'failure';
}

const initialState: TasksState = {
  tasks: [],
  fetchLoading: "idle",
}

export const doneStatus = createAsyncThunk<void, undefined, { state: RootState }>(
  'task/status',
  async (arg, thunkAPI) => {
    const status = thunkAPI.getState().tasks.tasks;
    await axiosApi.put('/tasks.json', status);
  },
);

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state) => {
      state.fetchLoading = 'pending';
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
      state.fetchLoading = 'success';
    });
    builder.addCase(fetchTasks.rejected, (state) => {
      state.fetchLoading = 'failure';
    });
  },
});

export const tasksReducer = tasksSlice.reducer;