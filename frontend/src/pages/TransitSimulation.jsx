import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import './transit.css';  // CSS for the background

const TransitSimulation = () => {
  const mountRef = useRef(null);
  const [brightnessData, setBrightnessData] = useState([]);
  const [starRadius, setStarRadius] = useState(2); // Default star radius
  const [planetRadius, setPlanetRadius] = useState(0.5); // Default planet radius
  const [orbitRadius, setOrbitRadius] = useState(7); // Default orbit radius
  const [speed, setSpeed] = useState(0.005); // Default speed

  // Initialize Three.js Scene
  useEffect(() => {
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Load starry background texture
    const starTextureLoader = new THREE.TextureLoader();
    const backgroundTexture = starTextureLoader.load('../assets/stars.jpg', () => {
      scene.background = backgroundTexture; // Set the background texture once loaded
    });

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    const starGeometry = new THREE.SphereGeometry(starRadius, 32, 32);
    const starMaterial = new THREE.MeshPhongMaterial({ color: 0xffff00 });
    const star = new THREE.Mesh(starGeometry, starMaterial);
    scene.add(star);

    const planetGeometry = new THREE.SphereGeometry(planetRadius, 32, 32);
    const planetMaterial = new THREE.MeshPhongMaterial({ color: 0x0000ff });
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);
    scene.add(planet);

    // Define orbit path as a Line with no connections to center
    const orbitPoints = [];
    const orbitSegments = 64; // Number of segments in the orbit

    for (let i = 0; i <= orbitSegments; i++) {
      const theta = (i / orbitSegments) * Math.PI * 2;
      const x = orbitRadius * Math.cos(theta);
      const z = orbitRadius * Math.sin(theta);
      orbitPoints.push(new THREE.Vector3(x, 0, z));
    }

    const orbitGeometry = new THREE.BufferGeometry().setFromPoints(orbitPoints);
    const orbitMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
    const orbitPath = new THREE.Line(orbitGeometry, orbitMaterial);
    scene.add(orbitPath);

    let angle = 0;
    const maxBrightness = 100;
    const brightnessHistory = [];

    const animate = () => {
      requestAnimationFrame(animate);

      controls.update();

      angle += speed; // Use speed state
      // Update planet position based on circular orbit around the star
      planet.position.x = orbitRadius * Math.cos(angle);
      planet.position.z = orbitRadius * Math.sin(angle);
      planet.position.y = 0; // Keep the planet in the same plane

      // Calculate vectors between star, planet, and camera
      const starToCamera = new THREE.Vector3();
      starToCamera.subVectors(camera.position, star.position).normalize();

      const starToPlanet = new THREE.Vector3();
      starToPlanet.subVectors(planet.position, star.position).normalize();

      // Check if the planet is directly in front of the star from the camera's view
      const isPlanetBlockingStar = starToCamera.dot(starToPlanet) > 0.999; // If vectors are very close (almost aligned)

      const inTransit = isPlanetBlockingStar; // True if the planet blocks the star in the current view

      const planetStarRatio = planetRadius / starRadius;
      const transit = inTransit ? maxBrightness * (1 - planetStarRatio) : maxBrightness;

      brightnessHistory.push(transit);

      if (brightnessHistory.length > 100) brightnessHistory.shift();
      setBrightnessData([...brightnessHistory]);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      controls.dispose();
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [starRadius, planetRadius, orbitRadius, speed]); // Add speed to dependencies

  // Data for Light Curve Chart
  const chartData = {
    labels: Array(brightnessData.length).fill(""),
    datasets: [
      {
        label: "Star Brightness",
        data: brightnessData,
        borderColor: "rgb(255, 205, 86)",
        fill: false,
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="w-full h-screen relative">
      {/* 3D Simulation */}
      <div ref={mountRef} className="absolute inset-0"></div>

      {/* Light Curve Graph */}
      <div className="absolute bottom-5 right-5 w-72 h-48 p-4 bg-gray-900 bg-opacity-75 rounded-lg">
        <Line data={chartData} />
      </div>

      {/* Controls for Star, Planet, and Orbit Radius */}
      <div className="absolute top-5 left-5 p-4 bg-gray-900 bg-opacity-75 rounded-lg">
        <label className="block text-white">Star Radius: {starRadius}</label>
        <input
          type="range"
          min="2" // Minimum star radius set to 2
          max="5"
          step="0.1"
          value={starRadius}
          onChange={(e) => setStarRadius(parseFloat(e.target.value))}
          className="w-full"
        />

        <label className="block text-white mt-4">Planet Radius: {planetRadius}</label>
        <input
          type="range"
          min="0.1"
          max="0.75" // Maximum planet radius set to 0.75
          step="0.01"
          value={planetRadius}
          onChange={(e) => setPlanetRadius(parseFloat(e.target.value))}
          className="w-full"
        />

        <label className="block text-white mt-4">Orbit Radius: {orbitRadius}</label>
        <input
          type="range"
          min="7"
          max="12"
          step="0.1"
          value={orbitRadius}
          onChange={(e) => setOrbitRadius(parseFloat(e.target.value))}
          className="w-full"
        />

        {/* Slider for Speed Control */}
        <label className="block text-white mt-4">Speed: {speed.toFixed(3)}</label>
        <input
          type="range"
          min="0.001"
          max="0.1"
          step="0.001"
          value={speed}
          onChange={(e) => setSpeed(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default TransitSimulation;
