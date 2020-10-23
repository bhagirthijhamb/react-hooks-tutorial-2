import React, { useRef } from 'react';
import { useCountRenders } from './useCountRenders';


export const Hello = ({increment}) => {
    return (
        <div>
            <div>hello</div>
            {/* everytime they hit on the button, we want to increment */}
            <button onClick={increment}>Hello Button</button>
        </div>
 
    )
}

// In normal situation its not a problem but when we use React.memo on the Hello component, we want the component to only rerender when the increment changes

export const Hello1 = React.memo(({increment}) => {
    // now we are gonna get console.log() every time this hook is rendered/ component is rendered
    useCountRenders();

    return (
        <div>
            <button onClick={increment}>Button</button>
            {/* <button onClick={() => increment(5)}>Button</button> */}
        </div>
 
    )
})