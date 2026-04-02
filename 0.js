import * as THREE from "three"

//scene
const scene = new THREE.Scene();
//light
const light = new THREE.PointLight(0xffffff, 5, 4, 0)
light.translateOnAxis(new THREE.Vector3(1,1,1), 2)
const light0 = new THREE.PointLight(0xffffff, 5, 4, 0)
light0.translateOnAxis(new THREE.Vector3(-1,-1,-1), 2)

scene.add(light, light0)
//geometry
const cube = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1);
//material
const cubeMaterial = new THREE.MeshPhongMaterial();
//mesh
const cubeMesh = new THREE.Mesh(cube, cubeMaterial);
//add mesh to scene
scene.add(cubeMesh);
//camera
const size = {
    width: 400,
    height: 300
}

const camera = new THREE.PerspectiveCamera(45, size.width / size.height, 0.1, 1000);
scene.add(camera);

const canv = document.getElementById('0');
console.log(canv);
const renderer = new THREE.WebGLRenderer({
    canvas: canv
})
renderer.setSize(size.width, size.height);
renderer.render(scene, camera);

let speed = Math.PI/2;
let theta = Math.PI/6;
let time = 30
camera.rotation.x = Math.PI/2;
setInterval(()=>{
    theta += speed/(1000/time);
    camera.rotation.y = -theta;
    //y: z->x right hand rule
    //x: y->z right hand rule
    //z: x->y right hand rule
    /*attention: init c.pos is -z, after c.x rotated, the c.z is now -y and c.y is now z
    so if you want to rotate c by z you have to rotate c.y negatively
    */ 
    camera.position.x = -Math.sin(theta)*5;
    camera.position.y = -Math.cos(theta)*5;
    renderer.render(scene, camera);
}, time)