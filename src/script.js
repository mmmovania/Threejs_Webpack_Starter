import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

let camera, scene, renderer, controls
 

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
scene = new THREE.Scene()
scene.background = new THREE.Color( 0x949494 )

// Sizes
const sizes = { width: window.innerWidth, height: window.innerHeight }

// Renderer
renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true

// Camera
camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000 );
camera.position.set(20, 16, 20)
camera.up.set( 0, 0, 1 )
camera.lookAt(0, 0, 0)
scene.add(camera)

// Controls
controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.update()

// Ambient Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.05)
scene.add(ambientLight)

// Grid
let geometry = new THREE.PlaneGeometry(-20, 20, 10, 10);
let grid = new THREE.Mesh( geometry,new THREE.MeshBasicMaterial( { color: 0x555555, wireframe:true } ));
grid.doubleSided = true;
 
scene.add(grid);


// To auto-adjust the window size
window.addEventListener('resize', () =>
{ 

    // Update camera
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Animate
 */
function render() {

    // Update the inertia on the orbit controls
    controls.update();

    // Render Scene
    renderer.render( scene, camera );
}

animate()
function animate() {

    requestAnimationFrame( animate )
    render()

}

