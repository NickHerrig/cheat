import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls } from '@react-three/drei'
import './App.css'

function Model({ url }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} />
}

function App() {
  return (
    <>
      <h1>🍩 It's Cheat Day! 🍩</h1>
      <div style={{ height: '400px', width: '100%' }}>
        <Canvas camera={{ position: [0.5, 0.7, 0.2] }}>
          <ambientLight intensity={.90} />
          <Model url="/donut.glb" />
          <OrbitControls />
        </Canvas>
      </div>
    </>
  )
}

export default App