import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
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
  const [modelLoaded, setModelLoaded] = useState(false);
  
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
    camera.position.set(8, 5, 8);
    
    // Set up renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    mountRef.current.appendChild(renderer.domElement);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    
    // Add ground
    const groundGeometry = new THREE.PlaneGeometry(20, 20);
    const groundMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x333333,
      roughness: 0.9,
      metalness: 0.1
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Load the 3D model
    const gltfLoader = new GLTFLoader();
    let car: THREE.Group | null = null;

    gltfLoader.load(
      '/models/Alto/Alto.gltf',
      (gltf) => {
        car = gltf.scene;
        
        // Center the model
        const box = new THREE.Box3().setFromObject(car);
        const center = box.getCenter(new THREE.Vector3());
        car.position.sub(center);
        
        // Scale the model if needed
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 3 / maxDim;
        car.scale.multiplyScalar(scale);
        
        // Position the car on the ground
        const bottom = box.min.y * scale;
        car.position.y = -bottom; // This will place the bottom of the car at ground level
        
        scene.add(car);
        setModelLoaded(true);
      },
      (progress) => {
        console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
      },
      (error) => {
        console.error('Error loading model:', error);
      }
    );
    
    // Controls
    controlsRef.current = new OrbitControls(camera, renderer.domElement);
    controlsRef.current.enableDamping = true;
    controlsRef.current.dampingFactor = 0.05;
    controlsRef.current.minDistance = 5;
    controlsRef.current.maxDistance = 15;
    controlsRef.current.maxPolarAngle = Math.PI / 2;
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      if (controlsRef.current) {
        controlsRef.current.update();
      }
      
      if (car) {
        car.rotation.y += 0.003;
      }
      
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
