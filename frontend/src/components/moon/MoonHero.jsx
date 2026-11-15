import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Center, Resize, Html } from '@react-three/drei';

// --- Inner 3D Model (rotates slowly, auto-scales & centers) ---
function MoonModel({ modelPath, scale, rotationSpeed }) {
  const moonRef = useRef();
  const { scene } = useGLTF(modelPath);

  useFrame((_, delta) => {
    if (moonRef.current) {
      moonRef.current.rotation.y += delta * rotationSpeed;
    }
  });

  return (
    <group ref={moonRef}>
      <Resize scale={scale}>
        <Center>
          <primitive object={scene} />
        </Center>
      </Resize>
    </group>
  );
}

// --- Reusable 3D Hero Stage ---
const MoonHero = ({
  modelPath = '/models/moon.glb',
  scale = 3.5,
  rotationSpeed = 0.15,
  enableZoom = false,
  showHint = true,
  className = '',
}) => {
  return (
    <div
      className={`relative z-10 w-full max-w-5xl mx-auto h-[70vh] md:h-[50vh] flex justify-center items-center px-4 mb-12 ${className}`}
    >
      <div className="w-full h-full relative cursor-grab active:cursor-grabbing rounded-2xl overflow-hidden bg-black/50 backdrop-blur-sm ">
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]}>
          <ambientLight intensity={1.2} />
          <directionalLight position={[5, 5, 5]} intensity={3} color="#FCF9EC" />
          <directionalLight position={[-5, -2, -5]} intensity={1} color="#6061B6" />

          <Suspense
            fallback={
              <Html center>
                <span className="text-[#C9B5E0] text-sm font-semibold whitespace-nowrap">
                  Loading Lunar Model...
                </span>
              </Html>
            }
          >
            <MoonModel
              modelPath={modelPath}
              scale={scale}
              rotationSpeed={rotationSpeed}
            />
          </Suspense>

          <OrbitControls
            enableZoom={enableZoom}
            enablePan={false}
            rotateSpeed={0.5}
            minDistance={4}
            maxDistance={10}
          />
        </Canvas>

        
      </div>
    </div>
  );
};

// Preload so the model appears instantly on mount
useGLTF.preload('/models/moon.glb');

export default MoonHero;