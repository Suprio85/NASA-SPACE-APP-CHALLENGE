import React, { useEffect, useState } from 'react';
import _bgImage from "../assets/bg_1.png";
import char1 from "../assets/SVG/char1.svg";
import planet1 from "../assets/SVG/planet1.svg";
import planet2 from "../assets/SVG/planet2.svg";
import Button from '../component/button';
import OrbitName from '../component/orbitName';
import Title from '../component/title';
import axios from 'axios';


const Hero = () => {
    return (
        <div className="hero w-full h-screen  flex items-center overflow-hidden relative">
            <div className='pl-36'>
                <div className='text-white font-suse text-3xl '>Explore the Mysteries of Exoplanets!</div>
                <div className='text-slate-400 font-Saira text-xl  w-1/2'>
                    Join us on a cosmic adventure to explore planets beyond the reach of human travel. Learn how these distant worlds are shaping our understanding of the universe.
                </div>
                <div className='pt-2'>
                    <Button text='Join Us' />
                </div>

            </div>
            <div className='overflow-hidden'>
                <img src={planet1} alt="planet1" className="absolute top-20 w-1/3 -right-24" />
                <img src={planet2} alt="planet2" className="absolute bottom-20 w-1/5 right-80" />
            </div>

        </div>
    )
}

const Storytelling = () => {
    return (
        <div className='ml-60 '>
            <div className=' flex  items-center '>
                <div className='font-Saira font-bold text-white text-5xl flex items-center'>
                    Hi, I’m <div className='w-28 mx-3'><OrbitName /></div>!
                </div>
                <img src={char1} alt="char1" className="  w-1/6 pl-16 " />
            </div>
            <div className='relative -top-10  w-96 font-Saira text-white text-2xl '>
                I’m here to guide you through the wonders of exoplanets. Together, we’ll explore distant worlds and discover the secrets of the universe. Let’s begin our cosmic journey!
            </div>
            <div>
                <Button text='Journey With Orbit' />
            </div>
        </div>
    )
}

const ExoPlanetIntrodurction = () => {
    return (
        <div className='mx-60  mt-96'>
            <Title text='What Is Exoplanet ?' />
            <div className='w-full font-Saira text-slate-900 text-xl'>
            Exoplanets, or extrasolar planets, are planets that orbit stars beyond our solar system. Unlike the familiar planets around the Sun, exoplanets can be located light-years away, around distant stars. They come in a variety of sizes and types, including gas giants like Jupiter, rocky Earth-like planets, and even super-Earths that are larger than our home planet. Their discovery has revolutionized our understanding of the universe, raising fascinating questions about the potential for life elsewhere.
            </div>
        </div>
    )
}

const ExoplanetImages = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const NASA_API_URL = 'https://images-api.nasa.gov/search?q=exoplanet+illustration&media_type=image';
  
    useEffect(() => {
      const fetchImages = async () => {
        try {
          const response = await axios.get(NASA_API_URL);
          const imageItems = response.data.collection.items;
          setImages(imageItems); 
          setLoading(false); 
        } catch (err) {
          console.error("Error fetching data: ", err);
          setError(err);
          setLoading(false);
        }
      };
  
      fetchImages();
    }, []);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error fetching images. Please try again later.</div>;
    }
  
    return (
      <div className="image-grid mx-60">
        {/* {images.length > 0 ? (
          images.map((image, index) => (
            <div key={index} className="image-item">
              
              
            </div>
          ))
        ) : (
          <p>No images found.</p>
        )} */}
        <div>
            <img src={images[0].links[0].href} alt="exoplanet" className="w-full" />
        </div>
      </div>
    );
  };
  
const HomePage = () => {
    return (
        <div className="login-page overflow-hidden">
            <img src={_bgImage} alt="bg" className="bg absolute top-0 -z-50" ></img>
            <div className=''>
                <Hero />
                <Storytelling />
                <ExoPlanetIntrodurction />
                <ExoplanetImages />
            </div>
        </div>
    )
}
export default HomePage;