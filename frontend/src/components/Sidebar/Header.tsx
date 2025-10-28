import { Contact, Settings } from "lucide-react";

const Header: React.FC = () => {
  return (
    <div className="p-4 bg-coffeeBg flex items-center justify-between">
      <h1 className="text-xl font-bold text-coffeeText">Messages</h1>
      <div className="flex space-x-3 text-coffeeAccent">
        <button className="p-2 rounded-full cursor-pointer">
          <Contact className="size-4" />
        </button>
        <button className="p-2 rounded-full cursor-pointer">
          <Settings className="size-4" />
        </button>
      </div>
    </div>
  );
};

export default Header;
