import { Toaster } from "react-hot-toast";
import Dashboard from "./components/Dashboard";
import Nav from "./components/Nav";

function App() {

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col">
      <Toaster
        position="bottom-left"
        reverseOrder={false}
      />
      <Nav />
      <div className="flex-1 overflow-auto pt-16">
        <Dashboard />
      </div>
    </div>
  )
}

export default App
