import React from "react";
import { useState } from "react";
import story_bg_1 from "../assets/story_bg_1.png";
import OrbitName from "../component/orbitName";
import char2 from "../assets/SVG/char2.svg";

const Chapter = ({ props }) => {
    return (
        <div className="mx-60 mt-60" >
            <div>
                <div className="text-3xl text-white font-Saira font-bold ">{props.title}</div>
                <div className="text-xl text-white font-Saira  mt-2 ">{props.story}</div>

            </div>
        </div>

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
                        story:"A long, long time ago, when humans first gazed up at the night sky, they began to wonder: “Are we alone? Do planets like Earth exist beyond our solar system?” But for many centuries, all they saw were twinkling stars, with no sign of distant worlds.However, deep in space, beyond the reach of the naked eye, there were countless planets. Some were gas giants like Jupiter, others were rocky like Earth, and still others were stranger than anyone could imagine. But they all had one thing in common—they were orbiting stars far away from our own Sun.For many years, these planets remained hidden, their secrets guarded by the vastness of space. Humans didn’t have the tools to find them, but that was about to change…"
                    }
                } />
            </div>
        </dib>
    )
}
export default JourneyWithorbit;