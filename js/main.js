import {OrbitControls} from '../three.js-master/examples/jsm/controls/OrbitControls.js';
import {WEBGL} from "../three.js-master/examples/jsm/WebGL.js";
import {GLTFLoader} from "../three.js-master/examples/jsm/loaders/GLTFLoader.js";

if (WEBGL.isWebGLAvailable()) {

    let scene, camera, renderer, cube;

    function init() {

        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);

        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setSize(window.innerWidth, window.innerHeight);

        document.body.appendChild(renderer.domElement);


        let controls = new OrbitControls(camera, renderer.domElement);

        /*
        let geometry = new THREE.BoxGeometry();
        let material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } );
        cube = new THREE.Mesh( geometry, material );
        scene.add( cube );*/

        var loader = new GLTFLoader();

        loader.load(
            // resource URL
            'models/eevee/eevee.glb',
            // called when the resource is loaded
            function ( gltf ) {

                let object = gltf.scene.children[0];
                object.scale.set(200,200,200);
                object.position.set(50, 50, 50);

                scene.add( object );

                renderer.render(scene, camera);

            },
            // called while loading is progressing
            function ( xhr ) {

                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

            },
            // called when loading has errors
            function ( error ) {

                console.log( 'An error happened' );
                console.log(error)

            }
        );

        camera.position.z = 5;

        window.addEventListener('resize', onWindowResize);

    }

    function animate() {
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

    init();
    animate();

} else {

    let warning = WEBGL.getWebGLErrorMessage();
    document.getElementById('warning').appendChild(warning);

}

