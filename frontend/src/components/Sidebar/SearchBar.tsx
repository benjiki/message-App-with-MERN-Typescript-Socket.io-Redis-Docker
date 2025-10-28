import { Search } from "lucide-react";

const SearchBar: React.FC = () => {
  return (
    <div className="p-4 relative bg-coffeeBg">
      <input
        type="text"
        placeholder="Search conversation...."
        className="w-full text-sm bg-coffeePrimary text-coffeeText placeholder:text-shadow-coffeeText rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-coffeeSuccess"
      />
      <Search className="absolute size-[17px] text-coffeeText left-[30px] top-[50%] -translate-y-[50%]" />
    </div>
  );
};

export default SearchBar;
