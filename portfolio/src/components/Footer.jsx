import React from 'react';

const Footer = () => (
    <footer style={{
        backgroundColor: '#FAF9F8',
        color: '#000',
        textAlign: 'center',
        padding: '1.5rem 0',
        fontFamily: 'playfair display, serif'
    }}>
        <p>&copy; {new Date().getFullYear()} Brandon Yang Photography. All rights reserved.</p>
    </footer>
);

export default Footer;