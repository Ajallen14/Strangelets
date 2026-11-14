import React, { Suspense, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Center, Resize, Html, Ring } from '@react-three/drei';

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
      // Scale 1.0 up-close in Section 2 -> Scale 0.58 when Moon & Mars orbit in Section 3
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
  color,
  emissive,
  initialAngle = 0,
  showOrbits,
  onSelect,
}) {
  const pivotRef = useRef();
  const planetRef = useRef();
  const ringMatRef = useRef();
  const planetMatRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (pivotRef.current) {
      pivotRef.current.rotation.y +=
        delta * (hovered ? orbitSpeed * 0.15 : orbitSpeed);
    }

    if (planetRef.current) {
      planetRef.current.rotation.y += delta * 0.6;
      const targetScale = showOrbits ? (hovered ? 1.25 : 1) : 0.001;
      const nextScale = THREE.MathUtils.lerp(
        planetRef.current.scale.x,
        targetScale,
        delta * 3.5
      );
      planetRef.current.scale.setScalar(nextScale);
    }

    if (ringMatRef.current) {
      const targetRingOpacity = showOrbits ? (hovered ? 0.65 : 0.28) : 0;
      ringMatRef.current.opacity = THREE.MathUtils.lerp(
        ringMatRef.current.opacity,
        targetRingOpacity,
        delta * 3
      );
    }

    if (planetMatRef.current) {
      const targetPlanetOpacity = showOrbits ? 1 : 0;
      planetMatRef.current.opacity = THREE.MathUtils.lerp(
        planetMatRef.current.opacity,
        targetPlanetOpacity,
        delta * 3
      );
    }
  });

  return (
    <group>
      {/* Orbital Ring Path (Fades in during Section 3) */}
      <Ring
        args={[orbitRadius - 0.02, orbitRadius + 0.02, 128]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <meshBasicMaterial
          ref={ringMatRef}
          color={hovered ? '#FCF9EC' : '#6061B6'}
          transparent
          opacity={0}
          side={2}
        />
      </Ring>

      {/* Rotating Pivot */}
      <group ref={pivotRef} rotation={[0, initialAngle, 0]}>
        <group position={[orbitRadius, 0, 0]}>
          <mesh
            ref={planetRef}
            scale={0.001}
            onClick={(e) => {
              if (!showOrbits) return;
              e.stopPropagation();
              onSelect();
            }}
            onPointerOver={(e) => {
              if (!showOrbits) return;
              e.stopPropagation();
              setHovered(true);
              document.body.style.cursor = 'pointer';
            }}
            onPointerOut={() => {
              setHovered(false);
              document.body.style.cursor = 'auto';
            }}
          >
            <sphereGeometry args={[size, 32, 32]} />
            <meshStandardMaterial
              ref={planetMatRef}
              color={color}
              emissive={emissive}
              emissiveIntensity={hovered ? 0.8 : 0.25}
              roughness={0.7}
              transparent
              opacity={0}
            />
          </mesh>

          {/* Interactive Floating Label (Fades in when Section 3 is active) */}
          <Html position={[0, size + 0.45, 0]} center distanceFactor={12}>
            <button
              type="button"
              onClick={() => showOrbits && onSelect()}
              className={`planet-tag ${hovered ? 'planet-tag-active' : ''} ${
                showOrbits ? 'planet-tag-visible' : 'planet-tag-hidden'
              }`}
            >
              {name} →
            </button>
          </Html>
        </group>
      </group>
    </group>
  );
}

const OrbitalSystemSection = ({ showOrbits, onSelectDestination }) => {
  return (
    <div className="orbital-canvas-wrapper">
      <Canvas camera={{ position: [0, 0.4, 5.2], fov: 45 }}>
        <SceneController showOrbits={showOrbits} />

        <ambientLight intensity={1.5} />
        <pointLight position={[0, 4, 0]} intensity={2.5} color="#FCF9EC" />
        <directionalLight position={[8, 6, 5]} intensity={2.8} color="#FCF9EC" />
        <directionalLight position={[-8, -4, -5]} intensity={1.2} color="#6061B6" />

        <Suspense
          fallback={
            <Html center>
              <span className="loading-earth">Loading 3D Space System...</span>
            </Html>
          }
        >
          <CentralEarth showOrbits={showOrbits} />

          <OrbitingPlanet
            name="The Moon"
            orbitRadius={3.4}
            orbitSpeed={0.55}
            size={0.42}
            color="#C9B5E0"
            emissive="#6061B6"
            initialAngle={0.8}
            showOrbits={showOrbits}
            onSelect={() => onSelectDestination('/moon', 'The Moon')}
          />

          <OrbitingPlanet
            name="Mars"
            orbitRadius={5.8}
            orbitSpeed={0.32}
            size={0.62}
            color="#e05a33"
            emissive="#8a2be2"
            initialAngle={3.5}
            showOrbits={showOrbits}
            onSelect={() => onSelectDestination('/mars', 'Mars')}
          />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.55}
        />
      </Canvas>
    </div>
  );
};

useGLTF.preload('/models/earth.glb');

export default OrbitalSystemSection;