import './css/index.css';
// import { MarkGithubIcon } from '@primer/octicons-react';

import React from 'react';
import { render } from 'react-dom';
import GitHub from './components/Links';


const App = () => (
	<div className="main">
		<GitHub />
	</div>
);


render(
	<App />,
	document.getElementById('root')
);


