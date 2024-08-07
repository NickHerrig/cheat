import { supabase } from "../supabaseClient";
import { Form, useActionData } from "react-router-dom";

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const { data, error } = await supabase.auth.signInWithOtp({
    email: email,
    options: {
      emailRedirectTo: "http://localhost:5173/account",
    },
  });
  console.log(data)

  if (error) {
    throw new Error(error.error_description || error.message);
  } else {
    return { success: true };
  }
}

export default function Login() {
  const actionData = useActionData();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Sign in to Cheat Day
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            Sign in via magic link with your email below
          </p>
        </div>
        <Form className="mt-8 space-y-6" method="post">
          <div>
            <input
              name="email"
              type="email"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Your email"
            />
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Send magic link
            </button>
          </div>
          {actionData?.success && (
            <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md">
              <p className="text-sm font-medium">
                Check your email for a magic link to sign in
              </p>
            </div>
          )}
        </Form>
      </div>
    </div>
  );
}
