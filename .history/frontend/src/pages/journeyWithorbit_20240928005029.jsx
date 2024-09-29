import React from "react";
import story_bg_1 from "../assets/story_bg_1.png";
import story_bg_2 from "../assets/bg_4.png";
import OrbitName from "../component/orbitName";
import char2 from "../assets/SVG/char2.svg";
import char3 from "../assets/SVG/char3.svg";
import char4 from "../assets/SVG/char4.svg";
import char5 from "../assets/SVG/char5.svg";
import char6 from "../assets/SVG/char6.svg";
import char7 from "../assets/SVG/char7.svg";
import planet4 from "../assets/SVG/planet4.svg";
import planet5 from "../assets/SVG/planet5.svg";
import planet6 from "../assets/SVG/planet6.svg";


const Chapter = ({ title, story, image, dir }) => {
    // Function to handle line breaks in the story content
    const renderStoryWithLineBreaks = (story) => {
        return story.split('\n').map((line, index) => (
            <span key={index}>
                {line}
                <br />
            </span>
        ));
    };

    return (
        <div className="mx-60 mt-60">
            <div>
                <div className="text-3xl text-white font-Saira font-bold">{title}</div>
                <div className={`flex items-center mt-10 ${dir === "ltr" ? "flex-row-reverse" : ""}`}>
                    <div className="flex items-center mt-10">
                        <img src={image} alt="Chapter Illustration" className="w-full mr-3" />
                    </div>
                    <div className="text-xl text-white font-Saira mt-2 w-3/4">
                        {renderStoryWithLineBreaks(story)}
                    </div>
                </div>
            </div>
        </div>
    );
};

