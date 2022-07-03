import React from "react";
import { createRoot } from 'react-dom/client';

import {Navbar} from '../components/Navbar';


function Base(){
    return (
        <div>
            <Navbar/>
        </div>
    );
}


const root = createRoot(document.getElementById('appNavBar'));
root.render(<Base />);