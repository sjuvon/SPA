
/* FROM CodeSandBox (mikewesthad) */

/* Discontinued: 8 NOV2021 */

import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import Matter from "matter-js";

import { MarkGithubIcon } from '@primer/octicons-react';
import twinpeaks from './welcometotwinpeaks.jpg';


export default class Scene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  componentDidMount() {
    var Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Common = Matter.Common,
      Composite = Matter.Composite,
      Bodies = Matter.Bodies,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint,
      Svg = Matter.Svg;

    // Provide concave decomposition support library
    Common.setDecomp(require('poly-decomp'));

    var engine = Engine.create();

    var render = Render.create({
      element: this.refs.scene,
      engine: engine,
      options: {
        width: 1200,
        height: 1200,
        wireframes: false,
        background: twinpeaks
        // background: '#282c34'
        // fillStyle: "#282c34"
      }
    });

    Render.run(render);

    var runner = Runner.create();
    Runner.run(runner, engine);

    var ballA = Bodies.circle(210, 100, 30, { restitution: 0.5 });
    var ballB = Bodies.circle(110, 50, 30, { restitution: 0.75 });

    Composite.add(engine.world, [
      // walls
      Bodies.rectangle(200, 0, 600, 50, { isStatic: true }),
      Bodies.rectangle(200, 600, 600, 50, { isStatic: true, render: { fillStyle: '#282c34' } }),
      Bodies.rectangle(260, 300, 50, 600, { isStatic: true, render: { fillStyle: '#654321' } }),
      Bodies.rectangle(0, 300, 50, 600, { isStatic: true, render: { fillStyle: '#654321' } }),
      Bodies.rectangle(700, 800, 800, 30, { isStatic: true, render: { fillStyle: 'grey' } })
    ]);

    Composite.add(engine.world, [ballA, ballB]);

    var ballTest = Bodies.circle(600, 600, 30, 0); 
    ballTest.render.fillStyle = 'red';
    //ballTest.render.sprite.texture = './public/logo192.png';
    Composite.add(engine.world, ballTest);

    /*
    let ddiv = document.createElement("ddiv");
    document.body.appendChild(ddiv);
    let pos = ballTest.position;
    let ang = ballTest.angle;
    let deg = ang * (180/Math.PI);
    ddiv.style.transform = "translate(" + (pos.x - 10) + "px, " + (pos.y - 10) + "px) rotate(" + deg + "deg)";
    */

    /*
    const bT = React.createElement('div', {}, 'ballTest');

    let pos = ballTest.position;
    let ang = ballTest.angle;
    let deg = ang * (180/Math.PI);
    //bT.style.transform = "translate(" + (pos.x - 10) + "px, " + (pos.y - 10) + "px) rotate(" + deg + "deg)";
    */


    // add mouse control
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

    // Edit
    const restitutes = [ 0.7, 0.5, -1, 1.618, 1, 0.5, 0.75, 0.5 ];

    Matter.Events.on(mouseConstraint, "mousedown", function(event) {
      Composite.add(engine.world, Bodies.circle(400, 50, 30, { restitution: Math.random() } ));
    });

    Engine.run(engine);
  }

  render() {
    return <div ref="scene" />;
  }
}












/* FROM original documentation
import React from 'react';
import ReactDOM from 'react-dom';
import Matter from 'matter-js';


class Scene extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		// module aliases
		var Engine = Matter.Engine,
			Render = Matter.Render,
			Runner = Matter.Runner,
			Bodies = Matter.Bodies,
			Composite = Matter.Composite;

		// create an engine
		var engine = Engine.create();

		// create a renderer
		var render = Render.create({
			element: document.body,
			engine: engine
		});

		// create two boxes and a ground
		var boxA = Bodies.rectangle(400, 200, 80, 80);
		var boxB = Bodies.rectangle(450, 50, 80, 80);
		var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

		// add all of the bodies to the world
		Composite.add(engine.world, [boxA, boxB, ground]);

		// run the renderer
		Render.run(render);

		// create runner
		var runner = Runner.create();

		// run the engine
		Runner.run(runner, engine);
	}

	render() {
		return <div ref="scene" />;
	}

}


export default Scene;
*/

