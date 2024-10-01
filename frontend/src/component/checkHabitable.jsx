import React, { useState, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars, Text } from "@react-three/drei";
import * as THREE from "three";

const checkTemp = (temp,luminosity,semiMajorAxis) => {
  const tempFactor = Math.pow(luminosity / Math.pow(semiMajorAxis, 2), 1 / 4);
  const equilibriumTemperature = 278 * tempFactor * Math.pow((1 - 0.3), 1 / 4);
  return temp >= equilibriumTemperature - 30 && temp <= equilibriumTemperature + 30;
};

const checkDistance = (distance,luminosity) => {
  const innerHabbitable = Math.sqrt(luminosity * 0.95);
  const outerHabbitable = Math.sqrt(luminosity * 1.4);
  return distance >= innerHabbitable && distance <= outerHabbitable;

};

const Verdict = ({ message }) => (
  <div className="absolute bg-gray-900 text-white p-2 rounded-md shadow-md">
    {message}
  </div>
);

const Planet = ({ radius, position, name, textureUrl, orbitRadius, temp, onHover }) => {
  const meshRef = useRef();
  const [texture, setTexture] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [color, setColor] = useState("white");

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    
    loader.load(
      textureUrl,
      (loadedTexture) => {
        setTexture(loadedTexture);
        setIsLoading(false);
      },
      undefined,
      (error) => {
        console.error("Error loading texture:", error);
        setIsLoading(false);
      }
    );
  }, [textureUrl]);

  useEffect(() => {
    if (temp < 260) {
      setColor("lightblue");
    } else if (temp > 310) {
      setColor("orange"); 
    } else {
      setColor("white");
    }
  }, [temp]);

  useFrame(({ clock }) => {
    if (meshRef.current && !isLoading) {
      meshRef.current.rotation.y += 0.005;
      if (orbitRadius) {
        const angle = clock.getElapsedTime() * 0.5;
        meshRef.current.position.x = Math.cos(angle) * orbitRadius;
        meshRef.current.position.z = Math.sin(angle) * orbitRadius;
      }
    }
  });

  if (isLoading) {
    return null;
  }

  return (
    <group position={position}>
      <mesh 
        ref={meshRef} 
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover({ name, radius, temp, distance: orbitRadius / 2 });
        }}
        onPointerOut={() => onHover(null)}
      >
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial color={color} map={texture} />
      </mesh>
      <Text
        position={[0, radius + 0.5, 0]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
    </group>
  );
};

const Star = () => {
  const starRef = useRef();
  const [texture, setTexture] = useState(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      "https://cors-anywhere.herokuapp.com/https://img.freepik.com/free-photo/top-view-tie-dye-cloth_23-2148778171.jpg?t=st=1727715841~exp=1727719441~hmac=cf278e693fd37be9944141459c342cbe05dbedd0750af61197e3c78cbe364a8b&w=1380",
      (loadedTexture) => {
        setTexture(loadedTexture);
      },
      undefined,
      (error) => {
        console.error("Error loading sun texture:", error);
      }
    );
  }, []);

  useFrame(() => {
    if (starRef.current) {
      starRef.current.rotation.y += 0.007;
    }
  });

  return (
    <mesh ref={starRef}>
      <sphereGeometry args={[0.5, 32, 32]} />
      {texture && <meshBasicMaterial map={texture} />}
      <pointLight color="#FDB813" intensity={1} distance={50} />
    </mesh>
  );
};

const Orbit = ({ radius }) => (
  <mesh rotation={[-Math.PI / 2, 0, 0]}>
    <ringGeometry args={[radius, radius + 0.05, 64]} />
    <meshBasicMaterial color="#ffffff" transparent opacity={0.3} side={THREE.DoubleSide} />
  </mesh>
);

const TwinklingStars = ({ radius, depth, count, factor }) => {
  const starsRef = useRef();
  const materialRef = useRef();
  const { scene } = useThree();

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    if (materialRef.current) {
      materialRef.current.opacity = 0.5 + Math.sin(elapsedTime * 4) * 0.5;
      materialRef.current.size = 0.5 + Math.sin(elapsedTime * 3) * 1;
    }

    if (starsRef.current) {
      starsRef.current.rotation.y += 0.0002;
    }
  });

  useEffect(() => {
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
      radius={radius}
      depth={depth}
      count={count}
      factor={factor}
      fade
      saturation={0}
    >
      <pointsMaterial
        ref={materialRef}
        size={0.5}
        sizeAttenuation
        depthWrite={false}
        transparent
      />
    </Stars>
  );
};

const SolarSystem = ({ isAnimated, onHover }) => (
  <group>
    <Star />
    <Orbit radius={5} />
    <Planet
      name="Earth"
      radius={0.3}
      position={isAnimated ? [0, 0, 0] : [0, 0, 0]}
      textureUrl="https://media.istockphoto.com/id/172208211/photo/earth-map-with-clouds.jpg?s=612x612&w=0&k=20&c=zG2Kh28E2UiW_GdlhE75McrrEFSpH8OGuJKI4zcZW9I="
      orbitRadius={isAnimated ? 5 : null}
      temp={288}
      onHover={onHover}
    />
  </group>
);

const ExoplanetSystem = ({ planet, isAnimated, onHover }) => (
  <group>
    <Star />
    <Orbit radius={planet.distance * 2} />
    <Planet
      name={planet.name}
      radius={planet.radius * 0.3}
      position={isAnimated ? [planet.distance * 0, 0, 0] : [planet.distance * 0, 0, 0]}
      textureUrl={`https://cors-anywhere.herokuapp.com/https://www.solarsystemscope.com/textures/download/4k_eris_fictional.jpg`}
      orbitRadius={isAnimated ? planet.distance * 2 : null}
      temp={planet.temp}
      onHover={onHover}
    />
  </group>
);

