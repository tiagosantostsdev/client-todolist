import { useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { DeleteTasks, UpdateTasks } from "../../services/tasksService";

export default function Card({ task, id, getTasks, status }: any) {
  const [getEditStatus, setEditStatus] = useState(false);
  const [getTaskStatus, setTaskStatus] = useState(true);
  const [getEditTask, setEditTask] = useState({
    task: "",
  });

  const handleInputChange = (e: any) => {
    setEditTask((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleEditTask = () => {
    setEditStatus(!getEditStatus);
  };

  const editTasks = async (id: string) => {
    const response = await UpdateTasks(id, getEditTask.task);
    if (!response) console.log("Falha ao editar a tarefa");
    console.log(response.data);
    setEditStatus(false);
    getTasks();
  };

  const deleteTasks = async (id: string) => {
    const response = await DeleteTasks(id);
    if (!response) {
      return console.log("Erro ao deletar tarefas");
    }
    console.log(response.data);
    getTasks();
  };

  const editStatus = async (id: string, task: string) => {
    const response = await UpdateTasks(id, task, getTaskStatus);
    getTasks();
    console.log(response.data);
  };

  return (
    <>
      <div
        id={id}
        className={`${
          !status
            ? "bg-slate-200 drop-shadow-md w-[99%] flex justify-between items-center p-2 rounded-sm"
            : "bg-gray-400 drop-shadow-md w-[99%] flex justify-between items-center p-2 rounded-sm"
        }`}
      >
        <span className="cursor-pointer">
          {status ? (
            <BsCheck2Circle
              onClick={() => {
                setTaskStatus(!getTaskStatus);
                return editStatus(id, task);
              }}
              size={24}
              color="green"
            />
          ) : (
            <MdOutlineRadioButtonUnchecked
              onClick={() => {
                setTaskStatus(!getTaskStatus);
                return editStatus(id, task);
              }}
              size={24}
            />
          )}
        </span>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            return editTasks(id);
          }}
          className="flex w-full h-auto"
        >
          {getEditStatus ? (
            <input
              className="m-auto w-[99%] h-auto p-2 border border-slate-300 outline-none rounded"
              type="text"
              id="task"
              onChange={handleInputChange}
              defaultValue={task}
            />
          ) : (
            <span
              className={`${
                !status
                  ? "m-auto p-1 w-[99%]"
                  : "m-auto p-1 line-through w-[99%]"
              }`}
            >
              {task}
            </span>
          )}
        </form>
        <span>
          <AiOutlineEdit
            onClick={handleEditTask}
            className="text-gray-600 cursor-pointer"
            size={24}
          />
          <AiOutlineDelete
            className="text-red-500 cursor-pointer"
            size={24}
            onClick={() => deleteTasks(id)}
          />
        </span>
      </div>
    </>
  );
}
