
/* 9 NOV 2021 */
import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import Matter from "matter-js";

import { MarkGithubIcon } from '@primer/octicons-react';
import twinpeaks from './../img/welcometotwinpeaks.jpg';
import logo192 from './../img/logo192.png';

import GitHub from './Links';


// Function: Physics
function Physics(props) {
    
    const scene = useRef();
    const canvasRef = useRef();

    // Note: The hook 'useEffect' runs after renders
    useEffect(() => {
	    // Matter aliases
        var Engine = Matter.Engine,
            Render = Matter.Render,
            Runner = Matter.Runner,
            Common = Matter.Common,
            Composite = Matter.Composite,
            Bodies = Matter.Bodies,
            Mouse = Matter.Mouse,
            MouseConstraint = Matter.MouseConstraint,
            Svg = Matter.Svg;

        var engine = Engine.create();
        var render = Render.create({
            element: scene.current,
            engine: engine,
            canvas: canvasRef.current,
            options: {
            	width: 1200,
            	height: 1200,
            	wireframes: false,
            	background: twinpeaks
            }
        });
        var runner = Runner.create();
        Render.run(render);
        Render.lookAt(render, {
            min: { x: 0, y: 0 },
            max: { x: 1200, y: 1200 }
        });

        // Why??
        Engine.run(engine);
        Runner.run(runner, engine);

        // Set up Matter.Composite (formerly Matter.World)
        var ballA = Bodies.circle(210, 100, 30, {
        	restitution: 0.5,
        	render: {
        		sprite: {
        			texture: logo192,
        			xScale: 0.5,
        			yScale: 0.5
        		}
        	}
        });

        var ballB = Bodies.circle(110, 50, 30, {
        	restitution: 0.75,
        	render: {
        		sprite: {
        			texture: logo192
        		}
        	}
        });

        function bodiesCircles() {
        	/* For mouse event below */
            var factor = Math.random()
        	Composite.add(
        		engine.world,
        		Bodies.circle(400, 50, 30, {
        		    restitution: Math.random(),
        		    render: { 
        		    	sprite: {
        		    		texture: logo192,
        		    		xScale: (factor + 0.25),
        		    		yScale: (factor + 0.25)
        		    	}
        		    }
        		})
        	);
        }

        Composite.add(engine.world, [
            Bodies.rectangle(200, 0, 600, 50, { isStatic: true }),
            Bodies.rectangle(200, 600, 600, 50, { isStatic: true, render: { fillStyle: '#282c34' } }),
            Bodies.rectangle(260, 300, 50, 600, { isStatic: true, render: { fillStyle: '#654321' } }),
            Bodies.rectangle(0, 300, 50, 600, { isStatic: true, render: { fillStyle: '#654321' } }),
            Bodies.rectangle(700, 800, 800, 30, { isStatic: true, render: { fillStyle: 'grey' } })
        ]);

        Composite.add(engine.world, [ballA, ballB]);

        // Mouse control
        var mouse = Mouse.create(render.canvas),
            mouseConstraint = MouseConstraint.create(engine, {
        	    mouse: mouse,
        	    constraint: {
        		    stiffness: 0.2,
        		    render: {
        		    	visible: false
        		    }
        	    }
            });

        Composite.add(engine.world, mouseConstraint);

        Matter.Events.on(
            mouseConstraint,
            "mousedown",
            function(event) {
                bodiesCircles();
            }
        );

        return () => {
    	    Render.stop(render);
    	    Runner.stop(runner);
    	    Composite.clear(engine.world);
    	    Engine.clear(engine);
    	    render.canvas.remove();
    	    render.canvas = null;
    	    render.context = null;
    	    render.textures = {};
        }

    // End: useEffect    
    }, []);

    return(
    	<div ref={scene} />
    );

}




export default Physics;

