import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
scene.add(directionalLight);

// Resize handler
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

// Model loader
function loadModel(modelData) {
    const mtlLoader = new MTLLoader();
    mtlLoader.load(modelData.mtl, function (materials) {
        materials.preload();
        const objLoader = new OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.load(modelData.obj, function (object) {
            object.scale.set(0.003, 0.003, 0.003);
            object.position.set(0, 0, 0); // Adjust position if necessary
            scene.add(object);
        }, onProgress, onError);
    });
}

function onProgress(xhr) {
    if (xhr.lengthComputable) {
        const percentComplete = xhr.loaded / xhr.total * 100;
        console.log('Model ' + Math.round(percentComplete, 2) + '% downloaded');
    }
}

function onError() {
    console.error('An error happened during model loading.');
}

// PostMessage Listener
window.addEventListener('message', function(event) {
    // Optionally check event.origin here if you want to verify the source
    if (event.data && event.data.type === 'loadModel') {
        fetchModelConfig(event.data.model);
    }
}, false);

function fetchModelConfig(modelKey) {
    fetch('models.json')
        .then(response => response.json())
        .then(data => {
            if (data.models[modelKey]) {
                loadModel(data.models[modelKey]);
            } else {
                console.error('Model not found:', modelKey);
            }
        })
        .catch(error => console.error('Error fetching model configurations:', error));
}

// Camera position
camera.position.z = 5;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();
