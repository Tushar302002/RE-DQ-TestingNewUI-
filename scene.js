import * as THREE from 'https://esm.sh/three@0.160.0';
import { GLTFLoader } from 'https://esm.sh/three@0.160.0/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'https://esm.sh/three@0.160.0/examples/jsm/loaders/DRACOLoader.js';
import { OrbitControls } from 'https://esm.sh/three@0.160.0/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'https://esm.sh/three@0.160.0/examples/jsm/loaders/RGBELoader.js';

// Scene
const scene = new THREE.Scene();
const container=document.querySelector(".container")

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true,alpha:true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// Camera
const camera = new THREE.PerspectiveCamera(20, container.clientWidth / container.clientHeight, 0.01, 10000);


// Controls
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(3.48, 0.56, 4.89); // Adjust as per your scene
controls.target.set(0, 0.568, 0);
controls.update();

// Load environment map (HDR)
const hdrLoader = new RGBELoader();
hdrLoader.load('assets/autoshop_01_2k.hdr', function (hdrTexture) {
    hdrTexture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = hdrTexture;
});

// Loaders
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);

function loadModel() {
    return new Promise((resolve, reject) => {
        loader.load("assets/base.glb", (gltf) => {
            scene.add(gltf.scene);
            resolve(); // only resolves after model is added to scene
        }, undefined, (error) => {
            console.error("Failed to load model:", error);
            reject(error);
        });
    });
}



// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    const width = container.clientWidth;
    const height = container.clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

export {loadModel}