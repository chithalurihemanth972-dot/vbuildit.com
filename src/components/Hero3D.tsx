
import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  MeshTransmissionMaterial, 
  Float, 
  Environment, 
  ContactShadows,
  PerspectiveCamera
} from '@react-three/drei';
import * as THREE from 'three';

const GlassCluster = () => {
  const group = useRef<THREE.Group>(null!);
  const main = useRef<THREE.Mesh>(null!);
  const sideA = useRef<THREE.Mesh>(null!);
  const sideB = useRef<THREE.Mesh>(null!);
  
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    main.current.rotation.x = Math.cos(t / 4) / 8;
    main.current.rotation.y = Math.sin(t / 4) / 8;
    main.current.rotation.z = Math.sin(t / 4) / 8;
    main.current.position.y = (1 + Math.sin(t / 1.5)) / 10;

    // Subtle pointer follow for depth without creating jank.
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, state.pointer.x * 0.25, 0.06);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -state.pointer.y * 0.2, 0.06);
    sideA.current.rotation.y += delta * 0.3;
    sideB.current.rotation.x -= delta * 0.25;
  });

  return (
    <Float speed={1.8} rotationIntensity={0.35} floatIntensity={0.55}>
      <group ref={group}>
        <mesh ref={main} rotation={[0, 0, Math.PI / 4]}>
          <torusKnotGeometry args={[1, 0.28, 180, 24]} />
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={0.2}
            chromaticAberration={0.02}
            anisotropy={0.08}
            distortion={0.08}
            distortionScale={0.08}
            temporalDistortion={0.1}
            clearcoat={0.45}
            attenuationDistance={0.5}
            attenuationColor="#ffffff"
            color="#0A84FF"
          />
        </mesh>

        <mesh ref={sideA} position={[-1.35, 0.45, -0.55]}>
          <icosahedronGeometry args={[0.4, 1]} />
          <meshStandardMaterial color="#BF5AF2" metalness={0.6} roughness={0.15} />
        </mesh>

        <mesh ref={sideB} position={[1.4, -0.55, -0.45]}>
          <octahedronGeometry args={[0.45, 1]} />
          <meshStandardMaterial color="#64D2FF" metalness={0.55} roughness={0.12} />
        </mesh>
      </group>
    </Float>
  );
};

const Particles = ({ count = 40 }) => {
  const points = React.useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 10;
      p[i * 3 + 1] = (Math.random() - 0.5) * 10;
      p[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return p;
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[points, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#BF5AF2" transparent opacity={0.6} />
    </points>
  );
};

export const Hero3D = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-60 md:opacity-100">
      <Suspense fallback={null}>
        <Canvas dpr={[1, 1.2]} gl={{ antialias: false, powerPreference: "high-performance" }}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#BF5AF2" />
          
          <GlassCluster />
          <Particles count={34} />
          
          <Environment preset="city" />
          <ContactShadows
            position={[0, -2.5, 0]}
            opacity={0.4}
            scale={20}
            blur={2}
            far={4.5}
          />
        </Canvas>
      </Suspense>
    </div>
  );
};
