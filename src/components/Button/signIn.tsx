import { useNavigate } from "react-router-dom";

interface types {
  homeButton: boolean;
}

export default function ButtonSignIn(props: types) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/auth/signin")}
      className={`font-inter text-[1rem]
    ${
      props.homeButton
        ? "bg-gradient-to-r from-slate-400 to-slate-300 pl-3 pr-3 p-2 rounded leading-3 active:bg-gradient-to-l active:transition-colors"
        : `text-white hover:text-gray-200 max-sm:hidden`
    }
    `}
    >
      Sign in
    </button>
  );
}
