import { FaInstagram, FaLinkedin, FaFacebook } from "react-icons/fa";
import ButtonSignIn from "../../components/Button/signIn";
import Header from "../../components/Header/header";

export default function HomePage() {
  return (
    <>
      <section className="h-screen w-full bg-gradient-to-b from-gradient-start via-gradient-mid to-gradient-end">
        <Header signupPage={false} signinPage={false}/>
        <div className=" justify-center items-center flex w-full h-full">
          <div className="text-center p-2">
            <h1 className="text-white text-2xl mb-1">Hello, welcome!</h1>
            <p className="text-gray-primary mb-2 leading-5">
              To-do list is a simple way to <br />
              remember your tasks every single day.
            </p>
            <ButtonSignIn homeButton={true}/>
          </div>
        </div>
        <footer className="fixed bottom-0 w-full flex flex-col gap-2 p-1 justify-center items-center ">
          <p className="text-white">Minhas redes socias</p>
          <span className="flex text-white gap-12">
            <a href="#" target="blank">
              <FaFacebook className="text-[#3B5998]" size={30} />
            </a>
            <a href="#" target="blank">
              <FaLinkedin className="text-[#0E76A8]" size={30} />
            </a>
            <a href="#" target="_blank">
              <FaInstagram
                className="rounded-[50%] bg-gradient-to-b from-orange-500 to-red-900"
                size={30}
              />
            </a>
          </span>
        </footer>
      </section>
    </>
  );
}
