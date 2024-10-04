import { OrbitControls, Stars, Text } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const checkTemp = (temp,luminosity,semiMajorAxis) => {
  const tempFactor = Math.pow(luminosity / Math.pow(semiMajorAxis, 2), 1 / 4);
  const equilibriumTemperature = 278 * tempFactor * Math.pow((1 - 0.3), 1 / 4);
  console.log(equilibriumTemperature);
  console.log(temp);

  return temp >= equilibriumTemperature - 30 && temp <= equilibriumTemperature + 30;
};

const checkDistance = (distance,luminosity) => {
  const innerHabbitable = Math.sqrt(luminosity * 0.95);
  const outerHabbitable = Math.sqrt(luminosity * 1.4);
  console.log("innerHabbitable",innerHabbitable);
  console.log("outerHabbitable",outerHabbitable+1.5);
  console.log("distance",distance);
  return distance >= innerHabbitable && distance <= outerHabbitable+1.5;


};

const Verdict = ({ message }) => (
  <div className="absolute bg-gray-900 text-white p-2 rounded-md shadow-md">
    {message}
  </div>
);

const Planet = ({ radius, position, name, textureUrl, orbitRadius, temp, luminosity, onHover }) => {
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
          onHover({ name, radius, temp, distance: orbitRadius / 2, luminosity });
        }}
        onPointerOut={() => onHover(null)}
      >
        <sphereGeometry args={[radius, 64, 64]} /> 
        { name === "Earth" ? <meshStandardMaterial  map={texture} /> :
         <meshStandardMaterial color={color} map={texture} emissive={color} emissiveIntensity={luminosity / 10} />
          
        }
      </mesh>
      <Text
        position={[-5, radius + 0.5, 0]}
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
      "/Textureimg/sun.jpg",
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

const HabitableZone = ({ innerRadius, outerRadius }) => {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[innerRadius, outerRadius, 64]} />
        <meshBasicMaterial color="#00ff00" transparent opacity={0.1} side={THREE.DoubleSide} />
      </mesh>
      <Text
        position={[0, 0.5, -innerRadius]}
        fontSize={0.3}
        color="green"
        anchorX="center"
        anchorY="middle"
      >
        Inner HZ
      </Text>
      <Text
        position={[0, 0.5, -outerRadius]}
        fontSize={0.3}
        color="green"
        anchorX="center"
        anchorY="middle"
      >
        Outer HZ
      </Text>
    </group>
  );
};

const Orbit = ({ radius }) => (
  <mesh rotation={[-Math.PI / 2, 0, 0]}>
    <ringGeometry args={[radius, radius + 0.1, 64]} />
    <meshBasicMaterial color="#ffffff" transparent opacity={0.5} side={THREE.DoubleSide} />
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
      textureUrl="/Textureimg/earth.jpg"
      orbitRadius={isAnimated ? 5 : null}
      temp={288}
      onHover={onHover}
    />
  </group>
);


const ExoplanetSystem = ({ planet, isAnimated, onHover }) => {
  const planetRef = useRef();
  const starRef = useRef();

  const innerHabitable = Math.sqrt(planet.luminosity * 0.95) * 2;
  const outerHabitable = Math.sqrt(planet.luminosity * 1.4) * 2+0.56;

  useFrame(({ clock }) => {
    if (isAnimated && planetRef.current) {
      const angle = clock.getElapsedTime() * 0.5;
      planetRef.current.position.x = Math.cos(angle) * planet.distance * 2;
      planetRef.current.position.z = Math.sin(angle) * planet.distance * 2;
    }
    if (starRef.current) {
      starRef.current.rotation.y += 0.007;
    }
  });

  return (
    <group>
      <Star ref={starRef} />
      <HabitableZone innerRadius={innerHabitable} outerRadius={outerHabitable} />
      <Orbit radius={planet.distance * 2} />
      <group ref={planetRef}>
        <Planet
          name={planet.name}
          radius={planet.radius * 0.3}
          position={[0, 0, 0]}
          textureUrl="/Textureimg/exoplanet.jpg"
          temp={planet.temp}
          luminosity={planet.luminosity}
          onHover={onHover}
        />
      </group>
    </group>
  );
};

