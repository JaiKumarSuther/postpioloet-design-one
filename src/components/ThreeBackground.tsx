import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, OrbitControls } from '@react-three/drei'
import { useRef, useMemo, Suspense } from 'react'
import * as THREE from 'three'

function Particles() {
  const ref = useRef<THREE.Points>(null!)
  const [sphere] = useMemo(() => {
    const sphere = new Float32Array(2000 * 3)
    for (let i = 0; i < 2000; i++) {
      const i3 = i * 3
      sphere[i3] = (Math.random() - 0.5) * 20
      sphere[i3 + 1] = (Math.random() - 0.5) * 20
      sphere[i3 + 2] = (Math.random() - 0.5) * 20
    }
    return [sphere]
  }, [])

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10
      ref.current.rotation.y -= delta / 15
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial 
          transparent 
          color="#3b82f6" 
          size={0.015} 
          sizeAttenuation={true} 
          depthWrite={false} 
        />
      </Points>
    </group>
  )
}

function GeometricShapes() {
  const groupRef = useRef<THREE.Group>(null!)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Wireframe triangular shapes similar to the reference */}
      <mesh position={[4, 2, -5]}>
        <octahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.3} />
      </mesh>
      
      <mesh position={[-3, -1, -3]}>
        <tetrahedronGeometry args={[0.8, 0]} />
        <meshBasicMaterial color="#60a5fa" wireframe transparent opacity={0.4} />
      </mesh>
      
      <mesh position={[2, -3, -4]}>
        <icosahedronGeometry args={[0.6, 0]} />
        <meshBasicMaterial color="#93c5fd" wireframe transparent opacity={0.2} />
      </mesh>
    </group>
  )
}

function FloatingGrid() {
  const gridRef = useRef<THREE.Group>(null!)
  
  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5
      gridRef.current.rotation.z = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <group ref={gridRef} position={[0, 0, -8]}>
      <gridHelper args={[20, 20, '#1e40af', '#1e3a8a']} />
    </group>
  )
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={0.5} color="#3b82f6" />
          <pointLight position={[-10, -10, -10]} intensity={0.3} color="#1d4ed8" />
          
          <Particles />
          <GeometricShapes />
          <FloatingGrid />
          
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}