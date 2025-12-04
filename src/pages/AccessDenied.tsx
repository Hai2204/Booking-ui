import React from 'react';

const AccessDenied: React.FC = () => {
    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>Access Denied</h1>
            <p>You do not have permission to access this page.</p>
            <a href="/">Go back to home</a>
        </div>
    );
};

export default AccessDenied;