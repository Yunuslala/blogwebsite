"use client"
import BlogForm from "@/CustomComponent/BlogForm";
import { FetchIndiv } from "@/Redux/Slices/BlogSlice";
import getCookie from "@/utils/cookies";
import axios from "axios";

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function Page(){
    const searchParams = useSearchParams()
    const id = searchParams.get('edit')

    const dispatch=useDispatch();
    useEffect(()=>{
        if(id){
            const token=getCookie("token")
            const fetchBlog=async()=>{
                const {data}=await axios.get(`http://localhost:3000/api/post/${id}`,{
                    headers: {
                        Authorization: token,
                        "Content-Type": "application/json",
                      },
                })
                console.log("blogdatapar",data.data)
                
                dispatch(FetchIndiv(data.data))
            }
            
            fetchBlog()
    
        }
    },[]);

    return(
        <BlogForm id={id} />
    )
} 