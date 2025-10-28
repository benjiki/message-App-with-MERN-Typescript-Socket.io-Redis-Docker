import { Route, Routes } from "react-router";
import Auth from "./pages/Auth/Auth";
import Chat from "./pages/Chat/Chat";

import { Toaster } from "sonner";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>

      {/* Keep richColors to respect your CSS vars */}
      <Toaster position="top-right" theme="system" />
    </>
  );
};

export default App;
