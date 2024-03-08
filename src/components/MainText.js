import React from 'react';

const MainText = ({ children, className, fontSize, color, fontFamily, style, htmlContent }) => {
    const textStyle = {
        fontSize: fontSize || 'inherit',
        color: color || 'inherit',
        fontFamily: fontFamily || 'inherit',
        ...style,
    };

    if (htmlContent) {
        return <div className={className} style={textStyle} dangerouslySetInnerHTML={{ __html: htmlContent }} />;
    } else {
        return <p className={className} style={textStyle}>{children}</p>;
    }
};

export default MainText;