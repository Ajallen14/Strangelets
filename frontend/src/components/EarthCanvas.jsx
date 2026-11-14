import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Center, Resize, Html } from '@react-three/drei';

function EarthModel() {
  const earthRef = useRef();
  const { scene } = useGLTF('/models/earth.glb');

  useFrame((_, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.22;
    }
  });

  return (
    <group ref={earthRef}>
      {/* Increased scale to 4.8 for a massive desktop view */}
      <Resize scale={2.8}>
        <Center>
          <primitive object={scene} />
        </Center>
      </Resize>
    </group>
  );
}

const EarthCanvas = () => {
  return (
    <div className="earth-canvas-wrapper">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 3, 5]} intensity={3} color="#FCF9EC" />
        <directionalLight position={[-5, -2, -5]} intensity={1} color="#1474c9" />

        <Suspense
          fallback={
            <Html center>
              <span className="loading-earth">Loading 3D Earth...</span>
            </Html>
          }
        >
          <EarthModel />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.6}
        />
      </Canvas>
    </div>
  );
};

useGLTF.preload('/models/earth.glb');

export default EarthCanvas;