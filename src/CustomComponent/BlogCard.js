"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

const BlogCard = ({item}) => {
  const router=useRouter()
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="w-full mb-4">
            <img
              className="w-full h-48 object-cover"
              src={item?.image}
              alt="Latest blog image"
            />
          </div>
        </CardTitle>
        <CardDescription className="font-bold text-lg text-gray-900 mb-2">
          {" "}
          {item?.title}
        </CardDescription>
      </CardHeader>
      <CardContent>
      {item.description?.length > 100 ? item.description?.substring(0, 200) + "..." : item.description}
                        <span onClick={()=>router.push(`/Post/${item?._id}`)} className="font-normal cursor-pointer text-sm leading-tight text-left text-[#37B6FF]">
                            READ MORE{" "}
                        </span>
      </CardContent>
      <CardFooter>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img
              src={item.author.image}
              alt="profileimg"
              className="w-10 h-10 object-cover rounded-full"
            />
            <p className="font-semibold text-gray-800">{item.author.name}</p>
          </div>
          <p className="text-gray-600">{new Date(item?.createdAt).toLocaleDateString('en-US')}</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
