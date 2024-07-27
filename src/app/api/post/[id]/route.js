import { connectToDatabase } from '@/utils/mongodb';
import Blog from "@/Models/post";
import { NextResponse } from 'next/server';
import jwt from "jsonwebtoken";
export async function GET(request,{params}) {
  await connectToDatabase();
  try {
    const {id}=params;

    const token = request.headers.get('authorization');
    if (!token) {
      return NextResponse.json(
        { success: false, msg: "Go first Login You are not authorised" },
        { status: 400 }
      );
    }
    const decode = await jwt.verify(token, process.env.secret);
    if (!decode) {
      return NextResponse.json(
        { success: false, msg: "Invalid Token Please Login Again to get token" },
        { status: 400 }
      );
    }
    const findBlog=await Blog.findOne({_id:id}).populate("author");
    if(!findBlog){
      return NextResponse.json({ success: false,msg:"No Blog Posts available Invalid Id" },{status:404});
    }
    return NextResponse.json({ success: true,msg:"Invidual blog dispersed", data: findBlog },{status:200});
  } catch (error) {
    console.log("error",error)
    return NextResponse.json({ success: false,msg:"Internal Server Error" }, { status: 500 });
  }
}



export async function PATCH(request,{params}) {
  await connectToDatabase();
  try {
    const body=await request.json()
    const token = request.headers.get('authorization');
    const {id}=params;
  if (!token) {
    return NextResponse.json(
      { success: false, msg: "Go first Login You are not authorised" },
      { status: 400 }
    );
  }
  const decode = await jwt.verify(token, process.env.secret);
  if (!decode) {
    return NextResponse.json(
      { success: false, msg: "Invalid Token Please Login Again to get token" },
      { status: 400 }
    );
  }
  const findBlog=await Blog.findOne({_id:id});
  if(!findBlog){
    return NextResponse.json({ success: false,msg:"Invalid Id " },{status:404});
  }
  const findBlogUser=await Blog.findOne({author:decode.UserId,_id:id});
  if(!findBlogUser){
    return NextResponse.json({ success: false,msg:"You are not authorised to edit this blog " },{status:400});
  }
    const {image,title,description,content}=body;
  
    const CreateBlog=await Blog.findOneAndUpdate({author:decode.UserId,_id:id},{image:image?image:findBlogUser?.image,title:title?title:findBlogUser.title,description:description?description:findBlogUser.description,content:content?content:findBlogUser.content},{new:true});


    return NextResponse.json({ success: true, data: CreateBlog,msg:"Blog Has been updated" },{status:200});
  } catch (error) {
    console.log("error",error)
    return NextResponse.json({ success: false,msg:"Internal server error" }, { status: 500 });
  }
}


export async function DELETE(request,{params}) {
  await connectToDatabase();
  try {
    const token = request.headers.get('authorization');
    const {id}=params;
  if (!token) {
    return NextResponse.json(
      { success: false, msg: "Go first Login You are not authorised" },
      { status: 400 }
    );
  }
  const decode = await jwt.verify(token, process.env.secret);
  if (!decode) {
    return NextResponse.json(
      { success: false, msg: "Invalid Token Please Login Again to get token" },
      { status: 400 }
    );
  }
  const findBlog=await Blog.findOne({_id:id});
  if(!findBlog){
    return NextResponse.json({ success: false,msg:"Invalid Id " },{status:404});
  }
  const findBlogUser=await Blog.findOne({author:decode.UserId,_id:id});
  if(!findBlogUser){
    return NextResponse.json({ success: false,msg:"You are not authorised to delete this blog " },{status:400});
  }
  
    await Blog.findOneAndDelete({_id:id})

    return NextResponse.json({ success: true,msg:"Blog Has been deleted successfully" },{status:200});
  } catch (error) {
    console.log(error)
    return NextResponse.json({ success: false, msg:"Internal server error"}, { status: 500 });
  }
}

// You can similarly define and export other HTTP methods (POST, PUT, DELETE) if needed
