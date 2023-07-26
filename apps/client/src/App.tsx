import { ToastContainer } from "react-toastify";
import Toast from "./components/Toast";
import Loading from "./components/Loading";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="">
      {/* <Header /> */}
      <div className="bg-slate-900 min-h-screen">
        <div className="mx-auto max-w-2xl py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-none">
            <TaskForm />
            {/* <Bar /> */}
            <Loading />
            <TaskList />
          </div>
        </div>
      </div>
      <Toast />
      <ToastContainer />
    </div>
  );
}

export default App;
