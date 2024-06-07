import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

interface Hive3DProps {
    magnetic_x: number;
    magnetic_y: number;
    magnetic_z: number;
}

const Hive3D: React.FC<Hive3DProps> = ({ magnetic_x, magnetic_y, magnetic_z }) => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        if (mountRef.current) {
            mountRef.current.appendChild(renderer.domElement);
        }

        // Add cube-like object
        const geometry = new THREE.BoxGeometry(20, 20, 20);
        const material = new THREE.MeshBasicMaterial({ color: 0x3C4C10 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        // Position the camera
        camera.position.z = 50;

        // Orient the cube based on magnetic field data
        const targetVector = new THREE.Vector3(magnetic_x, magnetic_y, magnetic_z).normalize();
        const upVector = new THREE.Vector3(0, 1, 0); // Using Y-axis as up direction
        const quaternion = new THREE.Quaternion().setFromUnitVectors(upVector, targetVector);
        cube.quaternion.copy(quaternion);

        // Orbit Controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;  // an animation loop is required when either damping or auto-rotation is enabled
        controls.dampingFactor = 0.25;
        controls.screenSpacePanning = false;

        // Handle window resizing
        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
        window.addEventListener('resize', onWindowResize, false);

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            controls.update(); // only required if controls.enableDamping or controls.autoRotate are set to true
            renderer.render(scene, camera);
        };
        animate();

        // Clean up on unmount
        return () => {
            window.removeEventListener('resize', onWindowResize);
            if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
                mountRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, [magnetic_x, magnetic_y, magnetic_z]); // Dependency array to re-render on these props changes

    return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />;
};

export default Hive3D;
