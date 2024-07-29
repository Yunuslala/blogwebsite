"use client"
import BlogCard from "@/CustomComponent/BlogCard";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page() {
  const [data, setdata] = useState([]);

  useEffect(() => {
    fetch();
  }, []);
  const fetch = async () => {
    try {
      const { data } = await axios.get("/api/post");
      setdata(data.data);
    } catch (error) {}
  };

  return (
    <div>
      <div className="flex-1 p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.length ? (
          data?.map((item) => <BlogCard item={item} key={item._id} />)
        ) : (
          <div>
            <p>No Blog Post Available Please Create One</p>
          </div>
        )}
      </div>
    </div>
  );
}
