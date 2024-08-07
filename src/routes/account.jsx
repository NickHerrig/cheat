import { supabase } from "../supabaseClient";
import { useLoaderData, redirect } from "react-router-dom";

export async function loader() {
  const { data, error } = await supabase.auth.getSession();
  if (!data.session) {
    return redirect("/login");
  }
  return data;
}

export default function Account() {
  const data = useLoaderData();
  return (
    <div>
      <h1>Account</h1>
      <p>Email: {data.session.user.email}</p>
    </div>
  )

}
