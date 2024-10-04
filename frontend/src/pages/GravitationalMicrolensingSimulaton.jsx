import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

function App() {
    const mountRef = useRef(null);
    const [lightIntensity, setLightIntensity] = useState(1); // Brightness of the background star
    const [speed, setSpeed] = useState(0.03); // Control speed of animation
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Brightness',
                data: [],
                borderColor: 'rgba(255, 206, 86, 1)',
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                borderWidth: 2,
                fill: true,
                pointRadius: 0, // Remove the circular dots
                pointHoverRadius: 0, // Remove dots on hover
            },
        ],
    });

    useEffect(() => {
        if (!mountRef.current) return;

        let renderer, scene, camera, lensingStar, planet, backgroundStar, stars;
        let time = 0;

        try {
            // Initialize scene, camera, and renderer
            scene = new THREE.Scene();

            // Create a circular texture for the stars
            const starTexture = new THREE.TextureLoader().load('https://threejs.org/examples/textures/sprites/circle.png');

            // Create a starry background
            function createStars() {
                const starGeometry = new THREE.BufferGeometry();
                const starMaterial = new THREE.PointsMaterial({
                    color: 0xffffff,
                    size: 0.4,
                    transparent: true,
                    depthWrite: false,
                    sizeAttenuation: true,
                    map: starTexture,
                    blending: THREE.AdditiveBlending,
                });

                const starVertices = [];
                for (let i = 0; i < 10000; i++) {
                    const x = THREE.MathUtils.randFloatSpread(200);
                    const y = THREE.MathUtils.randFloatSpread(200);
                    const z = THREE.MathUtils.randFloatSpread(200);
                    starVertices.push(x, y, z);
                }

                starGeometry.setAttribute(
                    'position',
                    new THREE.Float32BufferAttribute(starVertices, 3)
                );

                stars = new THREE.Points(starGeometry, starMaterial);
                scene.add(stars);
            }

            // Create a background star (closer star without a planet)
            backgroundStar = new THREE.Mesh(
                new THREE.SphereGeometry(1, 32, 32),
                new THREE.MeshBasicMaterial({ color: 0xffffff })
            );
            backgroundStar.position.set(0, 0, -5);
            scene.add(backgroundStar);

            // Create a lensing star (the star with a planet causing the microlensing effect)
            lensingStar = new THREE.Mesh(
                new THREE.SphereGeometry(1, 32, 32),
                new THREE.MeshBasicMaterial({ color: 0xffff00 })
            );
            lensingStar.position.set(-5, 0, -10);
            scene.add(lensingStar);

            // Create a planet around the lensing star
            planet = new THREE.Mesh(
                new THREE.SphereGeometry(0.3, 32, 32),
                new THREE.MeshBasicMaterial({ color: 0x00ff00 })
            );
            planet.position.set(1.5, 0, 0);
            lensingStar.add(planet);

            // Setup the camera
            camera = new THREE.PerspectiveCamera(
                75,
                window.innerWidth / window.innerHeight,
                0.1,
                1000
            );
            camera.position.z = 10;

            // Renderer setup
            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            mountRef.current.appendChild(renderer.domElement);

            // Orbit controls for interactive camera movement
            const controls = new OrbitControls(camera, renderer.domElement);

            // Create the stars in the background
            createStars();

            const animate = () => {
                time += speed;
                requestAnimationFrame(animate);

                lensingStar.position.x = (0 + time * 2) % 40 - 20;
                const distance = Math.abs(lensingStar.position.x - backgroundStar.position.x);

                // Calculate brightness based on distance during microlensing event
                let intensity = 1;
                if (distance < 1 && lensingStar.position.z < backgroundStar.position.z) {
                    intensity = 1 / distance;
                    const magnification = Math.min(1 + (1 / distance), 1.5);
                    lensingStar.scale.set(magnification, magnification, magnification);
                } else {
                    lensingStar.scale.set(1, 1, 1);
                }

                // Set brightness
                setLightIntensity(Math.min(intensity, 5));

                // Update chart data after each lightIntensity change
                setChartData(prevData => {
                    const newLabels = [...prevData.labels, time.toFixed(2)];
                    const newData = [...prevData.datasets[0].data, Math.min(intensity, 5)];
                    return {
                        labels: newLabels.slice(-50), // Limit to last 50 points
                        datasets: [
                            {
                                ...prevData.datasets[0],
                                data: newData.slice(-50),
                            },
                        ],
                    };
                });

                planet.position.x = 1.5 * Math.cos(time * 2);
                planet.position.y = 1.5 * Math.sin(time * 2);

                controls.update();
                renderer.render(scene, camera);
            };

            animate();
        } catch (error) {
            console.error("WebGL context error:", error);
        }

        return () => {
            if (mountRef.current && renderer) {
                mountRef.current.removeChild(renderer.domElement);
            }
            if (renderer) {
                renderer.dispose();
            }
        };
    }, [speed]); // Removed lightIntensity dependency to avoid redundant updates

    return (
        <div className="bg-black font-Saira text-slate-400 h-screen flex absolute top-0 left-0 flex-col justify-center items-center">
            <h1 className="text-3xl mb-4 font-bold absolute top-10 left-10">Gravitational Microlensing Simulation</h1>

            {/* Graph of Brightness vs Time */}
            <div className="absolute right-10 text-slate-100 top-0 h-screen flex items-center">
                <div className="bg-slate-800 p-5 flex justify-center w-80 items-center rounded-md bg-opacity-50">
                    <Line
                        data={chartData}
                        options={{
                            responsive: true,
                            scales: {
                                x: {
                                    title: {
                                        display: true,
                                        text: 'Time',
                                    },
                                },
                                y: {
                                    title: {
                                        display: true,
                                        text: 'Brightness',
                                    },
                                    min: 0,
                                    max: 5,
                                },
                            },
                        }}
                    />
                </div>
            </div>

            <div className="absolute left-10 bottom-10 w-60 flex-col flex  items-start justify-center">
                <div><label htmlFor="speedRange" className="mb-2 font-semibold block mr-2">Speed</label></div>

                <div><input
                    id="speedRange"
                    type="range"
                    min="0.01"
                    max="0.1"
                    step="0.01"
                    value={speed}
                    onChange={(e) => setSpeed(parseFloat(e.target.value))}
                    className="range  w-60 bg-gray-700 bg-opacity-30"
                />
                </div>
            </div>

            <div className="w-full h-full" ref={mountRef}></div>
        </div>
    );
}

export default App;
