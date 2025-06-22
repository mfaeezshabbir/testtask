import Link from "next/link";
import { Search, Bell, Mail, ArrowLeft } from "lucide-react";

export default function AppHeader() {
  return (
    <header className="h-16 border-b border-gray-200 flex items-center justify-between px-6 bg-white">
      <div className="flex items-center">
        <Link href="/" className="flex items-center gap-2 text-2xl">
          <ArrowLeft className="w-6 h-6 p-1 border rounded-full" />
          <span className="font-bold">Website Design</span>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative bg-[#F2F4F8] rounded-full w-56 h-[49px] flex items-center justify-center">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="pl-10 pr-4 py-2 rounded-full w-full bg-[#F2F4F8] border-none outline-none"
          />
        </div>
        <div className="bg-[#F2F4F8] rounded-[24.5px] w-[94px] h-[49px] flex items-center justify-center gap-2 p-2 top-[20px] left-[1361px]">
          <button className="relative flex items-center justify-center">
            <Bell className=" -6 h-6 text-gray-600" />
            <span className="absolute top-0 right-1 bg-red-500 rounded-full w-2 h-2"></span>
          </button>
          <button className="flex items-center justify-center">
            <Mail className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  );
}
