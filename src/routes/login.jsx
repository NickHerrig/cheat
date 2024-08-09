import { supabase } from "../supabaseClient";
import { Form, useActionData, useNavigation } from "react-router-dom";
import Header from "../components/header";
import { getURL } from "../utils";

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const { data, error } = await supabase.auth.signInWithOtp({
    email: email,
    options: {
      emailRedirectTo: getURL() + "account",
    },
  });

  if (error) {
    throw new Error(error.error_description || error.message);
  } else {
    return { success: true };
  }
}

export default function Login() {
  const actionData = useActionData();
  const navigation = useNavigation();

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Header />
      <main className="flex-grow flex items-center justify-center">
        <div className="max-w-md w-full space-y-8 p-10 bg-gray-800 rounded-xl shadow-md">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white">
              Sign in to Cheat Day
            </h1>
            <p className="mt-2 text-sm text-gray-300">
              Sign in via magic link with your email below
            </p>
          </div>
          <Form className="mt-8 space-y-6" method="post">
            <div>
              <input
                name="email"
                type="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-600
                         placeholder-gray-400 text-white bg-gray-700 focus:outline-none focus:ring-indigo-500 
                         focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Your email"
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={navigation.state === "submitting"}
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                  navigation.state === "submitting"
                    ? "bg-indigo-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                }`}
              >
                {navigation.state === "submitting"
                  ? "Sending..."
                  : "Send magic link"}
              </button>
            </div>
            {actionData?.success && (
              <div className="mt-4 p-3 bg-green-800 border border-green-600 text-green-100 rounded-md">
                <p className="text-sm font-medium">
                  Check your email for a magic link to sign in
                </p>
              </div>
            )}
          </Form>
        </div>
      </main>
    </div>
  );
}
