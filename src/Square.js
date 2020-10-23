import React, { useRef } from 'react';
import { useCountRenders } from './useCountRenders';


// export const Square = React.memo(({ n, onClick }) => {
//     useCountRenders();

//     return (
//         <div>
//             <button onClick={onClick}>{n}</button>
//         </div>
 
//     )
// })

export const Square = React.memo(({ n, increment }) => {
    useCountRenders();

    return (
        <div>
            <button onClick={() => increment(n)}>{n}</button>
        </div>
 
    )
})