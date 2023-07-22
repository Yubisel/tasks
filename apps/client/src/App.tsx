// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import { Fragment, useState } from "react";
// import { Listbox, Transition } from "@headlessui/react";
// import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { TaskProvider } from "./context/TaskContext";

function App() {
  // const [count, setCount] = useState(0);
  // const apiCall = async () => {
  //   const response = await fetch("/api");
  //   const text = await response.text();
  //   console.log(text);
  // };

  return (
    <div className="">
      {/* <Header /> */}
      <div className="bg-slate-900 min-h-screen">
        <div className="mx-auto max-w-xl py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-none">
            <TaskProvider>
              <TaskForm />
              <TaskList />
            </TaskProvider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
