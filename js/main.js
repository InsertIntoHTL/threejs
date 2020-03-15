let renderer, scene, camera;

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    let light = new THREE.AmbientLight(0xffffff); 
    scene.add(light);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(150, 180, 280);

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.update();

    const loader = new THREE.GLTFLoader();

/*
    Your models are black, I think you have not included images texture in the .glb 
    So I gived you a model with a texture.
    You can find out about textures in forums, it's easy to do with Blender ;-) 
*/
    loader.load(
        'models/eevee/eevee2.glb',
        function ( gltf ) {
            let object = gltf.scene;
            object.scale.set(10,10,10);
            object.position.set(0, 0, 0);
            scene.add( object );
        },
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        function ( error ) {
            console.log( 'An error happened' );
            console.log(error)
        }
    );
    window.addEventListener('resize', onWindowResize);
}

/* renderer here otherwise OrbitControls doesn't work */
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

function onWindowResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

init();
animate();
