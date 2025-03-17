export interface Stop {
  name: string;
  description?: string;
  lat: number;
  lng: number;
}

export interface Attraction {
  name: string;
  description: string;
  image: string;
}

export interface Vehicle {
  type: string;
  capacity: string;
  price: number;
  image: string;
}

export interface Route {
  id: string;
  from: string;
  to: string;
  distance: string;
  duration: string;
  basePrice: number;
  image: string;
  stops: Stop[];
  description: string;
  attractions: Attraction[];
  vehicles: Vehicle[];
}

export const popularRoutes: Route[] = [
  {
    id: "dehradun-mussoorie",
    from: "Dehradun",
    to: "Mussoorie",
    distance: "35 km",
    duration: "1.5 hours",
    basePrice: 1200,
    image: "https://images.unsplash.com/photo-1600508537761-f401bf09e1d1?q=80&w=2070&auto=format&fit=crop",
    stops: [
      {
        name: "Dehradun",
        lat: 30.3165,
        lng: 78.0322
      },
      {
        name: "Rajpur Road",
        description: "Major commercial area and route to Mussoorie",
        lat: 30.3852,
        lng: 78.0735
      },
      {
        name: "Malsi",
        description: "Known for Malsi Deer Park",
        lat: 30.4026,
        lng: 78.0821
      },
      {
        name: "Mussoorie",
        lat: 30.4598,
        lng: 78.0644
      }
    ],
    description: "Experience a scenic journey from Dehradun to the Queen of Hills, Mussoorie. The route offers breathtaking views of the Doon Valley and the Himalayas.",
    attractions: [
      {
        name: "Kempty Falls",
        description: "Famous waterfall with a stunning drop of 40 feet",
        image: "https://images.unsplash.com/photo-1598091383021-15ddce4610ad?q=80&w=2070&auto=format&fit=crop"
      },
      {
        name: "Gun Hill",
        description: "Second highest point in Mussoorie offering panoramic views",
        image: "https://images.unsplash.com/photo-1599661046289-e3acc5425d79?q=80&w=2070&auto=format&fit=crop"
      }
    ],
    vehicles: [
      {
        type: "Sedan",
        capacity: "4 passengers",
        price: 1200,
        image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2940&auto=format&fit=crop"
      },
      {
        type: "SUV",
        capacity: "6 passengers",
        price: 1800,
        image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=2071&auto=format&fit=crop"
      },
      {
        type: "Tempo Traveller",
        capacity: "12 passengers",
        price: 3500,
        image: "https://images.unsplash.com/photo-1515876305430-f06edab8282a?q=80&w=2070&auto=format&fit=crop"
      }
    ]
  },
  {
    id: "dehradun-haridwar",
    from: "Dehradun",
    to: "Haridwar",
    distance: "52 km",
    duration: "2 hours",
    basePrice: 1500,
    image: "https://images.unsplash.com/photo-1566903026052-36e4ded7f105?q=80&w=2036&auto=format&fit=crop",
    stops: [
      {
        name: "Dehradun",
        lat: 30.3165,
        lng: 78.0322
      },
      {
        name: "Doiwala",
        description: "Important junction town",
        lat: 30.1778,
        lng: 78.1178
      },
      {
        name: "Raiwala",
        description: "Transit point with refreshment stops",
        lat: 30.0877,
        lng: 78.2233
      },
      {
        name: "Haridwar",
        lat: 29.9457,
        lng: 78.1642
      }
    ],
    description: "Travel to the holy city of Haridwar, where spirituality meets the Ganges. Perfect for pilgrimage and experiencing the rich cultural heritage.",
    attractions: [
      {
        name: "Har Ki Pauri",
        description: "Sacred ghat where the evening Ganga Aarti takes place",
        image: "https://images.unsplash.com/photo-1602579177632-26568be60e51?q=80&w=2070&auto=format&fit=crop"
      },
      {
        name: "Mansa Devi Temple",
        description: "Ancient temple offering panoramic views of Haridwar",
        image: "https://images.unsplash.com/photo-1624367171718-14026220ee3d?q=80&w=2059&auto=format&fit=crop"
      }
    ],
    vehicles: [
      {
        type: "Sedan",
        capacity: "4 passengers",
        price: 1500,
        image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop"
      },
      {
        type: "SUV",
        capacity: "6 passengers",
        price: 2200,
        image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop"
      },
      {
        type: "Tempo Traveller",
        capacity: "12 passengers",
        price: 4000,
        image: "https://images.unsplash.com/photo-1625056280799-9114bd8f49cc?q=80&w=2071&auto=format&fit=crop"
      }
    ]
  },
  {
    id: "dehradun-rishikesh",
    from: "Dehradun",
    to: "Rishikesh",
    distance: "43 km",
    duration: "1.5 hours",
    basePrice: 1400,
    image: "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?q=80&w=2069&auto=format&fit=crop",
    stops: [
      {
        name: "Dehradun",
        lat: 30.3165,
        lng: 78.0322
      },
      {
        name: "Doiwala",
        description: "Important junction town",
        lat: 30.1778,
        lng: 78.1178
      },
      {
        name: "Shyampur",
        description: "Small town en route to Rishikesh",
        lat: 30.0923,
        lng: 78.2156
      },
      {
        name: "Rishikesh",
        lat: 30.0869,
        lng: 78.2676
      }
    ],
    description: "Visit the Yoga Capital of the World. Experience spiritual awakening and adventure sports in this beautiful city by the Ganges.",
    attractions: [
      {
        name: "Laxman Jhula",
        description: "Iconic suspension bridge across the Ganges",
        image: "https://images.unsplash.com/photo-1595830770273-b4139c3bc272?q=80&w=2069&auto=format&fit=crop"
      },
      {
        name: "Triveni Ghat",
        description: "Sacred bathing spot and site of evening Ganga Aarti",
        image: "https://images.unsplash.com/photo-1601891010034-a8dd6fcdd235?q=80&w=2070&auto=format&fit=crop"
      }
    ],
    vehicles: [
      {
        type: "Sedan",
        capacity: "4 passengers",
        price: 1400,
        image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop"
      },
      {
        type: "SUV",
        capacity: "6 passengers",
        price: 2000,
        image: "https://images.unsplash.com/photo-1543465077-db45d34b88a5?q=80&w=2071&auto=format&fit=crop"
      },
      {
        type: "Tempo Traveller",
        capacity: "12 passengers",
        price: 3800,
        image: "https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?q=80&w=2068&auto=format&fit=crop"
      }
    ]
  },
  {
    id: "dehradun-auli",
    from: "Dehradun",
    to: "Auli",
    distance: "280 km",
    duration: "8-9 hours",
    basePrice: 6000,
    image: "https://images.unsplash.com/photo-1587909209111-5097ee578ec3?q=80&w=2070&auto=format&fit=crop",
    stops: [
      {
        name: "Dehradun",
        lat: 30.3165,
        lng: 78.0322
      },
      {
        name: "Rishikesh",
        description: "Yoga Capital of the World",
        lat: 30.0869,
        lng: 78.2676
      },
      {
        name: "Devprayag",
        description: "Confluence of Alaknanda and Bhagirathi rivers",
        lat: 30.1469,
        lng: 78.5992
      },
      {
        name: "Joshimath",
        description: "Gateway to several Himalayan mountain climbing expeditions",
        lat: 30.5516,
        lng: 79.5644
      },
      {
        name: "Auli",
        lat: 30.5262,
        lng: 79.5664
      }
    ],
    description: "Journey to India's premier ski resort. Enjoy breathtaking views of Nanda Devi and surrounding Himalayan peaks.",
    attractions: [
      {
        name: "Auli Ropeway",
        description: "Asia's longest cable car offering spectacular mountain views",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop"
      },
      {
        name: "Gurso Bugyal",
        description: "Beautiful meadow perfect for trekking and photography",
        image: "https://images.unsplash.com/photo-1569498217323-538d9f7bc065?q=80&w=2070&auto=format&fit=crop"
      }
    ],
    vehicles: [
      {
        type: "SUV",
        capacity: "6 passengers",
        price: 6000,
        image: "https://images.unsplash.com/photo-1630395260276-9ed528acd163?q=80&w=2068&auto=format&fit=crop"
      },
      {
        type: "Tempo Traveller",
        capacity: "12 passengers",
        price: 10000,
        image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=2074&auto=format&fit=crop"
      }
    ]
  },
  {
    id: "dehradun-nainital",
    from: "Dehradun",
    to: "Nainital",
    distance: "297 km",
    duration: "8-9 hours",
    basePrice: 6500,
    image: "https://images.unsplash.com/photo-1598091398598-7f0287daba84?q=80&w=2071&auto=format&fit=crop",
    stops: [
      {
        name: "Dehradun",
        lat: 30.3165,
        lng: 78.0322
      },
      {
        name: "Kotdwar",
        description: "Gateway to Pauri Garhwal",
        lat: 29.7464,
        lng: 78.5233
      },
      {
        name: "Ramnagar",
        description: "Gateway to Jim Corbett National Park",
        lat: 29.3971,
        lng: 79.1265
      },
      {
        name: "Haldwani",
        description: "Gateway to Kumaon region",
        lat: 29.2183,
        lng: 79.5130
      },
      {
        name: "Nainital",
        lat: 29.3919,
        lng: 79.4542
      }
    ],
    description: "Travel to the Lake District of India. Explore the beautiful Naini Lake and surrounding hills of Kumaon.",
    attractions: [
      {
        name: "Naini Lake",
        description: "Heart-shaped lake surrounded by seven hills",
        image: "https://images.unsplash.com/photo-1598091400561-7e6e9c698e06?q=80&w=2070&auto=format&fit=crop"
      },
      {
        name: "Snow View Point",
        description: "Panoramic views of Himalayan peaks",
        image: "https://images.unsplash.com/photo-1517782522277-171e2e62222e?q=80&w=2070&auto=format&fit=crop"
      }
    ],
    vehicles: [
      {
        type: "SUV",
        capacity: "6 passengers",
        price: 6500,
        image: "https://images.unsplash.com/photo-1566204978576-5f1dae9aae18?q=80&w=2069&auto=format&fit=crop"
      },
      {
        type: "Tempo Traveller",
        capacity: "12 passengers",
        price: 11000,
        image: "https://images.unsplash.com/photo-1625234395248-4361ee94af060?q=80&w=2070&auto=format&fit=crop"
      }
    ]
  },
  {
    id: "dehradun-delhi",
    from: "Dehradun",
    to: "Delhi",
    distance: "255 km",
    duration: "6-7 hours",
    basePrice: 5500,
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=2070&auto=format&fit=crop",
    stops: [
      {
        name: "Dehradun",
        lat: 30.3165,
        lng: 78.0322
      },
      {
        name: "Roorkee",
        description: "Home to IIT Roorkee, one of India's oldest engineering institutions",
        lat: 29.8543,
        lng: 77.8880
      },
      {
        name: "Muzaffarnagar",
        description: "Historic city in western Uttar Pradesh",
        lat: 29.4726,
        lng: 77.7085
      },
      {
        name: "Meerut",
        description: "Historic city associated with the Indian Rebellion of 1857",
        lat: 28.9845,
        lng: 77.7064
      },
      {
        name: "Delhi",
        lat: 28.7041,
        lng: 77.1025
      }
    ],
    description: "Comfortable journey to the national capital. Travel through the historic cities of Uttar Pradesh.",
    attractions: [
      {
        name: "India Gate",
        description: "Historic war memorial and landmark",
        image: "https://images.unsplash.com/photo-1585135497289-860ae28679d4?q=80&w=2069&auto=format&fit=crop"
      },
      {
        name: "Qutub Minar",
        description: "UNESCO World Heritage site and architectural marvel",
        image: "https://images.unsplash.com/photo-1586183189334-1ad3cd238e49?q=80&w=2069&auto=format&fit=crop"
      }
    ],
    vehicles: [
      {
        type: "Sedan",
        capacity: "4 passengers",
        price: 5500,
        image: "https://images.unsplash.com/photo-1546614042-7df3c24c9e5d?q=80&w=2070&auto=format&fit=crop"
      },
      {
        type: "SUV",
        capacity: "6 passengers",
        price: 7000,
        image: "https://images.unsplash.com/photo-1590510744826-549a39a16f1a?q=80&w=2072&auto=format&fit=crop"
      },
      {
        type: "Tempo Traveller",
        capacity: "12 passengers",
        price: 12000,
        image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2071&auto=format&fit=crop"
      }
    ]
  },
  {
    id: "dehradun-doiwala",
    from: "Dehradun",
    to: "Doiwala",
    distance: "20 km",
    duration: "45 minutes",
    basePrice: 800,
    image: "/images/routes/doiwala.jpg",
    stops: [
      {
        name: "Dehradun",
        lat: 30.3165,
        lng: 78.0322
      },
      {
        name: "Jogiwala",
        description: "Suburban area of Dehradun",
        lat: 30.2685,
        lng: 78.0598
      },
      {
        name: "Doiwala",
        lat: 30.1778,
        lng: 78.1178
      }
    ],
    description: "Quick and convenient travel to Doiwala, an important junction town near Dehradun.",
    attractions: [
      {
        name: "Local Markets",
        description: "Traditional bazaars and local shopping",
        image: "/images/attractions/doiwala-market.jpg"
      }
    ],
    vehicles: [
      {
        type: "Sedan",
        capacity: "4 passengers",
        price: 800,
        image: "/images/vehicles/sedan.jpg"
      },
      {
        type: "SUV",
        capacity: "6 passengers",
        price: 1200,
        image: "/images/vehicles/suv.jpg"
      }
    ]
  },
  {
    id: "dehradun-roorkee",
    from: "Dehradun",
    to: "Roorkee",
    distance: "68 km",
    duration: "2.5 hours",
    basePrice: 2000,
    image: "/images/routes/roorkee.jpg",
    stops: [
      {
        name: "Dehradun",
        lat: 30.3165,
        lng: 78.0322
      },
      {
        name: "Doiwala",
        description: "Important junction town",
        lat: 30.1778,
        lng: 78.1178
      },
      {
        name: "Haridwar",
        description: "Holy city on the banks of Ganga river",
        lat: 29.9457,
        lng: 78.1642
      },
      {
        name: "Roorkee",
        lat: 29.8543,
        lng: 77.8880
      }
    ],
    description: "Visit the historic city of Roorkee, home to India's oldest engineering institution IIT Roorkee.",
    attractions: [
      {
        name: "IIT Roorkee",
        description: "Historic engineering institution established in 1847",
        image: "/images/attractions/iit-roorkee.jpg"
      },
      {
        name: "Roorkee Canal",
        description: "Historic Ganges Canal and engineering marvel",
        image: "/images/attractions/roorkee-canal.jpg"
      }
    ],
    vehicles: [
      {
        type: "Sedan",
        capacity: "4 passengers",
        price: 2000,
        image: "/images/vehicles/sedan.jpg"
      },
      {
        type: "SUV",
        capacity: "6 passengers",
        price: 2800,
        image: "/images/vehicles/suv.jpg"
      }
    ]
  },
  {
    id: "dehradun-rudraprayag",
    from: "Dehradun",
    to: "Rudraprayag",
    distance: "162 km",
    duration: "5-6 hours",
    basePrice: 4000,
    image: "/images/routes/rudraprayag.jpg",
    stops: [
      {
        name: "Dehradun",
        lat: 30.3165,
        lng: 78.0322
      },
      {
        name: "Rishikesh",
        description: "Yoga Capital of the World",
        lat: 30.0869,
        lng: 78.2676
      },
      {
        name: "Devprayag",
        description: "Confluence of Alaknanda and Bhagirathi rivers",
        lat: 30.1469,
        lng: 78.5992
      },
      {
        name: "Srinagar",
        description: "Beautiful town on the banks of Alaknanda river",
        lat: 30.2235,
        lng: 78.7836
      },
      {
        name: "Rudraprayag",
        lat: 30.2844,
        lng: 78.9811
      }
    ],
    description: "Journey to the holy confluence of Alaknanda and Mandakini rivers. Gateway to Kedarnath.",
    attractions: [
      {
        name: "Rudranath Temple",
        description: "Ancient temple at the confluence of rivers",
        image: "/images/attractions/rudranath-temple.jpg"
      },
      {
        name: "River Confluence",
        description: "Sacred confluence of Alaknanda and Mandakini",
        image: "/images/attractions/rudraprayag-confluence.jpg"
      }
    ],
    vehicles: [
      {
        type: "SUV",
        capacity: "6 passengers",
        price: 4000,
        image: "/images/vehicles/suv.jpg"
      },
      {
        type: "Tempo Traveller",
        capacity: "12 passengers",
        price: 7000,
        image: "/images/vehicles/tempo.jpg"
      }
    ]
  },
  {
    id: "dehradun-kotdwar",
    from: "Dehradun",
    to: "Kotdwar",
    distance: "115 km",
    duration: "3-4 hours",
    basePrice: 3000,
    image: "/images/routes/kotdwar.jpg",
    stops: [
      {
        name: "Dehradun",
        lat: 30.3165,
        lng: 78.0322
      },
      {
        name: "Rishikesh",
        description: "Yoga Capital of the World",
        lat: 30.0869,
        lng: 78.2676
      },
      {
        name: "Lansdowne",
        description: "Quiet and unspoiled hill station",
        lat: 29.8377,
        lng: 78.6871
      },
      {
        name: "Kotdwar",
        lat: 29.7464,
        lng: 78.5233
      }
    ],
    description: "Travel through scenic mountain roads to reach Kotdwar, gateway to Lansdowne and Pauri Garhwal.",
    attractions: [
      {
        name: "Durga Devi Temple",
        description: "Ancient temple with historical significance",
        image: "/images/attractions/durga-devi-temple.jpg"
      },
      {
        name: "Sidhbali Temple",
        description: "Popular pilgrimage site near Kotdwar",
        image: "/images/attractions/sidhbali-temple.jpg"
      }
    ],
    vehicles: [
      {
        type: "Sedan",
        capacity: "4 passengers",
        price: 3000,
        image: "/images/vehicles/sedan.jpg"
      },
      {
        type: "SUV",
        capacity: "6 passengers",
        price: 4000,
        image: "/images/vehicles/suv.jpg"
      }
    ]
  },
  {
    id: "dehradun-devprayag",
    from: "Dehradun",
    to: "Devprayag",
    distance: "105 km",
    duration: "4 hours",
    basePrice: 3500,
    image: "/images/routes/devprayag.jpg",
    stops: [
      {
        name: "Dehradun",
        lat: 30.3165,
        lng: 78.0322
      },
      {
        name: "Rishikesh",
        description: "Yoga Capital of the World",
        lat: 30.0869,
        lng: 78.2676
      },
      {
        name: "Byasi",
        description: "River rafting point",
        lat: 30.0960,
        lng: 78.4190
      },
      {
        name: "Devprayag",
        lat: 30.1469,
        lng: 78.5992
      }
    ],
    description: "Visit the divine confluence of Alaknanda and Bhagirathi rivers, forming the holy Ganges.",
    attractions: [
      {
        name: "Sangam Point",
        description: "Sacred confluence of Alaknanda and Bhagirathi",
        image: "/images/attractions/devprayag-sangam.jpg"
      },
      {
        name: "Raghunath Temple",
        description: "Ancient temple complex overlooking the confluence",
        image: "/images/attractions/raghunath-temple.jpg"
      }
    ],
    vehicles: [
      {
        type: "SUV",
        capacity: "6 passengers",
        price: 3500,
        image: "/images/vehicles/suv.jpg"
      },
      {
        type: "Tempo Traveller",
        capacity: "12 passengers",
        price: 6000,
        image: "/images/vehicles/tempo.jpg"
      }
    ]
  },
  {
    id: "dehradun-ghansali",
    from: "Dehradun",
    to: "Ghansali",
    distance: "155 km",
    duration: "5-6 hours",
    basePrice: 4500,
    image: "/images/routes/ghansali.jpg",
    stops: [
      {
        name: "Dehradun",
        lat: 30.3165,
        lng: 78.0322
      },
      {
        name: "Rishikesh",
        description: "Yoga Capital of the World",
        lat: 30.0869,
        lng: 78.2676
      },
      {
        name: "Chamba",
        description: "Scenic town with beautiful valley views",
        lat: 30.3617,
        lng: 78.4303
      },
      {
        name: "Ghansali",
        lat: 30.3818,
        lng: 78.6334
      }
    ],
    description: "Journey through the beautiful Tehri region to reach Ghansali, known for its natural beauty and temples.",
    attractions: [
      {
        name: "Chandrabadni Temple",
        description: "Ancient temple with panoramic valley views",
        image: "/images/attractions/chandrabadni-temple.jpg"
      },
      {
        name: "Tehri Lake",
        description: "Beautiful artificial lake offering water sports",
        image: "/images/attractions/tehri-lake.jpg"
      }
    ],
    vehicles: [
      {
        type: "SUV",
        capacity: "6 passengers",
        price: 4500,
        image: "/images/vehicles/suv.jpg"
      },
      {
        type: "Tempo Traveller",
        capacity: "12 passengers",
        price: 7500,
        image: "/images/vehicles/tempo.jpg"
      }
    ]
  },
  {
    id: "dehradun-karnaprayag",
    from: "Dehradun",
    to: "Karnaprayag",
    distance: "190 km",
    duration: "6-7 hours",
    basePrice: 5000,
    image: "/images/routes/karnaprayag.jpg",
    stops: [
      {
        name: "Dehradun",
        lat: 30.3165,
        lng: 78.0322
      },
      {
        name: "Rishikesh",
        description: "Yoga Capital of the World",
        lat: 30.0869,
        lng: 78.2676
      },
      {
        name: "Rudraprayag",
        description: "Confluence of Alaknanda and Mandakini rivers",
        lat: 30.2844,
        lng: 78.9811
      },
      {
        name: "Karnaprayag",
        lat: 30.2545,
        lng: 79.2567
      }
    ],
    description: "Travel to the holy confluence of Alaknanda and Pindar rivers. Gateway to Badrinath and Kedarnath.",
    attractions: [
      {
        name: "Karna Temple",
        description: "Ancient temple dedicated to Karna of Mahabharata",
        image: "/images/attractions/karna-temple.jpg"
      },
      {
        name: "River Confluence",
        description: "Sacred meeting point of Alaknanda and Pindar rivers",
        image: "/images/attractions/karnaprayag-confluence.jpg"
      }
    ],
    vehicles: [
      {
        type: "SUV",
        capacity: "6 passengers",
        price: 5000,
        image: "/images/vehicles/suv.jpg"
      },
      {
        type: "Tempo Traveller",
        capacity: "12 passengers",
        price: 8500,
        image: "/images/vehicles/tempo.jpg"
      }
    ]
  },
  {
    id: "dehradun-sonprayag",
    from: "Dehradun",
    to: "Sonprayag",
    distance: "220 km",
    duration: "7-8 hours",
    basePrice: 5500,
    image: "/images/routes/sonprayag.jpg",
    stops: [
      {
        name: "Dehradun",
        lat: 30.3165,
        lng: 78.0322
      },
      {
        name: "Rishikesh",
        description: "Yoga Capital of the World",
        lat: 30.0869,
        lng: 78.2676
      },
      {
        name: "Rudraprayag",
        description: "Confluence of Alaknanda and Mandakini rivers",
        lat: 30.2844,
        lng: 78.9811
      },
      {
        name: "Sonprayag",
        lat: 30.6298,
        lng: 79.0681
      }
    ],
    description: "Journey to the starting point of Kedarnath Yatra. Experience the spiritual aura of the Himalayas.",
    attractions: [
      {
        name: "Triyuginarayan Temple",
        description: "Ancient temple where Lord Shiva and Parvati were married",
        image: "/images/attractions/triyuginarayan-temple.jpg"
      },
      {
        name: "Mandakini River",
        description: "Holy river and starting point of Kedarnath trek",
        image: "/images/attractions/mandakini-river.jpg"
      }
    ],
    vehicles: [
      {
        type: "SUV",
        capacity: "6 passengers",
        price: 5500,
        image: "/images/vehicles/suv.jpg"
      },
      {
        type: "Tempo Traveller",
        capacity: "12 passengers",
        price: 9000,
        image: "/images/vehicles/tempo.jpg"
      }
    ]
  },
  {
    id: "dehradun-new-tehri",
    from: "Dehradun",
    to: "New Tehri",
    distance: "100 km",
    duration: "3.5 hours",
    basePrice: 2500,
    image: "/images/routes/new-tehri.jpg",
    stops: [
      {
        name: "Dehradun",
        lat: 30.3165,
        lng: 78.0322
      },
      {
        name: "Mussoorie",
        description: "Queen of Hills",
        lat: 30.4598,
        lng: 78.0644
      },
      {
        name: "Chamba",
        description: "Gateway to New Tehri",
        lat: 30.2970,
        lng: 78.3260
      },
      {
        name: "New Tehri",
        lat: 30.3784,
        lng: 78.4312
      }
    ],
    description: "Journey from Dehradun to New Tehri offering spectacular views of the Tehri Dam and surrounding mountains. The route passes through the beautiful hill station of Mussoorie and the charming town of Chamba.",
    attractions: [
      {
        name: "Tehri Dam",
        description: "One of the tallest dams in India with impressive reservoir",
        image: "/images/attractions/tehri-dam.jpg"
      },
      {
        name: "Tehri Lake",
        description: "Perfect for water sports and boating activities",
        image: "/images/attractions/tehri-lake.jpg"
      },
      {
        name: "Adventure Sports Complex",
        description: "Offers activities like kayaking, jet skiing, and banana boat rides",
        image: "/images/attractions/tehri-adventure.jpg"
      }
    ],
    vehicles: [
      {
        type: "Sedan",
        capacity: "4 passengers",
        price: 2500,
        image: "/images/vehicles/sedan.jpg"
      },
      {
        type: "SUV",
        capacity: "6 passengers",
        price: 3500,
        image: "/images/vehicles/suv.jpg"
      },
      {
        type: "Tempo Traveller",
        capacity: "12 passengers",
        price: 6000,
        image: "/images/vehicles/tempo.jpg"
      }
    ]
  }
]; 