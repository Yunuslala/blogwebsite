import { connectToDatabase } from '@/utils/mongodb';
import Blog from "@/Models/post";
import { NextResponse } from 'next/server';
import jwt from "jsonwebtoken";



export async function GET(req) {
  await connectToDatabase();
  try {
    const posts = await Blog.find().populate("author");
    if (!posts.length) {
      return NextResponse.json({ success: false, data: [],msg:"No Blog Posts available" },{status:404});
    }
    return NextResponse.json({ success: true, data: posts },{status:200});
  } catch (error) {
    console.log("error",error)
    return NextResponse.json({ success: false, }, { status: 500 });
  }
}



export async function POST(req) {
  await connectToDatabase();
  try {
    const body = await req.json();
    const token = req.headers.get('authorization');
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
    const {image,title,description,content}=body;
    console.log("req.body",req.body);

    if(!title || !description || !content || !image  ){
      return NextResponse.json({success:false,msg:"Please Provide All Fields"})
    }
    const CreateBlog=new Blog({image,title,description,content,author:decode.UserId});
    await CreateBlog.save()

    return NextResponse.json({ success: true, data: CreateBlog,msg:"Blog Has been created" },{status:200});
  } catch (error) {
    console.log("error",error)
    return NextResponse.json({ success: false,msg:"Internal server error" }, { status: 500 });
  }
}

// You can similarly define and export other HTTP methods (POST, PUT, DELETE) if needed
