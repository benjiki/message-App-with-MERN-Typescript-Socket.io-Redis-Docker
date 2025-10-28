import { Route, Routes } from "react-router";
import Auth from "./pages/Auth/Auth";
import Chat from "./pages/Chat/Chat";

import { Toaster } from "sonner";
import { GuestRoute, PrivateRoute } from "./PageGuards";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Chat />} />
        </Route>
        <Route element={<GuestRoute />}>
          <Route path="/auth" element={<Auth />} />
        </Route>
      </Routes>

      {/* Keep richColors to respect your CSS vars */}
      <Toaster
        toastOptions={{
          classNames: {
            toast: "!bg-coffeeBg",
            title: "!text-coffeeText",
            description: "!text-coffeeTextAlt",
          },
        }}
        position="top-right"
        theme="system"
      />
    </>
  );
};

export default App;
