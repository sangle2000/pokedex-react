import React from "react";

// Update Wrapper to correctly type the wrapped component
const Wrapper = (Component: React.ComponentType) => {
    const WrappedComponent: React.FC = () => {
        return (
            <div className="content">
                <Component />
            </div>
        );
    };

    return WrappedComponent;
};

export default Wrapper;
