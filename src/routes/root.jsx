import { Outlet, useLoaderData } from "react-router-dom"
import Header from "../components/header"
import { supabase } from "../supabaseClient"

export async function loader() {
  const { data, error } = await supabase.auth.getSession();
  return data

}

export default function Root() {
  const { session } = useLoaderData()

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-900">
        <Header session={session} />
        <Outlet />
      </div>
    </>
  )
}