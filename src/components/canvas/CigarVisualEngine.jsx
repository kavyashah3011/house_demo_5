import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Creates high-resolution procedural texture for Colorado Maduro cigar wrapper
 */
function createWrapperTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Rich base Colorado Maduro tobacco gradient
  const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  grad.addColorStop(0, '#2d1c12'); // Rich deep maduro
  grad.addColorStop(0.3, '#3b2518');
  grad.addColorStop(0.7, '#321f14');
  grad.addColorStop(1, '#23150d');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Micro-mottling and cured tobacco natural leaf variation
  for (let i = 0; i < 4000; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const r = Math.random() * 24 + 4;
    const alpha = Math.random() * 0.05 + 0.01;
    const darkOrLight = Math.random() > 0.45 ? '45, 28, 18' : '15, 8, 4';
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${darkOrLight}, ${alpha})`;
    ctx.fill();
  }

  // Organic leaf veins (diagonal spiral wrap characteristic of torcedor rolling)
  ctx.lineWidth = 1.2;
  for (let i = -canvas.height; i < canvas.width + canvas.height; i += 70) {
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(20, 11, 6, 0.22)';
    ctx.moveTo(i, 0);
    ctx.bezierCurveTo(
      i + 120, canvas.height * 0.35,
      i + 80, canvas.height * 0.65,
      i + 220, canvas.height
    );
    ctx.stroke();

    // Fine secondary capillary leaf veins
    for (let k = 0; k < 6; k++) {
      const branchY = Math.random() * canvas.height;
      const branchX = i + (branchY / canvas.height) * 180;
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(30, 16, 9, 0.12)';
      ctx.lineWidth = 0.6;
      ctx.moveTo(branchX, branchY);
      ctx.lineTo(branchX + (Math.random() - 0.5) * 45, branchY + (Math.random() - 0.5) * 35);
      ctx.stroke();
    }
  }

  // Delicate seam overlaps of the spiral wrapper leaf
  for (let y = 140; y < canvas.height; y += 190) {
    ctx.fillStyle = 'rgba(10, 5, 2, 0.16)';
    ctx.fillRect(0, y, canvas.width, 2.5);
    ctx.fillStyle = 'rgba(75, 48, 30, 0.12)';
    ctx.fillRect(0, y + 2.5, canvas.width, 1.5);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * Creates high-resolution texture for the Monarca 1892 luxury gold band
 */
function createCigarBandTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Background: Deep Royal Burgundy Enamel
  ctx.fillStyle = '#1e080d';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Outer Gold foil borders
  ctx.strokeStyle = '#c5a059';
  ctx.lineWidth = 10;
  ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

  ctx.strokeStyle = '#dfba73';
  ctx.lineWidth = 3;
  ctx.strokeRect(24, 24, canvas.width - 48, canvas.height - 48);

  // Central Gold Medallion Oval
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;

  ctx.save();
  ctx.beginPath();
  ctx.ellipse(cx, cy, 260, 180, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#260c13';
  ctx.fill();
  ctx.strokeStyle = '#dfba73';
  ctx.lineWidth = 8;
  ctx.stroke();

  // Fine inner dotted bead ring
  ctx.setLineDash([4, 8]);
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = '#c5a059';
  ctx.stroke();
  ctx.setLineDash([]);

  // Monarca Crown / Crest (vector drawn in gold)
  ctx.fillStyle = '#dfba73';
  ctx.beginPath();
  ctx.moveTo(cx, cy - 110);
  ctx.lineTo(cx - 35, cy - 65);
  ctx.lineTo(cx - 20, cy - 75);
  ctx.lineTo(cx, cy - 90);
  ctx.lineTo(cx + 20, cy - 75);
  ctx.lineTo(cx + 35, cy - 65);
  ctx.closePath();
  ctx.fill();

  // Brand Name Typography
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#f5f0ea';
  ctx.font = 'bold 54px "Cinzel", serif';
  ctx.shadowColor = '#000000';
  ctx.shadowBlur = 6;
  ctx.fillText('MONARCA', cx, cy - 15);

  ctx.fillStyle = '#dfba73';
  ctx.font = '600 24px "Cinzel", serif';
  ctx.fillText('• 1892 •', cx, cy + 32);

  ctx.fillStyle = '#c5a059';
  ctx.font = '400 16px "Space Mono", monospace';
  ctx.fillText('RESERVA PRIVADA • HABANO', cx, cy + 68);

  ctx.fillStyle = '#8f764a';
  ctx.font = '300 12px "Space Mono", monospace';
  ctx.fillText('VUELTA ABAJO • HECHO A MANO', cx, cy + 96);

  ctx.restore();

  // Side ornamental filigree wings
  for (let offset of [-360, 360]) {
    ctx.save();
    ctx.translate(cx + offset, cy);
    ctx.strokeStyle = 'rgba(223, 186, 115, 0.6)';
    ctx.lineWidth = 3;
    ctx.strokeRect(-60, -40, 120, 80);
    ctx.fillStyle = '#dfba73';
    ctx.font = 'bold 20px "Cinzel", serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('M', 0, 0);
    ctx.restore();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * Creates texture for the cut tobacco foot with dark ash & live ember core
 */
function createFootTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  const cx = 256;
  const cy = 256;

  // Outer dark cured leaf rings
  ctx.fillStyle = '#180e08';
  ctx.fillRect(0, 0, 512, 512);

  // Concentric bunched long-filler tobacco leaves
  for (let r = 240; r > 10; r -= 15) {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = r % 30 === 0 ? '#26160c' : '#140c06';
    ctx.lineWidth = 8;
    ctx.stroke();
  }

  // Ash center with glowing micro-cracks
  const ashGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 140);
  ashGrad.addColorStop(0, '#e85d04'); // Glowing ember core
  ashGrad.addColorStop(0.3, '#ffba08');
  ashGrad.addColorStop(0.5, '#495057'); // Velvety white/grey ash
  ashGrad.addColorStop(0.85, '#212529');
  ashGrad.addColorStop(1, '#180e08');

  ctx.fillStyle = ashGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, 180, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

export default function CigarVisualEngine({
  transformState = {},
  className = '',
  enableInteraction = false,
}) {
  const mountRef = useRef(null);
  const stateRef = useRef(transformState);
  stateRef.current = transformState;

  const sceneRefs = useRef({
    cigarGroup: null,
    renderer: null,
    camera: null,
    keyLight: null,
    emberLight: null,
  });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // SCENE & CAMERA
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060504, 0.04);

    const isPortrait = (width / height) < 1;
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0, isPortrait ? 13.5 : 8.5);

    // RENDERER
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // LIGHTING (Dark Luxury Studio)
    const ambientLight = new THREE.AmbientLight(0xfff0db, 0.45);
    scene.add(ambientLight);

    // Warm Key Light (Upper Left Studio Softbox)
    const keyLight = new THREE.DirectionalLight(0xffecd1, 2.8);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    // Cool Rim Light (Right Back - defines wrapper curvature and oily sheen)
    const rimLight = new THREE.DirectionalLight(0x90a4ae, 1.8);
    rimLight.position.set(-5, 2, -4);
    scene.add(rimLight);

    // Warm Gold Fill Light (Lower Front)
    const goldFill = new THREE.DirectionalLight(0xc5a059, 1.2);
    goldFill.position.set(0, -4, 3);
    scene.add(goldFill);

    // Foot live ember point light
    const emberLight = new THREE.PointLight(0xff7b00, 0.8, 4);
    emberLight.position.set(0, -3.2, 0);
    scene.add(emberLight);

    // CIGAR 3D MODEL ASSEMBLY
    const cigarGroup = new THREE.Group();

    // 1. Textures
    const wrapperTexture = createWrapperTexture();
    const bandTexture = createCigarBandTexture();
    const footTexture = createFootTexture();

    // Wrapper Material (Oily Colorado Maduro)
    const wrapperMaterial = new THREE.MeshStandardMaterial({
      map: wrapperTexture,
      roughness: 0.46, // Silky natural oil sheen
      metalness: 0.08,
      bumpScale: 0.02,
    });

    // Cigar Body: Gran Robusto Vitola (Length: ~6.2 units, Radius: ~0.48 units)
    const bodyGeometry = new THREE.CylinderGeometry(0.46, 0.46, 5.2, 64, 1, true);
    const bodyMesh = new THREE.Mesh(bodyGeometry, wrapperMaterial);
    bodyMesh.position.y = 0;
    cigarGroup.add(bodyMesh);

    // Cap Head: Rounded Parejo Triple-Cap (Curved dome at top)
    const capGeometry = new THREE.SphereGeometry(
      0.46, 32, 24,
      0, Math.PI * 2,
      0, Math.PI * 0.5
    );
    const capMesh = new THREE.Mesh(capGeometry, wrapperMaterial);
    capMesh.position.y = 2.6;
    cigarGroup.add(capMesh);

    // Foot: Cut Filler Disc at bottom
    const footGeometry = new THREE.CircleGeometry(0.455, 48);
    const footMaterial = new THREE.MeshStandardMaterial({
      map: footTexture,
      roughness: 0.9,
      metalness: 0.1,
      emissive: new THREE.Color(0xff4800),
      emissiveIntensity: 0.28,
    });
    const footMesh = new THREE.Mesh(footGeometry, footMaterial);
    footMesh.position.y = -2.6;
    footMesh.rotation.x = Math.PI * 0.5;
    cigarGroup.add(footMesh);

    // Luxury Monarca 1892 Cigar Band (Anilla)
    const bandGeometry = new THREE.CylinderGeometry(0.472, 0.472, 1.25, 64, 1, true);
    const bandMaterial = new THREE.MeshStandardMaterial({
      map: bandTexture,
      roughness: 0.32,
      metalness: 0.55, // Gold metallic sheen
    });
    const bandMesh = new THREE.Mesh(bandGeometry, bandMaterial);
    bandMesh.position.y = 1.35;
    cigarGroup.add(bandMesh);

    // Secondary Reserva Footer Gold Ribbon Band
    const footerRibbonGeo = new THREE.CylinderGeometry(0.47, 0.47, 0.35, 64, 1, true);
    const footerRibbonMat = new THREE.MeshStandardMaterial({
      color: 0xc5a059,
      roughness: 0.3,
      metalness: 0.7,
    });
    const footerRibbonMesh = new THREE.Mesh(footerRibbonGeo, footerRibbonMat);
    footerRibbonMesh.position.y = -2.35;
    cigarGroup.add(footerRibbonMesh);

    // Initial orientation: poised at elegant diagonal angle
    cigarGroup.rotation.z = THREE.MathUtils.degToRad(-18);
    cigarGroup.rotation.x = THREE.MathUtils.degToRad(12);
    scene.add(cigarGroup);

    sceneRefs.current = {
      cigarGroup,
      renderer,
      camera,
      keyLight,
      emberLight,
      footMaterial,
    };

    // ANIMATION & SCROLL SYNC LOOP
    let reqId;
    const startTime = performance.now();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const elapsed = (performance.now() - startTime) * 0.001;

      // Read latest state from parent/GSAP
      const s = stateRef.current;

      if (cigarGroup) {
        // Base scroll transforms
        const targetRotX = s.rotX !== undefined ? s.rotX : 0.2;
        const targetRotY = s.rotY !== undefined ? s.rotY : elapsed * 0.15;
        const targetRotZ = s.rotZ !== undefined ? s.rotZ : -0.28;

        const targetPosX = s.posX !== undefined ? s.posX : 0;
        const targetPosY = s.posY !== undefined ? s.posY : 0;
        const targetPosZ = s.posZ !== undefined ? s.posZ : 0;
        const targetScale = s.scale !== undefined ? s.scale : 1.0;

        // Smooth lerp to target positions
        cigarGroup.rotation.x += (targetRotX - cigarGroup.rotation.x) * 0.08;
        cigarGroup.rotation.y += (targetRotY - cigarGroup.rotation.y) * 0.08;
        cigarGroup.rotation.z += (targetRotZ - cigarGroup.rotation.z) * 0.08;

        cigarGroup.position.x += (targetPosX - cigarGroup.position.x) * 0.08;
        cigarGroup.position.y += (targetPosY - cigarGroup.position.y) * 0.08;
        cigarGroup.position.z += (targetPosZ - cigarGroup.position.z) * 0.08;

        const currentScale = cigarGroup.scale.x;
        const nextScale = currentScale + (targetScale - currentScale) * 0.08;
        cigarGroup.scale.set(nextScale, nextScale, nextScale);

        // Breathing ember glow on foot
        const emberBreath = 0.25 + Math.sin(elapsed * 2.2) * 0.12;
        if (footMaterial) {
          footMaterial.emissiveIntensity = emberBreath * (s.emberIntensity || 1.0);
        }
        if (emberLight) {
          emberLight.intensity = emberBreath * 1.5;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.position.z = (w / h) < 1 ? 13.5 : 8.5;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(reqId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      wrapperTexture.dispose();
      bandTexture.dispose();
      footTexture.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-full pointer-events-none select-none ${className}`}
    />
  );
}
