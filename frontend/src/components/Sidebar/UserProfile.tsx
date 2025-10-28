// src\components\Sidebar\UserProfile.tsx
import { LogOut } from "lucide-react";
import { useAuthStore } from "../../stores/authStore";
import { useQueryClient } from "@tanstack/react-query";
import { authService } from "../../services/authService";
import { useNavigate } from "react-router";

const UserProfile: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const logoutUser = async () => {
    await authService.logout();
    logout();
    await queryClient.removeQueries({ queryKey: ["auth"] });

    return navigate("/auth");
  };
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

      <button
        onClick={() => logoutUser()}
        className="text-coffeeDark hover:text-coffeeLight cursor-pointer"
      >
        <LogOut className="size-4" />
      </button>
    </div>
  );
};

export default UserProfile;
