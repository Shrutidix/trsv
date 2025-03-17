import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { motion } from "framer-motion";
import { Shield, Droplet, UserCheck, Star } from "lucide-react";

interface TaxiView3DProps {
  carType: string;
}

interface CarSpecification {
  safety: number;
  cleanliness: number;
  driverSkill: number;
  rating: number;
  description: string;
  features: string[];
}

const carSpecifications: Record<string, CarSpecification> = {
  sedan: {
    safety: 4.5,
    cleanliness: 4.3,
    driverSkill: 4.2,
    rating: 4.3,
    description: "Comfortable sedan with AC, perfect for city travel and small groups.",
    features: ["Air Conditioning", "4 Seats", "2 Luggage", "Music System"]
  },
  suv: {
    safety: 4.7,
    cleanliness: 4.5,
    driverSkill: 4.4,
    rating: 4.6,
    description: "Spacious SUV with excellent ground clearance for hill stations and rough terrain.",
    features: ["Air Conditioning", "6 Seats", "3 Luggage", "Music System", "Charging Ports"]
  },
  luxury: {
    safety: 4.9,
    cleanliness: 4.8,
    driverSkill: 4.7,
    rating: 4.8,
    description: "Premium luxury vehicle with professional chauffeur and top-tier amenities.",
    features: ["Premium Leather Seats", "4 Seats", "3 Luggage", "Premium Audio", "Refreshments", "WiFi"]
  },
  tempo: {
    safety: 4.6,
    cleanliness: 4.4,
    driverSkill: 4.5,
    rating: 4.5,
    description: "Spacious tempo traveller for large groups and extended journeys.",
    features: ["Air Conditioning", "12 Seats", "12 Luggage", "Music System", "Charging Ports", "Pushback Seats"]
  }
};

// Car image textures for more realistic 3D models
const carImages = {
  sedan: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1470&auto=format&fit=crop",
  suv: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=1631&auto=format&fit=crop",
  luxury: "https://images.unsplash.com/photo-1585503418537-88331351ad99?q=80&w=1074&auto=format&fit=crop",
  tempo: "https://images.unsplash.com/photo-1609152959935-163cc3048e2c?q=80&w=1074&auto=format&fit=crop"
};

