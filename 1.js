import * as THREE from 'three'
const canv = document.getElementById('1')

const size = {
    width: 400,
    height: 300,
}

const scene = new THREE.Scene()
const renderer = new THREE.WebGLRenderer({
    canvas: canv
})

//camera
const camera = new THREE.PerspectiveCamera(75, size.width/size.height, 0.1, 1000)
camera.position.set(0, 0, 70)
scene.add(camera)
//ini obj
const sph = {
    rad: 1,
    wseg: 9,
}
let objL = []
//sun
const sunGeo = new THREE.SphereGeometry(sph.rad*5)
const sunMate = new THREE.MeshBasicMaterial({color: 0xdddd22})
const sunMesh = new THREE.Mesh(sunGeo, sunMate)
sunMesh.scale.set(2, 2, 2)//attention! scale will be set to the parent and its children
//earth
const earthGeo = new THREE.SphereGeometry(sph.rad*1.5)
const earthMate = new THREE.MeshPhongMaterial({color: 0x2244ff})
const earthMesh = new THREE.Mesh(earthGeo, earthMate)
earthMesh.position.set(20, 0, 0)

//moon
const moonGeo = new THREE.SphereGeometry(sph.rad)
const moonMate = new THREE.MeshPhongMaterial({color: 0xffffff})
const moonMesh = new THREE.Mesh(moonGeo, moonMate)
moonMesh.position.set(4, 0, 0)
/**
position is the relative position that makes the parent obj position the (0,0,0) 
*/
//light
const light = new THREE.PointLight(0xffffff, 10, 0, 0)
light.position.set(5, 0, 0)
/*
don't care about the scale,
it changes the scale of '1',
doesn't change the nums of '1'
*/

//build
earthMesh.add(moonMesh)
sunMesh.add(earthMesh)
sunMesh.add(light)
scene.add(sunMesh)
objL.push(moonMesh, earthMesh, sunMesh)
//span&render
const theta = Math.PI/3
const rota = (theta)=>{
    objL.forEach(it=>{
        let axes = new THREE.AxesHelper(3)
        axes.material.depthTest = false;//ignore hiding relationship
        /* 
        axes.renderOrder = 1; 
        render from min to the max (0, +infinity),
        it doesn't influence the hiding relationship
        */
       it.add(axes)
    })
    sunMesh.rotation.z+=theta/(1000*12/30)
    earthMesh.rotation.z+=theta/(1000/30)
}

setInterval(()=>{
    rota(theta)
    renderer.render(scene, camera)
}, 30)
