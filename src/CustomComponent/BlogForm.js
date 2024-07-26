"use client"
import getCookie from "@/utils/cookies";
import axios from "axios";
import { useEffect, useState } from "react";
import { AlertToast, ErrorToast, SuccessToast } from "./Dialog";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const BlogForm = ({ id }) => {
  const { IndividualBlog } = useSelector((state) => state.BlogSlice);
  const router=useRouter()
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  useEffect(() => {
    console.log("id", id, IndividualBlog);

    if (id && IndividualBlog) {
      setTitle(IndividualBlog.title || '');
      setDescription(IndividualBlog.description || '');
      setContent(IndividualBlog.content || '');
      setUrl(IndividualBlog.image || '');
    }
  }, [IndividualBlog, id]);


  const uploadImage = async (e) => {
    try {
      const image = e.target.files[0];
      const formdata = new FormData();
      formdata.append('file', image);
      formdata.append('upload_preset', 'bkyytudp');

      setLoading(true);
      const { data } = await axios.post(
        `https://api.cloudinary.com/v1_1/dofqdjya8/upload`,
        formdata,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }
      );
      setUrl(data.secure_url);
      setUploadSuccess(true);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = getCookie('token');
      const payload = {
        title,
        description,
        content,
        image: url,
      };
      const { data } = await axios.post('http://localhost:3000/api/post', payload, {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        }
      });
      if (data.success) {
        SuccessToast(data.msg);
      } else {
        AlertToast(data.msg);
      }
    } catch (error) {
      console.log('error', error);
      ErrorToast(error.response.data.msg);
    }
  };
  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      const token = getCookie('token');
      const payload = {
        title,
        description,
        content,
        image: url,
      };
      const { data } = await axios.patch(`http://localhost:3000/api/post/${id}`, payload, {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        }
      });
      if (data.success) {
        SuccessToast(data.msg);
        router.push(`/Post/${id}`)
      } else {
        AlertToast(data.msg);
      }
    } catch (error) {
      console.log('error', error);
      ErrorToast(error.response.data.msg);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-2xl font-bold mb-6">{id ? 'Edit Blog' : 'Create a New Blog'}</h2>
      <form onSubmit={id ? handleEdit : handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
            Blog Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
            Blog Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            rows="3"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700 font-bold mb-2">
            Blog Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            rows="6"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
            Blog Image
          </label>
          <input
            type="file"
            id="image"
            onChange={uploadImage}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
          {url && (
            <div className="mt-2">
              <img src={url} alt="Blog" className="w-[200px] h-auto rounded-lg" />
            </div>
          )}
          {loading && <p>Uploading Blog Image...</p>}
          {uploadSuccess && !loading && <p>Image uploaded successfully!</p>}
        </div>

        <div className="mb-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {loading ? 'Uploading Blog Image' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;

