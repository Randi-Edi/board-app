
import Header from "./components/Header";
import MainBoard from "./components/MainBoard";
import Sidebar from "./components/Sidebar";


export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <MainBoard />
      </div>
    </div>
  );
}
