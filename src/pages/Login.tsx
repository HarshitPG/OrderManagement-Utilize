import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Login: React.FC = () => {
  const googleClientID = process.env.REACT_APP_GOOGLE_CLIENTID;
  const navigate = useNavigate();
  useEffect(() => {
    if (googleClientID) {
      window.google?.accounts.id.initialize({
        client_id: googleClientID,
        callback: handleCallbackResponse,
      });
      const logInButton = document.getElementById("logIn");
      if (logInButton instanceof HTMLElement) {
        window.google?.accounts.id.renderButton(logInButton, {
          theme: "outline",
          size: "large",
          type: "standard",
        });
        window.google?.accounts.id.prompt();
      } else {
        console.error(
          "Google Client ID not found. Check your environment configuration."
        );
      }
    }
  }, [googleClientID]);

  const handleCallbackResponse = (response: any) => {
    const userObject = jwtDecode(response.credential);
    localStorage.setItem("user", JSON.stringify(userObject));
    navigate("/dashboard");
  };

  return (
    <div className="h-screen w-screen bg-gray-400">
      <div className="fixed grid place-items-center backdrop-blur-sm top-0 right-0 left-0 z-50 w-full inset-0 h-modal h-full justify-center items-center">
        <div className="relative container m-auto px-6">
          <div className="m-auto md:w-100">
            <div className="rounded-xl bg-gray-800 shadow-xl">
              <div className="p-8">
                <div className="space-y-4">
                  <h2 className="mb-8 text-2xl text-white font-bold">
                    Log in with google
                  </h2>
                </div>
                <div className="mt-10 grid space-y-4">
                  <button id="logIn"></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
