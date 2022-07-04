import React from "react";
import { createRoot } from 'react-dom/client';

import { Navbar } from "../components/Navbar";

function Controller(){
    return (
        <div>
            <Navbar/>                        
        </div>
    );
}


const root = createRoot(document.getElementById('app'));
root.render(<Controller />);