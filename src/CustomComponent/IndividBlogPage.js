"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { Trash } from "lucide-react";
import { Pencil } from "lucide-react";

import axios from "axios";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AlertToast, ErrorToast, SuccessToast } from "./Dialog";
import getCookie from "@/utils/cookies";

const IndividBlogPage = ({ blog }) => {
  const [isauthuser, setisauthuser] = useState(false);
  const router = useRouter();
  const { Profile } = useSelector((state) => state.AuthSlice);
  useEffect(() => {
    if (blog?.author?._id == Profile?._id) {
      setisauthuser(true);
    }
  }, []);
  const deleteblog = async (id) => {
    try {
        const token = getCookie("token");
        const { data } = await axios.delete(`http://localhost:3000/api/post/${id}`, {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        });
        if(data.success){
            SuccessToast(data.msg);
            router.push("/")
          }else{
            AlertToast(data.msg)
          }
        } catch (error) {
          console.log("error",error)
          ErrorToast(error.response.data.msg)
        }
   
  };
  return (
    <div className="w-[90%]  bg-white mx-auto flex flex-col items-start justify-start ">
      <div className="w-[100%]  pr-5 flex flex-col justify-start items-start">
        <div className="flex flex-col items-start justify-start sm:flex-col w-[100%]  space-y-8 sm:space-y-0 sm:space-x-8  sm:h-full ">
          <div className="w-full sm:w-[65%]">
            <img
              className="w-full h-[200px] sm:h-[400px] object-cover"
              src={blog?.image}
              alt="blogimage"
            />
            {isauthuser && (
              <div className="w-[50%] mt-[15px] flex justify-between">
                <Trash
                  className="cursor-pointer w-[50px]"
                  onClick={() => deleteblog(blog?._id)}
                />
                <Pencil
                  className="cursor-pointer w-[50px]"
                  onClick={() => router.push(`/Post?edit=${blog?._id}`)}
                />
              </div>
            )}
            <div className="w-full mt-[15px]">
              <p className="font-bold text-2xl sm:text-3xl leading-8 sm:leading-[27.6px] text-left text-[#000000]">
                {blog?.title}
              </p>
            </div>
            <div className="w-full mt-[15px]">
              <p className="font-bold text-lg sm:text-xl leading-6 sm:leading-[27.6px] text-left text-[#000000]">
                {blog?.content}
              </p>
            </div>
            <div className="w-full flex flex-col sm:flex-row sm:justify-between items-center space-y-2 sm:space-y-0 mt-[15px]">
              <div className="flex-shrink-0">
                <Avatar>
                  <AvatarImage
                    src={blog?.author?.image}
                    className="cover"
                    alt={blog?.author?.name}
                  />
                  <AvatarFallback>{blog?.author?.name}</AvatarFallback>
                </Avatar>
              </div>
              <div className="text-center sm:text-left sm:flex sm:items-center sm:space-x-2">
                <p className="font-bold text-xs leading-[13.81px] text-[#5F5F5F]">
                  Uploaded By
                </p>
                <p className="font-bold text-sm leading-[16.11px] text-[#000000]">
                  {blog?.author?.name}
                </p>
                <p className="flex items-center font-bold text-sm leading-[13.81px] text-[#5F5F5F]">
                  {new Date(blog?.createdAt).toLocaleDateString("en-US")}
                </p>
              </div>
            </div>
            <div className="flex flex-col w-full space-y-4 sm:space-y-[15px] font-normal text-sm leading-[16.11px] text-left text-[#5F5F5F] mt-[15px]">
              <p>{blog?.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividBlogPage;