const ExoplanetGame3D = () => {
  const [planet, setPlanet] = useState({
    name: "Exoplanet",
    mass: 1,
    radius: 1,
    temp: 288,
    distance: 1,
    luminosity: 1,
    habitable: false,
  });

  const [editablePlanet, setEditablePlanet] = useState({
    mass: planet.mass,
    radius: planet.radius,
    temp: planet.temp,
    distance: planet.distance,
    luminosity: planet.luminosity,
  });

  const [isAnimated, setIsAnimated] = useState(false);
  const [verdict, setVerdict] = useState(null);
  const [tooltip, setTooltip] = useState(null);
  const [hoverInfo, setHoverInfo] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const checkHabitability = () => {
    const { radius, temp, distance,luminosity,mass } = editablePlanet;

    const isHabtableZone = checkDistance(distance,luminosity);
    const isRadiousHabitable = radius >= 0.5 && radius <= 2;
    const isMassHabitable =  mass >= 0.5 && mass <= 10;
    const isTempHabitable =  checkTemp(temp,luminosity,distance);



    const isHabitable = isHabtableZone && isRadiousHabitable && isMassHabitable && isTempHabitable;
    setPlanet((prevState) => ({ ...prevState, habitable: isHabitable }));



  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditablePlanet(prevState => ({
      ...prevState,
      [name]: parseFloat(value),
    }));
  };

  const getVerdict = () => {
    const { radius, temp, distance,luminosity,mass } = editablePlanet;

    // if()


    

    return null;
  };

  useEffect(() => {
    const message = getVerdict();
    setVerdict(message);
  }, [editablePlanet]);

  const handleMouseMove = (event) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handlePlanetHover = (info) => {
    setHoverInfo(info);
  };

  return (
    <div className="container mx-auto p-4 relative">
      <h1 className="text-3xl font-bold mb-4">Exoplanet Habitability Simulator</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 relative">
        <div className="bg-gray-900 rounded-lg overflow-hidden relative" style={{ height: "400px" }}>
          <Canvas camera={{ position: [0, 10, 20] }}>
            <ambientLight intensity={0.2} />
            <SolarSystem isAnimated={isAnimated} onHover={handlePlanetHover} />
            <TwinklingStars radius={100} depth={50} count={5000} factor={4} />
            <OrbitControls />
          </Canvas>
        </div>
        <div className="bg-gray-900 rounded-lg overflow-hidden relative" style={{ height: "400px" }}>
          {verdict && <Verdict message={verdict} />}
          <Canvas camera={{ position: [0, 10, 20] }}>
            <ambientLight intensity={0.2} />
            <ExoplanetSystem planet={planet} isAnimated={isAnimated} onHover={handlePlanetHover} />
            <TwinklingStars radius={100} depth={50} count={5000} factor={4} />
            <OrbitControls />
          </Canvas>
        </div>
      </div>

      {hoverInfo && (
        <div className="absolute bg-gray-900 text-white p-2 rounded-md shadow-md" style={{ left: mousePosition.x, top: mousePosition.y }}>
          <h3 className="font-bold">{hoverInfo.name}</h3>
          <p>Radius: {hoverInfo.radius.toFixed(2)} Earth radii</p>
          <p>Temperature: {hoverInfo.temp}K</p>
          <p>Distance from star: {hoverInfo.distance} AU</p>
        </div>
      )}

      <div className="bg-blue-100 p-6 rounded-lg shadow-md relative">
        <h2 className="text-2xl font-semibold mb-4">Exoplanet Parameters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Radius (Earth Radii):
              {editablePlanet.radius < 0.5 && <span className="text-red-500"> - Too small!</span>}
              {editablePlanet.radius > 2 && <span className="text-red-500"> - Too big!</span>}
            </label>
            <input
              type="number"
              name="radius"
              value={editablePlanet.radius}
              onChange={handleInputChange}
              step="0.1"
              min="0.1"
              max="3"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              title={tooltip}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Temperature (K):
              {editablePlanet.temp < 260 && <span className="text-red-500"> - Too cold!</span>}
              {editablePlanet.temp > 310 && <span className="text-red-500"> - Too hot!</span>}
            </label>
            <input
              type="number"
              name="temp"
              value={editablePlanet.temp}
              onChange={handleInputChange}
              step="1"
              min="200"
              max="400"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              title={tooltip}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Distance from Star (AU):
              {editablePlanet.distance < 0.95 && <span className="text-red-500"> - Too close!</span>}
              {editablePlanet.distance > 1.4 && <span className="text-red-500"> - Too far!</span>}
            </label>
            <input
              type="number"
              name="distance"
              value={editablePlanet.distance}
              onChange={handleInputChange}
              step="0.01"
              min="0.5"
              max="2"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              title={tooltip}
            />
          </div>
          <button
            className="col-span-1 md:col-span-3 mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
            onClick={checkHabitability}
          >
            Check Habitability
          </button>
          <button
            className="col-span-1 md:col-span-3 mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setIsAnimated(!isAnimated)}
          >
            {isAnimated ? "Stop Animation" : "Start Animation"}
          </button>
        </div>
      </div>

      {planet.habitable ? (
        <div className="mt-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700">
          <p className="font-bold">Congratulations! You've created a habitable exoplanet!</p>
          <p>Your exoplanet has the right conditions to potentially support life. Great job balancing the crucial factors!</p>
        </div>
      ) : (
        <div className="mt-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
          <p className="font-bold">The exoplanet is not habitable yet.</p>
          <p>Keep adjusting the parameters. Remember, a habitable planet needs the right size, temperature, and distance from its star.</p>
        </div>
      )}
    </div>
  );
};

export default ExoplanetGame3D;
