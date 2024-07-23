import { AiOutlinePlusCircle } from "react-icons/ai";
import { FaSignOutAlt } from "react-icons/fa";
import { useCallback, useContext, useEffect, useState } from "react";
import { UserLoged } from "../../services/userService";
import { UserContext } from "../../context/UserContext";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskSchema, TaskType } from "../../components/schema/tasksSchema";
import { CreateTask, GetTasks } from "../../services/tasksService";
import Card from "../../components/Card/card";

export default function Todolist() {
  const { user, setUser } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [isGeting, setIsGeting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  if (!Cookies.get("token")) {
    return (location.href = "/auth/signin");
  }

  const sendForm = useCallback(
    async (data: TaskType, event: any) => {
      event.preventDefault();
      setIsLoading(true);
      const response = await CreateTask(data);
      if (!response) {
        return console.log({ message: "Falha ao adicionar tarefa" });
      }
      console.log(response);
      reset();
      setIsLoading(false);
      return setIsSubmiting(!isSubmiting);
    },
    [isSubmiting]
  );

  const getTasks = useCallback(async () => {
    const response = await GetTasks();
    if (!response) console.log("Falha ao buscar tarefas!");
    setData(response.data);
    return setIsGeting(!isGeting);
  }, [isGeting]);

  function signout() {
    Cookies.remove("token");
    location.href = "/";
  }

  useEffect(() => {
    const abortController = new AbortController();
    GetUserLoged();
    getTasks();
    return () => abortController.abort();
  }, [sendForm]);

  return (
    <main className="h-dvh w-full bg-gradient-to-b from-gradient-start via-gradient-mid to-gradient-end">
      <header
        className={`w-full pl-[50px] pr-[50px] p-[15px] max-sm:pr-[10px] max-sm:pl-[10px]`}
      >
        <nav className="flex justify-between">
          <div className="font-inter text-[1.2rem] select-none text-white">
            <span>TodoList</span>
          </div>
          <div className="flex text-[1.2rem] justify-between items-center gap-[0.5rem]">
            <FaSignOutAlt
              className="text-red-500 cursor-pointer"
              onClick={signout}
            />
            <p className="text-slate-300 cursor-pointer select-none">
              {user.username}
            </p>
          </div>
        </nav>
      </header>
      <section className="flex flex-col items-center bg-gray-500 w-full h-[91.4%]">
        <div className="flex flex-col items-center w-3/4 md:w-[50%] p-1">
          <form
            action="post"
            onSubmit={handleSubmit(sendForm)}
            className="flex w-full flex-col justify-center items-center p-2 mb-2"
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
            {isLoading && (
              <span className="animate-pulse text-white">Loading . . .</span>
            )}
            {errors.task && (
              <span className="text-sm text-red-700 leading-4">
                {errors.task.message}
              </span>
            )}
          </form>
          <div className="fixed top-32 overflow-y-auto flex flex-col flex-nowrap items-center gap-2 p-1 pt-2 pb-2 mt-4 rounded max-h-[30rem] max-sm:max-h-[28rem] 2xl:max-h-[40rem] max w-3/4 md:w-[50%] bg-gray-600 ">
            {data.map((item: any) => (
              <Card
                key={item._id}
                task={item.task}
                id={item._id}
                getTasks={getTasks}
                status={item.status}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
