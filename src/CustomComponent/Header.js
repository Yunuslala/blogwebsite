"use client";
import { useSelector } from "react-redux";

const Header = () => {
  const { isLogged } = useSelector((state) => state.AuthSlice);

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
     <div className="flex max-w-xs-header w-[90%]  sm:w-[100%]  xs:w-[70%] md:w-[70%] lg:w-[80%] xl:w-[80%] mx-auto justify-between items-center">
  <h1 className="text-lg md:text-xl font-bold mx-auto">Welcome To Blogs</h1>
  {!isLogged && (
    <nav className="flex justify-between w-[60%] md:w-[40%] space-x-4 md:space-x-8">
      <a href="/Auth/SignIn" className="block mb-2 hover:border-b border-white">
        Login
      </a>
      <a href="/Auth/SignUp" className="block mb-2 hover:border-b border-white">
        Sign Up
      </a>
    </nav>
  )}
</div>

    </header>
  );
};

export default Header;
