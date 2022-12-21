import React, {useState} from 'react';
import { TaskFormType } from '../../types';
import axiosApi from "../../axiosApi";
import {useNavigate} from "react-router-dom";
import BtnSpinner from "../Spinners/BtnSpinner";

const initialState: TaskFormType = {
  title: '',
  done: false,
}

const NewTaskForm = () => {
  const navigate = useNavigate();
  const [task, setTask] = useState<TaskFormType>(initialState);
  const [adding, setAdding] = useState(false);

  const createTask = async (task: TaskFormType) => {
    try {
      setAdding(true);
      await axiosApi.post('/tasks.json', task);
      navigate('/');
    } finally {
      setAdding(false);
    }
  };

  const taskChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;

    setTask(prev => ({...prev, [name]: value}));
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createTask({
      ...task
    });
  };
  return (
    <form onSubmit={onFormSubmit}>
      <fieldset>
        <legend>Create new task</legend>
        <div className="mb-3">
          <label className="form-label">Task</label>
          <input type="text"
                 className="form-control w-50"
                 id="title" name="title"
                 onChange={taskChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">{adding && <BtnSpinner/>} Add new task</button>
      </fieldset>
    </form>
  );
};

export default NewTaskForm;