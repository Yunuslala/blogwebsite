"use client";
import { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const uploadImage = async (e) => {
    try {
      const image = e.target.files[0];
      const formdata = new FormData();
      formdata.append("file", image);
      formdata.append("upload_preset", 'bkyytudp');

      setLoading(true);
      const { data } = await axios.post(
        `https://api.cloudinary.com/v1_1/dofqdjya8/upload`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUrl(data.secure_url);
      setUploadSuccess(true);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (loading) {
      
      return;
    }

   
    try {
      
      const payload={
        name,email,password,image:url,action:"register"
      }

      const { data } = await axios.post(`/api/auth`,payload);

      if(data.success){
        SuccessToast(data.msg);
        router.push("/Auth/SignIn")
      }else{
        AlertToast(data.msg)
      }
    } catch (error) {
      console.log("error",error)
      ErrorToast(error.response.data.msg)
    }
  };

 

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md">
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            value={name}
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-gray-700 font-bold mb-2"
          >
            Profile Image
          </label>
          <input
            type="file"
            id="image"
            onChange={uploadImage}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
          {loading && <p>Loading...</p>}
          {uploadSuccess && !loading && <p>Image uploaded successfully!</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded" disabled={loading}>
          {loading ? 'Uploading Image...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
