import { useNavigate } from "react-router-dom";
import ButtonSignIn from "../Button/signIn";
import ButtonSignUp from "../Button/signup";

interface types {
  signupPage: boolean;
  signinPage: boolean;
}

export default function Header(props: types) {
  const navigate = useNavigate();
  return (
    <header
      className={`fixed w-full pl-[50px] pr-[50px] p-[15px] max-sm:pr-[10px] max-sm:pl-[10px]`}
    >
      <nav className="flex justify-between">
        <div className="font-inter text-xl select-none text-white">
          <span onClick={() => navigate("/")}>TodoList</span>
        </div>
        <div className="flex gap-[19px]">
          {!props.signinPage && (
            <ButtonSignIn homeButton={props.signupPage ? true : false} />
          )}
          {!props.signupPage && <ButtonSignUp />}
        </div>
      </nav>
    </header>
  );
}
