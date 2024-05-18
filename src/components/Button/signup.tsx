import { useNavigate } from "react-router-dom";

export default function ButtonSignUp() {
  const navigate = useNavigate()
  return (
    <button onClick={()=> navigate("/signup")} className="font-inter text-lg bg-gradient-to-r from-azul-primary to-azul-secondary pl-3 pr-3 p-1 rounded leading-3 active:bg-gradient-to-l active:transition-colors">
      Sign Up
    </button>
  );
}
