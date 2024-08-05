import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls } from '@react-three/drei'

function Model({ url }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} />
}

export default function Root() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
      <h1 className="text-4xl font-bold text-white mb-8">🍩 It's Cheat Day! 🍩</h1>
      <div className="w-full max-w-2xl h-96">
        <Canvas camera={{ position: [0.5, 0.7, 0.2] }}>
          <ambientLight intensity={.90} />
          <Model url="/donut.glb" />
          <OrbitControls />
        </Canvas>
      </div>
    </div>
  )
}