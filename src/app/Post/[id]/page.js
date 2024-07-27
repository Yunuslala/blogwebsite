"use client"

import IndividBlogPage from "@/CustomComponent/IndividBlogPage";
import { FetchIndiv } from "@/Redux/Slices/BlogSlice";
import getCookie from "@/utils/cookies";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";



export default function Page(){
    const {id}=useParams();
    const [data,setdata]=useState({});
    const dispatch=useDispatch()
    useEffect(()=>{
        if(id){
            const token=getCookie("token")
            const fetchBlog=async()=>{
                try {
                    const {data}=await axios.get(`/api/post/${id}`,{
                        headers: {
                            Authorization: token,
                            "Content-Type": "application/json",
                          },
                    })
                    setdata(data.data);
                    dispatch(FetchIndiv(data.data))
                } catch (error) {
                    
                }
               
            }
            
            fetchBlog()
    
        }
    },[])
   


    return(
        <IndividBlogPage blog={data}  />
    )
} 