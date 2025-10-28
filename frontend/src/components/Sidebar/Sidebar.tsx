import Conversations from "./Conversations";
import Header from "./Header";
import SearchBar from "./SearchBar";
import UserProfile from "./UserProfile";

const Sidebar: React.FC = () => {
  return (
    <div className="min-h-screen bg-coffeeBg/90 border-r border-coffeeLight flex flex-col justify-between">
      <Header />
      <SearchBar />
      <Conversations />
      <UserProfile />
    </div>
  );
};

export default Sidebar;
