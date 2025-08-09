"use client";
import { useState } from "react";
import Header from "./components/Header";
import MainBoard from "./components/MainBoard";
import Sidebar from "./components/Sidebar";
import { useDebounce } from "./hooks/useDebounce";


export default function Home() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300); // 300ms d
  return (
    <div className="flex flex-col h-screen">
      <Header search={search} setSearch={setSearch} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <MainBoard search={debouncedSearch} />
      </div>
    </div>
  );
}
