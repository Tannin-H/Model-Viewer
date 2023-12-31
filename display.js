import * as THREE from 'three';
        import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
        import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
        import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
        import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';

        // Instantiating variables
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
        const renderer = new THREE.WebGLRenderer();
        const controls = new OrbitControls(camera, renderer.domElement);

        // customising render and initializing
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000); // Set background color to black
        document.body.appendChild(renderer.domElement);

        // Positioning the camera away from and facing the model
        camera.position.set(0, 7, 11);
        camera.lookAt(0, 0, 0)
        controls.update(); // must be called after any camera transformation

        // Lighting setup
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        scene.add(directionalLight);
        const light = new THREE.AmbientLight(0xffffff, 0.2);
        scene.add(light);

        // MTL Loader
        const mtlLoader = new MTLLoader();
        mtlLoader.load('Models/deer_feeder/deer_feeder.mtl', function(materials) {
            materials.preload();

            // OBJ Loader with Materials
            const objLoader = new OBJLoader();
            objLoader.setMaterials(materials);

            objLoader.load(
                'Models/deer_feeder/deer_feeder.obj', // model filepath
                function(object) {
                    object.scale.set(0.003, 0.003, 0.003);
                    scene.add(object);
                },
                function(xhr) {
                    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                },
                function(error) {
                    console.log('An error happened');
                }
            );
        });

        window.addEventListener('resize', onWindowResize, false);
        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        function animate() {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };

        animate();