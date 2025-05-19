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
    image: "https://images.pexels.com/photos/27178287/pexels-photo-27178287/free-photo-of-town-on-hill-on-monsoon-day.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
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
        image: "https://im.indiatimes.in/content/2021/Jul/2_60e691aa710e7.JPG?w=725&h=433"
      },
      {
        name: "Gun Hill",
        description: "Second highest point in Mussoorie offering panoramic views",
        image: "https://www.chardhamtours.in/gallery/cityImage/1462249998_gun%20hill.jpg"
      }
    ],
    vehicles: [
      {
        type: "Sedan",
        capacity: "4 passengers",
        price: 1200,
        image:"https://wallpapers.com/images/hd/suzuki-dzire-2022-sherwood-brown-y5e1vukdf48ljnb0.jpg"
      },
      {
        type: "SUV",
        capacity: "6 passengers",
        price: 1800,
        image:"https://img-ik.cars.co.za/news-site-za/images/2020/06/Fortuner8.jpg?tr=w-1200,h-800"
      },
      {
        type: "Tempo Traveller",
        capacity: "12 passengers",
        price: 3500,
        image:  "https://www.mornis.in/wp-content/uploads/2019/11/Tempo-Traveller.jpeg "
      }
    ]
  },
  {
    "id": "dehradun-haridwar",
    "from": "Dehradun",
    "to": "Haridwar",
    "distance": "52 km",
    "duration": "2 hours",
    "basePrice": 1800,
    "image": "https://images.pexels.com/photos/19010052/pexels-photo-19010052/free-photo-of-figure-of-lakshmi-goddess.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "stops": [
      {
        "name": "Dehradun",
        "lat": 30.3165,
        "lng": 78.0322
      },
      {
        "name": "Doiwala",
        "description": "Important junction town",
        "lat": 30.1778,
        "lng": 78.1178
      },
      {
        "name": "Raiwala",
        "description": "Transit point with refreshment stops",
        "lat": 30.0877,
        "lng": 78.2233
      },
      {
        "name": "Haridwar",
        "lat": 29.9457,
        "lng": 78.1642
      }
    ],
    "description": "Travel to the holy city of Haridwar, where spirituality meets the Ganges. Perfect for pilgrimage and experiencing the rich cultural heritage.",
    "attractions": [
      {
        "name": "Har Ki Pauri",
        "description": "Sacred ghat where the evening Ganga Aarti takes place",
        "image": "https://th.bing.com/th/id/OIP.x2HIpa6IH7pNAXmV1RvgjwHaFR?rs=1&pid=ImgDetMain"
      },
      {
        "name": "Mansa Devi Temple",
        "description": "Ancient temple offering panoramic views of Haridwar",
        "image": "https://www.tripsavvy.com/thmb/e0N3S9ZUthIXnU2oMPpRbNMPmmw=/3481x2321/filters:fill(auto,1)/GettyImages-943681362-b14111ffae644aebabb0659d7e479ed7.jpg"
      }
    ],
    "vehicles": [
      {
        "type": "Sedan",
        "capacity": "4 passengers",
        "price": 1800,
        "negotiable": true,
        "image": "https://wallpapers.com/images/hd/suzuki-dzire-2022-sherwood-brown-y5e1vukdf48ljnb0.jpg"
      },
      {
        "type": "SUV",
        "capacity": "6 passengers",
        "price": 2500,
        "negotiable": true,
        "image":"https://img-ik.cars.co.za/news-site-za/images/2020/06/Fortuner8.jpg?tr=w-1200,h-800"
      },
      {
        "type": "Tempo Traveller",
        "capacity": "12 passengers",
        "price": 4300,
        "negotiable": true,
        "image":  "https://www.mornis.in/wp-content/uploads/2019/11/Tempo-Traveller.jpeg "
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
        image: "https://indiano.travel/wp-content/uploads/2022/06/Beautiful-Ram-Jhula-Bridge-and-Ganga-river-taken-in-Rishikesh-India.jpg"
      },
      {
        name: "Triveni Ghat",
        description: "Sacred bathing spot and site of evening Ganga Aarti",
        image: "https://rishikeshdaytour.com/blog/wp-content/uploads/2022/01/Triveni-Ghat-in-Rishikesh-Uttarakhand.jpg"
      }
    ],
    vehicles: [
      {
        type: "Sedan",
        capacity: "4 passengers",
        price: 1400,
        image: "https://wallpapers.com/images/hd/suzuki-dzire-2022-sherwood-brown-y5e1vukdf48ljnb0.jpg"
      },
      {
        type: "SUV",
        capacity: "6 passengers",
        price: 2000,
         image: "https://img-ik.cars.co.za/news-site-za/images/2020/06/Fortuner8.jpg?tr=w-1200,h-800"
      },
      {
        type: "Tempo Traveller",
        capacity: "12 passengers",
        price: 3800,
        image: "https://www.mornis.in/wp-content/uploads/2019/11/Tempo-Traveller.jpeg "
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
        image: "https://th.bing.com/th/id/OIP.8-25CfcU1F3buBH-gnC4SwHaE7?rs=1&pid=ImgDetMain"
      },
      {
        name: "Gurso Bugyal",
        description: "Beautiful meadow perfect for trekking and photography",
        image: "https://th.bing.com/th/id/OIP.p88ZNAO2VDgGIxBSlLTG7AHaEK?rs=1&pid=ImgDetMain"
      }
    ],
    vehicles: [
      {
        type: "SUV",
        capacity: "6 passengers",
        price: 6000,
        image: "https://img-ik.cars.co.za/news-site-za/images/2020/06/Fortuner8.jpg?tr=w-1200,h-800"
      },
      {
        type: "Tempo Traveller",
        capacity: "12 passengers",
        price: 10000,
        image: "https://www.mornis.in/wp-content/uploads/2019/11/Tempo-Traveller.jpeg "
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
    image: "https://images.pexels.com/photos/2443872/pexels-photo-2443872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
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
        image: "https://hblimg.mmtcdn.com/content/hubble/img/nainital/mmt/activities/m_activities_naini_lake_2_l_546_820.jpg"
      },
      {
        name: "Snow View Point",
        description: "Panoramic views of Himalayan peaks",
        image: "https://nainitaltourism.org.in/images/tourist-places/snow-view-point-nainital/snow-view-point-nainital-indian-tourism-history.jpg"
      }
    ],
    vehicles: [
      {
        type: "SUV",
        capacity: "6 passengers",
        price: 6500,
        image: "https://wallpapers.com/images/hd/suzuki-dzire-2022-sherwood-brown-y5e1vukdf48ljnb0.jpg"
      },
      {
        type: "Tempo Traveller",
        capacity: "12 passengers",
        price: 11000,
        image: "https://www.mornis.in/wp-content/uploads/2019/11/Tempo-Traveller.jpeg "
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
        image: "https://th.bing.com/th/id/OIP.sfgsYpKaI0gLZEf2RpXUkwHaE8?rs=1&pid=ImgDetMain"
      },
      {
        name: "Qutub Minar",
        description: "UNESCO World Heritage site and architectural marvel",
        image: "https://exploreyourway.in/wp-content/uploads/2023/04/marvin-castelino-z4GzALvJ8xs-unsplash-scaled.jpg"
      }
    ],
    vehicles: [
      {
        type: "Sedan",
        capacity: "4 passengers",
        price: 5500,
          image: "https://wallpapers.com/images/hd/suzuki-dzire-2022-sherwood-brown-y5e1vukdf48ljnb0.jpg"
      },
      {
        type: "SUV",
        capacity: "6 passengers",
        price: 7000,
        image: "https://img-ik.cars.co.za/news-site-za/images/2020/06/Fortuner8.jpg?tr=w-1200,h-800"

      },
      {
        type: "Tempo Traveller",
        capacity: "12 passengers",
        price: 12000,
         image: "https://www.mornis.in/wp-content/uploads/2019/11/Tempo-Traveller.jpeg "
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
    image: "https://images.pexels.com/photos/1186847/pexels-photo-1186847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
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
        image: "https://www.explorewithecokats.com/wp-content/uploads/2021/04/1024px-Paltan_Bazar_Dehradun_04.jpg"
      }
    ],
    vehicles: [
      {
        type: "Sedan",
        capacity: "4 passengers",
        price: 800,
          image: "https://wallpapers.com/images/hd/suzuki-dzire-2022-sherwood-brown-y5e1vukdf48ljnb0.jpg"
      },
      {
        type: "SUV",
        capacity: "6 passengers",
        price: 1200,
         image: "https://img-ik.cars.co.za/news-site-za/images/2020/06/Fortuner8.jpg?tr=w-1200,h-800"
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
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0c/34/38/1a/sun-dial.jpg?w=1000&h=500&s=1",
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
        image: "https://bl-i.thgim.com/public/news/xe4vo3/article66182896.ece/alternates/LANDSCAPE_1200/IIT%20Roorkee%20Campus.jpeg"
      },
      {
        name: "Roorkee Canal",
        description: "Historic Ganges Canal and engineering marvel",
        image: "https://i.ytimg.com/vi/v0wIfANznus/maxresdefault.jpg"
      }
    ],
    vehicles: [
      {
        type: "Sedan",
        capacity: "4 passengers",
        price: 2000,
     image: "https://wallpapers.com/images/hd/suzuki-dzire-2022-sherwood-brown-y5e1vukdf48ljnb0.jpg"
      },
      {
        type: "SUV",
        capacity: "6 passengers",
        price: 2800,
         image: "https://wallpapers.com/images/hd/suzuki-dzire-2022-sherwood-brown-y5e1vukdf48ljnb0.jpg"
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
    image: "https://th.bing.com/th/id/OIP.Uww92B_l_l0Yeonbagt2KwHaEV?rs=1&pid=ImgDetMain",
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
        image: "https://daajupahadi.com/wp-content/uploads/2022/07/Rudranath-edited-1.jpg"
      },
      {
        name: "River Confluence",
        description: "Sacred confluence of Alaknanda and Mandakini",
        image: "https://procaffenation.com/wp-content/uploads/2017/04/1200px-Karnali_river-1024x683.jpg"
      }
    ],
    vehicles: [
      {
        type: "SUV",
        capacity: "6 passengers",
        price: 4000,
       image: "https://wallpapers.com/images/hd/suzuki-dzire-2022-sherwood-brown-y5e1vukdf48ljnb0.jpg"
      },
      {
        type: "Tempo Traveller",
        capacity: "12 passengers",
        price: 7000,
        image: "https://www.mornis.in/wp-content/uploads/2019/11/Tempo-Traveller.jpeg "
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
    image: "https://www.nativeplanet.com/img/2018/09/stjoesphchurchkotdwar-1537959389.jpg",
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
        name: "Sidhbali Temple",
        description: "Popular pilgrimage site near Kotdwar",
        image: "https://th.bing.com/th/id/OIP.FQBiFTUCi_Ef4jxPDRn6IwHaEC?rs=1&pid=ImgDetMain"
      }
    ],
    vehicles: [
      {
        type: "Sedan",
        capacity: "4 passengers",
        price: 3000,
       image: "https://wallpapers.com/images/hd/suzuki-dzire-2022-sherwood-brown-y5e1vukdf48ljnb0.jpg"
      },
      {
        type: "SUV",
        capacity: "6 passengers",
        price: 4000,
       image: "https://wallpapers.com/images/hd/suzuki-dzire-2022-sherwood-brown-y5e1vukdf48ljnb0.jpg"
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
    image: "https://www.epicyatra.com/wp-content/uploads/2023/03/devpryag-2.webp",
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
        image: "https://vargiskhan.com/log/wp-content/uploads/2020/12/sangam-point-ladakh.jpg"
      },
      {
        name: "Raghunath Temple",
        description: "Ancient temple complex overlooking the confluence",
        image: "https://www.gosahin.com/go/p/f/1541703246_Raghunath-temple-jammu3.jpg"
      }
    ],
    vehicles: [
      {
        type: "SUV",
        capacity: "6 passengers",
        price: 3500,
         image: "https://wallpapers.com/images/hd/suzuki-dzire-2022-sherwood-brown-y5e1vukdf48ljnb0.jpg"
      },
      {
        type: "Tempo Traveller",
        capacity: "12 passengers",
        price: 6000,
        image: "https://www.mornis.in/wp-content/uploads/2019/11/Tempo-Traveller.jpeg "
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
    image: "https://th.bing.com/th/id/OIP.rvdyOl7U-HqGQwPRjGXyeAHaEK?rs=1&pid=ImgDetMain",
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
        image: "https://th.bing.com/th/id/OIP.v60bHNRt24W0bKb8SU6L4wHaD8?rs=1&pid=ImgDetMain"
      },
      {
        name: "Tehri Lake",
        description: "Beautiful artificial lake offering water sports",
        image: "https://kanatalheights.com/wp-content/uploads/2022/06/tehriiii.jpeg"
      }
    ],
    vehicles: [
      {
        type: "SUV",
        capacity: "6 passengers",
        price: 4500,
         image: "https://img-ik.cars.co.za/news-site-za/images/2020/06/Fortuner8.jpg?tr=w-1200,h-800"
      },
      {
        type: "Tempo Traveller",
        capacity: "12 passengers",
        price: 7500,
        image: "https://www.mornis.in/wp-content/uploads/2019/11/Tempo-Traveller.jpeg "
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
    image: "https://th.bing.com/th/id/OIP.r0fQlKhdYJ5INlWVxFQ2zwHaE0?rs=1&pid=ImgDetMain",
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
        image: "https://www.chardhamtours.in/gallery/cityImage/1595759236_uma_devi_temple.jpg"
      },
      {
        name: "River Confluence",
        description: "Sacred meeting point of Alaknanda and Pindar rivers",
        image: "https://twistedsifter.com/wp-content/uploads/2012/04/osijek-croatia-drava-and-danube-rivers-confluence.jpg"
      }
    ],
    vehicles: [
      {
        type: "SUV",
        capacity: "6 passengers",
        price: 5000,
        image: "https://wallpapers.com/images/hd/suzuki-dzire-2022-sherwood-brown-y5e1vukdf48ljnb0.jpg"
      },
      {
        type: "Tempo Traveller",
        capacity: "12 passengers",
        price: 8500,
       image: "https://www.mornis.in/wp-content/uploads/2019/11/Tempo-Traveller.jpeg "
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
    image: "https://th.bing.com/th/id/OIP.c06ZbKu_uzAV0sSQE0GX3AHaEn?w=768&h=478&rs=1&pid=ImgDetMain",
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
        image: "https://kedarresorts.com/wp-content/uploads/2021/03/trijuginarayan-large.png"
      },
      {
        name: "Mandakini River",
        description: "Holy river and starting point of Kedarnath trek",
        image: "https://i.pinimg.com/originals/e3/39/41/e3394125f77dfb5db118c2a05a60e663.jpg"
      }
    ],
    vehicles: [
      {
        type: "SUV",
        capacity: "6 passengers",
        price: 5500,
         image: "https://img-ik.cars.co.za/news-site-za/images/2020/06/Fortuner8.jpg?tr=w-1200,h-800"
      },
      {
        type: "Tempo Traveller",
        capacity: "12 passengers",
        price: 9000,
       image: "https://www.mornis.in/wp-content/uploads/2019/11/Tempo-Traveller.jpeg "
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
    image: "https://th.bing.com/th/id/OIP.yFLpBWEJpSqeemaNzVHlWAHaEH?rs=1&pid=ImgDetMain",
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
        image: "https://th.bing.com/th/id/OIP.7jJaNaiEeX8uD-R3ghu4eQHaE8?rs=1&pid=ImgDetMain"
      },
      {
        name: "Tehri Lake",
        description: "Perfect for water sports and boating activities",
        image: "https://thumbs.dreamstime.com/b/tehri-lake-uttarakhand-india-artificial-dam-reservoir-tallest-asia-s-largest-man-made-255016313.jpg"
      },
      {
        name: "Adventure Sports Complex",
        description: "Offers activities like kayaking, jet skiing, and banana boat rides",
        image: "https://th.bing.com/th/id/OIP.WCbfTZ346apz862bd1Wn_gAAAA?rs=1&pid=ImgDetMain"
      }
    ],
    vehicles: [
      {
        type: "Sedan",
        capacity: "4 passengers",
        price: 2500,
        image: "https://wallpapers.com/images/hd/suzuki-dzire-2022-sherwood-brown-y5e1vukdf48ljnb0.jpg"
      },
      {
        type: "SUV",
        capacity: "6 passengers",
        price: 3500,
        image: "https://img-ik.cars.co.za/news-site-za/images/2020/06/Fortuner8.jpg?tr=w-1200,h-800"
      },
      {
        type: "Tempo Traveller",
        capacity: "12 passengers",
        price: 6000,
        image: "https://www.mornis.in/wp-content/uploads/2019/11/Tempo-Traveller.jpeg "
      }
    ]
  }
]; 