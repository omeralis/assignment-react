import { Link } from "react-router-dom";
export default () => {
  return (
    <div className="container mx-auto px-4">
      "Home"{" "}
      <Link
        to="/logout"
        className="relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Logout
      </Link>
      <Link
        to="/login"
        className="relative flex mt-2 justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Login
      </Link>
    </div>
  );
};
