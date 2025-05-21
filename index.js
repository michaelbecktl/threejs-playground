import * as THREE from 'three'
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js'

// Basic Requirements (Set a Render/Camera/Scene Object) //
const w = window.innerWidth
const h = window.innerHeight
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(w, h)
document.body.appendChild(renderer.domElement)
const fov = 75
const aspect = w / h
const near = 0.1
const far = 10
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
camera.position.z = 2
const scene = new THREE.Scene()

// OrbitControls (Damping gives innertia, high number more friction)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.05

// Textures //

const loader = new THREE.TextureLoader()
const earthTexture = loader.load('assets/textures/8k_earth_daymap.jpg')

// Sphere Mesh //

const earthGeo = new THREE.IcosahedronGeometry(1.0, 16)
const earthMat = new THREE.MeshStandardMaterial({
  // color: 0xffffff,
  // flatShading: true,
  map: earthTexture,
})
const earthMesh = new THREE.Mesh(earthGeo, earthMat)
scene.add(earthMesh)

const earthNightTexture = loader.load('assets/textures/8k_earth_nightmap.jpg')
const earthNightMat = new THREE.MeshStandardMaterial({
  map: earthNightTexture,
  blending: THREE.AdditiveBlending,
})
const earthNightMesh = new THREE.Mesh(earthGeo, earthNightMat)
// earthNight
earthMesh.add(earthNightMesh)

// Wire Mesh encasing the Sphere //

// const wireMat = new THREE.MeshBasicMaterial({
//   color: 0x000000,
//   wireframe: true,
// })
// const wireMesh = new THREE.Mesh(earthGeo, wireMat)
// earthMesh.add(wireMesh)
// wireMesh.scale.setScalar(1.001)

// Second Sphere Mesh //

const moonGeo = new THREE.IcosahedronGeometry(1.0, 16)
const moonMat = new THREE.MeshStandardMaterial({
  color: 0x99a3a4,
  flatShading: true,
})
const moonMesh = new THREE.Mesh(moonGeo, moonMat)
moonMesh.scale.setScalar(0.24)
moonMesh.position.x = 5
earthMesh.add(moonMesh)

// Lighting //
const sunLight = new THREE.DirectionalLight(0xffffff)
sunLight.position.set(-2, 0.5, 1.5)
scene.add(sunLight)
// const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff)
// hemiLight.position.set(2, -0.5, 1.5)
// scene.add(hemiLight)

// Animation //
function animate(t = 0) {
  requestAnimationFrame(animate)
  // earthMesh.scale.setScalar(Math.cos(t * 0.001) + 1.0)
  earthMesh.rotation.y = t * 0.00005
  earthMesh.rotation.z = (-23.4 * Math.PI) / 180
  renderer.render(scene, camera)
  controls.update()
}
animate()
