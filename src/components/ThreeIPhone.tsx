import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { ProductColor } from '../types.ts';
import { RotateCw, RefreshCw, Sparkles, Layers } from 'lucide-react';

interface ThreeIPhoneProps {
  selectedColor: ProductColor;
  onColorChange?: (color: ProductColor) => void;
  availableColors?: ProductColor[];
  compact?: boolean;
}

export const ThreeIPhone: React.FC<ThreeIPhoneProps> = ({
  selectedColor,
  onColorChange,
  availableColors,
  compact = false,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isRotating, setIsRotating] = useState(true);
  const [isInspecting, setIsInspecting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // References for Three.js state
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const phoneGroupRef = useRef<THREE.Group | null>(null);
  const bodyMaterialRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const frameMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const islandPlateMaterialRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // Interaction tracking
  const targetRotationYRef = useRef<number>(0.3);
  const targetRotationXRef = useRef<number>(0.1);
  const currentRotationYRef = useRef<number>(0.3);
  const currentRotationXRef = useRef<number>(0.1);
  const isPointerDownRef = useRef<boolean>(false);
  const pointerStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const baseRotationRef = useRef<{ x: number; y: number }>({ x: 0.1, y: 0.3 });
  const isAutoRotateRef = useRef<boolean>(true);

  // Update auto rotate ref
  useEffect(() => {
    isAutoRotateRef.current = isRotating;
  }, [isRotating]);

  // Update 3D materials when selectedColor changes
  useEffect(() => {
    if (bodyMaterialRef.current && frameMaterialRef.current) {
      const color = new THREE.Color(selectedColor.hex);
      const accent = new THREE.Color(selectedColor.accentHex);

      bodyMaterialRef.current.color.copy(color);
      if (islandPlateMaterialRef.current) {
        islandPlateMaterialRef.current.color.copy(color).multiplyScalar(1.05);
      }
      frameMaterialRef.current.color.copy(accent).lerp(new THREE.Color('#94a3b8'), 0.3);
    }
  }, [selectedColor]);

  // Create Screen Texture dynamically with futuristic neon artwork
  const createScreenTexture = useCallback(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 2048;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Deep dark background with futuristic purple gradient
    const grad = ctx.createLinearGradient(0, 0, 1024, 2048);
    grad.addColorStop(0, '#0a0514');
    grad.addColorStop(0.3, '#190a2e');
    grad.addColorStop(0.7, '#070913');
    grad.addColorStop(1, '#020205');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 2048);

    // Flowing luminous energy ribbons
    ctx.save();
    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      ctx.moveTo(-100, 400 + i * 250);
      ctx.bezierCurveTo(
        350 + i * 80,
        300 - i * 60,
        650 - i * 50,
        1400 + i * 100,
        1150,
        1100 + i * 180
      );
      ctx.strokeStyle = i % 2 === 0 ? 'rgba(168, 85, 247, 0.45)' : 'rgba(192, 132, 252, 0.35)';
      ctx.lineWidth = 140 - i * 20;
      ctx.filter = 'blur(40px)';
      ctx.stroke();
    }
    ctx.restore();

    // Central electric core glow
    const radial = ctx.createRadialGradient(512, 1050, 40, 512, 1050, 650);
    radial.addColorStop(0, 'rgba(216, 180, 254, 0.7)');
    radial.addColorStop(0.35, 'rgba(147, 51, 234, 0.4)');
    radial.addColorStop(0.7, 'rgba(59, 130, 246, 0.15)');
    radial.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = radial;
    ctx.fillRect(0, 400, 1024, 1300);

    // Time & Status Header in Apple style
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 130px Outfit, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('09:41', 512, 430);

    ctx.font = '500 42px Outfit, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
    ctx.fillText('Saturday, October 10', 512, 510);

    // Subtle Brand Watermark on Screen
    ctx.font = '600 36px Outfit, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.fillText('iSTUDIO PRO EDITION', 512, 1750);

    // Bottom Home Indicator Bar
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.beginPath();
    ctx.roundRect(362, 1980, 300, 16, 8);
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 550;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.2);
    cameraRef.current = camera;

    // 3. Renderer with antialiasing
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    rendererRef.current = renderer;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. Studio Lighting Architecture
    // Key Light (warm-white directional)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(4, 5, 6);
    scene.add(keyLight);

    // Fill Light (soft cool ambient)
    const fillLight = new THREE.DirectionalLight(0xcfd8dc, 1.6);
    fillLight.position.set(-5, -2, 4);
    scene.add(fillLight);

    // Rim Light (sharp highlight from rear-top)
    const rimLight = new THREE.DirectionalLight(0xffffff, 3.2);
    rimLight.position.set(0, 6, -5);
    scene.add(rimLight);

    // Electric Purple Under-Glow (signature brand aesthetic)
    const purpleSpot = new THREE.PointLight(0xa855f7, 4.0, 12, 1.8);
    purpleSpot.position.set(2, -3.5, 3.5);
    scene.add(purpleSpot);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    // 5. Construct 3D iPhone Model
    const phoneGroup = new THREE.Group();
    phoneGroupRef.current = phoneGroup;
    scene.add(phoneGroup);

    // Phone Dimensions (Apple proportional ratios: 160mm x 77mm x 8.25mm)
    const phoneWidth = 3.0;
    const phoneHeight = 6.2;
    const phoneDepth = 0.32;
    const cornerRadius = 0.48;

    // Helper: Rounded Rectangle 2D Shape
    const roundedRectShape = new THREE.Shape();
    const x = -phoneWidth / 2;
    const y = -phoneHeight / 2;
    const w = phoneWidth;
    const h = phoneHeight;
    const r = cornerRadius;

    roundedRectShape.moveTo(x + r, y);
    roundedRectShape.lineTo(x + w - r, y);
    roundedRectShape.quadraticCurveTo(x + w, y, x + w, y + r);
    roundedRectShape.lineTo(x + w, y + h - r);
    roundedRectShape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    roundedRectShape.lineTo(x + r, y + h);
    roundedRectShape.quadraticCurveTo(x, y + h, x, y + h - r);
    roundedRectShape.lineTo(x, y + r);
    roundedRectShape.quadraticCurveTo(x, y, x + r, y);

    // Materials
    const initialHex = selectedColor.hex;
    const initialAccent = selectedColor.accentHex;

    // Brushed Grade 5 Titanium Outer Frame
    const frameMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(initialAccent).lerp(new THREE.Color('#94a3b8'), 0.3),
      metalness: 0.94,
      roughness: 0.28,
      envMapIntensity: 1.5,
    });
    frameMaterialRef.current = frameMaterial;

    // Rear Textured Matte Glass
    const bodyMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(initialHex),
      metalness: 0.15,
      roughness: 0.42,
      clearcoat: 0.35,
      clearcoatRoughness: 0.15,
      reflectivity: 0.6,
    });
    bodyMaterialRef.current = bodyMaterial;

    // Main Chassis
    const extrudeSettings = {
      depth: phoneDepth,
      bevelEnabled: true,
      bevelSegments: 5,
      steps: 1,
      bevelSize: 0.04,
      bevelThickness: 0.04,
    };
    const bodyGeometry = new THREE.ExtrudeGeometry(roundedRectShape, extrudeSettings);
    bodyGeometry.center();
    const mainBody = new THREE.Mesh(bodyGeometry, frameMaterial);
    phoneGroup.add(mainBody);

    // Rear Glass Inlay Plate
    const rearGlassGeo = new THREE.BoxGeometry(phoneWidth - 0.08, phoneHeight - 0.08, 0.02);
    const rearGlass = new THREE.Mesh(rearGlassGeo, bodyMaterial);
    rearGlass.position.z = -phoneDepth / 2 - 0.015;
    phoneGroup.add(rearGlass);

    // Apple Logo Mirror Inlay on Back
    const logoGroup = new THREE.Group();
    const logoMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.98,
      roughness: 0.05,
    });
    const appleBodyGeo = new THREE.SphereGeometry(0.24, 24, 24);
    appleBodyGeo.scale(1, 1.15, 0.1);
    const appleMesh = new THREE.Mesh(appleBodyGeo, logoMat);
    logoGroup.add(appleMesh);

    // Apple Leaf
    const leafGeo = new THREE.ConeGeometry(0.08, 0.14, 16);
    leafGeo.scale(1, 0.5, 0.15);
    const leafMesh = new THREE.Mesh(leafGeo, logoMat);
    leafMesh.position.set(0.06, 0.34, 0);
    leafMesh.rotation.z = -0.55;
    logoGroup.add(leafMesh);

    logoGroup.position.set(0, 0.2, -phoneDepth / 2 - 0.028);
    phoneGroup.add(logoGroup);

    // Front OLED Screen with Wallpaper
    const screenTexture = createScreenTexture();
    const screenMaterial = new THREE.MeshBasicMaterial({
      map: screenTexture || undefined,
      color: 0xffffff,
    });
    const screenGeo = new THREE.PlaneGeometry(phoneWidth - 0.14, phoneHeight - 0.14);
    const screenMesh = new THREE.Mesh(screenGeo, screenMaterial);
    screenMesh.position.z = phoneDepth / 2 + 0.042;
    phoneGroup.add(screenMesh);

    // Front Glass Protective Layer with subtle reflection
    const frontGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x111111,
      metalness: 0.1,
      roughness: 0.05,
      transparent: true,
      opacity: 0.12,
      reflectivity: 0.9,
    });
    const frontGlass = new THREE.Mesh(screenGeo, frontGlassMat);
    frontGlass.position.z = phoneDepth / 2 + 0.044;
    phoneGroup.add(frontGlass);

    // Dynamic Island at top
    const islandGeo = new THREE.CapsuleGeometry(0.075, 0.42, 8, 16);
    islandGeo.rotateZ(Math.PI / 2);
    islandGeo.scale(1, 1, 0.1);
    const islandMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const islandMesh = new THREE.Mesh(islandGeo, islandMat);
    islandMesh.position.set(0, phoneHeight / 2 - 0.36, phoneDepth / 2 + 0.046);
    phoneGroup.add(islandMesh);

    // Selfie Camera Aperture Dot
    const selfieGeo = new THREE.CircleGeometry(0.025, 16);
    const selfieMat = new THREE.MeshBasicMaterial({ color: 0x0a1428 });
    const selfieMesh = new THREE.Mesh(selfieGeo, selfieMat);
    selfieMesh.position.set(0.14, phoneHeight / 2 - 0.36, phoneDepth / 2 + 0.047);
    phoneGroup.add(selfieMesh);

    // Camera Island (Raised rounded plateau on back)
    const islandPlateShape = new THREE.Shape();
    const ipW = 1.35;
    const ipH = 1.35;
    const ipR = 0.28;
    const ipX = -ipW / 2;
    const ipY = -ipH / 2;

    islandPlateShape.moveTo(ipX + ipR, ipY);
    islandPlateShape.lineTo(ipX + ipW - ipR, ipY);
    islandPlateShape.quadraticCurveTo(ipX + ipW, ipY, ipX + ipW, ipY + ipR);
    islandPlateShape.lineTo(ipX + ipW, ipY + ipH - ipR);
    islandPlateShape.quadraticCurveTo(ipX + ipW, ipY + ipH, ipX + ipW - ipR, ipY + ipH);
    islandPlateShape.lineTo(ipX + ipR, ipY + ipH);
    islandPlateShape.quadraticCurveTo(ipX, ipY + ipH, ipX, ipY + ipH - ipR);
    islandPlateShape.lineTo(ipX, ipY + ipR);
    islandPlateShape.quadraticCurveTo(ipX, ipY, ipX + ipR, ipY);

    const islandPlateGeo = new THREE.ExtrudeGeometry(islandPlateShape, {
      depth: 0.12,
      bevelEnabled: true,
      bevelSegments: 3,
      bevelSize: 0.02,
      bevelThickness: 0.02,
    });
    const islandPlateMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(initialHex).multiplyScalar(1.05),
      metalness: 0.3,
      roughness: 0.3,
      clearcoat: 0.8,
    });
    islandPlateMaterialRef.current = islandPlateMat;

    const cameraPlate = new THREE.Mesh(islandPlateGeo, islandPlateMat);
    // Position on top-left of rear (which is top-right when looking from back)
    cameraPlate.position.set(-0.62, 1.95, -phoneDepth / 2 - 0.14);
    phoneGroup.add(cameraPlate);

    // Triple Camera System (Large Pro Lenses)
    const lensPositions = [
      { x: -0.92, y: 2.25 }, // Top Lens
      { x: -0.92, y: 1.62 }, // Bottom-Left Lens
      { x: -0.36, y: 1.93 }, // Right Telephoto Lens
    ];

    const lensRingMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(initialAccent).lerp(new THREE.Color('#94a3b8'), 0.2),
      metalness: 0.98,
      roughness: 0.12,
    });
    const lensGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x050810,
      metalness: 0.9,
      roughness: 0.02,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      reflectivity: 1.0,
    });

    lensPositions.forEach((pos) => {
      // Outer Bevel Ring
      const ringGeo = new THREE.CylinderGeometry(0.24, 0.25, 0.12, 32);
      ringGeo.rotateX(Math.PI / 2);
      const ringMesh = new THREE.Mesh(ringGeo, lensRingMat);
      ringMesh.position.set(pos.x, pos.y, -phoneDepth / 2 - 0.18);
      phoneGroup.add(ringMesh);

      // Inner Lens Aperture
      const lensGeo = new THREE.CylinderGeometry(0.19, 0.19, 0.02, 32);
      lensGeo.rotateX(Math.PI / 2);
      const lensMesh = new THREE.Mesh(lensGeo, lensGlassMat);
      lensMesh.position.set(pos.x, pos.y, -phoneDepth / 2 - 0.245);
      phoneGroup.add(lensMesh);

      // Deep Pupil / Iris Reflection
      const irisGeo = new THREE.CircleGeometry(0.08, 16);
      const irisMat = new THREE.MeshBasicMaterial({ color: 0x001122 });
      const irisMesh = new THREE.Mesh(irisGeo, irisMat);
      irisMesh.position.set(pos.x, pos.y, -phoneDepth / 2 - 0.256);
      irisMesh.rotation.y = Math.PI;
      phoneGroup.add(irisMesh);
    });

    // True Tone Flash
    const flashGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.02, 16);
    flashGeo.rotateX(Math.PI / 2);
    const flashMat = new THREE.MeshStandardMaterial({
      color: 0xfff4e0,
      emissive: 0xffe0a0,
      emissiveIntensity: 0.4,
      roughness: 0.3,
    });
    const flashMesh = new THREE.Mesh(flashGeo, flashMat);
    flashMesh.position.set(-0.36, 2.35, -phoneDepth / 2 - 0.15);
    phoneGroup.add(flashMesh);

    // LiDAR Scanner Sensor
    const lidarGeo = new THREE.CylinderGeometry(0.075, 0.075, 0.02, 16);
    lidarGeo.rotateX(Math.PI / 2);
    const lidarMat = new THREE.MeshStandardMaterial({ color: 0x111116, roughness: 0.9 });
    const lidarMesh = new THREE.Mesh(lidarGeo, lidarMat);
    lidarMesh.position.set(-0.36, 1.55, -phoneDepth / 2 - 0.15);
    phoneGroup.add(lidarMesh);

    // Side Buttons (Action button, Volume up/down, Side lock button)
    const buttonMat = frameMaterial;
    // Action button
    const actionBtnGeo = new THREE.BoxGeometry(0.04, 0.26, 0.06);
    const actionBtn = new THREE.Mesh(actionBtnGeo, buttonMat);
    actionBtn.position.set(-phoneWidth / 2 - 0.03, 1.8, 0);
    phoneGroup.add(actionBtn);

    // Volume Up
    const volUpGeo = new THREE.BoxGeometry(0.04, 0.38, 0.06);
    const volUp = new THREE.Mesh(volUpGeo, buttonMat);
    volUp.position.set(-phoneWidth / 2 - 0.03, 1.25, 0);
    phoneGroup.add(volUp);

    // Volume Down
    const volDown = new THREE.Mesh(volUpGeo, buttonMat);
    volDown.position.set(-phoneWidth / 2 - 0.03, 0.75, 0);
    phoneGroup.add(volDown);

    // Side Lock Button
    const lockBtnGeo = new THREE.BoxGeometry(0.04, 0.62, 0.06);
    const lockBtn = new THREE.Mesh(lockBtnGeo, buttonMat);
    lockBtn.position.set(phoneWidth / 2 + 0.03, 1.2, 0);
    phoneGroup.add(lockBtn);

    // Camera Control button (touch capacitive sensor)
    const cameraControlGeo = new THREE.BoxGeometry(0.02, 0.52, 0.06);
    const cameraControl = new THREE.Mesh(cameraControlGeo, buttonMat);
    cameraControl.position.set(phoneWidth / 2 + 0.02, -1.0, 0);
    phoneGroup.add(cameraControl);

    // Initial positioning
    phoneGroup.rotation.y = 0.35;
    phoneGroup.rotation.x = 0.12;
    phoneGroup.position.set(0, 0, 0);

    // 6. Animation Loop
    let clock = new THREE.Clock();
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (phoneGroupRef.current) {
        // Auto-rotation when not user-dragging
        if (isAutoRotateRef.current && !isPointerDownRef.current) {
          targetRotationYRef.current += 0.007;
        }

        // Floating hover motion
        const floatOffset = Math.sin(elapsedTime * 1.5) * 0.12;
        phoneGroupRef.current.position.y = floatOffset;

        // Smooth damping interpolation (lerp)
        currentRotationYRef.current += (targetRotationYRef.current - currentRotationYRef.current) * 0.08;
        currentRotationXRef.current += (targetRotationXRef.current - currentRotationXRef.current) * 0.08;

        phoneGroupRef.current.rotation.y = currentRotationYRef.current;
        phoneGroupRef.current.rotation.x = currentRotationXRef.current;

        // Animated purple light motion
        purpleSpot.position.x = Math.sin(elapsedTime * 0.8) * 3 + 1;
        purpleSpot.position.y = Math.cos(elapsedTime * 0.6) * 2 - 2;
      }

      renderer.render(scene, camera);
    };
    animate();

    // 7. Resize handling
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight || 550;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    // Context lost / restored listeners
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
    const handleContextRestored = () => {
      animate();
    };
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost, false);
    renderer.domElement.addEventListener('webglcontextrestored', handleContextRestored, false);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
      renderer.domElement.removeEventListener('webglcontextrestored', handleContextRestored);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      renderer.dispose();
      bodyGeometry.dispose();
      rearGlassGeo.dispose();
      screenGeo.dispose();
      islandPlateGeo.dispose();
      if (screenTexture) screenTexture.dispose();
    };
  }, [createScreenTexture, selectedColor]);

  // Pointer / Mouse drag rotation handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isPointerDownRef.current = true;
    setIsDragging(true);
    pointerStartRef.current = { x: e.clientX, y: e.clientY };
    baseRotationRef.current = {
      x: currentRotationXRef.current,
      y: currentRotationYRef.current,
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current) {
      // Subtle parallax follow when hovering
      const rect = mountRef.current?.getBoundingClientRect();
      if (!rect) return;
      const normX = (e.clientX - rect.left) / rect.width - 0.5;
      const normY = (e.clientY - rect.top) / rect.height - 0.5;
      if (!isRotating) {
        targetRotationYRef.current = normX * 0.8;
        targetRotationXRef.current = normY * 0.5;
      }
      return;
    }

    const deltaX = e.clientX - pointerStartRef.current.x;
    const deltaY = e.clientY - pointerStartRef.current.y;
    targetRotationYRef.current = baseRotationRef.current.y + deltaX * 0.008;
    targetRotationXRef.current = Math.max(-0.6, Math.min(0.6, baseRotationRef.current.x + deltaY * 0.008));
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isPointerDownRef.current = false;
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignored
    }
  };

  const handleResetView = () => {
    targetRotationXRef.current = 0.1;
    targetRotationYRef.current = 0.35;
    setIsInspecting(false);
  };

  const handleInspectRear = () => {
    targetRotationXRef.current = 0.0;
    targetRotationYRef.current = Math.PI; // Look straight at back
    setIsInspecting(true);
    setIsRotating(false);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none">
      {/* 3D WebGL Canvas Viewport */}
      <div
        ref={mountRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={`w-full ${compact ? 'h-[380px]' : 'h-[460px] md:h-[580px] lg:h-[640px]'} cursor-grab active:cursor-grabbing touch-none relative z-10 flex items-center justify-center`}
      />

      {/* Floating 3D Interaction Control HUD */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl">
        <button
          type="button"
          onClick={() => setIsRotating((prev) => !prev)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
            isRotating
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
              : 'text-zinc-300 hover:text-white hover:bg-white/10'
          }`}
          title="Toggle Auto-Rotation"
        >
          <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
          <span className="whitespace-nowrap">Auto 360°</span>
        </button>

        <button
          type="button"
          onClick={handleInspectRear}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
            isInspecting
              ? 'bg-purple-600 text-white'
              : 'text-zinc-300 hover:text-white hover:bg-white/10'
          }`}
          title="Inspect Rear Camera Plateau"
        >
          <Layers className="w-3.5 h-3.5" />
          <span className="whitespace-nowrap">Camera View</span>
        </button>

        <button
          type="button"
          onClick={handleResetView}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/10 transition-all"
          title="Reset Camera Angle"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="whitespace-nowrap">Reset</span>
        </button>
      </div>

      {/* Real-time Color Switcher Bar below/on 3D phone */}
      {availableColors && availableColors.length > 0 && onColorChange && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/65 backdrop-blur-xl border border-white/10 shadow-xl">
          <span className="text-xs font-medium text-zinc-400 whitespace-nowrap">Finish:</span>
          <div className="flex items-center gap-2">
            {availableColors.map((color) => {
              const isSelected = selectedColor.name === color.name;
              return (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => onColorChange(color)}
                  className={`w-6 h-6 rounded-full transition-all duration-200 relative flex items-center justify-center ${
                    isSelected
                      ? 'ring-2 ring-purple-500 ring-offset-2 ring-offset-black scale-110 shadow-lg'
                      : 'opacity-70 hover:opacity-100 hover:scale-105'
                  }`}
                  style={{
                    backgroundColor: color.hex,
                    boxShadow: isSelected ? `0 0 14px ${color.accentHex}88` : undefined,
                  }}
                  title={color.name}
                >
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
                  )}
                </button>
              );
            })}
          </div>
          <span className="text-xs font-semibold text-white/90 ml-1 whitespace-nowrap">
            {selectedColor.name}
          </span>
        </div>
      )}

      {/* Floating Interaction Hint */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 pointer-events-none opacity-60 text-[11px] text-zinc-400 flex items-center gap-1.5 whitespace-nowrap">
        <Sparkles className="w-3 h-3 text-purple-400" />
        <span>{isDragging ? 'Rotating 3D Model...' : 'Drag to rotate • Real-time 3D Viewport'}</span>
      </div>
    </div>
  );
};
