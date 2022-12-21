import React from 'react';
import {Route, Routes} from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import NewTaskForm from "./components/NewTaskForm/NewTaskForm";
import Tasks from "./containers/tasks/Tasks";

function App() {
  return (
    <>
      <header>
        <NavBar/>
      </header>
      <main className="container-fluid">
        <Routes>
          <Route path="/" element={<Tasks/>}/>
          <Route path="/new-task" element={<NewTaskForm/>}/>
          <Route path="*" element={<h1>Page not found :(</h1>}></Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
