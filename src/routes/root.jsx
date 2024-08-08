import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls } from '@react-three/drei'
import { useLoaderData } from "react-router-dom"
import { supabase } from "../supabaseClient"
import Header from "../components/header"

export async function loader() {
  const { data, error } = await supabase.auth.getSession();
  return data

}

function Model({ url }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} />
}

export default function Root() {
  const { session } = useLoaderData()
  // console.log(session.user.email)
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Header session={session} />
      <main className="flex-grow flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-white mb-8">Let's pick your cheat meal!</h1>
        <div className="w-full max-w-2xl h-96">
          <Canvas camera={{ position: [0.5, 0.7, 0.2] }}>
            <ambientLight intensity={.90} />
            <Model url="/donut.glb" />
            <OrbitControls />
          </Canvas>
        </div>
      </main>
    </div>
  )
}