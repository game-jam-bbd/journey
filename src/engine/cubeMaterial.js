import * as THREE from 'three';
import { TGALoader } from 'three/examples/jsm/loaders/TGALoader.js';


export const cubeMaterial = () => {
    const loader = new TGALoader();
    const texture = loader.load( '../../assets/textures/crate_color8.tga' );
    texture.colorSpace = THREE.SRGBColorSpace;
    const material = new THREE.MeshPhongMaterial( { color: 0xffffff, map: texture } );

    return material;
};

export const enemyMaterial = () => {
    const loader = new TGALoader();
    const texture = loader.load( '../../assets/textures/crate_grey8.tga' );
    texture.colorSpace = THREE.SRGBColorSpace;
    const material = new THREE.MeshPhongMaterial( { color: 0xffffff, map: texture } );

    return material;
};