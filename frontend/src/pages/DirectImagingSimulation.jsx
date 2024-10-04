import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

// Extend OrbitControls and ShaderPass
extend({ ShaderPass });

/**
 * Utility function to create an enhanced star texture.
 */
const createStarTexture = () => {
    const size = 1024;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    const outerGradient = ctx.createRadialGradient(size / 2, size / 2, size / 4, size / 2, size / 2, size / 2);
    outerGradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
    outerGradient.addColorStop(1, 'rgba(255, 140, 0, 0.0)');

    ctx.fillStyle = outerGradient;
    ctx.fillRect(0, 0, size, size);

    const coreGradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 4);
    coreGradient.addColorStop(0, '#ffffff');
    coreGradient.addColorStop(0.5, '#ffffd0');
    coreGradient.addColorStop(1, '#ff8c00');

    ctx.fillStyle = coreGradient;
    ctx.fillRect(0, 0, size, size);

    const imageData = ctx.getImageData(0, 0, size, size);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 10;
        data[i] = Math.min(255, Math.max(0, data[i] + noise)); // Red
        data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise)); // Green
        data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise)); // Blue
    }
    ctx.putImageData(imageData, 0, 0);

    return new THREE.CanvasTexture(canvas);
};

/**
 * Utility function to create an enhanced planet texture.
 */
const createPlanetTexture = () => {
    const size = 512;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#1E90FF';
    ctx.fillRect(0, 0, size, size);

    ctx.fillStyle = '#228B22';
    for (let i = 0; i < 10; i++) {
        const x = Math.random() * size;
        const y = Math.random() * size;
        const radius = Math.random() * 50 + 20;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
    }

    const imageData = ctx.getImageData(0, 0, size, size);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 15;
        data[i] = Math.min(255, Math.max(0, data[i] + noise));
        data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
        data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
    }
    ctx.putImageData(imageData, 0, 0);

    return new THREE.CanvasTexture(canvas);
};

/**
 * Star Component
 */
const Star = ({ position, size, coronagraphActive }) => {
    const starTexture = useMemo(() => createStarTexture(), []);
    const materialRef = useRef();

    useEffect(() => {
        if (materialRef.current) {
            materialRef.current.opacity = coronagraphActive ? 0.3 : 1;
        }
    }, [coronagraphActive]);

    return (
        <mesh position={position}>
            <sphereGeometry args={[size, 64, 64]} />
            <meshStandardMaterial
                ref={materialRef}
                map={starTexture}
                emissive="#ffff00"
                emissiveIntensity={1}
                transparent
                opacity={1}
            />
        </mesh>
    );
};

/**
 * Planet Component
 */
const Planet = ({ size, orbitRadius, orbitSpeed }) => {
    const planetRef = useRef();
    const planetTexture = useMemo(() => createPlanetTexture(), []);

    useFrame((state) => {
        const t = state.clock.getElapsedTime() * orbitSpeed;
        planetRef.current.position.x = Math.cos(t) * orbitRadius;
        planetRef.current.position.z = Math.sin(t) * orbitRadius;
    });

    return (
        <mesh ref={planetRef}>
            <sphereGeometry args={[size, 64, 64]} />
            <meshStandardMaterial map={planetTexture} />
        </mesh>
    );
};

/**
 * Coronagraph Component
 */
const Coronagraph = ({ active, size }) => {
    const coronagraphMaterial = useMemo(() => new THREE.ShaderMaterial({
        uniforms: {
            active: { value: active ? 1.0 : 0.0 },
        },
        vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
        fragmentShader: `
      uniform float active;
      varying vec2 vUv;
      void main() {
        float dist = distance(vUv, vec2(0.5));
        float alpha = smoothstep(0.45, 0.55, dist) * active;
        gl_FragColor = vec4(0.0, 0.0, 0.0, alpha);
      }
    `,
        transparent: true,
        side: THREE.DoubleSide,
    }), [active]);

    return (
        <mesh position={[0, 0, 0.1]}>
            <planeGeometry args={[size, size]} />
            <primitive object={coronagraphMaterial} attach="material" />
        </mesh>
    );
};

/**
 * Starshade Component
 */
const Starshade = ({ active, size, distance }) => {
    const starshadeRef = useRef();

    useEffect(() => {
        if (starshadeRef.current) {
            starshadeRef.current.lookAt(0, 0, 0);
        }
    }, []);

    return (
        <group position={[0, 0, distance]} visible={active}>
            <mesh ref={starshadeRef}>
                <circleGeometry args={[size, 64]} />
                <meshBasicMaterial color="black" side={THREE.DoubleSide} />
            </mesh>
        </group>
    );
};

/**
 * Enhanced Shader for Bloom Effect
 */
const EnhancedBloom = () => {
    return (
        <EffectComposer>
            <Bloom
                luminanceThreshold={0}
                luminanceSmoothing={0.9}
                height={300}
                opacity={1.5}
                blendFunction={BlendFunction.ADD}
            />
        </EffectComposer>
    );
};

