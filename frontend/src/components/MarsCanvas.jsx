import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Center, Resize, Html, Stars, useProgress } from '@react-three/drei';
import * as THREE from 'three';
import { MARS_EQUIPMENT, latLngToVec3 } from '../data/marsEquipment';

const PLANET_RADIUS = 1.3; // world-unit radius the model is normalized to

function MarsModel({ onSelect }) {
  const spinRef = useRef();
  const [radius, setRadius] = useState(null);
  const { scene } = useGLTF('/models/mars.glb');

  // Normalize the GLB to a known radius so markers sit exactly on the surface.
  useEffect(() => {
    const sphere = new THREE.Box3().setFromObject(scene).getBoundingSphere(new THREE.Sphere());
    setRadius(sphere.radius);
  }, [scene]);

  useFrame((_, delta) => {
    if (spinRef.current) spinRef.current.rotation.y += delta * 0.06;
  });

  return (
    <group ref={spinRef}>
      <Resize scale={PLANET_RADIUS * 2}>
        <Center>
          <primitive object={scene} />
        </Center>
      </Resize>

      {radius &&
        MARS_EQUIPMENT.map((item) => (
          <EquipmentMarker key={item.id} item={item} onSelect={onSelect} />
        ))}
    </group>
  );
}

function EquipmentMarker({ item, onSelect }) {
  const markerRef = useRef();
  const [hovered, setHovered] = useState(false);
  const pos = latLngToVec3(item.lat, item.lng, PLANET_RADIUS * 1.03);

  useFrame(({ clock }) => {
    if (markerRef.current) {
      markerRef.current.lookAt(0, 0, 0);
      const pulse = 1 + Math.sin(clock.elapsedTime * 3) * 0.12;
      markerRef.current.scale.setScalar(hovered ? 1.6 : pulse);
    }
  });

  return (
    <group position={[pos.x, pos.y, pos.z]}>
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          onSelect(item);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
      >
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color={hovered ? '#FCF9EC' : '#C9B5E0'} />
      </mesh>

      {/* Tangent glow ring marking the last known location */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.08, 0.1, 32]} />
        <meshBasicMaterial
          color="#C9B5E0"
          transparent
          opacity={hovered ? 0.9 : 0.45}
          side={THREE.DoubleSide}
        />
      </mesh>

      {hovered && (
        <Html position={[0, 0.22, 0]} center distanceFactor={6}>
          <div className="pointer-events-none whitespace-nowrap rounded-full border border-[#6061B6] bg-[#00105B]/90 px-3 py-1 text-xs font-bold text-[#FCF9EC] shadow-lg">
            {item.name}
          </div>
        </Html>
      )}
    </group>
  );
}

const MarsCanvas = ({ onSelect }) => {
  const { active, progress } = useProgress();
  return (
  <div className="relative h-full w-full cursor-grab active:cursor-grabbing">
    <Canvas camera={{ position: [0, 0.8, 4.6], fov: 45 }} dpr={[1, 2]}>
      <ambientLight intensity={1.4} />
      <directionalLight position={[5, 3, 5]} intensity={2.6} color="#FCF9EC" />
      <directionalLight position={[-5, -2, -5]} intensity={0.9} color="#c9643a" />

      <Stars radius={120} depth={40} count={4000} factor={4} fade speed={0.6} />

      <Suspense
        fallback={null}
      >
        <MarsModel onSelect={onSelect} />
      </Suspense>

      <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.6} />
    </Canvas>

    {/* Model-load overlay; stays outside the Canvas because DOM inside Canvas is a THREE node */}
    {active && (
      <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/70">
        <span className="text-sm font-semibold whitespace-nowrap text-[#C9B5E0]">
          Loading Mars... {Math.round(progress)}%
        </span>
      </div>
    )}
  </div>
  );
};

useGLTF.preload('/models/mars.glb');

export default MarsCanvas;