const ExoplanetGame3D = ({planetName ='bet Pic b'}) => {
  const [planet, setPlanet] = useState({
    name: "Exoplanet system",
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
  const [isAnimated, setIsAnimated] = useState(true);
  const [verdict, setVerdict] = useState(null);
  const [hoverInfo, setHoverInfo] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fetchExoplanetData = async () => {
      try {
        const response = await fetch(
          `https://cors-anywhere.herokuapp.com/https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+top+10+pl_name,disc_year,pl_rade,pl_bmasse,pl_orbper,st_teff,st_lum,pl_eqt,pl_orbsmax,pl_dens,pl_rvamp+from+ps+where+pl_name+=+%27${encodeURIComponent(planetName)}%27&format=json`
        );
        const data = await response.json();
        const planetData = data[0]; // Take the first result
        // Set null values to default (1)
        console.log(planetData);
        setPlanet({
        name : planetData.pl_name || "Unknown",
        mass : planetData.pl_bmasse || 1,
        radius : planetData.pl_rade || 1,
        temp : planetData.pl_eqt || 288,
        distance : planetData.pl_orbsmax || 1,
        luminosity : planetData.st_lum || 1,
        habitable: false,
        });//set planet data


        setEditablePlanet({
          name: planetData.pl_name || "Unknown",
          mass: planetData.pl_bmasse || 1, 
          radius: planetData.pl_rade || 1, 
          temp: planetData.pl_eqt || 288, 
          distance: planetData.pl_orbsmax || 1,
          luminosity: planetData.st_lum || 1,
        });
      } catch (error) {
        console.error("Failed to fetch exoplanet data:", error);
      }
    };

    fetchExoplanetData();
  }, [planetName]);




  const checkHabitability = () => {
    const { radius, temp, distance, luminosity, mass } = editablePlanet;

    const isHabtableZone = checkDistance(distance, luminosity);
    const isRadiousHabitable = radius >= 0.5 && radius <= 2;
    const isMassHabitable =  mass >= 0.5 && mass <= 10;
    const isTempHabitable =  checkTemp(temp, luminosity, distance);

    const isHabitable = isHabtableZone && isRadiousHabitable && isMassHabitable && isTempHabitable;
    setPlanet((prevState) => ({ ...prevState, habitable: isHabitable }));
  };

  const handleSliderChange = (e) => {
    const { name, value } = e.target;
    setEditablePlanet(prevState => ({
      ...prevState,
      [name]: parseFloat(value),
    }));
  };

  const getVerdict = () => {
    const { radius, temp, distance, luminosity, mass } = editablePlanet;

    if(!checkDistance(distance, luminosity)) 
      return "The exoplanet is not habitable because it is not in the habitable zone.";
    if (radius < 0.5 || radius > 2)
      return "The exoplanet is not habitable because its radius is not within the habitable range.";
    if (mass < 0.5 || mass > 10)
      return "The exoplanet is not habitable because its mass is not within the habitable range.";
    if (!checkTemp(temp, luminosity, distance))
      return "The exoplanet is not habitable because its temperature is not within the habitable range.";

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
            <ExoplanetSystem planet={editablePlanet} isAnimated={isAnimated} onHover={handlePlanetHover} />
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
          <p>Distance from star: {hoverInfo.distance.toFixed(2)} AU</p>
          <p>Luminosity: {hoverInfo.luminosity} Solar luminosity</p>
        </div>
      )}

      <div className="bg-blue-100 p-6 rounded-lg shadow-md relative">
        <h2 className="text-2xl font-semibold mb-4">Exoplanet Parameters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Radius (Earth Radii): {editablePlanet.radius.toFixed(2)}
              {editablePlanet.radius < 0.5 && <span className="text-red-500"> - Too small!</span>}
              {editablePlanet.radius > 4 && <span className="text-red-500"> - Too big!</span>}
            </label>
            <input
              type="range"
              name="radius"
              value={editablePlanet.radius}
              onChange={handleSliderChange}
              min="0.1"
              max="10"
              step="0.1"
              className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Temperature (K): {editablePlanet.temp}
              {editablePlanet.temp < 210 && <span className="text-red-500"> - Too cold!</span>}
              {editablePlanet.temp > 340 && <span className="text-red-500"> - Too hot!</span>}
            </label>
            <input
              type="range"
              name="temp"
              value={editablePlanet.temp}
              onChange={handleSliderChange}
              min="200"
              max="400"
              step="1"
              className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Distance from Star (AU): {editablePlanet.distance.toFixed(2)}
              {editablePlanet.distance < 0.95 && <span className="text-red-500"> - Too close!</span>}
              {editablePlanet.distance > 1.4 && <span className="text-red-500"> - Too far!</span>}
            </label>
            <input
              type="range"
              name="distance"
              value={editablePlanet.distance}
              onChange={handleSliderChange}
              min="0.6"
              max="3"
              step="0.01"
              className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Luminosity (Solar luminosity): {editablePlanet.luminosity.toFixed(2)}
            </label>
            <input
              type="range"
              name="luminosity"
              value={editablePlanet.luminosity}
              onChange={handleSliderChange}
              min="0.1"
              max="3"
              step="0.1"
              className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
        <div className="mt-4 flex justify-between">
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
            onClick={checkHabitability}
          >
            Check Habitability
          </button>
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
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