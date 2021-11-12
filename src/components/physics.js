
/* 9 NOV 2021 */
import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import Matter from "matter-js";

import { MarkGithubIcon } from '@primer/octicons-react';
import twinpeaks from './welcometotwinpeaks.jpg';


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

        // Philosophisingically: React's Stateless vs Matter's Stateful
        //const scene = useRef();
        //const engine = useRef(Engine.create());

        const engine = Engine.create();


        const render = Render.create({
            element: scene.current,
            engine: engine,
            canvas: canvasRef.current,
            options: {
            	width: 1200,
            	height: 1200,
            	wireframes: false,
            	background: twinpeaks
            }
        })

        // Set up Matter.Composite (formerly Matter.World)
        var ballA = Bodies.circle(210, 100, 30, { restitution: 0.5 });
        var ballB = Bodies.circle(110, 50, 30, { restitution: 0.75 });

        Composite.add(engine.world, [
            Bodies.rectangle(200, 0, 600, 50, { isStatic: true }),
            Bodies.rectangle(200, 600, 600, 50, { isStatic: true, render: { fillStyle: '#282c34' } }),
            Bodies.rectangle(260, 300, 50, 600, { isStatic: true, render: { fillStyle: '#654321' } }),
            Bodies.rectangle(0, 300, 50, 600, { isStatic: true, render: { fillStyle: '#654321' } }),
            Bodies.rectangle(700, 800, 800, 30, { isStatic: true, render: { fillStyle: 'grey' } })
        ]);

        Composite.add(engine.world, [ballA, ballB]);

        
        var ballTest = Bodies.circle(140, 75, 30);
        ballTest.render.sprite.texture = './public/logo192.png';
        //Composite.add(engine.world, ballTest);

        //const bT = React.createElement('div', {}, 'ballTest');
        //ReactDOM.render(bT, document.getElementById('BallTest'));

        /*
        let pos = ballTest.position;
        let ang = ballTest.angle;
        let deg = ang * (180/Math.PI);
        */

        // Mouse control
        var mouse = Mouse.create(render.canvas),
            mouseConstraint = MouseConstraint.create(engine, {
        	    mouse: mouse,
        	    constraint: {
        		    stiffness: 0.2,
        		    render: { visible: false }
        	    }
            });

        Composite.add(engine.world, mouseConstraint);

        const restitutes = [ 0.7, 0.5, -1, 1.618, 1, 0.5, 0.75, 0.5 ];

        Matter.Events.on(
            mouseConstraint,
            "mousedown",
            function(event) {
        	    Composite.add(
        		    engine.world,
        		    Bodies.circle(400, 50, 30, { restitution: Math.random() })
        	    );
            }
        );

        Render.run(render)
        Engine.run(engine)

        var runner = Runner.create();
        Runner.run(runner, engine);

        Render.lookAt(render, {
            min: { x: 0, y: 0 },
            max: { x: 1200, y: 1200 }
        });

        return () => {
    	    Render.stop(render);
    	    //Runner.stop(runner);
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

