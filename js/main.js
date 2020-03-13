import {OrbitControls} from '../three.js-master/examples/jsm/controls/OrbitControls.js';
import {WEBGL} from "../three.js-master/examples/jsm/WebGL.js";
import {GLTFLoader} from "../three.js-master/examples/jsm/loaders/GLTFLoader.js";

if (WEBGL.isWebGLAvailable()) {

    let scene, camera, renderer, cube, light;

    function init() {
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0xffffff);

        light = new THREE.AmbientLight(0xffffff);
        scene.add(light);

        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100000);
        camera.position.set(150, 180, 280);

        renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setSize(window.innerWidth, window.innerHeight);

        document.body.appendChild(renderer.domElement);

        let controls = new OrbitControls(camera, renderer.domElement);

        var loader = new GLTFLoader();

        loader.load(
            'models/windmill/windmill.glb',
            function ( gltf ) {
                let object = gltf.scene.children[0];
                object.scale.set(1,1,1);
                object.position.set(0, 0, 0);
                scene.add( object );
                renderer.render(scene, camera);
            },
            function ( xhr ) {
                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
            },
            function ( error ) {
                console.log( 'An error happened' );
                console.log(error)
            }
        );
        camera.position.z = 5;
        /*window.addEventListener('resize', onWindowResize);*/
    }

    init();

    /*function animate() {
        requestAnimationFrame(animate);

//		update();

        renderer.render(scene, camera);
    }

    function update() {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
    }

    function onWindowResize() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }

    animate();*/

} else {

    let warning = WEBGL.getWebGLErrorMessage();
    document.getElementById('warning').appendChild(warning);

}

