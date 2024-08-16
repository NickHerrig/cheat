import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls } from '@react-three/drei'
import { useRef } from 'react'

function Model({ url }) {
  const { scene } = useGLTF(url)
  const modelRef = useRef()

  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.x += delta * 0.05
      modelRef.current.rotation.y += delta * 1.5
      modelRef.current.rotation.z += delta * 0.05
    }
  })

  return <primitive ref={modelRef} object={scene} />
}

export default function Index() {
  return (
    <main className="flex-grow flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-white mb-8">Let's pick your cheat meal!</h1>
      <div className="w-full max-w-2xl h-96">
        <Canvas camera={{ position: [0, 0, -1] }}>
          <ambientLight intensity={0.90} />
          <Model url="/pizza.glb" />
          <OrbitControls />
        </Canvas>
      </div>
    </main>
  )
}