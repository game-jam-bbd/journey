import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js'
//import { AudioManager } from '../engine/audioManager.js';
import { createWater, createSky, createSun } from '../engine/environment.js';
import { createDolphin } from '../engine/createObstacle.js'


export const initializeGame = () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 8;
    camera.position.y = 4;
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.shadowMap.enabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    //camera.lookAt()
    const controls = new OrbitControls(camera, renderer.domElement);

    const dolphin = createDolphin(scene);

    const ocean = createWater(scene);
    scene.add(ocean);

    const sky = createSky();
    scene.add(sky);

    const sun = createSun(renderer, sky, ocean);
    scene.environment = sun;

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.castShadow = true;
    light.position.set(0, 4, 1);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    //camera.position.z = 5;

    //const audioManager = new AudioManager();

    return { scene, camera, renderer, controls, dolphin, ocean };
};
