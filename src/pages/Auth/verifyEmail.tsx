import { MdOutlineVerified } from "react-icons/md";
import { useParams } from "react-router-dom";
import { EmailVerify } from "../../services/userService";
import { useState } from "react";

export default function VerifyEmail() {
  const [verified, setVerified] = useState(false);
  const { token } = useParams() as { token: string };

  async function Verify() {
    const response = await EmailVerify(token);
    if (!response) {
      return console.log({ message: "Erro ao verificar o email" });
    }
    setVerified(true);
    location.href = "/auth/signin"
  }
  Verify();

  return (
    <section className="font-inter flex items-center justify-center w-full h-screen bg-gradient-to-b from-gradient-start via-gradient-mid to-gradient-end">
      {!verified ? (
        <div className="flex flex-col items-center justify-center bg-[#d9d9d942] w-[420px] max-sm:w-[20rem] p-4 rounded-3xl">
          <span className="animate-spin text-green-500 rounded-full border-[3px] border-t-blue-600 w-[150px] h-[150px]">
            
          </span>
          <p className="text-gray-400">Please wait...</p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center bg-[#d9d9d942] w-[420px] max-sm:w-[20rem] p-4 rounded-3xl">
          <span className="text-green-500">
            <MdOutlineVerified className="animate-pulse" size={100} />
          </span>
          <p className="text-green-500">User email verified</p>
          <p className="text-gray-400 text-sm">
            You will be redirect to signin...
          </p>
        </div>
      )}
    </section>
  );
}
