import React from 'react';

const Footer = () => (
    <footer style={{
        color: '#fff',
        textAlign: 'center',
        padding: '1.5rem 0',
        marginTop: '2rem'
    }}>
        <p>&copy; {new Date().getFullYear()} Brandon Yang Photography. All rights reserved.</p>
    </footer>
);

export default Footer;