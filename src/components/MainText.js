import React from 'react';

const MainText = ({ children, className,fontSize, color, fontFamily, style, }) => {
    const textStyle = {
        fontSize: fontSize || 'inherit',
        color: color || 'inherit',
        fontFamily: fontFamily || 'inherit',
        ...style,
    };

    return <p className={className} style={textStyle}>{children}</p>;
};

export default MainText;