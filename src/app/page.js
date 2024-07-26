
import BlogCard from "@/CustomComponent/BlogCard";
import axios from "axios";


export default async function Page() {
  try {
    const { data } = await axios.get("http://localhost:3000/api/post");

    return (
      <div>
        <div className="flex-1 p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.data?.length &&
            data?.data?.map((item) => <BlogCard item={item} key={item._id} />)}
          {/* Add more BlogCard components as needed */}
        </div>
      </div>
    );
  } catch (error) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div>
          <p>{error.response.data.msg}</p>
        </div>
      </main>
    );
  }
}
