import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const TransitSimulation = () => {
  const mountRef = useRef(null);
  const [brightnessData, setBrightnessData] = useState([]);
  const [starRadius, setStarRadius] = useState(2);
  const [planetRadius, setPlanetRadius] = useState(0.5);
  const [orbitRadius, setOrbitRadius] = useState(7);
  const [speed, setSpeed] = useState(0.005);

  useEffect(() => {
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Create background stars
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
      sizeAttenuation: true,
    });

    const starsVertices = [];
    for (let i = 0; i < 10000; i++) {
      const x = THREE.MathUtils.randFloatSpread(2000);
      const y = THREE.MathUtils.randFloatSpread(2000);
      const z = THREE.MathUtils.randFloatSpread(2000);
      starsVertices.push(x, y, z);
    }

    starsGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starsVertices, 3)
    );
    const starField = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starField);

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Load textures
    const textureLoader = new THREE.TextureLoader();
    const sunTexture = textureLoader.load(
      "https://cors-anywhere.herokuapp.com/https://img.freepik.com/free-photo/top-view-tie-dye-cloth_23-2148778171.jpg?t=st=1727715841~exp=1727719441~hmac=cf278e693fd37be9944141459c342cbe05dbedd0750af61197e3c78cbe364a8b&w=1380"
    );
    const planetTexture = textureLoader.load(
      "https://cors-anywhere.herokuapp.com/https://img.freepik.com/free-photo/creative-abstract-mixed-red-color-painting-with-marble-liquid-effect-panorama_1258-91857.jpg?t=st=1727734167~exp=1727737767~hmac=2cb393e23f1bc8007a46c1901d29b85ac847bdc4b72f0092a5a3b43df4bd0295&w=740"
    );

    // Sun
    const starGeometry = new THREE.SphereGeometry(starRadius, 32, 32);
    const starMaterial = new THREE.MeshPhongMaterial({
      map: sunTexture,
      emissive: 0xffff00,
      emissiveIntensity: 0.5,
    });
    const star = new THREE.Mesh(starGeometry, starMaterial);
    scene.add(star);

    // Planet
    const planetGeometry = new THREE.SphereGeometry(planetRadius, 32, 32);
    const planetMaterial = new THREE.MeshPhongMaterial({ map: planetTexture });
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);
    scene.add(planet);

    // Orbit Path
    const orbitPoints = [];
    const orbitSegments = 64;
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

      // Rotate planet and sun around their own axes
      planet.rotation.y += 0.01; // Planet rotating on its axis
      star.rotation.y += 0.005; // Sun rotating on its axis

      // Orbiting motion
      angle += speed;
      planet.position.x = orbitRadius * Math.cos(angle);
      planet.position.z = orbitRadius * Math.sin(angle);
      planet.position.y = 0;

      const starToCamera = new THREE.Vector3();
      starToCamera.subVectors(camera.position, star.position).normalize();

      const starToPlanet = new THREE.Vector3();
      starToPlanet.subVectors(planet.position, star.position).normalize();

      const isPlanetBlockingStar = starToCamera.dot(starToPlanet) > 0.999;

      const inTransit = isPlanetBlockingStar;

      const planetStarRatio = planetRadius / starRadius;
      const transit = inTransit
        ? maxBrightness * (1 - planetStarRatio)
        : maxBrightness;

      brightnessHistory.push(transit);

      if (brightnessHistory.length > 100) brightnessHistory.shift();
      setBrightnessData([...brightnessHistory]);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      controls.dispose();
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [starRadius, planetRadius, orbitRadius, speed]);

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
      <div ref={mountRef} className="absolute inset-0 w-full"></div>
      <div className="flex-col rounded-full font-Saira font-bold text-slate-400 text-3xl flex justify-center items-start">
        <div className="p-1 rounded-md ml-10 mt-10 font-Titiliuam z-50">
          Transit Method Simulation
        </div>
      </div>

      <div className="fixed h-screen w-72 top-0 right-10 flex justify-center items-center">
        <div className="w-72 h-48 p-4 bg-gray-900 bg-opacity-75 rounded-lg">
          <Line data={chartData} />
        </div>
      </div>

      <div className="absolute bottom-10 left-10 w-60 bg-opacity-75 rounded-lg font-semibold">
        <label className="block text-white">Star Radius: {starRadius}</label>
        <input
          type="range"
          min="2"
          max="5"
          step="0.1"
          value={starRadius}
          onChange={(e) => setStarRadius(parseFloat(e.target.value))}
          className="w-full range"
        />

        <label className="block text-white mt-4">Planet Radius: {planetRadius}</label>
        <input
          type="range"
          min="0.1"
          max="0.75"
          step="0.01"
          value={planetRadius}
          onChange={(e) => setPlanetRadius(parseFloat(e.target.value))}
          className="w-full range"
        />

        <label className="block text-white mt-4">Orbit Radius: {orbitRadius}</label>
        <input
          type="range"
          min="7"
          max="12"
          step="0.1"
          value={orbitRadius}
          onChange={(e) => setOrbitRadius(parseFloat(e.target.value))}
          className="w-full range"
        />

        <label className="block text-white mt-4">Speed: {speed.toFixed(3)}</label>
        <input
          type="range"
          min="0.001"
          max="0.1"
          step="0.001"
          value={speed}
          onChange={(e) => setSpeed(parseFloat(e.target.value))}
          className="w-full range"
        />
      </div>
    </div>
  );
};

export default TransitSimulation;
