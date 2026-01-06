import { createSlice } from "@reduxjs/toolkit";

const loadFromLocalStorage = () => {
  const data = localStorage.getItem("tasks");

  return data ? JSON.parse(data) : [];
};

const saveToLocalStorage = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const takeSlice = createSlice({
  name: "tasks",
  initialState: {
    list: loadFromLocalStorage(),
  },
  reducers: {
    addTask: (state, action) => {
      state.list.push(action.payload);
      saveToLocalStorage(state.list);
    },
    // addTask: (state, action) =>{
    //     state.list.push({
    //         id: Date.now(),
    //         text: action.payload,
    //         completed: false
    //     });
    //     saveToLocalStorage(state.list);
    // },
    toggleTask: (state, action) => {
      const task = state.list.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        saveToLocalStorage(state.list);
      }
    },
    deleteTask: (state, action) => {
      state.list = state.list.filter((task) => task.id !== action.payload);
      saveToLocalStorage(state.list);
    },
    editTask: (state, action) => {
      const { id, text, priority} = action.payload;
      const task = state.list.find((task) => task.id === id);
      // const priority = state.list.find((task) => task.id === id);
      if (task) {
        task.text = text;
        task.priority = priority
        saveToLocalStorage(state.list);
      }
    },
  },
});

export const { addTask, toggleTask, deleteTask, editTask } = takeSlice.actions;
export default takeSlice.reducer;
