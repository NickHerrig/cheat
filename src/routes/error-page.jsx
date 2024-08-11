import { useRouteError } from "react-router-dom";
import Header from "../components/header";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-6 text-center">
          <h1 className="text-4xl font-bold text-white">Oops!</h1>
          <p className="text-xl text-gray-300">Sorry, an unexpected error has occurred.</p>
          <p className="text-lg text-red-400 italic">
            {error.statusText || error.message}
          </p>
        </div>
      </main>
    </div>
  );
}