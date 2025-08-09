"use client";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import MainBoard from "./components/MainBoard";
import Sidebar from "./components/Sidebar";
import { useDebounce } from "./hooks/useDebounce";

export default function Home() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Header
        search={search}
        setSearch={setSearch}
        onMenuClick={() => setSidebarOpen(true)}
      />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar (desktop & mobile overlay) */}
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main Content */}
        <MainBoard search={debouncedSearch} />
      </div>
    </div>
  );
}
