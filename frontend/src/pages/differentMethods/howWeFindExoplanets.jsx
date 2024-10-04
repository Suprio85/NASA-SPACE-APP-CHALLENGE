import React from "react";
import story_bg_1 from "../../assets/story_bg_1.png";
import story_bg_2 from "../../assets/bg_4.png";
// import OrbitName from "../../component/orbitName";
import char2 from "../../assets/SVG/char11.svg";
import char3 from "../../assets/SVG/char3.svg";
import directImaging from "../../assets/SVG/directImaging.svg";
import radialVelocity from "../../assets/SVG/radialVelocity.svg";
import Typist from 'react-typist';

import transit from "../../assets/SVG/transit.svg";


import Chapter from "../../component/Chapter";



const HowWeFindExoplanets = () => {
    // Define the chapters as an array of objects
    const chapters = [
        {
            title: "“The Transit Method – Watching Stars Blink”",
            story: `Orbit pointed toward a distant star, its light shimmering faintly.\n\n“One of the most popular ways to find an exoplanet is called the Transit Method. Imagine you're watching a star, and suddenly, the light dims just a little bit. That tiny dip in brightness might be caused by a planet passing in front of the star—kind of like a little shadow!”\n\nHe floated closer to the star, simulating the planet’s transit.\n\n“Astronomers watch for these tiny dips in light. If they see the same pattern happen again and again, they can be pretty sure there’s a planet orbiting that star. In fact, the Kepler Space Telescope used this method to discover thousands of exoplanets!”`,
            image: transit,
            dir: "rtl",
            buttontext: "Transit Method",
            Linkto: "/transitmethod",
        },
        {
            title: "“The Radial Velocity Method – The Star’s Wobble”",
            story: `Orbit’s sensors started to hum as he detected something curious.\n\n“Another way to find exoplanets is by watching for a star’s wobble. You see, planets have gravity too, and as they orbit their star, they tug on it just a little. This tug makes the star wobble back and forth—something we can detect from Earth!”\n\nOrbit demonstrated by wobbling in space.\n\n“When astronomers look at the light coming from a star, they can see a tiny shift caused by this wobble. If a star is moving toward us, its light looks a little bluer. If it’s moving away, it looks redder. This method, called radial velocity, helped find some of the very first exoplanets, like 51 Pegasi b!”`,
            image: radialVelocity, // Add your desired image
            dir: "ltr",
            buttontext: "Radical Velocity Method",
            Linkto: "/radialvelocitymethod",
        },
        {
            title: "“Direct Imaging – A Snapshot of a Distant Planet”",
            story: `Orbit flickered with excitement as he floated through space, gazing at a distant point of light.\n\n“Now, this one’s tricky, but it’s the most direct method—Direct Imaging. That’s when astronomers take an actual picture of a planet!”\n\nHe smiled brightly.\n\n“Sounds simple, right? But it’s super hard! Stars are so bright that planets get lost in their glare. It’s like trying to spot a firefly next to a lighthouse. But with special telescopes and technology, scientists can block out the star’s light and capture an image of the planet itself.”\n\nOrbit blinked, revealing an image of a distant planet.\n\n“This method works best for big planets far from their stars, but every snapshot brings us closer to understanding these distant worlds.”`,
            image: directImaging, // Add your desired image
            dir: "rtl",
            buttontext: "Direct Imaging",
            Linkto: "/directimaging",
        },
        {
            title: "“Gravitational Microlensing – The Cosmic Magnifying Glass”",
            story: `Orbit floated deeper into space, pointing toward a distant star being distorted by a massive object.\n\n“This next method is called Gravitational Microlensing. It’s like using a cosmic magnifying glass! Here’s how it works: when a star or planet passes in front of another star, the gravity of the closer object bends the light of the background star, making it brighter for a short time.”\n\nOrbit mimicked the bending of light around an object.\n\n“If a planet is orbiting the closer star, it bends the light in a special way, revealing its presence. This method helps us find planets that are really far away, but it only works when the timing is just right.”`,
            image: char3, // Add your desired image
            dir: "ltr",
            buttontext: "Gravitational Microlensing",
            Linkto: "/GravitationalMicroLensing",
        },
        {
            title: "Astrometry – Measuring the Tiny Shifts",
            story: `Finally, Orbit drifted next to a star and pointed to its barely noticeable movement.\n\n“The last method is called Astrometry. It’s a lot like radial velocity, but instead of measuring the light shifts, astronomers measure how the star moves in space—super, super carefully. If the star shifts just a tiny bit from side to side, that means something is tugging on it: a planet!”\n\nHe smiled.\n\n“Astrometry is super precise, but it can help us find planets that are too far away to detect with other methods.”`,
            image: char3, // Add your desired image
            dir: "rtl",
            buttontext: "",
            Linkto: "/",
        }
    ];



    return (
        <div className="absolute top-0 w-full">
            <div>
                <div className="absolute w-full overflow-x-hidden -z-40">
                    <img src={story_bg_1} alt="story_bg_1" className="" />
                </div>
                <div className="flex mx-60 justify-center items-center">
                    <div className="w-1/2">
                        <img src={char2} alt="char2 " className="w-3/4 animate-shake" />
                    </div>
                    <div className="flex flex-col justify-center items-start text-3xl text-white font-Saira h-screen w-full">
                        <div className="bg-slate-900 h-80 p-8 flex flex-col justify-center items-start rounded-md border-2 border-slate-500 bg-opacity-50 w-full">
                    <Typist avgTypingDelay={30} cursor={{ show: true, blink: true, element: '|', hideWhenDone: true }}>
                            Orbit floated through space, his sensors glowing as he scanned the universe around him.<br></br>“Finding a planet around another star sounds like searching for a needle in a cosmic haystack, right?” Orbit asked with a playful tone. “But humans have developed some clever techniques to find these distant worlds. Let me show you how it’s done!”
                        </Typist>
                        </div>

                    </div>
                </div>
            </div>
            <div>
                {/* Render each chapter using the .map() function */}
                {chapters.map((chapter, index) => (
                    <Chapter
                        key={index}
                        title={chapter.title}
                        story={chapter.story}
                        image={chapter.image}
                        dir={chapter.dir}
                        buttontext={chapter.buttontext}
                        Linkto={chapter.Linkto}
                    />
                ))}
            </div>
            <div className="w-full absolute -bottom-96">
                <div className="absolute -bottom-48">
                    <img src={story_bg_2} alt="char2" className="w-full  " />
                </div>
            </div>
        </div>
    );
};

export default HowWeFindExoplanets;
