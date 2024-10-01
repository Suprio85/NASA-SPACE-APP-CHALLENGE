import React, { Suspense, useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars, Html } from '@react-three/drei';
import * as THREE from 'three';

// Function to determine color based on temperature (pl_eqt)
function getPlanetColor(temp) {
  if (temp < 200) {
    return '#ADD8E6'; // Light Blue for Cold Planets
  } else if (temp >= 200 && temp <= 300) {
    return '#98FB98'; // Green for Cool Temperate Planets
  } else if (temp > 300 && temp <= 500) {
    return '#FFD700'; // Yellow for Warm Temperate Planets
  } else if (temp > 500) {
    return '#FF4500'; // Red for Hot Planets
  } else {
    return 'gray'; // Default if temperature is unknown
  }
}

// Function to create spherical objects (Sun, Earth, Planets)
function Sphere({ color, radius, position, planetInfo, texture, speed, rotationSpeed = 0.005 }) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed * (speed || 1);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial color={color} map={texture || null} />
      {hovered && planetInfo && (
        <Html distanceFactor={10}>
          <div style={{
            borderRadius: '5px',
          }} className='w-96 pb-10 font-Saira bg-slate-900 bg-opacity-50 text-3xl text-white bottom-0 right-0'>
            <div className='bg-slate-950 font-bold mb-10'><h3>{planetInfo.name}</h3></div>
            <div>Radius: {planetInfo.radius} km</div>
            <p>Orbital Period: {planetInfo.orbitalPeriod} days</p>
            <p>Temperature: {planetInfo.temperature} K</p>
          </div>
        </Html>
      )}
    </mesh>
  );
}

// Function to create the orbit path (a simple circle)
function OrbitPath({ radius }) {
  const points = useMemo(() => {
    const pts = [];
    const segments = 64;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
    }
    return pts;
  }, [radius]);

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial attach="material" color="white" opacity={0.5} transparent />
    </line>
  );
}

// Solar System Component with animated Planets
function SolarSystem({ planets, speed }) {
  const planetRefs = useRef([]);
  const lightRef = useRef();
  const sunTexture = useLoader(THREE.TextureLoader, 'https://cors-anywhere.herokuapp.com/https://img.freepik.com/free-photo/top-view-tie-dye-cloth_23-2148778171.jpg?t=st=1727715841~exp=1727719441~hmac=cf278e693fd37be9944141459c342cbe05dbedd0750af61197e3c78cbe364a8b&w=1380');
  const lightblueTexture = useLoader(THREE.TextureLoader, 'https://cors-anywhere.herokuapp.com/https://img.freepik.com/free-photo/abstract-refreshing-blue-tropical-watercolor-background-illustration-high-resolution-free-image_1340-20387.jpg?t=st=1727734062~exp=1727737662~hmac=7fb6eb68afc5d219d93275335eb7d8b5591ef1b7eb4814ec9e5b2b22a1cc27cb&w=1060');
  const greenTexture = useLoader(THREE.TextureLoader, 'https://cors-anywhere.herokuapp.com/https://img.freepik.com/free-photo/green-paint-wall-background-texture_53876-16376.jpg?t=st=1727734111~exp=1727737711~hmac=4a7846514471ab3070dcc366259c635483ae881739ac76c7336a16a2a9a46f4e&w=996');
  const yellowTexture = useLoader(THREE.TextureLoader, 'https://cors-anywhere.herokuapp.com/https://img.freepik.com/free-photo/abstract-luxury-clear-yellow-wall-well-use-as-backdrop-background-layout_1258-208.jpg?t=st=1727734136~exp=1727737736~hmac=7e52bcc3de314487466cb908fe0bf4abc44b143c8d13e3c0b63df6c3b2c2f02e&w=900');
  const redTexture = useLoader(THREE.TextureLoader, 'https://cors-anywhere.herokuapp.com/https://img.freepik.com/free-photo/creative-abstract-mixed-red-color-painting-with-marble-liquid-effect-panorama_1258-91857.jpg?t=st=1727734167~exp=1727737767~hmac=2cb393e23f1bc8007a46c1901d29b85ac847bdc4b72f0092a5a3b43df4bd0295&w=740');
  const defaultTexture = useLoader(THREE.TextureLoader, 'https://cors-anywhere.herokuapp.com/https://img.freepik.com/free-photo/gray-grunge-surface-wall-texture-background_1017-18216.jpg?t=st=1727734194~exp=1727737794~hmac=546cb5e7160fd5a332961bc125db4b3170cde433e2a395d176bec691770c4d27&w=1060');

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    planets.forEach((planet, index) => {
      const ref = planetRefs.current[index];
      const orbitRadius = planet.pl_orbper || 5;

      if (ref) {
        const orbitalPeriod = planet.pl_orbper || 365;
        const angle = (elapsedTime / orbitalPeriod) * 0.2 * Math.PI * speed;

        ref.position.x = Math.sin(angle) * orbitRadius;
        ref.position.z = Math.cos(angle) * orbitRadius;
      }
    });
    if (lightRef.current) {
      lightRef.current.intensity = 1 + Math.sin(elapsedTime * 2) * 0.1;
    }
  });

  return (
    <>
      <pointLight 
        ref={lightRef}
        position={[0, 0, 0]} 
        intensity={5.5} 
        distance={100} 
        decay={2}
        color="#FDB813" // Warm, sun-like color
      />
    
      <Sphere
        color="yellow"
        radius={2}
        position={[0, 0, 0]}
        planetInfo={{ name: planets[0].hostname, radius: 696340, orbitalPeriod: 0 }}
        texture={sunTexture}
        speed={speed}
        rotationSpeed={0.001} // Slower rotation for the sun
      />

      {planets.map((planet, index) => (
        <OrbitPath key={`orbit-${index}`} radius={planet.pl_orbper || 5} />
      ))}

      {planets.map((planet, index) => (
        <group key={`planet-${index}`} ref={(el) => (planetRefs.current[index] = el)}>
          <Sphere
            color={getPlanetColor(planet.pl_eqt)} // Determine color based on temperature
            texture={planet.pl_eqt < 200 ? lightblueTexture : planet.pl_eqt >= 200 && planet.pl_eqt <= 300 ? greenTexture : planet.pl_eqt > 300 && planet.pl_eqt <= 500 ? yellowTexture : planet.pl_eqt > 500 ? redTexture : defaultTexture}
            radius={planet.pl_rade * 0.3 || 0.5}
            position={[0, 0, 0]}
            planetInfo={{
              name: planet.pl_name || `Planet ${index + 1}`,
              radius: planet.pl_rade * 6371, // Assuming Earth radii, converted to km
              orbitalPeriod: planet.pl_orbper || 'Unknown',
              temperature: planet.pl_eqt || 'Unknown'
            }}
            speed={speed}
            rotationSpeed={0.005} // Default rotation speed for planets
          />
        </group>
      ))}
    </>
  );
}

