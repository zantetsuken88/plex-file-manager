import React from 'react';
import logo from './ponty.png';

export default function Logo () {
    return <svg viewBox="300 0 1600 1080" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id="A" cx="1244.322" cy="919.871" r=".925" gradientTransform="matrix(217.534363, 0, 0, -356.791992, -268905.436312, 329093.215807)" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#f9be03"/>
                <stop offset="1" stopColor="#cc7c19"/>
            </radialGradient>
            <filter id='plexShadow'>
                <feDropShadow dx='0.2' dy='0.4' stdDeviation='0.2' floodColor='#bababa'/>
            </filter>
            <filter id='xShadow'>
                <feDropShadow dx='2' dy='4' stdDeviation='2' floodColor='#bababa'/>
            </filter>
        </defs>
        <image href={logo}/>
        <path d="M 1904.197 713.022 L 1800.773 713.022 L 1697.361 891.452 L 1800.773 1069.75 L 1904.107 1069.75 L 1800.773 891.528 L 1904.197 713.139" fill="#494949" filter='url(#xShadow)'/>
        <path d="M 1583.372 713.034 L 1686.797 713.034 L 1800.915 891.437 L 1686.797 1069.828 L 1583.372 1069.828 L 1697.49 891.437 L 1583.372 713.034" fill="url(#A)"/>
        <g fill="#494949" transform="matrix(12.836601, 0, 0, 12.836601, 7331.518555, 6403.357422)" filter='url(#plexShadow)'>
            <path d="M-450.573-415.508h-16.032v-27.78h16.032v4.827h-10.13v6.1h9.425v4.826h-9.425v7.164h10.13v4.865m-35.967 0v-27.78h5.89v22.916h11.268v4.865h-17.16m-5.593-12.256c-1.87 1.584-4.526 2.375-7.97 2.375h-2.527v9.88h-5.89v-14.715l8.056.01c4.933-.057 5.19-3.08 5.19-4.125 0-.972 0-4.077-4.385-4.125h-8.862v-4.826h8.874c3.37 0 5.932.725 7.686 2.176s2.632 3.614 2.632 6.49c0 3-.934 5.276-2.803 6.86z"/>
            <path d="M-508.522-440.233h5.895v11.918h-5.895z" />
        </g>
    </svg>
}