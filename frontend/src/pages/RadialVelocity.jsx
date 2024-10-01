import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function StarAndPlanet({ starSize, planetSize, starMass, planetMass, setShiftFactor, setMaxShift }) {
  const starRef = useRef();
  const planetRef = useRef();
  const starOrbitRef = useRef();
  const planetOrbitRef = useRef();

  const { camera } = useThree();

  const totalMass = starMass + planetMass;
  const orbitScaleFactor = 5;
  const starDistance = (planetMass / totalMass) * 2 * orbitScaleFactor;
  const planetDistance = (starMass / totalMass) * 2 * orbitScaleFactor * 2;

  useEffect(() => {
    // Create star orbit
    const starOrbitGeometry = new THREE.BufferGeometry();
    const starOrbitPoints = [];
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      starOrbitPoints.push(new THREE.Vector3(Math.cos(angle) * starDistance, Math.sin(angle) * starDistance, 0));
    }
    starOrbitGeometry.setFromPoints(starOrbitPoints);
    starOrbitRef.current.geometry = starOrbitGeometry;

    // Create planet orbit
    const planetOrbitGeometry = new THREE.BufferGeometry();
    const planetOrbitPoints = [];
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      planetOrbitPoints.push(new THREE.Vector3(Math.cos(angle) * planetDistance, Math.sin(angle) * planetDistance, 0));
    }
    planetOrbitGeometry.setFromPoints(planetOrbitPoints);
    planetOrbitRef.current.geometry = planetOrbitGeometry;

    setMaxShift(starDistance / orbitScaleFactor);
  }, [starDistance, planetDistance, setMaxShift]);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const angle = time * 0.5;

    starRef.current.position.x = Math.cos(angle) * starDistance;
    starRef.current.position.y = Math.sin(angle) * starDistance;

    planetRef.current.position.x = Math.cos(angle + Math.PI) * planetDistance;
    planetRef.current.position.y = Math.sin(angle + Math.PI) * planetDistance;

    const cameraDirection = new THREE.Vector3();
    camera.getWorldDirection(cameraDirection);
    const angleToXYPlane = Math.abs(Math.PI / 2 - cameraDirection.angleTo(new THREE.Vector3(0, 0, 1)));

    const topViewThreshold = 0.1; // radians
    if (angleToXYPlane <= topViewThreshold) {
      // In top view, no shift
      setShiftFactor(0.5);
    } else {
      // Calculate radial velocity component
      const radialVelocity = Math.sin(angle);

      // Map the radial velocity to a shift factor between 0 and 1
      const shiftFactor = (radialVelocity + 1) / 2;

      setShiftFactor(shiftFactor);
    }
  });

  return (
    <>
      <line ref={starOrbitRef}>
        <lineBasicMaterial attach="material" color="yellow" opacity={0.5} transparent />
      </line>
      <line ref={planetOrbitRef}>
        <lineBasicMaterial attach="material" color="blue" opacity={0.5} transparent />
      </line>
      <mesh ref={starRef}>
        <sphereGeometry args={[starSize, 32, 32]} />
        <meshStandardMaterial color="yellow" />
      </mesh>
      <mesh ref={planetRef}>
        <sphereGeometry args={[planetSize, 32, 32]} />
        <meshStandardMaterial color="blue" />
      </mesh>
    </>
  );
}

function LightSpectrum({ shiftFactor, maxShift }) {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, 'red');
    gradient.addColorStop(0.17, 'orange');
    gradient.addColorStop(0.33, 'yellow');
    gradient.addColorStop(0.5, 'green');
    gradient.addColorStop(0.67, 'blue');
    gradient.addColorStop(0.83, 'indigo');
    gradient.addColorStop(1, 'violet');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const lineCount = 5;
    const basePositions = [100, 200, 300, 400, 500];

    basePositions.forEach((pos) => {
      const shift = (shiftFactor - 0.5) * maxShift * 80;
      ctx.beginPath();
      ctx.moveTo(pos + shift, 0);
      ctx.lineTo(pos + shift, canvas.height);
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'black';
      ctx.stroke();
    });
  }, [shiftFactor, maxShift]);

  return <canvas ref={canvasRef} width={600} height={100} />;
}

export default function WobbleMethodSimulation() {
  const [starSize, setStarSize] = useState(2);
  const [planetSize, setPlanetSize] = useState(0.5);
  const [starMass, setStarMass] = useState(2);
  const [planetMass, setPlanetMass] = useState(0.5);
  const [shiftFactor, setShiftFactor] = useState(0.5);
  const [maxShift, setMaxShift] = useState(1);

  const updateStarSize = (newSize) => setStarSize(newSize);
  const updatePlanetSize = (newSize) => setPlanetSize(newSize);
  const updateStarMass = (newMass) => setStarMass(newMass);
  const updatePlanetMass = (newMass) => setPlanetMass(newMass);

  return (
    <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
      <Canvas camera={{ position: [0, 0, 20] }} style={{ flex: 1 }}>
        <ambientLight intensity={0.5} />
        <OrbitControls />
        <StarAndPlanet
          starSize={starSize}
          planetSize={planetSize}
          starMass={starMass}
          planetMass={planetMass}
          setShiftFactor={setShiftFactor}
          setMaxShift={setMaxShift}
        />
      </Canvas>

      <div style={{ position: 'absolute', top: 20, left: 20, background: 'rgba(255,255,255,0.8)', padding: 10, borderRadius: 10 }}>
        <h2>Control Panel</h2>
        <div>
          <label>
            Star Size:
            <input
              type="range"
              min="2"
              max="3"
              step="0.1"
              value={starSize}
              onChange={(e) => updateStarSize(parseFloat(e.target.value))}
            />
            {starSize.toFixed(1)}
          </label>
        </div>
        <div>
          <label>
            Planet Size:
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={planetSize}
              onChange={(e) => updatePlanetSize(parseFloat(e.target.value))}
            />
            {planetSize.toFixed(1)}
          </label>
        </div>
        <div>
          <label>
            Star Mass:
            <input
              type="range"
              min="2"
              max="3.5"
              step="0.1"
              value={starMass}
              onChange={(e) => updateStarMass(parseFloat(e.target.value))}
            />
            {starMass.toFixed(1)}
          </label>
        </div>
        <div>
          <label>
            Planet Mass:
            <input
              type="range"
              min="0.5"
              max="1.4"
              step="0.1"
              value={planetMass}
              onChange={(e) => updatePlanetMass(parseFloat(e.target.value))}
            />
            {planetMass.toFixed(1)}
          </label>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 20, right: 20, background: 'rgba(255,255,255,0.8)', padding: 10, borderRadius: 10 }}>
        <h2>Light Spectrum (Doppler Shift)</h2>
        <LightSpectrum shiftFactor={shiftFactor} maxShift={maxShift} />
      </div>
    </div>
  );
}