import React, { useEffect, useState } from 'react';

export default function List({ getItems }){
    // state for actual items
    const [items, setItems] = useState([]);

    // useeffect gets called everytime getItems function changes
    // So everytime we update getItems function, it recalls this useEffect to get new items
    // Logging out that we are updating items
    // when we cahge number , we see printed to the conole
    // but when we click change theme, it again prints tot he console.
    // This can be fixed with useCallback hook
    // This happens because the getItems function in App.js component gets recreated every single time we re-render our App component (every time we chnage the number or click chnage theme).
    // Since its re-created over and over, when its passed to List, its a new function even if the actual number didnt change
    // So we useCallback hook here. Just like useMemo() its not going to re run the code inside of it unless certain parameter is chnaged.
    // That means every single time we call App component, the getItems() funciton we only update when it needs to ie when number chnages
    useEffect(() => {
        setItems(getItems(5));
        console.log('Updating Items');
    }, [getItems])

    return items.map(item => <div key={item}>{item}</div>)
}