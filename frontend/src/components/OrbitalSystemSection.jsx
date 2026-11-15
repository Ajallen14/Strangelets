import React, { Suspense, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Center, Resize, Html, Ring, useProgress } from '@react-three/drei';

function SceneController({ showOrbits }) {
  useFrame((state, delta) => {
    const targetY = showOrbits ? 6.5 : 0.4;
    const targetZ = showOrbits ? 11.2 : 5.2;
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      targetY,
      delta * 2.5
    );
    state.camera.position.z = THREE.MathUtils.lerp(
      state.camera.position.z,
      targetZ,
      delta * 2.5
    );
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

function CentralEarth({ showOrbits }) {
  const earthRef = useRef();
  const { scene } = useGLTF('/models/earth.glb');

  useFrame((_, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.25;
      const targetScale = showOrbits ? 0.58 : 1.0;
      const nextScale = THREE.MathUtils.lerp(
        earthRef.current.scale.x,
        targetScale,
        delta * 3
      );
      earthRef.current.scale.setScalar(nextScale);
    }
  });

  return (
    <group ref={earthRef}>
      <Resize scale={4.5}>
        <Center>
          <primitive object={scene} />
        </Center>
      </Resize>
    </group>
  );
}

function OrbitingPlanet({
  name,
  orbitRadius,
  orbitSpeed,
  size,
  initialAngle = 0,
  showOrbits,
  onSelect,
  modelPath,
  showNameTag = true,
}) {
  const pivotRef = useRef();
  const planetGroupRef = useRef();
  const ringMatRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  const { scene } = useGLTF(modelPath);

  useFrame((_, delta) => {
    if (pivotRef.current) {
      pivotRef.current.rotation.y += delta * (hovered ? orbitSpeed * 0.15 : orbitSpeed);
    }
    if (planetGroupRef.current) {
      planetGroupRef.current.rotation.y += delta * 0.6;
      const targetScale = showOrbits ? (hovered ? 1.25 : 1) : 0.001;
      const nextScale = THREE.MathUtils.lerp(
        planetGroupRef.current.scale.x,
        targetScale,
        delta * 3.5
      );
      planetGroupRef.current.scale.setScalar(nextScale);
    }
    if (ringMatRef.current) {
      const targetRingOpacity = showOrbits ? (hovered ? 0.65 : 0.28) : 0;
      ringMatRef.current.opacity = THREE.MathUtils.lerp(
        ringMatRef.current.opacity,
        targetRingOpacity,
        delta * 3
      );
    }
  });

  return (
    <group>
      <Ring args={[orbitRadius - 0.02, orbitRadius + 0.02, 128]} rotation={[-Math.PI / 2, 0, 0]}>
        <meshBasicMaterial
          ref={ringMatRef}
          color={hovered ? '#FCF9EC' : '#f8f8f8'}
          transparent
          opacity={0}
          side={2}
        />
      </Ring>
      
      <group ref={pivotRef} rotation={[0, initialAngle, 0]}>
        <group ref={planetGroupRef} position={[orbitRadius, 0, 0]}>
          
          {/* Invisible mesh for reliable raycasting (hover/click) on the 3D model.
              Moon passes no onSelect, so it stays display-only. */}
          <mesh
            onClick={(e) => {
              if (!showOrbits || !onSelect) return;
              e.stopPropagation();
              onSelect();
            }}
            onPointerOver={(e) => {
              if (!showOrbits || !onSelect) return;
              e.stopPropagation();
              setHovered(true);
              document.body.style.cursor = 'pointer';
            }}
            onPointerOut={() => {
              if (!onSelect) return;
              setHovered(false);
              document.body.style.cursor = 'auto';
            }}
          >
            <sphereGeometry args={[1, 32, 32]} />
            <meshBasicMaterial transparent opacity={0} />
          </mesh>

          {/* Actual 3D Model */}
          <Resize scale={size}>
            <Center>
              <primitive object={scene} />
            </Center>
          </Resize>
          
          {/* Conditionally render the name tag */}
          {showNameTag && (
            <Html position={[0, 1.2, 0]} center distanceFactor={12}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (showOrbits) onSelect();
                }}
                className={`px-3 py-1.5 bg-[#00105B]/90 text-[#FCF9EC] border border-[#6061B6] rounded-full text-[0.7rem] md:text-[0.8rem] font-bold whitespace-nowrap cursor-pointer transition-all duration-300 shadow-lg ${
                  hovered ? 'bg-[#C9B5E0] text-black border-[#FCF9EC] scale-110' : 'scale-100'
                } ${showOrbits ? 'opacity-100 pointer-events-auto' : 'opacity-0 scale-50 pointer-events-none'}`}
              >
                {name}
              </button>
            </Html>
          )}
        </group>
      </group>
    </group>
  );
}

const OrbitalSystemSection = ({ showOrbits, onSelectDestination, background }) => {
  const { active, progress } = useProgress();
  return (
    <div className="w-full h-full min-h-[300px] md:min-h-[500px] relative cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0.4, 5.2], fov: 45 }} dpr={[1, 2]}>
        <SceneController showOrbits={showOrbits} />
        <ambientLight intensity={1.5} />
        <pointLight position={[0, 4, 0]} intensity={2.5} color="#FCF9EC" />
        <directionalLight position={[8, 6, 5]} intensity={2.8} color="#FCF9EC" />
        <directionalLight position={[-8, -4, -5]} intensity={1.2} color="#6061B6" />
        
        <Suspense
          fallback={null}
        >
          <CentralEarth showOrbits={showOrbits} />
          
          {/* Moon: Real model, no name tag */}
          <OrbitingPlanet
            name="The Moon"
            orbitRadius={3.4}
            orbitSpeed={0.55}
            size={0.8}
            initialAngle={0.8}
            showOrbits={showOrbits}
            modelPath="/models/moon.glb"
            showNameTag={false}
          />
          
          {/* Mars: Real model, no name tag */}
          <OrbitingPlanet
            name="Mars"
            orbitRadius={5.8}
            orbitSpeed={0.32}
            size={1.2}
            initialAngle={3.5}
            showOrbits={showOrbits}
            modelPath="/models/mars.glb"
            showNameTag
            onSelect={() => onSelectDestination('/mars', 'Mars')}
          />
        </Suspense>
        
        <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.55} />
        
        {/* ✅ Render background LAST to ensure overlay works perfectly with renderOrder={10} */}
        {background}
        
      </Canvas>

      {/* Model-load overlay; stays outside the Canvas because DOM inside Canvas is a THREE node */}
      {active && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/70">
          <span className="text-sm font-semibold whitespace-nowrap text-[#C9B5E0] md:text-base">
            Loading 3D Space System... {Math.round(progress)}%
          </span>
        </div>
      )}
    </div>
  );
};

// Preload all models for instant rendering
useGLTF.preload('/models/earth.glb');
useGLTF.preload('/models/moon.glb');
useGLTF.preload('/models/mars.glb');

export default OrbitalSystemSection;