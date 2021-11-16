import './css/index.css';
// import { MarkGithubIcon } from '@primer/octicons-react';

import React from 'react';
import { render } from 'react-dom';
import GitHub from './components/Links';
import Physics from './components/physics';


const App = () => (
    <div className="main">
        <Physics />
        <div className="container">
            <GitHub />
        </div>
	</div>
);


render(
	<App />,
	document.getElementById('root')
);


