"use client";
import { useEffect, useState } from "react";
import {
  HomeIcon,
  PencilIcon,
  LogoutIcon,
  MenuIcon,
  XIcon,
} from "@heroicons/react/solid";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { logOut, setProfile } from "@/Redux/Slices/AuthSlice";
import getCookie from "@/utils/cookies";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const [session, setsession] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const router=useRouter();
  const { isLogged } = useSelector((state) => state.AuthSlice);
  const dispatch = useDispatch();
  useEffect(() => {
  
    const token = getCookie("token");
 
    if (token) {
      const fetchProfile = async () => {
        try {
          const { data } = await axios.get("/api/auth", {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          });
          if (data.success) {
        
            setsession(data.data);
            dispatch(setProfile(data.data));
          }
        } catch (error) {
          console.log("error", error);
        }
      };
      fetchProfile();
    }
  }, [isLogged]);
  const signOut = async () => {
    document.cookie = `token=; Max-Age=-99999999; path=/;`;
    router.push("/")
    dispatch(logOut());
  };

  return (
    <>
      <aside
        className={`bg-gray-800 text-white w-64 min-h-screen flex flex-col transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out fixed md:static`}
      >
        <div className="p-4 flex items-center justify-between md:justify-start">
          <div className="flex items-center space-x-4">
            {isLogged && (
              <>
                <Avatar>
                  <AvatarImage
                    src={session?.image}
                    className="cover"
                    alt="@shadcn"
                  />
                  <AvatarFallback>{session?.name}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold">{session?.name}</p>
                  <p className="text-gray-400">{session?.email}</p>
                </div>
              </>
            )}
          </div>
          <button className="md:hidden" onClick={() => setIsOpen(false)}>
            <XIcon className="h-6 w-6" />
          </button>
        </div>
        <nav className="mt-4 flex-1">
          <ul>
            <li className="px-4 py-2 hover:bg-gray-700 flex items-center">
              <HomeIcon className="h-5 w-5 mr-2" />
              <a href="/">Home</a>
            </li>
            <li className="px-4 py-2 hover:bg-gray-700 flex items-center">
              <PencilIcon className="h-5 w-5 mr-2" />
              <a href="/Post">Create Post</a>
            </li>
          </ul>
        </nav>
        {isLogged && (
          <div className="p-4 mb-[80px]">
            <button
              onClick={() => signOut()}
              className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded flex items-center justify-center"
            >
              <LogoutIcon className="h-5 w-5 mr-2" />
              Logout
            </button>
          </div>
        )}
      </aside>
     {!isOpen && <button
        className="md:hidden p-2 fixed  top-4 left-4 z-50 sm:mr-[20px]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MenuIcon className="h-6 w-6 text-white" />
      </button>}
    </>
  );
};

export default Sidebar;
