'use client';

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Trail } from '@react-three/drei';
import * as THREE from 'three';

// Custom easing functions since THREE.MathUtils doesn't have easeInOutQuad
const Easing = {
  easeInOutQuad: (t: number): number => {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  },
  easeOutQuad: (t: number): number => {
    return 1 - (1 - t) * (1 - t);
  },
  easeInQuad: (t: number): number => {
    return t * t;
  }
};

// Solar System Component with responsive sizing and improved lighting
function SolarSystem() {
  const sunRef = useRef<THREE.Mesh>(null);
  const planetsRef = useRef<THREE.Group>(null);
  const [scaleFactor, setScaleFactor] = useState(1);
  
  // Adjust scale factor based on viewport size
  useEffect(() => {
    const handleResize = () => {
      // Larger scale for all devices
      if (window.innerWidth < 768) {
        setScaleFactor(0.8);
      } else if (window.innerWidth < 1024) {
        setScaleFactor(1.1);
      } else {
        setScaleFactor(1.3);
      }
    };
    
    // Set initial scale
    handleResize();
    
    // Update on window resize
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  useFrame(({ clock }) => {
    if (sunRef.current && planetsRef.current) {
      // Rotate the sun
      sunRef.current.rotation.y = clock.getElapsedTime() * 0.05;
      
      // Rotate each planet and its orbit
      planetsRef.current.children.forEach((planetGroup, i) => {
        const orbitSpeed = 0.1 / (i + 1); // Slower orbit for outer planets
        const rotationSpeed = 0.2 + i * 0.05; // Different rotation speeds
        
        // Rotate the planet group (orbit)
        planetGroup.rotation.y = clock.getElapsedTime() * orbitSpeed;
        
        // Rotate the planet itself and any rings
        planetGroup.children.forEach((child, j) => {
          if (j === 0) { // Planet mesh
            child.rotation.y = clock.getElapsedTime() * rotationSpeed;
          } else if (j === 1 && i === 5) { // Saturn's rings
            // Keep rings aligned with planet but with tilt
            child.rotation.z = clock.getElapsedTime() * 0.02;
          }
        });
      });
    }
  });
  
  // Calculate positions based on scale factor with compression for outer planets
  const getScaledPosition = (baseDistance: number) => {
    // Compress distances for outer planets to keep them in view
    if (baseDistance > 15) {
      // Apply logarithmic scaling for far planets
      return (15 + Math.log(baseDistance - 14) * 3) * scaleFactor;
    }
    return baseDistance * scaleFactor;
  };
  
  return (
    <group position={[0, -5 * scaleFactor, -30 * scaleFactor]}>
      {/* Sun with enhanced glow */}
      <mesh ref={sunRef} scale={[scaleFactor, scaleFactor, scaleFactor]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial color="#FDB813" />
        <pointLight intensity={2} distance={100 * scaleFactor} decay={2} color="#FDB813" />
      </mesh>
      
      {/* Ambient light for overall scene visibility */}
      <ambientLight intensity={0.2} />
      
      {/* Planets with individual lighting */}
      <group ref={planetsRef}>
        {/* Mercury */}
        <group rotation={[0.1, Math.random() * Math.PI * 2, 0]}>
          <mesh position={[getScaledPosition(5), 0, 0]} scale={[scaleFactor, scaleFactor, scaleFactor]}>
            <sphereGeometry args={[0.4, 16, 16]} />
            <meshStandardMaterial color="#B7B8B9" metalness={0.3} roughness={0.7} emissive="#3a3a3a" emissiveIntensity={0.2} />
            <pointLight intensity={0.5} distance={5 * scaleFactor} decay={2} color="#B7B8B9" />
          </mesh>
        </group>
        
        {/* Venus */}
        <group rotation={[0.2, Math.random() * Math.PI * 2, 0]}>
          <mesh position={[getScaledPosition(7), 0, 0]} scale={[scaleFactor, scaleFactor, scaleFactor]}>
            <sphereGeometry args={[0.6, 16, 16]} />
            <meshStandardMaterial color="#E6E6FA" metalness={0.1} roughness={0.8} emissive="#E6E6FA" emissiveIntensity={0.1} />
            <pointLight intensity={0.7} distance={6 * scaleFactor} decay={2} color="#E6E6FA" />
          </mesh>
        </group>
        
        {/* Earth with blue oceans and proper continents */}
        <group rotation={[0.15, Math.random() * Math.PI * 2, 0]}>
          <group position={[getScaledPosition(10), 0, 0]} scale={[scaleFactor, scaleFactor, scaleFactor]}>
            {/* Ocean base - deep blue */}
            <mesh>
              <sphereGeometry args={[0.6, 32, 32]} />
              <meshStandardMaterial color="#0D47A1" metalness={0.1} roughness={0.7} emissive="#0D47A1" emissiveIntensity={0.2} />
            </mesh>
            
            {/* Continents - North America */}
            <mesh position={[0, 0.2, 0.4]} rotation={[0, Math.PI/4, 0]}>
              <sphereGeometry args={[0.3, 32, 32, 0, Math.PI/2, 0, Math.PI/2]} />
              <meshStandardMaterial 
                color="#5D4037" 
                metalness={0.1} 
                roughness={0.9} 
                emissive="#33691E" 
                emissiveIntensity={0.1}
                transparent
                opacity={0.9}
              />
            </mesh>
            
            {/* South America */}
            <mesh position={[0.1, -0.3, 0.4]} rotation={[0, Math.PI/4, 0]}>
              <sphereGeometry args={[0.25, 32, 32, 0, Math.PI/2, 0, Math.PI/3]} />
              <meshStandardMaterial 
                color="#5D4037" 
                metalness={0.1} 
                roughness={0.9} 
                emissive="#33691E" 
                emissiveIntensity={0.1}
                transparent
                opacity={0.9}
              />
            </mesh>
            
            {/* Africa */}
            <mesh position={[0.4, -0.1, -0.2]} rotation={[0, -Math.PI/6, 0]}>
              <sphereGeometry args={[0.3, 32, 32, 0, Math.PI/2, 0, Math.PI/2]} />
              <meshStandardMaterial 
                color="#5D4037" 
                metalness={0.1} 
                roughness={0.9} 
                emissive="#33691E" 
                emissiveIntensity={0.1}
                transparent
                opacity={0.9}
              />
            </mesh>
            
            {/* Enhanced light for Earth */}
            <pointLight intensity={1.0} distance={7 * scaleFactor} decay={2} color="#FFFFFF" />
          </group>
        </group>
        
        {/* Mars */}
        <group rotation={[0.25, Math.random() * Math.PI * 2, 0]}>
          <mesh position={[getScaledPosition(12), 0, 0]} scale={[scaleFactor, scaleFactor, scaleFactor]}>
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshStandardMaterial color="#E27B58" metalness={0.2} roughness={0.8} emissive="#E27B58" emissiveIntensity={0.2} />
            <pointLight intensity={0.6} distance={6 * scaleFactor} decay={2} color="#E27B58" />
          </mesh>
        </group>
        
        {/* Jupiter */}
        <group rotation={[0.1, Math.random() * Math.PI * 2, 0]}>
          <mesh position={[getScaledPosition(16), 0, 0]} scale={[scaleFactor, scaleFactor, scaleFactor]}>
            <sphereGeometry args={[1.2, 24, 24]} />
            <meshStandardMaterial color="#C88B3A" metalness={0.1} roughness={0.7} emissive="#C88B3A" emissiveIntensity={0.2} />
            <pointLight intensity={1} distance={10 * scaleFactor} decay={2} color="#C88B3A" />
          </mesh>
        </group>
        
        {/* Saturn with rings */}
        <group rotation={[0.2, Math.random() * Math.PI * 2, 0]}>
          <mesh position={[getScaledPosition(22), 0, 0]} scale={[scaleFactor, scaleFactor, scaleFactor]}>
            <sphereGeometry args={[1, 24, 24]} />
            <meshStandardMaterial color="#E6BE8A" metalness={0.2} roughness={0.8} emissive="#E6BE8A" emissiveIntensity={0.2} />
            <pointLight intensity={0.9} distance={9 * scaleFactor} decay={2} color="#E6BE8A" />
          </mesh>
          <mesh 
            position={[getScaledPosition(22), 0, 0]} 
            rotation={[Math.PI / 3, 0, 0]} 
            scale={[scaleFactor, scaleFactor, scaleFactor]}
          >
            <ringGeometry args={[1.4, 2.2, 32]} />
            <meshStandardMaterial 
              color="#C2B280" 
              side={THREE.DoubleSide} 
              transparent 
              opacity={0.7} 
              emissive="#C2B280" 
              emissiveIntensity={0.1} 
            />
          </mesh>
        </group>
        
        {/* Uranus with rings */}
        <group rotation={[0.15, Math.random() * Math.PI * 2, 0]}>
          <mesh position={[getScaledPosition(28), 0, 0]} scale={[scaleFactor, scaleFactor, scaleFactor]}>
            <sphereGeometry args={[0.8, 24, 24]} />
            <meshStandardMaterial color="#B5E3E3" metalness={0.2} roughness={0.6} emissive="#B5E3E3" emissiveIntensity={0.2} />
            <pointLight intensity={0.7} distance={8 * scaleFactor} decay={2} color="#B5E3E3" />
          </mesh>
          {/* Uranus rings - more visible and accurate */}
          <mesh 
            position={[getScaledPosition(28), 0, 0]} 
            rotation={[Math.PI / 1.5, 0, 0]} 
            scale={[scaleFactor, scaleFactor, scaleFactor]}
          >
            <ringGeometry args={[1.1, 1.8, 64]} />
            <meshStandardMaterial 
              color="#B5E3E3" 
              side={THREE.DoubleSide} 
              transparent 
              opacity={0.7} 
              emissive="#B5E3E3" 
              emissiveIntensity={0.2} 
            />
          </mesh>
        </group>
        
        {/* Neptune */}
        <group rotation={[0.1, Math.random() * Math.PI * 2, 0]}>
          <mesh position={[getScaledPosition(34), 0, 0]} scale={[scaleFactor, scaleFactor, scaleFactor]}>
            <sphereGeometry args={[0.8, 24, 24]} />
            <meshStandardMaterial color="#3E66F9" metalness={0.3} roughness={0.6} emissive="#3E66F9" emissiveIntensity={0.2} />
            <pointLight intensity={0.7} distance={8 * scaleFactor} decay={2} color="#3E66F9" />
          </mesh>
        </group>
      </group>
    </group>
  );
}

// Meteor Component
function MeteorWithTrail({ delay = 0 }: { delay?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [active, setActive] = useState(false);
  const { viewport } = useThree();
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setActive(true);
    }, delay);
    
    return () => clearTimeout(timeout);
  }, [delay]);
  
  useFrame(() => {
    if (meshRef.current && active) {
      const speed = 0.4;
      
      meshRef.current.position.x -= speed;
      meshRef.current.position.y -= speed * 0.6;
      meshRef.current.rotation.z += 0.01;
      
      // Reset position when out of view
      if (meshRef.current.position.x < -viewport.width / 2 || 
          meshRef.current.position.y < -viewport.height / 2) {
        meshRef.current.position.x = Math.random() * viewport.width * 0.5 + viewport.width * 0.3;
        meshRef.current.position.y = Math.random() * viewport.height * 0.5 + viewport.height * 0.3;
        
        // Add some randomness to the delay
        setTimeout(() => {
          setActive(true);
        }, Math.random() * 30000 + 60000); // 60-90 seconds
        
        setActive(false);
      }
    }
  });
  
  // Random initial position in the top right quadrant
  const initialX = Math.random() * viewport.width * 0.5 + viewport.width * 0.3;
  const initialY = Math.random() * viewport.height * 0.5 + viewport.height * 0.3;
  
  return active ? (
    <Trail 
      width={0.2} 
      length={12} 
      color={new THREE.Color(0xff6a00)} 
      attenuation={(t) => t * t}
    >
      <mesh ref={meshRef} position={[initialX, initialY, -5]}>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshStandardMaterial color="#FF6A00" emissive="#FF6A00" emissiveIntensity={1} />
        <pointLight color="#FF6A00" intensity={1} distance={10} decay={2} />
      </mesh>
    </Trail>
  ) : null;
}

