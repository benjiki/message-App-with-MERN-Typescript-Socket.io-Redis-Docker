import { useState } from "react";
import { Mail } from "lucide-react";
import LoginForm from "./partials/LoginForm";
import RegForm from "./partials/RegFrom";
const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="min-h-screen w-full bg-coffeeBg  flex flex-col md:flex-row">
      <div className="w-full md:w-6/12 bg-coffeeSurface p-0 text-coffeeText flex flex-col justify-center">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-8">
            <div className="bg-coffeeAccent p-4 rounded-full">
              <Mail className="size-10" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Welcome to Messager</h1>
          <p>just a app that works as a messager for users ....</p>
        </div>
        <div className="mt-10 text-center">
          <p className="text-sm opacity-80">
            Try messager to test it or whatever..
          </p>
        </div>
      </div>
      <div className="w-full md:w-6/12 flex p-8 justify-center items-center">
        {isLogin ? (
          <div className="w-full md:w-[400px]">
            <LoginForm onSwitch={() => setIsLogin(false)} />
          </div>
        ) : (
          <div className="w-full md:w-[400px]">
            <RegForm onSwitch={() => setIsLogin(true)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
