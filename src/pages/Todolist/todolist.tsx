import { AiOutlineDelete } from "react-icons/ai"; 
import { AiFillEdit } from "react-icons/ai"; 
import { BsCheck2Circle } from "react-icons/bs";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FaSignOutAlt } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { UserLoged } from "../../services/userService";
import { UserContext } from "../../context/UserContext";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskSchema, TaskType } from "../../components/schema/tasksSchema";
import { CreateTask, GetTasks } from "../../services/tasksService";

export default function Todolist() {
  const { user, setUser } = useContext(UserContext);
  const [data, setData] = useState([]);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskType>({ resolver: zodResolver(TaskSchema) });

  async function GetUserLoged() {
    const response = await UserLoged();
    if (!response) {
      return console.log("Falha ao buscar usuário logado!");
    }
    setUser(response.data);
  }

  async function sendForm(data: TaskType) {
    const response = await CreateTask(data);
    if (!response) {
      return console.log({ message: "Falha ao adicionr tarefa" });
    }
    console.log(response);
    reset();
  }

  async function getTasks() {
    const response = await GetTasks();
    if (!response) console.log("Falha ao buscar tarefas!");
    setData(response.data);
  }

  function signout() {
    Cookies.remove("token");
    location.href = "/";
  }

  useEffect(() => {
    GetUserLoged();
    getTasks();
  }, [sendForm]);

  return (
    <main className="h-screen w-full bg-gradient-to-b from-gradient-start via-gradient-mid to-gradient-end">
      <header
        className={`w-full pl-[50px] pr-[50px] p-[15px] max-sm:pr-[10px] max-sm:pl-[10px]`}
      >
        <nav className="flex justify-between">
          <div className="font-inter text-xl select-none text-white">
            <span>TodoList</span>
          </div>
          <div className="flex text-xl justify-between items-center gap-[1.8rem]">
            <p className="text-slate-300 cursor-pointer select-none">
              {user.username}
            </p>
            <FaSignOutAlt
              className="text-red-500 cursor-pointer"
              onClick={signout}
            />
          </div>
        </nav>
      </header>
      <section className="flex flex-col items-center bg-gray-500 w-full h-[91.5%]">
        <div className="w-3/4 md:w-[50%] p-1">
          <form
            onSubmit={handleSubmit(sendForm)}
            className="flex flex-col justify-center items-center p-2 mb-2"
          >
            <span className="justify-center flex items-center gap-2 w-full">
              <input
                {...register("task")}
                type="text"
                id="task"
                className="w-[89%] h-10 border-none outline-slate-500 rounded p-1"
                placeholder="Type your tasks here"
              />
              <button
                className="p-1 pr-4 pl-4 bg-slate-800 h-10 rounded-md hover:bg-green-500 transition-colors"
                type="submit"
              >
                <AiOutlinePlusCircle
                  className="bg-green-500 rounded-full"
                  size={32}
                />
              </button>
            </span>
            {errors.task && (
              <span className="text-sm text-red-700 leading-4">
                {errors.task.message}
              </span>
            )}
          </form>
          <div className="fixed overflow-y-auto flex flex-col flex-nowrap items-center gap-2 pt-2 pb-2 mt-4 rounded w-[74.4%] md:w-[50%] h-[33rem] md:h-[45rem] bg-gray-400 ">
            {data.map((item: any) => (
              <div
                key={item._id}
                className="bg-slate-200 drop-shadow-md w-[99%] flex justify-between items-center p-2 rounded-lg"
              >
                <span className="cursor-pointer">
                  {false ? (
                    <BsCheck2Circle size={24} />
                  ) : (
                    <MdOutlineRadioButtonUnchecked size={24} />
                  )}
                </span>
                <p className="border w-[90%] text-xl leading-6 selection:bg-slate-500">
                  {item.task}
                </p>
                <span className="fixed right-1">
                  <div className="">
                    <span><AiFillEdit /></span>
                    <span><AiOutlineDelete /></span>
                  </div>
                  <BiDotsHorizontalRounded
                    className="cursor-pointer"
                    size={26}
                  />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