const TaxiView3D: React.FC<TaxiView3DProps> = ({ carType }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const [showSpecs, setShowSpecs] = useState(true);
  
  const specs = carSpecifications[carType];
  
  useEffect(() => {
    if (!mountRef.current) return;
    
    // Creating the scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f5f5);
    
    // Set up camera
    const camera = new THREE.PerspectiveCamera(
      75, 
      mountRef.current.clientWidth / mountRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.set(5, 3, 5);
    
    // Set up renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    mountRef.current.appendChild(renderer.domElement);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    
    // Add ground
    const groundGeometry = new THREE.PlaneGeometry(20, 20);
    const groundMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xaaaaaa,
      roughness: 0.8
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);
    
    // Car model based on type
    let carGeometry;
    let carColor;
    
    switch(carType) {
      case 'sedan':
        carGeometry = new THREE.BoxGeometry(3, 1, 1.5);
        carColor = 0x3366ff;
        break;
      case 'suv':
        carGeometry = new THREE.BoxGeometry(3.2, 1.6, 1.8);
        carColor = 0x336633;
        break;
      case 'luxury':
        carGeometry = new THREE.BoxGeometry(3.5, 1.1, 1.7);
        carColor = 0x000000;
        break;
      case 'tempo':
        carGeometry = new THREE.BoxGeometry(4, 2, 2);
        carColor = 0xffaa00;
        break;
      default:
        carGeometry = new THREE.BoxGeometry(3, 1, 1.5);
        carColor = 0x3366ff;
    }
    
    // Load car texture for more realism
    const textureLoader = new THREE.TextureLoader();
    const carTexture = textureLoader.load(carImages[carType as keyof typeof carImages]);
    
    const carMaterial = new THREE.MeshStandardMaterial({ 
      map: carTexture,
      metalness: 0.6,
      roughness: 0.2
    });
    
    const car = new THREE.Mesh(carGeometry, carMaterial);
    car.position.y = carGeometry.parameters.height / 2;
    car.castShadow = true;
    scene.add(car);
    
    // Add wheels
    const wheelGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.2, 32);
    const wheelMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x222222,
      roughness: 0.7
    });
    
    // Position for the wheels will depend on car type
    const wheelOffsetX = carGeometry.parameters.width / 2 - 0.5;
    const wheelOffsetZ = carGeometry.parameters.depth / 2 + 0.1;
    const wheelY = 0.4;
    
    // Front-left wheel
    const wheelFL = new THREE.Mesh(wheelGeometry, wheelMaterial);
    wheelFL.position.set(-wheelOffsetX, wheelY, -wheelOffsetZ);
    wheelFL.rotation.z = Math.PI / 2;
    wheelFL.castShadow = true;
    scene.add(wheelFL);
    
    // Front-right wheel
    const wheelFR = new THREE.Mesh(wheelGeometry, wheelMaterial);
    wheelFR.position.set(-wheelOffsetX, wheelY, wheelOffsetZ);
    wheelFR.rotation.z = Math.PI / 2;
    wheelFR.castShadow = true;
    scene.add(wheelFR);
    
    // Back-left wheel
    const wheelBL = new THREE.Mesh(wheelGeometry, wheelMaterial);
    wheelBL.position.set(wheelOffsetX, wheelY, -wheelOffsetZ);
    wheelBL.rotation.z = Math.PI / 2;
    wheelBL.castShadow = true;
    scene.add(wheelBL);
    
    // Back-right wheel
    const wheelBR = new THREE.Mesh(wheelGeometry, wheelMaterial);
    wheelBR.position.set(wheelOffsetX, wheelY, wheelOffsetZ);
    wheelBR.rotation.z = Math.PI / 2;
    wheelBR.castShadow = true;
    scene.add(wheelBR);
    
    // Add windshield and windows
    const windshieldGeometry = new THREE.BoxGeometry(1, 0.7, 1.3);
    const glassMaterial = new THREE.MeshStandardMaterial({
      color: 0xaaccff,
      transparent: true,
      opacity: 0.5,
      metalness: 0.9,
      roughness: 0.1
    });
    
    const windshield = new THREE.Mesh(windshieldGeometry, glassMaterial);
    windshield.position.set(-0.8, 1.0, 0);
    scene.add(windshield);
    
    // Controls
    controlsRef.current = new OrbitControls(camera, renderer.domElement);
    controlsRef.current.enableDamping = true;
    controlsRef.current.dampingFactor = 0.05;
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      if (controlsRef.current) {
        controlsRef.current.update();
      }
      
      car.rotation.y += 0.003;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      scene.clear();
    };
  }, [carType]);
  
  const RatingBar = ({ value, maxValue = 5 }: { value: number, maxValue?: number }) => {
    const percentage = (value / maxValue) * 100;
    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-primary-600 h-2.5 rounded-full" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    );
  };

  return (
    <div className="relative h-full">
      <div ref={mountRef} className="w-full h-full" />
      
      {/* Car Specifications Panel */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ 
          opacity: showSpecs ? 1 : 0, 
          x: showSpecs ? 0 : 20,
          pointerEvents: showSpecs ? "auto" : "none"
        }}
        transition={{ duration: 0.3 }}
        className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg w-80"
      >
        <h3 className="text-xl font-bold mb-4 capitalize">{carType} Specifications</h3>
        <p className="text-gray-700 mb-4">{specs.description}</p>
        
        <div className="space-y-4 mb-6">
          <div>
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center">
                <Shield className="h-4 w-4 text-primary-500 mr-2" />
                <span className="text-sm font-medium">Safety</span>
              </div>
              <span className="text-sm font-bold">{specs.safety}/5</span>
            </div>
            <RatingBar value={specs.safety} />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center">
                <Droplet className="h-4 w-4 text-primary-500 mr-2" />
                <span className="text-sm font-medium">Cleanliness</span>
              </div>
              <span className="text-sm font-bold">{specs.cleanliness}/5</span>
            </div>
            <RatingBar value={specs.cleanliness} />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center">
                <UserCheck className="h-4 w-4 text-primary-500 mr-2" />
                <span className="text-sm font-medium">Driver Skill</span>
              </div>
              <span className="text-sm font-bold">{specs.driverSkill}/5</span>
            </div>
            <RatingBar value={specs.driverSkill} />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-primary-500 mr-2" />
                <span className="text-sm font-medium">Overall Rating</span>
              </div>
              <span className="text-sm font-bold">{specs.rating}/5</span>
            </div>
            <RatingBar value={specs.rating} />
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold mb-2">Features</h4>
          <div className="grid grid-cols-2 gap-2">
            {specs.features.map((feature, index) => (
              <div key={index} className="text-xs bg-gray-100 px-2 py-1 rounded-full text-center">
                {feature}
              </div>
            ))}
          </div>
        </div>
        
        <button 
          onClick={() => setShowSpecs(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      </motion.div>
      
      {/* Toggle button for specs when hidden */}
      {!showSpecs && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-4 right-4 bg-primary-500 text-white p-2 rounded-full shadow-lg"
          onClick={() => setShowSpecs(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </motion.button>
      )}
    </div>
  );
};

export default TaxiView3D;