// Enhanced Starfield component
function Starfield() {
  const starsRef = useRef();

  const [positions, colors] = useMemo(() => {
    const positions = [];
    const colors = [];
    const color = new THREE.Color();

    for (let i = 0; i < 10000; i++) {
      positions.push((Math.random() - 0.5) * 300);
      positions.push((Math.random() - 0.5) * 300);
      positions.push((Math.random() - 0.5) * 300);

      color.setHSL(Math.random(), 0.7, 0.9);
      colors.push(color.r, color.g, color.b);
    }

    return [new Float32Array(positions), new Float32Array(colors)];
  }, []);

  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.0001;
    }
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attachObject={['attributes', 'position']}
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attachObject={['attributes', 'color']}
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.5} vertexColors />
    </points>
  );
}

// New BackgroundStars component
function BackgroundStars() {
  const { scene } = useThree();
  const starsRef = useRef();

  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.0002;
    }
  });

  React.useEffect(() => {
    if (starsRef.current) {
      scene.add(starsRef.current);
    }
    return () => {
      if (starsRef.current) {
        scene.remove(starsRef.current);
      }
    };
  }, [scene]);

  return (
    <Stars
      ref={starsRef}
      radius={100}
      depth={50}
      count={5000}
      factor={4}
      saturation={0}
      fade
      speed={1}
    />
  );
}

function ThreeDAnimation({ planets, speed }) {
  return (
    <Canvas style={{ height: '100vh' }}>
      <color attach="background" args={['#000']} />
      <ambientLight intensity={.3} />
      <directionalLight position={[0, 0, 0]} intensity={1} castShadow>
        <primitive object={new THREE.Object3D()} position={[1, 1, 1]} />
      </directionalLight>
      <BackgroundStars />
      <Starfield />
      <SolarSystem planets={planets} speed={speed} />

      <PerspectiveCamera
        makeDefault
        position={[0, 30, 30]}
        fov={60}
      />
      <OrbitControls />
    </Canvas>
  );
}

// Enhanced Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error('Error caught in ErrorBoundary: ', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong while loading the scene.</h1>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

// Wrapping with Suspense and ErrorBoundary
function ThreeDApp({ planets, speed }) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <ThreeDAnimation planets={planets} speed={speed} />
      </Suspense>
    </ErrorBoundary>
  );
}

export default ThreeDApp;