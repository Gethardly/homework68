import React from 'react';
import {TaskType} from "../../types";

interface Props {
  task: TaskType;
  deleteTask: React.MouseEventHandler;
  changeStatus: React.MouseEventHandler;
}

const TaskOutput: React.FC<Props> = ({task, deleteTask, changeStatus}) => {
  /*const [check, setCheck] = useState(true);
  const handleChange = () => {
    setCheck(!check);
  };*/

  return (
    <div className="card w-25 mt-3 d-flex flex-row align-items-baseline p-2">
      <div className="card-body">
        <h5 className="card-title d-inline-block">{task.title}</h5>
        <input className="form-check-input ms-2"
               type="checkbox"
               defaultChecked={task.done}
               onClick={changeStatus}
        />
      </div>
      <button className="btn btn-danger d-block" onClick={deleteTask}>X</button>
    </div>
  );
};

export default TaskOutput;