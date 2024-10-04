import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import bg from '../assets/bg_5.png';
// import '../Planetcss/main.css';



const Planets = () => {
  const [planetData, setPlanetData] = useState([]);
  const [selectedYear, setSelectedYear] = useState("2017");
  const [selectedPlanet, setSelectedPlanet] = useState("N/A");

  const bubbleDivRef = useRef(null);
  const radarDivRef = useRef(null);
  const svgRef = useRef(null);
  const tooltipRef = useRef(null);

  const margin = { top: 150, right: 10, bottom: 200, left: -100 };
  const width = 900 - margin.left - margin.right;
  const height = 600 - margin.top - margin.bottom;



  const icon_map = {
    "Super Earth": "sat",
    "Terrestrial": "mars",
    "Gas Giant": "jupi",
    "Unknown": "merc",
    "Neptune-like": "np"
  };

  const dataFile = '/data/cleaned_5250.csv';

  useEffect(() => {
    d3.csv(dataFile).then(data => {
      setPlanetData(data);
      console.log(planetData);
      console.log("data", data);
    });
  }, []);

  useEffect(() => {
    if (planetData.length > 0) {
      console.log("initialized")
      initChart();
      drawBubbleChart();
    }
  }, [planetData]);

  useEffect(() => {
    if (planetData.length > 0) {
      drawBubbleChart();
    }
  }, [selectedYear]);

  const initChart = () => {
    // Check if the SVG has already been appended
    if (d3.select(bubbleDivRef.current).select("svg").empty()) {
      const svg = d3.select(bubbleDivRef.current)
        .append("svg")
        .attr("height", height + margin.top + margin.bottom)
        .attr("width", width + margin.left + margin.right)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      svgRef.current = svg;

      const tooltip = d3.select(tooltipRef.current)
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        // .style("padding", "10px")
        .style("width", "fit-content")
        .style("position", "absolute")
        .style("font-weight", "550");
    }
  };


  const drawBubbleChart = () => {
    const svg = svgRef.current;
    svg.selectAll("*").remove();
    svgRef.current = svg

    const data = getData(selectedYear);

    const color = d3.scaleOrdinal()
      .domain([...new Set(planetData.map(d => d.planet_type))])
      .range(d3.schemeSet2);

    const size = d3.scaleLinear()
      .domain([0, 140])
      .range([7, 55]);

    const mouseover = (event, d) => {
      d3.select(tooltipRef.current).style("opacity", 1);
    };

    const mousemove = (event, d) => {
      d3.select(tooltipRef.current)
        .html(
          `
          <div class="bg-slate-900 font-Saira text-slate-100 bg-opacity-70 w-96 border-0 ">
          <span>Planet Name: ${d.name}</span>
           <br><span>Planet Type: ${d.planet_type}</span>
           <br><span>Distance from Earth (Light years): ${d.distance}</span>
           <br><span>Discovered in: ${d.discovery_year}</span>
           <br><span>Discovery Method: ${d.detection_method}</span>
           </div>
           `
        )

        .style("top", `${event.pageY - 50}px`)
        .style("left", `${event.pageX + 10}px`);
    };

    const mouseleave = () => {
      d3.select(tooltipRef.current).style("opacity", 0);
    };

    const mousedowned = (event, d) => {
      d3.select(event.target).transition()
        .attr("width", size(+d.radius_multiplier * 100))
        .attr("height", size(+d.radius_multiplier * 100))
        .transition()
        .attr("width", size(+d.radius_multiplier * 50))
        .attr("height", size(+d.radius_multiplier * 50));

      setSelectedPlanet(d.name);
      drawRadarChart(d.name);
    };

    const node = svg.selectAll(".planet")
      .data(data)
      .enter()
      .append("image")
      .attr("class", "planet")
      .attr("id", d => d.name)
      .attr("xlink:href", d => `/icons/${icon_map[d.planet_type] || 'merc'}.png`)
      .attr("width", d => size(+d.radius_multiplier * 50))
      .attr("height", d => size(+d.radius_multiplier * 50))
      .attr("x", width / 2)
      .attr("y", height / 2)
      .style("stroke-width", 1)
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)
      .on("mousedown", mousedowned)
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    const simulation = d3.forceSimulation()
      .force("center", d3.forceCenter().x(width / 2).y(height / 2))
      .force("charge", d3.forceManyBody().strength(.5))
      .force("collide", d3.forceCollide().strength(.3).radius(d => (size(+d.radius_multiplier * 20) + 3)).iterations(10));

    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    simulation
      .nodes(data)
      .on("tick", () => {
        node
          .attr("x", d => d.x)
          .attr("y", d => d.y);
      });

    // Legend
    const s = 20;
    const allgroups = [...new Set(planetData.map(d => d.planet_type))];
    svg.selectAll("my_rect")
      .data(allgroups)
      .join("image")
      .attr("xlink:href", d => { console.log(d); console.log(icon_map[d]); return `/icons/${icon_map[d] || 'merc'}.png` })
      .attr("x", 880)
      .attr("y", (d, i) => -80 + i * (s + 5))
      .attr("width", size(25))
      .attr("height", size(25));

    svg.selectAll("my_labels")
      .data(allgroups)
      .enter()
      .append("text")
      .attr("x", 880 + s * 1.5)
      .attr("y", (d, i) => -80 + i * (s + 5) + (s / 2))
      .text(d => d)
      .attr("text-anchor", "left")
      .style("fill", "white")
      .style("alignment-baseline", "middle")
      .style("font-size", "15px")
      .style("font-weight", "400");
  };

  const getData = (year) => {
    const planets = getPlanets(year);
    let data = planetData.filter(d => planets.includes(d.name));
    return data.sort(() => Math.random() - 0.5).slice(0, 250);
  };

  const getPlanets = (year) => {
    return planetData
      .filter(d => d.discovery_year === year)
      .map(d => d.name);
  };

  const getRadarChartData = (name) => {
    const columns = ["mass_multiplier", "stellar_magnitude", "radius_multiplier", "orbital_radius", "orbital_period", "eccentricity"];
    const planet = planetData.find(d => d.name === name);
    if (!planet) return [];

    return [{
      name: planet.name,
      axes: columns.map(col => ({
        axis: col,
        value: parseFloat(planet[col]) || 0
      }))
    }];
  };


  const drawRadarChart = (name) => {

    const radialData = getRadarChartData(name);
    if (radialData.length === 0) return;

    const radarDiv = d3.select(radarDivRef.current);
    radarDiv.selectAll("*").remove();

    const axesLength = radialData[0].axes.length;
    const axisLabelFactor = 1.15;
    const axisCircles = 2, dotRadius = 4;
    const width = 550, height = 550;
    const radius = Math.min(width, height) / 2 - 80;
    const angleSlice = Math.PI * 2 / axesLength;

    const axesDomain = radialData[0].axes.map(d => d.axis);
    const maxValue = Math.max(...radialData[0].axes.map(d => d.value)) * 1.1;

    const rScale = d3.scaleLinear()
      .domain([0, maxValue])
      .range([0, radius]);

    const svg = radarDiv.append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    // Draw the circular grid
    const axisGrid = svg.append("g").attr("class", "axisWrapper");

    axisGrid.selectAll(".levels")
      .data(d3.range(1, axisCircles + 1).reverse())
      .enter()
      .append("circle")
      .attr("class", "gridCircle")
      .attr("r", (d) => radius / axisCircles * d)
      .style("fill", "#CDCDCD")
      .style("stroke", "#CDCDCD")
      .style("color", "white")
      .style("fill-opacity", 0.1);

    // Draw the axes
    const axis = axisGrid.selectAll(".axis")
      .data(axesDomain)
      .enter()
      .append("g")
      .attr("class", "axis");

    axis.append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", (d, i) => rScale(maxValue * 1.1) * Math.cos(angleSlice * i - Math.PI / 2))
      .attr("y2", (d, i) => rScale(maxValue * 1.1) * Math.sin(angleSlice * i - Math.PI / 2))
      .attr("class", "line")
      .style("stroke", "white")
      .style("stroke-width", "2px")
      .style("font-size", "12px")
      .style("font-style", "")
      .style("color", "white")
      .style("font-family", "Saira");

    axis.append("text")
      .attr("class", "legend")
      .style("font-size", "14px")
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .attr("x", (d, i) => rScale(maxValue * axisLabelFactor) * Math.cos(angleSlice * i - Math.PI / 2))
      .attr("y", (d, i) => rScale(maxValue * axisLabelFactor) * Math.sin(angleSlice * i - Math.PI / 2))
      .text(d => d.replace("_", " ").toUpperCase())
      .style("font-size", "12px")
      .style("font-style", "")
      .style("fill", "white")  // Corrected from "text-color" to "color"
      .style("font-family", "Saira");


    // Draw the radar chart blobs
    const radarLine = d3.lineRadial()
      .curve(d3.curveCardinalClosed)
      .radius(d => rScale(d.value))
      .angle((d, i) => i * angleSlice);

    const blobWrapper = svg.selectAll(".radarWrapper")
      .data(radialData)
      .enter().append("g")
      .attr("class", "radarWrapper");

    blobWrapper.append("path")
      .attr("class", "radarArea")
      .attr("d", d => radarLine(d.axes))
      .style("fill", "#EDC951")
      .style("fill-opacity", 0.1)
      .style("stroke", "#EDC951")
      .style("stroke-width", "2px")
      .style("font-size", "12px")
      .style("font-style", "")
      .style("color", "#ffffff")
      .style("font-family", "Saira");

    // Append the circles
    blobWrapper.selectAll(".radarCircle")
      .data(d => d.axes)
      .enter()
      .append("circle")
      .attr("class", "radarCircle")
      .attr("r", dotRadius)
      .attr("cx", (d, i) => rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2))
      .attr("cy", (d, i) => rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2))
      .style("fill", "#EDC951")
      .style("fill-opacity", 0.8)
      .style("font-size", "12px")
      .style("font-style", "")
      .style("color", "#ffffff")
      .style("font-family", "Saira");

    // Append the labels
    const unit_map = {
      "stellar_magnitude": "(Brightness)",
      "orbital_radius": "(in Astronomical Unit)",
      "orbital_period": "(in Years)",
      "eccentricity": "",
      "mass_multiplier": "",
      "radius_multiplier": ""
    };

    const columns = ["mass_multiplier", "stellar_magnitude", "radius_multiplier", "orbital_radius", "orbital_period", "eccentricity"];

    svg.selectAll("my_radial_key")
      .data(columns)
      .enter()
      .append("text")
      .attr("x", -width / 2 + 20)
      .attr("y", (d, i) => height / 2 - 100 + i * 25)
      .text(d => d.replace("_", " ").toUpperCase() + " " + unit_map[d] + " : ")
      .style("fill", "white")
      .style("font-size", "12px")
      .style("font-style", "")
      .style("color", "#ffffff")
      .style("font-family", "Saira");

    svg.selectAll("my_radial_labels")
      .data(columns)
      .enter()
      .append("text")
      .attr("x", width / 2 - 150)
      .attr("y", (d, i) => height / 2 - 100 + i * 25)
      .text(d => {
        const planet = planetData.find(p => p.name === name);
        if (!planet) return "";
        if (["mass_multiplier", "radius_multiplier"].includes(d)) {
          return `${planet[d]} w.r.t ${planet[d.split("_")[0] + "_wrt"]}`;
        } else {
          return `${planet[d]}`;
        }
      })
      .style("fill", "#e66104")
      .style("font-size", "12px")
      .style("font-style", "")
      .style("font-family", "Saira");
  };



  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <div className="row flex overflow-hidden flex-wrap justify-normal text-center absolute top-0 left-0 w-full h-full">
      <div className="col col-xl-8 w-2/3  shadow-md bg-slate-200">
        <div className="card shadow mb-4">
          <div className="card-header text-center bg-gray-400">
            <h6 className="absolute z-10 top-10 left-10 m-0 text-center text-slate-400 text-2xl font-Saira">
              <details className="dropdown">
                <summary className="btn m-1">Discover Year</summary>
                <ul className="menu dropdown-content bg-gray-900 bg-opacity-60 rounded-box z-[1] w-32 p-2 shadow">
                  {["2017", "2018", "2019", "2020", "2021", "2022", "2023"].map(year => (
                    <li key={year}>
                      <a onClick={() => setSelectedYear(year)}>{year}</a>
                    </li>
                  ))}
                </ul>
              </details>

            </h6>
          </div>
          <div className='w-screen h-screen overflow-hidden  relative'>
            <img src={bg} alt="bg" className="  w-screen object-cover absolute " />
          </div>
          <div className='h-screen w-screen absolute top-0 left-0 flex justify-start items-center '>
            <div className='flex justify-center items-center '>
              <div ref={bubbleDivRef} id="bubble_div" className=' w-full h-full'></div>
              <div ref={tooltipRef} className=" bg-trabsparent p-0 m-0 "></div>
            </div>
          </div>
        </div>
      </div>
      <div className='col-lg-4 col-xl-4 flex justify-center items-center  h-screen w-1/3 absolute top-0  right-56  shadow-lg'>
        <div className="my-10 bg-gray-900 border-2 min-w-96 rounded-xl bg-opacity-50 border-opacity-30 border-slate-400">
          <div className="card shadow mb-4">
            <div className=" w-full bg-slate-950 py-3  absolute top-0 left-0">
              <h6 className="fw-bold m-0 text-3xl font-bold font-Saira text-white">
                Planet Name: <span className="fw-bold" id="planet_name">{selectedPlanet}</span>
              </h6>
            </div>
            <div className="card-body w-full " id="side_graph">
              <div ref={radarDivRef} id="radar_div" className=''></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Planets;