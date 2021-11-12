
/* 10 Nov 2021 */

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
            }
        });

        Composite.add(engine.world, [
            // walls
            Bodies.rectangle(200, 0, 600, 50, { isStatic: true }),
            Bodies.rectangle(200, 600, 600, 50, { isStatic: true, render: { fillStyle: '#282c34' } }),
            Bodies.rectangle(260, 300, 50, 600, { isStatic: true, render: { fillStyle: '#654321' } }),
            Bodies.rectangle(0, 300, 50, 600, { isStatic: true, render: { fillStyle: '#654321' } }),
            Bodies.rectangle(700, 800, 800, 30, { isStatic: true, render: { fillStyle: 'grey' } })
        ]);

        var ballTest = Bodies.circle(600, 600, 30, 0); 
        ballTest.render.fillStyle = 'red';
        //ballTest.render.sprite.texture = './public/logo192.png';
        Composite.add(engine.world, ballTest);

        Render.run(render);
        Engine.run(engine);

        var runner = Runner.create();
        Runner.run(runner, engine);

        Render.lookAt(render, {
            min: { x: 0, y: 0 },
            max: { x: 1200 , y: 1200 }
        });
    }

    render() {
        return <div ref='scene' />;
    }
}


