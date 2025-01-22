import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const SignalHeatmap = ({ data }) => {
  const ref = useRef();

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    ref.current.appendChild(renderer.domElement);

    // Add visualization code
    data.forEach((network) => {
      const geometry = new THREE.BoxGeometry(network.signal_level, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
    });

    camera.position.z = 5;
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();
  }, [data]);

  return <div ref={ref} />;
};

export default SignalHeatmap;
