import React, {useState, useEffect} from 'react';
import './Menubar.css';

const Menubar = ()=>{
    return(
        <div className='editor-menubar'>
            <div className='editor-menubar-left'></div>
            <div className='editor-menubar-right'>
                <button className='submit-btn' disabled='disabled'>
                    SEND
                </button>
            </div>
        </div>
    )
}
export default Menubar;