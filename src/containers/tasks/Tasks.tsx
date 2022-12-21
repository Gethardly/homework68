import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchTasks} from "./tasksThunks";
import TaskOutput from "./TaskOutput";
import axiosApi from "../../axiosApi";
import Spinner from "../../components/Spinners/Spinner";
import {TaskType} from "../../types";

const Tasks = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const loadingState = useAppSelector(state => state.tasks.fetchLoading);
  console.log(tasks);

  const changeStatus = async (id: string) => {
    const foundTask = tasks.find(task => task.id === id);
    if (foundTask !== undefined) {
      const task: TaskType = {
        id: foundTask.id,
        title: foundTask.title,
        done: !foundTask.done
      }
      await axiosApi.put('/tasks/' + id + '.json', task);
      await dispatch(fetchTasks());
    }
  };

  const deleteTask = async (id: string) => {
    if (window.confirm('Do you really want to delete this task?')) {
      await axiosApi.delete('/tasks/' + id + '.json');
      await dispatch(fetchTasks());
    }
  };

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);
  return (
    <div>
      {loadingState === 'pending' ? <Spinner/> : tasks.map(task => (
        <TaskOutput key={task.id} task={task} deleteTask={() => {
          deleteTask(task.id)
        }}
                    changeStatus={() => {
                      changeStatus(task.id)
                    }}/>
      ))}
    </div>
  );
};

export default Tasks;