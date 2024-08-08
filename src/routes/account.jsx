import { supabase } from "../supabaseClient";
import { useLoaderData, redirect, Form, Link } from "react-router-dom";
import Header from "../components/header";

export async function loader() {
  const { data, error } = await supabase.auth.getSession()
  if (!data.session) {
    return redirect("/login");
  }
  
  // Fetch additional user details
  const { data: userDetails, error: userError } = await supabase
    .from('profiles')
    .select('username, first_name, last_name')
    .eq('id', data.session?.user?.id)
    .single();

  if (userError) {
    console.error("Error fetching user details:", userError);
  }

  return { data, userDetails };
}

export default function Account() {
  const { data, userDetails } = useLoaderData();
  const user = data.session.user;

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Header session={data.session} />
      <main className="flex-grow flex items-center justify-center">
        <div className="max-w-md w-full space-y-8 p-10 bg-gray-800 rounded-xl shadow-md">
          <h1 className="text-3xl font-bold text-white text-center">Account</h1>
          <div className="space-y-4">
            <p className="text-gray-300"><span className="font-semibold">Username:</span> {userDetails?.username || 'N/A'}</p>
            <p className="text-gray-300"><span className="font-semibold">First Name:</span> {userDetails?.first_name || 'N/A'}</p>
            <p className="text-gray-300"><span className="font-semibold">Last Name:</span> {userDetails?.last_name || 'N/A'}</p>
            <p className="text-gray-300"><span className="font-semibold">Email:</span> {user.email}</p>
          </div>
          <div className="flex gap-4 pt-6">
            <Link
              to="/account/edit"
              className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Edit Profile
            </Link>
            <Form action="/logout" method="post" className="flex-1">
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Logout
              </button>
            </Form>
          </div>
        </div>
      </main>
    </div>
  );
}