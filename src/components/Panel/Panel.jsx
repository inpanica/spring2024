import React from 'react';



export default React.forwardRef(({ index, children }, ref) => (
    <div ref={ref}>{children}</div>
));