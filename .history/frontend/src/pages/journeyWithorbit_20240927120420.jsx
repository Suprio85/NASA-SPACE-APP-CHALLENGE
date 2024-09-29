import React from "react";
import { useState } from "react";
import story_bg_1 from "../assets/story_bg_1.png";
import OrbitName from "../component/orbitName";
const JourneyWithorbit = () => {

    return (
        <dib className="absolute top-0 h-screen w-full">
            <div className="absolute w-full h-screen overflow-hidden -z-40">
                <img src={story_bg_1} alt="story_bg_1 " className="" />
            </div>
            <div className=" flex flex-col justify-center  items-center mx-60 text-xl font-Saira h-screen">
                <div className="w-full">Hey there, space explorers! I’m <div className="w-40"><OrbitName /></div>,</div>
                <div>your guide to the stars. Today, I’m going to tell you a story about exoplanets—planets that exist outside our solar system. Buckle up, because we’re about to embark on an exciting journey across the galaxy!</div>
            </div>
        </dib>
    )
}
export default JourneyWithorbit;