/**
 * Scene Component
 */
const Scene = ({ coronagraphActive, starshadeActive, planetSpeed, telescopeDistance, telescopeSize }) => {
    return (
        <>
            {/* Starry Background */}
            <Stars radius={100} depth={50} count={10000} factor={4} fade />

            {/* Central Star */}
            <Star position={[0, 0, 0]} size={1} coronagraphActive={coronagraphActive} />

            {/* Orbiting Planet */}
            <Planet size={0.2} orbitRadius={5} orbitSpeed={planetSpeed} />

            {/* Coronagraph Overlay */}
            <Coronagraph active={coronagraphActive} size={telescopeSize} />

            {/* Starshade Positioned Between Camera and Star */}
            <Starshade active={starshadeActive} size={telescopeSize} distance={telescopeDistance} />

            {/* Ambient and Point Lighting */}
            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={1} />

            {/* Bloom Effect for Glow */}
            <EnhancedBloom />

            {/* Camera Controls */}
            <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
        </>
    );
};

/**
 * Main Simulation Component
 */
const ExoplanetDetectionSimulation = () => {
    const [coronagraphActive, setCoronagraphActive] = useState(false);
    const [starshadeActive, setStarshadeActive] = useState(false);
    const [planetSpeed, setPlanetSpeed] = useState(0.1);
    const [telescopeDistance, setTelescopeDistance] = useState(6);
    const [telescopeSize, setTelescopeSize] = useState(1.5);

    return (
        <div className="absolute top-0 left-0" style={{ width: '100vw', height: '100vh', backgroundColor: '#000000' }}>
            {/* 3D Canvas */}
            <Canvas camera={{ position: [0, 3, 15], fov: 60 }} shadows>
                <Scene
                    coronagraphActive={coronagraphActive}
                    starshadeActive={starshadeActive}
                    planetSpeed={planetSpeed}
                    telescopeDistance={telescopeDistance}
                    telescopeSize={telescopeSize}
                />
            </Canvas>

            {/* UI Controls */}
            <div className='absolute left-10 w-60  bottom-10  justify-start' >
                <div className=' justify-start items-center w-60'>
                    <div className='mr-2 font-semibold'>Speed</div>
                    <input
                        type="range"
                        min="0.01"
                        max="1"
                        step="0.01"
                        value={planetSpeed}
                        className='range w-60 bg-gray-700 bg-opacity-30'
                        onChange={(e) => setPlanetSpeed(parseFloat(e.target.value))}
                        style={{
                           
                            cursor: 'pointer',

                        }}
                    />
                </div>
                <div className='fixed top-10 left-10 text-3xl font-bold'>
                            Direct Imaging Simulation
                        </div>
                <div className='justify-start items-center w-60'>
                    <div className='mr-2 font-semibold'>Telescope Distance</div>
                    <input
                        type="range"
                        min="3"
                        max="12"
                        step="0.1"
                        value={telescopeDistance}
                        className='range w-60 bg-gray-700 bg-opacity-30'
                        onChange={(e) => setTelescopeDistance(parseFloat(e.target.value))}
                        style={{
                            
                            cursor: 'pointer',
                        }}
                    />
                </div>
                <div className='justify-start items-center w-60'>
                    <div className='mr-2 font-semibold'>Telescope Size</div>
                    <input
                        type="range"
                        min=".1"
                        max="3"
                        step="0.1"
                        value={telescopeSize}
                        className='range bg-gray-700 bg-opacity-30'
                        onChange={(e) => setTelescopeSize(parseFloat(e.target.value))}
                        style={{
                            width: '240px',
                            cursor: 'pointer',
                            // background: '#555555',
                        }}
                    />
                </div>
                <div className='flex flex-col w-60 my-1'>
                    <button
                        className='btn bg-opacity-30 my-1'
                        onClick={() => setCoronagraphActive(!coronagraphActive)}
                        style={{
                            padding: '10px 20px',
                            borderRadius: '5px',
                            border: 'none',
                            backgroundColor: coronagraphActive ? 'rgba(130, 144, 155, 0.3)' : 'rgba(85, 85, 85, 0.3)',
                            color: '#FFFFFF',
                            cursor: 'pointer',
                            fontSize: '16px',
                        }}
                    >
                        {coronagraphActive ? 'Disable Coronagraph' : 'Enable Coronagraph'}
                    </button>
                    <button
                        className='btn my-1'
                        onClick={() => setStarshadeActive(!starshadeActive)}
                        style={{
                            padding: '10px 20px',
                            borderRadius: '5px',
                            border: 'none',
                            backgroundColor: starshadeActive ? 'rgba(130, 144, 155, 0.3)' : 'rgba(85, 85, 85, 0.3)',
                            color: '#FFFFFF',
                            cursor: 'pointer',
                            fontSize: '16px',
                        }}
                    >
                        {starshadeActive ? 'Disable Starshade' : 'Enable Starshade'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExoplanetDetectionSimulation;
