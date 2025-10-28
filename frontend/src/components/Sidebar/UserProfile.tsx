import { LogOut } from "lucide-react";
import { useAuthStore } from "../../stores/authStore";

const UserProfile: React.FC = () => {
  const { user } = useAuthStore();
  return (
    <div className="p-4 border-t border-gray-200 flex items-center space-x-3">
      <img
        src="https://github.com/shadcn.png"
        alt="User"
        className="size-10 rounded-full object-cover"
      />
      <div className="flex-1 min-w-0 text-coffeeText">
        <h2 className="font-semibold trancate text-sm">
          {user?.username}({user?.connectCode})
        </h2>
        <p className="text-xs text-coffeeTextAlt/90">Online</p>
      </div>

      <button className="text-coffeeDark hover:text-coffeeLight cursor-pointer">
        <LogOut className="size-4" />
      </button>
    </div>
  );
};

export default UserProfile;
