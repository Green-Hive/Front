import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

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
        const camera = new THREE.PerspectiveCamera(75, 700 / 280, 0.1, 1000); // Set aspect ratio to 776 / 300
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(700, 300); // Set renderer size to 776x300
        if (mountRef.current) {
            mountRef.current.appendChild(renderer.domElement);
        }


        // Add cube-like object
        const geometry = new THREE.BoxGeometry(20, 20, 20);
        const material = new THREE.MeshBasicMaterial({ color: 0x3C4C10 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        
        // Edges for the cube
        const edges = new THREE.EdgesGeometry(geometry); // Create edges from the cube geometry
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 1 });
        const wireframe = new THREE.LineSegments(edges, lineMaterial);
        cube.add(wireframe); // Add wireframe-like edge to the cube

        // Position the camera
        camera.position.z = 40;

        // Orient the cube based on magnetic field data
        const targetVector = new THREE.Vector3(magnetic_x, magnetic_y, magnetic_z).normalize();
        const upVector = new THREE.Vector3(0, 1, 0); // Using Y-axis as up direction
        const quaternion = new THREE.Quaternion().setFromUnitVectors(upVector, targetVector);
        cube.quaternion.copy(quaternion);

        // Handle resizing
        const onWindowResize = () => {
            camera.aspect = 700 / 280;
            camera.updateProjectionMatrix();
            renderer.setSize(700, 280);
        };
        window.addEventListener('resize', onWindowResize, false);

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
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

    return <div ref={mountRef} style={{ width: '700px', height: '280px' }} />;
};

export default Hive3D;