// Black Hole Component with star absorption effect and random orbit animation
function BlackHole() {
  const blackHoleRef = useRef<THREE.Group>(null);
  const diskRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const sizeRef = useRef(1); // Use ref instead of state for smoother animation
  const targetSizeRef = useRef(1); // Target size for smooth transitions
  const opacityRef = useRef(0); // For fade in/out animation
  const targetOpacityRef = useRef(0); // Target opacity for smooth transitions
  const [orbitAngle, setOrbitAngle] = useState(0);
  const [orbitRadius, setOrbitRadius] = useState(5);
  const [verticalOffset, setVerticalOffset] = useState(0);
  const [verticalDirection, setVerticalDirection] = useState(1);
  const [stars, setStars] = useState<{position: THREE.Vector3, size: number, speed: number}[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  // Track visibility state // Track previous visibility state
  const [explosionPhase, setExplosionPhase] = useState<'normal' | 'growing' | 'shrinking'>('normal');
  const [lastExplosionTime, setLastExplosionTime] = useState(0);
  const [explosionProgress, setExplosionProgress] = useState(0);
  const { viewport } = useThree();
  const skillsSectionRef = useRef<HTMLElement | null>(null);
  const positionRef = useRef(new THREE.Vector3(0, 0, -5)); // Store position in ref
  
  // Initialize some stars that will be absorbed by the black hole
  useEffect(() => {
    // Create 20 stars around the black hole
    const newStars = [];
    for (let i = 0; i < 20; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 5 + Math.random() * 10;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const z = (Math.random() - 0.5) * 5;
      
      newStars.push({
        position: new THREE.Vector3(x, y, z),
        size: 0.05 + Math.random() * 0.1,
        speed: 0.01 + Math.random() * 0.05
      });
    }
    setStars(newStars);
    
    // Try to find the skills section element
    if (typeof document !== 'undefined') {
      skillsSectionRef.current = document.getElementById('skills');
      
      // Set initial orbit radius based on viewport
      const isMobile = window.innerWidth < 768;
      setOrbitRadius(isMobile ? 3 : 5);
    }
  }, []);
  
  // Check if skills section is visible
  useEffect(() => {
    const checkVisibility = () => {
      if (skillsSectionRef.current) {
        const rect = skillsSectionRef.current.getBoundingClientRect();
        // Only show black hole when skills section is in view
        const newVisibility = rect.top < window.innerHeight && rect.bottom > 0;
        setIsVisible(newVisibility);
      }
    };
    
    checkVisibility();
    window.addEventListener('scroll', checkVisibility);
    return () => window.removeEventListener('scroll', checkVisibility);
  }, [isVisible]);

  useFrame(({ clock }) => {
    if (!blackHoleRef.current || !diskRef.current) return;

    const currentTime = clock.getElapsedTime();
    
    // Handle fade in/out animation
    if (isVisible) {
      targetOpacityRef.current = 1;
    } else {
      targetOpacityRef.current = 0;
    }
    
    // Smooth opacity transition
    opacityRef.current += (targetOpacityRef.current - opacityRef.current) * 0.05;
    
    // Skip other updates if completely invisible
    if (opacityRef.current < 0.01 && !isVisible) return;

    // Get skills section position if available
    let centerX = 0;
    let centerY = 0;

    if (skillsSectionRef.current) {
      const rect = skillsSectionRef.current.getBoundingClientRect();
      centerX = (rect.left + rect.width * 0.7) / window.innerWidth * viewport.width - viewport.width / 2;
      centerY = -(rect.top + rect.height * 0.5) / window.innerHeight * viewport.height + viewport.height / 2;
    }

    // Update orbit angle very slowly
    const newOrbitAngle = orbitAngle + 0.0005; // Very slow movement
    setOrbitAngle(newOrbitAngle);

    // Update vertical offset with very smooth oscillation
    const newVerticalOffset = verticalOffset + (0.001 * verticalDirection); // Slower vertical movement
    // Keep within bounds
    if (Math.abs(newVerticalOffset) < 1.5) {
      setVerticalOffset(newVerticalOffset);
    } else {
      setVerticalDirection(-verticalDirection);
    }

    // Calculate black hole position based on orbit with vertical movement
    const orbitX = centerX + Math.cos(newOrbitAngle) * orbitRadius;
    const orbitY = centerY + Math.sin(newOrbitAngle) * orbitRadius + newVerticalOffset;

    // Position the black hole
    const targetPosition = new THREE.Vector3(orbitX, orbitY, -5); // Further back for subtler presence
    positionRef.current.lerp(targetPosition, 0.01); // Very smooth movement
    blackHoleRef.current.position.copy(positionRef.current);

    // Handle periodic explosion effect (every 40-60 seconds)
    const explosionInterval = 40 + Math.random() * 20; // Random interval between 40-60 seconds
    if (explosionPhase === 'normal' && currentTime - lastExplosionTime > explosionInterval) {
      setExplosionPhase('growing');
      setExplosionProgress(0);
    }

    if (explosionPhase === 'growing') {
      // Growing phase - black hole expands
      setExplosionProgress(explosionProgress + 0.005); // Slower growth

      if (explosionProgress >= 1) {
        setExplosionPhase('shrinking');
        setExplosionProgress(0);
      }

      // Calculate size based on explosion progress with easing
      const growthFactor = Easing.easeInOutQuad(explosionProgress);
      targetSizeRef.current = 1 + (growthFactor * 2); // Grow to 3x size
    } else if (explosionPhase === 'shrinking') {
      // Shrinking phase - black hole returns to normal
      setExplosionProgress(explosionProgress + 0.008); // Slightly faster shrinking

      if (explosionProgress >= 1) {
        setExplosionPhase('normal');
        setLastExplosionTime(currentTime);
      }

      // Calculate size based on explosion progress with easing
      const shrinkFactor = Easing.easeInOutQuad(1 - explosionProgress);
      targetSizeRef.current = 1 + (shrinkFactor * 2); // Shrink back to normal
    } else {
      // Normal state
      targetSizeRef.current = 1;
    }
    
    // Smoothly interpolate to target size
    sizeRef.current += (targetSizeRef.current - sizeRef.current) * 0.05;

    // Apply the size to the black hole group
    blackHoleRef.current.scale.set(sizeRef.current, sizeRef.current, sizeRef.current);

    // Rotate the accretion disk slowly
    if (diskRef.current) {
      diskRef.current.rotation.z += 0.002; // Slower rotation
    }

    // Make the disk glow brighter during explosion and apply fade in/out
    if (diskRef.current && diskRef.current.material instanceof THREE.MeshBasicMaterial) {
      let baseOpacity = 0.6;
      if (explosionPhase === 'growing') {
        baseOpacity = 0.6 + (explosionProgress * 0.4);
      } else if (explosionPhase === 'shrinking') {
        baseOpacity = 0.6 + ((1 - explosionProgress) * 0.4);
      }
      // Apply fade in/out animation
      diskRef.current.material.opacity = baseOpacity * opacityRef.current;
    }
    
    // Update glow intensity based on explosion phase and apply fade in/out
    if (glowRef.current && glowRef.current.material instanceof THREE.MeshBasicMaterial) {
      let baseOpacity = 0.3;
      if (explosionPhase === 'growing') {
        baseOpacity = 0.3 + (explosionProgress * 0.5);
      } else if (explosionPhase === 'shrinking') {
        baseOpacity = 0.3 + ((1 - explosionProgress) * 0.5);
      }
      // Apply fade in/out animation
      glowRef.current.material.opacity = baseOpacity * opacityRef.current;
    }
  });

  // Always render but control visibility with opacity
  return (
    <group ref={blackHoleRef}>
      {/* Black hole core */}
      <mesh scale={[1, 1, 1]}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial 
          color="#000000" 
          emissive="#000000" 
          metalness={1} 
          roughness={0}
          transparent
          opacity={opacityRef.current}
        />
      </mesh>

      {/* Accretion disk */}
      <mesh ref={diskRef} rotation={[Math.PI / 2.5, 0, 0]} scale={[1, 1, 1]}>
        <ringGeometry args={[1.5, 4, 64]} />
        <meshBasicMaterial 
          color="#8B5CF6" 
          side={THREE.DoubleSide} 
          transparent 
          opacity={0.6 * opacityRef.current}
        />
      </mesh>

      {/* Outer glow effect */}
      <mesh ref={glowRef} scale={[1.8, 1.8, 1.8]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial
          color="#8B5CF6"
          transparent
          opacity={0.3 * opacityRef.current}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Light source */}
      <pointLight 
        color="#8B5CF6" 
        intensity={1.5 * sizeRef.current * opacityRef.current} 
        distance={15 * sizeRef.current} 
        decay={2} 
      />

      {/* Stars being absorbed by the black hole */}
      {opacityRef.current > 0.1 && stars.map((star, i) => (
        <StarBeingAbsorbed
          key={i}
          initialPosition={star.position} 
          size={star.size} 
          speed={star.speed} 
          blackHoleSize={sizeRef.current}
          opacity={opacityRef.current}
        />
      ))}
    </group>
  );
}

// Star being absorbed by the black hole
function StarBeingAbsorbed({ 
  initialPosition, 
  size, 
  speed, 
  blackHoleSize,
  opacity = 1
}: { 
  initialPosition: THREE.Vector3, 
  size: number, 
  speed: number,
  blackHoleSize: number,
  opacity?: number
}) {
  const ref = useRef<THREE.Mesh>(null);
  const position = useRef(initialPosition.clone());
  const originalDistance = useRef(initialPosition.length());
  const [visible, setVisible] = useState(true);
  // Define blackHolePosition at the center (0,0,0)
  const blackHolePosition = new THREE.Vector3(0, 0, 0);

  useFrame(() => {
    if (ref.current) {
      // Calculate direction to black hole
      const direction = new THREE.Vector3();
      direction.subVectors(blackHolePosition, position.current).normalize();
    
      // Move toward black hole with increasing speed as it gets closer
      const distanceToCenter = position.current.length();
      const speedFactor = 1 + (originalDistance.current - distanceToCenter) * 0.1;
      const moveAmount = speed * speedFactor;
      
      position.current.add(direction.multiplyScalar(moveAmount));
      ref.current.position.copy(position.current);
      
      // If star is close enough to black hole, reset it
      if (distanceToCenter < blackHoleSize * 1.5) {
        setVisible(false);
        setTimeout(() => {
          // Reset to a new random position
          const newPos = new THREE.Vector3(
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20
          );
          position.current.copy(newPos);
          originalDistance.current = newPos.length();
          setVisible(true);
        }, Math.random() * 2000);
      }
    }
  });

  if (!visible) return null;
  
  return (
    <mesh ref={ref} position={position.current}>
      <sphereGeometry args={[size, 8, 8]} />
      <meshBasicMaterial color="white" transparent opacity={opacity} />
    </mesh>
  );
}

// Enhanced Shooting Star Component with trail effect
function ShootingStarWithTrail({ delay = 0 }: { delay?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [active, setActive] = useState(false);
  const { viewport } = useThree();
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setActive(true);
    }, delay);
    
    return () => clearTimeout(timeout);
  }, [delay]);
  
  useFrame(() => {
    if (meshRef.current && active) {
      const speed = 0.8;
      
      meshRef.current.position.x -= speed;
      meshRef.current.position.y -= speed * 0.7;
      
      // Reset position when out of view
      if (meshRef.current.position.x < -viewport.width / 2 || 
          meshRef.current.position.y < -viewport.height / 2) {
        meshRef.current.position.x = Math.random() * viewport.width * 0.5 + viewport.width * 0.3;
        meshRef.current.position.y = Math.random() * viewport.height * 0.5 + viewport.height * 0.3;
        
        // Add some randomness to the delay
        setTimeout(() => {
          setActive(true);
        }, Math.random() * 15000 + 15000); // 15-30 seconds
        
        setActive(false);
      }
    }
  });
  
  // Random initial position in the top right quadrant
  const initialX = Math.random() * viewport.width * 0.5 + viewport.width * 0.3;
  const initialY = Math.random() * viewport.height * 0.5 + viewport.height * 0.3;
  
  return active ? (
    <Trail 
      width={0.05} 
      length={8} 
      color={new THREE.Color(0xffffff)}
      attenuation={(t) => t * t}
    >
      <mesh ref={meshRef} position={[initialX, initialY, -10]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color="#FFFFFF" />
        <pointLight color="#FFFFFF" intensity={0.5} distance={5} decay={2} />
      </mesh>
    </Trail>
  ) : null;
}

// Main Space Background Component
export function ThreeSpaceBackground({ showBlackHole = true }: { showBlackHole?: boolean } = {}) {
  // Configuration state for visibility
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  if (!isMounted) {
    return null; // Return null on server-side to prevent hydration errors
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10">
      <Canvas camera={{ position: [0, 0, 25], fov: 75 }}>
        <ambientLight intensity={0.2} />

        {/* Stars */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        {/* Solar System */}
        <SolarSystem />
        
        {/* Shooting Stars - appear every 30-45 seconds */}
        <ShootingStarWithTrail delay={1000} />
        <ShootingStarWithTrail delay={15000} />
        <ShootingStarWithTrail delay={30000} />
        
        {/* Meteors - appear every 60-90 seconds */}
        <MeteorWithTrail delay={5000} />
        <MeteorWithTrail delay={65000} />
        
        {/* Black Hole near skills section - only show if enabled */}
        {showBlackHole && <BlackHole />}
      </Canvas>
    </div>
  );
}
