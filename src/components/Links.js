/* 12 Nov 2021 */
import React, { useEffect, useRef } from 'react';
import gittyKitty from './../img/gittyKitty.png';
//import gittyKitty from './gittyKitty.png';


export default function GitHub(props) {
	var gitHubProps = {...props};

    gitHubProps.href = "https://github.com/sjuvon";
    gitHubProps.target = "_blank";
    gitHubProps.imgsrc = gittyKitty;
    gitHubProps.imgalt = "GitHub";

    return(
    	<a href={gitHubProps.href} target={gitHubProps.target}>
    	    <img src={gitHubProps.imgsrc} alt={gitHubProps.imgalt} />
    	</a>
    )
}