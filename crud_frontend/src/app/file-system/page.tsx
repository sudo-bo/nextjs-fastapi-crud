import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FileForm from './FileForm'


export default function FileSystem(){
    return(
        <div style={{margin: 20}}>
            <h1 >Insert a new 'file' into our db</h1>
            <FileForm/>
            {/* <a href="">See all of our files</a> */}
        </div>
    );
}