import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const popularPlaces = [
  { 
    name: "Nainital", 
    img: "https://www.holidify.com/images/bgImages/NAINITAL.jpg",
    description: "A charming hill station known for its beautiful lakes, breathtaking views, and pleasant climate.",
    famousFor: [
      { name: "Naini Lake", img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0b/fb/75/61/the-lake.jpg?w=700&h=-1&s=1" },
      { name: "The Mall Road", img: "https://live.staticflickr.com/8255/8696489590_e64f07a3b3_b.jpg" },
      { name: "Snow View Point", img: "https://th.bing.com/th/id/OIP.JaJQdW6GAggbFtwY9mz_ZwHaEV?rs=1&pid=ImgDetMain" }
    ]
  },
  { 
    name: "Mussoorie", 
    img: "https://www.holidify.com/images/bgImages/MUSSOORIE.jpg",
    description: "The 'Queen of Hills' offers stunning landscapes, waterfalls, and colonial-era charm.",
    famousFor: [
      { name: "Kempty Falls", img: "https://www.visittnt.com/blog/wp-content/uploads/2019/08/mussorie.jpg" },
      { name: "Gun Hill", img: "https://th.bing.com/th/id/OIP.NpTyZvcgBTRGvenouR7SaQHaEV?rs=1&pid=ImgDetMain" },
      { name: "Lal Tibba", img: "https://th.bing.com/th/id/OIP.ZGgm7fkvRzXu0YKP7jGZPgHaEU?w=239&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" }
    ]
  },
  { 
    name: "Rishikesh", 
    img: "https://www.holidify.com/images/bgImages/RISHIKESH.jpg",
    description: "A spiritual and adventure hub known for yoga retreats and thrilling river rafting.",
    famousFor: [
      { name: "Lakshman Jhula", img: "https://th.bing.com/th/id/OIP.EmUVUkUYZFYjDXQ9LICCKwHaE5?rs=1&pid=ImgDetMain" },
      { name: "Triveni Ghat", img: "https://www.exploreouting.com/images/poi_images/ATTR_1389_1502197524_1.jpg" },
      { name: "Beatles Ashram", img: "https://thelandofwanderlust.com/wp-content/uploads/2023/10/IMG_1102.jpeg" }
    ]
  },
  { 
    name: "Kedarnath", 
    img: "https://www.holidify.com/images/bgImages/KEDARNATH.jpg",
    description: "A sacred pilgrimage site, part of the Char Dham Yatra, surrounded by snow-clad peaks.",
    famousFor: [
      { name: "Kedarnath Temple", img: "https://majesticjourney.in/wp-content/uploads/2020/05/kedarnath-temple1.jpg" },
      { name: "Vasuki Tal", img: "https://www.chardhamtour.in/blog/wp-content/uploads/2018/11/Vasuki-Tal-Uttarakhand-768x469.jpg" },
      { name: "Bhairavnath Temple", img: "https://www.bhaktapur.com/wp-content/uploads/2020/03/Bhairavnath-.jpg" }
    ]
  },
  { 
    name: "Badrinath", 
    img: "https://www.holidify.com/images/bgImages/BADRINATH.jpg",
    description: "A revered town in the Himalayas, home to the famous Badrinath Temple.",
    famousFor: [
      { name: "Badrinath Temple", img: "https://kedarnathtemple.com/wp-content/uploads/2019/12/badrinath-yatra-2020.jpg" },
      { name: "Mana Village", img: "https://th.bing.com/th/id/OIP.DXdhAdyOBiaWxil0zTVpKQHaFj?rs=1&pid=ImgDetMain" },
      { name: "Vasudhara Falls", img: "https://th.bing.com/th/id/OIP.9OhIeMGA6dYJsf5x3zy1vgHaFG?rs=1&pid=ImgDetMain" }
    ]
  },
  { 
    name: "Jim Corbett", 
    img: "https://www.holidify.com/images/bgImages/JIM-CORBETT-NATIONAL-PARK.jpg",
    description: "India’s first national park, known for its Bengal tiger population and wildlife safaris.",
    famousFor: [
      { name: "Wildlife Safari", img: "https://www.adventurush.com/wp-content/uploads/2022/08/shutterstock_2155601303.jpg" },
      { name: "Corbett Waterfall", img: "https://www.hlimg.com/images/things2do/738X538/Corbett-Waterfall-Corbett_1506811670t.jpg" },
      { name: "Dhikala Zone", img: "https://th.bing.com/th/id/OIP.QJoqSI2e9MNVuJoaFQkTugHaDm?rs=1&pid=ImgDetMain" }
    ]
  },
  { 
    name: "Haridwar", 
    img: "https://www.holidify.com/images/bgImages/HARIDWAR.jpg",
    description: "A sacred city on the banks of the Ganges, famous for its grand evening Ganga Aarti. It is one of the seven holiest places in Hinduism.",
    famousFor: [
      { name: "Har Ki Pauri", img: "https://1.bp.blogspot.com/-YNKUQ8PeuhI/USTQMy9UCLI/AAAAAAAABMc/pPgyXg-FTm4/s1600/har-ki-pauri-haridwar-ganga-aarti.jpg" },
      { name: "Mansa Devi Temple", img: "https://th.bing.com/th/id/OIP.9KniyP5nxp8TEvB84sr-cgHaE8?rs=1&pid=ImgDetMain" },
    
      { name: "Chandi Devi Temple", img: "https://im.hunt.in/cg/Haridwar/City-Guide/Haridwar-chandidevi.jpg" },
      { name: "Daksh Mahadev Temple", img: "https://1.bp.blogspot.com/-AagB01tJgUY/VO2j5MfqSaI/AAAAAAAAAdU/yHj6qgT2GJw/s1600/725px-Daksh-Mahadev-Temple-Haridwar-1.jpg" }
    ]
  },
  { 
    name: "Almora", 
    img: "https://www.holidify.com/images/bgImages/ALMORA.jpg",
    description: "A cultural and scenic hill station offering mesmerizing views of the Himalayas. It is known for its rich heritage, handicrafts, and Kumaoni cuisine.",
    famousFor: [
      { name: "Bright End Corner", img: "https://th.bing.com/th/id/OIP.kBpoCKSTB6iSFJMXbXeUEAHaFj?w=2048&h=1536&rs=1&pid=ImgDetMain" },
      { name: "Jageshwar Temple", img: "https://www.vanserai.com/sites/default/files/2021-12/jageshwar_temple2_0.jpg" },
      { name: "Zero Point", img: "https://media-cdn.tripadvisor.com/media/photo-s/18/f9/2e/87/20190816-145511-largejpg.jpg" },
      { name: "Kasar Devi Temple", img: "https://th.bing.com/th/id/OIP.XC920Ea3zpOu6VrCgiUK4AHaEh?rs=1&pid=ImgDetMain" }
    
    ]
  },
  { 
    name: "Chopta", 
    img: "https://www.holidify.com/images/bgImages/CHOPTA.jpg",
    description: "A picturesque trekking destination, known as the 'Mini Switzerland of India'. The region is home to lush meadows and stunning panoramic views.",
    famousFor: [
      { name: "Tungnath Temple", img: "https://thetempleguru.com/wp-content/uploads/2023/04/tungnath-temple-7.jpg" },
      { name: "Chandrashila Trek", img: "https://dmgupcwbwy0wl.cloudfront.net/system/images/000/237/752/3fbfde4528e89119784dd3cff77c322a/x600gt/chandrashila-top-view.jpg?1552062079" },
      { name: "Deoria Tal", img: "https://dynamic.tourtravelworld.com/package-images/photo-big/dir_21/603422/297570.jpg" },
      { name: "Rohini Bugyal", img: "https://himalayasadventure.in/images/dayara-bugyal-trek-1.jpg" },
      { name: "Sari Village", img: "https://th.bing.com/th/id/OIP.1vUeR4CfuTUGIOHls_3SnQHaE0?rs=1&pid=ImgDetMain" }
    ]
  },
  { 
    name: "Auli", 
    img: "https://www.holidify.com/images/bgImages/AULI.jpg",
    description: "India’s premier skiing destination, with spectacular views of the Nanda Devi range. It offers a perfect mix of adventure and tranquility.",
    famousFor: [
      { name: "Skiing", img: "https://th.bing.com/th/id/OIP.G9pyWv-qa4i9L0vaZfJC_AHaE7?rs=1&pid=ImgDetMain" },
      { name: "Auli Ropeway", img: "https://th.bing.com/th/id/OIP.qU_6TdNePf3SrQpVyrY6UAHaEu?rs=1&pid=ImgDetMain" },
      { name: "Gorson Bugyal", img: "https://www.holidify.com/images/cmsuploads/compressed/Gorson_Bugyal_20201103104123.jpg" },
      { name: "Artificial Lake", img: "https://www.scrolldroll.com/wp-content/uploads/2019/02/Auli-Artificial-Lake.jpg" }
      
    ]
  },
  { 
    name: "Valley of Flowers", 
    img: "https://www.holidify.com/images/bgImages/VALLEY-OF-FLOWERS.jpg",
    description: "A UNESCO World Heritage Site, famous for its vibrant meadows of endemic alpine flowers. The valley is a paradise for trekkers and botanists.",
    famousFor: [
      { name: "Rare Flowers", img: "https://indiaforyou.in/wp-content/uploads/2016/06/Valley_of_flowers_2.jpeg" },
      { name: "Nanda Devi National Park", img: "https://1.bp.blogspot.com/-SqRB8fq4Vh0/TiJ27FPxmEI/AAAAAAAABvI/QBNZbAYzcNE/s1600/Valley+of+Flowers+National+Park+03a.jpg" },
      { name: "Trekking", img: "https://th.bing.com/th/id/OIP.J8rrCTkRZxycyMTwU70-RwHaE6?rs=1&pid=ImgDetMain" },
      { name: "Hemkund Sahib", img: "https://th.bing.com/th/id/OIP.93YPsXrqXY1iBXJEHdnrdAHaES?rs=1&pid=ImgDetMain" },
      { name: "Pushpawati River", img: "https://th.bing.com/th/id/OIP.ewrvj0XBJvX96KMi-yaSGQHaEo?w=800&h=500&rs=1&pid=ImgDetMain" }
    ]
  },
  { 
    name: "Ranikhet", 
    img: "https://www.holidify.com/images/bgImages/RANIKHET.jpg",
    description: "A tranquil hill station offering lush greenery, colonial charm, and panoramic views. It is a perfect retreat for those seeking peace and natural beauty.",
    famousFor: [
      { name: "Jhula Devi Temple", img: "https://i.pinimg.com/originals/58/d1/b1/58d1b1edd3b83b27594b2c7d4fd5b7c8.jpg" },
      { name: "Chaubatia Orchards", img: "https://th.bing.com/th/id/OIP.I0wUesIELu7WrquGSWqzhwHaEC?rs=1&pid=ImgDetMain" },
      { name: "Upat Golf Course", img: "https://th.bing.com/th/id/OIP.Q1rJ3O4_h1ZHmk7-NXT2WQHaE6?rs=1&pid=ImgDetMain" },
      { name: "Bhalu Dam", img: "https://hblimg.mmtcdn.com/content/hubble/img/ranikhet/mmt/activities/m_Bhalu%20Dam-1_l_427_640.jpg" }
     
    ]
  }
];

const [selectedImage, setSelectedImage] = useState(null); // For opening images

const NotFound = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);

  const closeModal = (e) => {
    if (e.target.id === "modalBackground") {
      setSelectedPlace(null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      
      <section className="bg-gradient-to-r from-primary-600 to-primary-300 py-20 text-white text-center">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Popular Places in Uttarakhand</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Explore the most beautiful and spiritual destinations in Uttarakhand.
          </p>
        </motion.div>
      </section>
      
      <section className="py-10 text-center px-4">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {popularPlaces.map((place, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105 cursor-pointer" onClick={() => setSelectedPlace(place)}>
              <img src={place.img} alt={place.name} className="w-full h-56 object-cover" />
              <div className="p-4 text-gray-800 font-semibold text-lg">{place.name}</div>
            </div>
          ))}
        </div>
      </section>

      {selectedPlace && (
        <div id="modalBackground" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4" onClick={closeModal}>
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative max-h-[80vh] overflow-y-auto">
            <button className="absolute top-2 right-2 text-gray-700 hover:text-red-500 text-2xl" onClick={() => setSelectedPlace(null)}>×</button>
            <h2 className="text-2xl font-bold mb-2 text-center">{selectedPlace.name}</h2>
            <img src={selectedPlace.img} alt={selectedPlace.name} className="w-full h-40 object-cover rounded-lg mb-4" />
            <p className="text-gray-600 mb-4 text-center">{selectedPlace.description}</p>
            <h3 className="text-lg font-semibold text-center">Famous Points:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {selectedPlace.famousFor.map((point, index) => (
                <div key={index} className="bg-gray-100 p-3 rounded-lg flex flex-col items-center">
                  <img src={point.img} alt={point.name} className="w-full h-24 object-cover rounded-lg mb-2" />
                  <p className="text-gray-700 text-sm font-medium text-center">{point.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default NotFound;
