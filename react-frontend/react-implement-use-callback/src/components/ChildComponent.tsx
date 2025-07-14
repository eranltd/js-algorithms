import React from 'react';

const ChildComponent: React.FC<{ onClick: () => void }> = ({ onClick }) => {
    console.log('ChildComponent rendered');
    return (
        <div>
            <button onClick={onClick}>Click Me</button>
        </div>
    );
};

export default React.memo(ChildComponent); // Using React.memo to prevent unnecessary re-renders
// This will ensure that ChildComponent only re-renders when its props change, which is useful for performance optimization.
// In this case, since the onClick function is stable (not recreated on every render), the ChildComponent will not re-render unnecessarily. 