import React from "react";
import { useState } from "react";
import story_bg_1 from "../assets/story_bg_1.png";
import OrbitName from "../component/orbitName";
import char2 from "../assets/SVG/char2.svg";
import char3 from "../assets/SVG/char3.svg";
import char4 from "../assets/SVG/char4.svg";
import char5 from "../assets/SVG/char5.svg";
import planet4 from "../assets/SVG/planet4.svg";
const Chapter = ({ props }) => {
    return (
        <div className="mx-60 mt-60" >
            <div>
                <div className="text-3xl text-white font-Saira font-bold ">{props.title}</div>
                <div className={`flex items-center mt-10 ${props.dir === "ltr" ? "flex-row-reverse" : ""}`}>

                    <div className={`flex items-center mt-10 `}>
                        <img src={props.image} alt="char3" className="w-full mr-3" />
                    </div>
                    <div className="  text-xl text-white font-Saira  mt-2 w-3/4">{props.story}</div>


                </div>

            </div>
        </div >

    )
}
const JourneyWithorbit = () => {
    return (
        <dib className="absolute top-0  w-full">
            <div>
                <div className="absolute w-full  overflow-x-hidden -z-40">
                    <img src={story_bg_1} alt="story_bg_1 " className="" />
                </div>
                <div className="flex mx-60 justify-center items-center">
                    <div className="w-full">
                        <img src={char2} alt="char2" className="w-3/4 " />
                    </div>
                    <div className=" flex flex-col justify-center  items-start  text-3xl text-white font-Saira h-screen">
                        <div className=" flex justify-center items-center">Hey there, space explorers! I’m <div className="w-24 mx-2"><OrbitName /></div>,</div>
                        <div>your guide to the stars. Today, I’m going to tell you a story about exoplanets—planets that exist outside our solar system. Buckle up, because we’re about to embark on an exciting journey across the galaxy!</div>
                    </div>
                </div>
            </div>
            <div>

                <Chapter props={
                    {
                        title: "“Every journey begins with a question…”",
                        story: "A long, long time ago, when humans first gazed up at the night sky, they began to wonder: “Are we alone? Do planets like Earth exist beyond our solar system?” But for many centuries, all they saw were twinkling stars, with no sign of distant worlds.However, deep in space, beyond the reach of the naked eye, there were countless planets. Some were gas giants like Jupiter, others were rocky like Earth, and still others were stranger than anyone could imagine. But they all had one thing in common—they were orbiting stars far away from our own Sun.For many years, these planets remained hidden, their secrets guarded by the vastness of space. Humans didn’t have the tools to find them, but that was about to change…",
                        image: char3,
                        dir: "rtl"
                    }
                } />
                <Chapter props={
                    {
                        title: "“The First Clue – 51 Pegasi b”",
                        story: "Orbit floated in the quiet space between the stars, his sensors blinking as he detected something strange.“There! Do you see it? A star, wobbling ever so slightly. That can only mean one thing—a planet is pulling on it!”Orbit explains that the planet causing this wobble was the first exoplanet ever found around a Sun-like star. This planet, named 51 Pegasi b, was a massive gas giant orbiting extremely close to its star.“They call it a hot Jupiter, because it’s much hotter and larger than any planet in our solar system. Imagine standing there! But don’t worry, we won’t melt—let’s keep going.”Orbit’s antenna flickered as he zipped past 51 Pegasi b, knowing this was only the beginning of their adventure.",                       
                        image: planet4,
                        dir: "ltr"
                    }
                } />
                <Chapter props={
                    {
                        title: "“The Great Telescope Kepler”",
                        story: "Orbit swooped toward a giant telescope floating in the darkness—Kepler, a spacecraft with eyes as sharp as a hawk’s, designed to find exoplanets.“Kepler is one of my best friends,” Orbit said, tapping Kepler’s hull. “This incredible machine has discovered thousands of exoplanets by watching stars blink when planets pass in front of them!”He explained how Kepler-186f, an Earth-sized planet in the habitable zone of its star, was found using the transit method.“Just think—a planet out there, orbiting a red dwarf star, and it’s just the right temperature for liquid water! Who knows what we might find on Kepler-186f? Life? Oceans? Mountains? The possibilities are endless!”Orbit smiled as he imagined the alien landscapes of Kepler-186f, where the light from the red dwarf star bathed the planet in a strange, reddish glow.",                       
                        image: char4,
                        dir: "rtl"
                    }
                } />
                <Chapter props={
                    {
                        title: "“ The Glass Rain of HD 189733b”",
                        story: "“Now, hold on tight,” Orbit buzzed. “We’re heading to one of the wildest planets ever discovered—HD 189733b! You’ll want to keep your visor down for this one.”As Orbit approached the planet, a storm raged in its atmosphere.“This planet has winds faster than anything you’ve seen—5,400 miles per hour! And the rain? It’s made of molten glass!”Orbit’s shield glowed as he glided through the planet’s ferocious winds.“Imagine walking here—glass would rain sideways at you! Pretty intense, huh? But don’t worry, we’ll stick to exploring from above. Planets like HD 189733b show us just how strange and exciting exoplanets can be.”",                       
                        image: char5,
                        dir: "ltr"
                    }
                } />
            </div>
        </dib>
    )
}
export default JourneyWithorbit;