const JourneyWithorbit = () => {
    // Define the chapters as an array of objects
    const chapters = [
        {
            title: "“Every journey begins with a question…”",
            story: "A long, long time ago, when humans first gazed up at the night sky, they began to wonder: \n\n“Are we alone? Do planets like Earth exist beyond our solar system?” \n\nBut for many centuries, all they saw were twinkling stars, with no sign of distant worlds. However, deep in space, beyond the reach of the naked eye, there were countless planets. Some were gas giants like Jupiter, others were rocky like Earth, and still others were stranger than anyone could imagine. But they all had one thing in common—they were orbiting stars far away from our own Sun. For many years, these planets remained hidden, their secrets guarded by the vastness of space. Humans didn’t have the tools to find them, but that was about to change…",
            image: char3,
            dir: "rtl",
        },
        {
            title: "“The First Clue – 51 Pegasi b”",
            story: "Orbit floated in the quiet space between the stars, his sensors blinking as he detected something strange.\n\n “There! Do you see it? A star, wobbling ever so slightly. That can only mean one thing—a planet is pulling on it!” \n\nOrbit explains that the planet causing this wobble was the first exoplanet ever found around a Sun-like star. This planet, named 51 Pegasi b, was a massive gas giant orbiting extremely close to its star.\n\n “They call it a hot Jupiter, because it’s much hotter and larger than any planet in our solar system. Imagine standing there! But don’t worry, we won’t melt—let’s keep going.” \n\nOrbit’s antenna flickered as he zipped past 51 Pegasi b, knowing this was only the beginning of their adventure.",
            image: planet4,
            dir: "ltr",
        },
        {
            title: "“The Great Telescope Kepler”",
            story: "Orbit swooped toward a giant telescope floating in the darkness—Kepler, a spacecraft with eyes as sharp as a hawk’s, designed to find exoplanets. \n\n“Kepler is one of my best friends,” Orbit said, tapping Kepler’s hull. \n\n“This incredible machine has discovered thousands of exoplanets by watching stars blink when planets pass in front of them!” \n\nHe explained how Kepler-186f, an Earth-sized planet in the habitable zone of its star, was found using the transit method. \n\n“Just think—a planet out there, orbiting a red dwarf star, and it’s just the right temperature for liquid water! Who knows what we might find on Kepler-186f? Life? Oceans? Mountains? The possibilities are endless!”\n\n Orbit smiled as he imagined the alien landscapes of Kepler-186f, where the light from the red dwarf star bathed the planet in a strange, reddish glow.",
            image: char4,
            dir: "rtl",
        },
        {
            title: "“The Glass Rain of HD 189733b”",
            story: "“Now, hold on tight,” Orbit buzzed. \n\n“We’re heading to one of the wildest planets ever discovered—HD 189733b! You’ll want to keep your visor down for this one.”\n\n As Orbit approached the planet, a storm raged in its atmosphere.\n\n “This planet has winds faster than anything you’ve seen—5,400 miles per hour! And the rain? It’s made of molten glass!” Orbit’s shield glowed as he glided through the planet’s ferocious winds. \n\n“Imagine walking here—glass would rain sideways at you! Pretty intense, huh? But don’t worry, we’ll stick to exploring from above. Planets like HD 189733b show us just how strange and exciting exoplanets can be.”",
            image: char5,
            dir: "ltr",
        },
        {
            title: "“A Planet with Two Suns – Kepler-16b”",
            story: "Orbit spun through space, a glowing trail behind him, as he led the way to a planet that seemed to break the rules. \n\n“Here we are—Kepler-16b! You see that? Two suns! Imagine standing on this planet, watching two suns rise and set every day. It’s like a real-life version of Tatooine from Star Wars!”\n\n Orbit pointed out how Kepler-16b orbits both stars in a system, which makes it a circumbinary planet.\n\n “It’s a gas giant, so you can’t stand on it, but just think of the sunsets you’d see here. Some exoplanets are more beautiful than we can even imagine.” Orbit twirled in space, thrilled by the unique nature of Kepler-16b.",
            image: planet5,
            dir: "rtl",
        },
        {
            title: "“The Seven Wonders of TRAPPIST-1”",
            story: "Orbit zoomed toward a small, faint star. As he approached, seven planets appeared, all orbiting in tight formation.\n\n“Welcome to the TRAPPIST-1 system! Seven Earth-sized planets orbit this cool, red star. And the best part? Three of them are in the habitable zone, where liquid water might exist!”\n\nOrbit floated between the planets, marveling at their variety.\n\n“These planets are so close together that if you stood on one, you could see the others in the sky, almost like moons. It’s like a family of planets all huddled around their tiny star.”\n\nHe explained that scientists are studying these planets to see if any could support life.\n\n“The TRAPPIST-1 system is one of the best places to look for life beyond Earth. Who knows what we might find here one day!”",
            image: planet6,
            dir: "ltr",
        },
        {
            title: "“The Closest Neighbor – Proxima Centauri b”",
            story: "Orbit drifted through space until he came to a faint, nearby star—Proxima Centauri, the closest star to Earth after the Sun.\n\n“This is Proxima Centauri b, the closest exoplanet to us! It’s only about 4.2 light years away, orbiting the star Proxima Centauri.”\n\nOrbit explained that Proxima Centauri b is a rocky planet in the habitable zone, meaning it could potentially support liquid water—and maybe even life!\n\n“We might even be able to send a spacecraft here one day. Who knows what we’ll find? Oceans? Mountains? Alien life?”\n\nOrbit’s voice was filled with excitement as he gazed at the closest potential Earth-like world.",
            image: char6,
            dir: "rtl",
        },
        {
            title: "“The Future of Exoplanet Exploration”",
            story: "Orbit’s sensors buzzed with anticipation as he looked out across the vast universe.\n\n“Our adventure doesn’t end here, fellow explorer. There are so many more exoplanets waiting to be discovered. With new telescopes like the James Webb Space Telescope, we’ll soon be able to study these planets in even more detail.”\n\nOrbit glowed brightly.\n\n“The search for life, for new worlds, for distant planets, has only just begun. And who knows? Maybe one day, we’ll visit these worlds ourselves!”\n\nOrbit smiled as he prepared for the next big discovery, knowing that the universe is full of endless possibilities.",
            image: char7,
            dir: "ltr",
        },
    ];

    return (
        <div className="absolute top-0 w-full">
            <div>
                <div className="absolute w-full overflow-x-hidden -z-40">
                    <img src={story_bg_1} alt="story_bg_1" className="" />
                </div>
                <div className="flex mx-60 justify-center items-center">
                    <div className="w-full">
                        <img src={char2} alt="char2" className="w-3/4" />
                    </div>
                    <div className="flex flex-col justify-center items-start text-3xl text-white font-Saira h-screen">
                        <div className="flex justify-center items-center">
                            Hey there, space explorers! I’m <div className="w-24 mx-2"><OrbitName /></div>,
                        </div>
                        <div>
                            your guide to the stars. Today, I’m going to tell you a story about exoplanets—planets that exist outside our solar system. Buckle up, because we’re about to embark on an exciting journey across the galaxy!
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
                    />
                ))}
            </div>
            <div className="w-full absolute -bottom-96">
                <img src={story_bg_2} alt="char2" className="w-full  " />
            </div>
        </div>
    );
};

export default JourneyWithorbit;
