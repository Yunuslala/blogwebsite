// /app/api/route.js
import { connectToDatabase } from "@/utils/mongodb";
import User from "@/Models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { serialize } from 'cookie';

// Handle different POST requests

export async function POST(request) {
  const body = await request.json(); // Parse JSON body
  const {action}=body;
  if(action=="register"){
    return handleRegister(body);
  }
  else if(action=="login"){
    return handleLogin(body);
  }else {
      return NextResponse.json(
        { success: false, msg: "Invalid endpoint" },
        { status: 404 }
      );
  }
}

export async function GET(request) {
  await connectToDatabase();
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
  const { UserId } = decode;
  const profile = await User.findOne({ _id: UserId });
  if (!profile) {
    return NextResponse.json(
      { success: false, msg: "Invaid User Go For Registration" },
      { status: 400 }
    );
  }
  return NextResponse.json(
    { success: true, msg: "Profile", data: profile },
    { status: 200 }
  );
}

async function handleRegister({ name, email, password, image }) {
  await connectToDatabase();
  if (!name || !email || !password || !image) {
    return NextResponse.json(
      { success: false, msg: "Please provide all fields" },
      { status: 400 }
    );
  }

  const hash = await bcrypt.hash(password, 10);
  const user = new User({
    name,
    email,
    password: hash,
    image,
  });
  await user.save();
  return NextResponse.json(
    { success: true, msg: "Registration successful" },
    { status: 200 }
  );
}

async function handleLogin({ email, password }) {
  try {
    await connectToDatabase();
    
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { success: false, msg: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, msg: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const token = jwt.sign({ UserId: user._id }, process.env.secret);

    const serializedToken = serialize('token', token, {

      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });

    const response = NextResponse.json(
      { success: true, msg: 'Login successful' },
      { status: 200 }
    );
    response.headers.set('Set-Cookie', serializedToken);

    return response;
  } catch (error) {
    console.log("error",error)
    return NextResponse.json(
      { success: false, msg: 'Internal server error' },
      { status: 500 }
    );
  }
 
}


