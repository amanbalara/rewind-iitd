const infoBox = document.getElementById('infoBox');

// Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0, 10, 30);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const ambient = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambient);
const directional = new THREE.DirectionalLight(0xffffff, 1);
directional.position.set(10, 20, 10);
scene.add(directional);

// OrbitControls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Buildings
const hostelGeometry = new THREE.BoxGeometry(4, 3, 4);
const hostelMaterial = new THREE.MeshStandardMaterial({ color: 0x156289 });
const hostel = new THREE.Mesh(hostelGeometry, hostelMaterial);
hostel.position.set(-5, 1.5, 0);
hostel.name = "Hostel Block";

const academicGeometry = new THREE.BoxGeometry(6, 4, 6);
const academicMaterial = new THREE.MeshStandardMaterial({ color: 0x8A2BE2 });
const academic = new THREE.Mesh(academicGeometry, academicMaterial);
academic.position.set(5, 2, 0);
academic.name = "Academic Block";

scene.add(hostel);
scene.add(academic);

// Raycaster
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('mousemove', (event) => {
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
});

window.addEventListener('click', () => {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length > 0) {
        const obj = intersects[0].object;
        infoBox.style.display = "block";
        infoBox.textContent = obj.name;
    } else {
        infoBox.style.display = "none";
    }
});

// Animations
gsap.from(hostel.scale, { x: 0, y: 0, z: 0, duration: 2, ease: "back.out(1.7)" });
gsap.from(academic.scale, { x: 0, y: 0, z: 0, duration: 2, delay: 0.5, ease: "back.out(1.7)" });

// Animate loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

// Handle resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
