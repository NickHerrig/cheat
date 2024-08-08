import { supabase } from "../supabaseClient"
import { redirect } from "react-router-dom"

export async function action() {
    const { error } = await supabase.auth.signOut()
    if (error) {
        console.log(error)
        throw new Error(error.message)
    }
    return redirect("/login")
}