import Link from "next/link";
import { ExclamationIcon } from '@heroicons/react/outline';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
        <ExclamationIcon className="h-24 w-24 text-red-500 mb-4" />
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">Oops! The page you’re looking for doesn’t exist.</p>
        <Link href="/"  className="text-lg font-semibold text-blue-500 hover:text-blue-700">
         
            Go back to the homepage
      
        </Link>
      </div>
    )
  }