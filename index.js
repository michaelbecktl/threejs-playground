import * as THREE from 'three'
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js'

// Basic Requirements (Set a Render/Camera/Scene Object) //
const w = window.innerWidth
const h = window.innerHeight
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(w, h)
document.body.appendChild(renderer.domElement)
const fov = 76
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

// Sphere Mesh //

const geo = new THREE.IcosahedronGeometry(1.0, 2)
const mat = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  flatShading: true,
})
const mesh = new THREE.Mesh(geo, mat)
scene.add(mesh)

// Wire Mesh encasing the Sphere //

const wireMat = new THREE.MeshBasicMaterial({
  color: 0x000000,
  wireframe: true,
})
const wireMesh = new THREE.Mesh(geo, wireMat)
mesh.add(wireMesh)
wireMesh.scale.setScalar(1.001)

// Lighting //
const hemiLight = new THREE.HemisphereLight(0x0099ff, 0xff8500)
scene.add(hemiLight)

// Animation //
function animate(t = 0) {
  requestAnimationFrame(animate)
  // mesh.scale.setScalar(Math.cos(t * 0.001) + 1.0)
  mesh.rotation.y = t * 0.0001
  renderer.render(scene, camera)
  controls.update()
}
animate()