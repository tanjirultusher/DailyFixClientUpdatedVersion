import React, {useEffect} from 'react';
import { Link } from 'react-router';


const ErrorPage = () => {

  useEffect(()=>{
  
          document.title = "404 Not Found - PlayOn";
      },[]);
  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center items-center text-center">
          <div>
            <img src="https://i.ibb.co.com/8LgZqgN6/error-404.png" alt="404 Error" />
          </div>

          <h1 className="text-4xl font-bold text-white">Oops! Page Not Found</h1>
          <p className="text-xl text-gray-600 mb-1 max-w-2xl mx-auto">
            The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>

          <div className="space-y-0 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Link
              to="/"
              className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 inline-block"
            >
              Go to Home
            </Link>
            
          </div>
        </div>
      </div>


    </div>
  );
};

export default ErrorPage;