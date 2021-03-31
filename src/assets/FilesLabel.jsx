import React from 'react';

export default function FilesLabel (){
    return <svg viewBox="0 0 370 60" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient gradientUnits="userSpaceOnUse" cx="200.928" cy="50.152" r="150.547" id="gradient-1" gradientTransform="matrix(1.735726, 0.140755, -0.110775, 1.104474, -169.384804, -55.841722)">
                <stop offset="0" style={{ stopColor: 'rgb(255, 254, 181)' }}/>
                <stop offset="2.5" style={{ stopColor: 'rgb(191, 23, 159)' }}/>
            </radialGradient>
        </defs>
        <text fontFamily="Open Sans"
              fill="url(#gradient-1)"
              fontSize="29.2646px"
              fontWeight="300"
              stroke="rgb(0, 0, 0"
              strokeWidth="0.5px"
              x="0"
              y="60"
              style={{ fontSize: '60px' }}
        >
            Files Selected
        </text>
    </svg>
}
