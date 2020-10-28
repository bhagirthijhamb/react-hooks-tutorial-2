import { useState, useCallback, useEffect } from 'react';
import './App.css';
import { Hello , Hello1 } from './Hello';
import { Square } from './Square';
import List from './List';

function App() {

  // useCallback Hook
  // useful when you want to prevent a function from being created on every single render. This is mainly useful when we useMemo hook in React
  // We create a state for a simple counter
  // We pass down a function to Hello compoenent here
  // we will use this funciton passed down in the Hello compoennt

  // In normal situation its not a problem but when we use React.memo on the Hello component, we want the component to only rerender when the increment changes
  const [count, setCount] = useState(0);

  // So every time we increment count, the console.log() from useCountRenders() has increased count
  // but we can improve this because the function being passed (lambda funciton) to the Hello1 component is not changing. \
  // the only thing changing here is the count variable
  // So how can ve prevent this. This is where the cal back comes in 

  // memo just basically comapres the props and if the props have changed its gonna rerender the component
  // By default react will always rerender the component (Hello.js) if the parent is renrendering (App.js)
  // When we add React.memo its gonna check and only rerender when the props (increment) wil change

  // How useCallback works - whenever the count and setCount changes, the function inside useCallback() will be recreated and will be put in increment variable
  const [count1, setCount1] = useState(0);
  
  // So now increment is only changing when these two values - count and setCount (either of these) are changed
  // if we click the button the count increments and we see the render with increased number logged tot he console.
  // the reason is we are still depending on the count right not
  const increment = useCallback(() => {
    setCount1(count1 + 1);
  }, [count1, setCount1])

  // we can eliminate this dependency by usign updater function that is availabel to us when we use setCount in useCallback()
  const increment1 = useCallback(() => {
    setCount1(c =>  c + 1);
  }, [setCount1])
  // So now we see the count increment function updating but the render in the console is not happening because the function is never changing 
  // this is where useCalback shines. When we want to prevent function from changing the value and a lot of time we want to prevent that from happening is when we are using React.memo because its gonna check the reference of semething

  // The other case when we may want to use useCallback if when we use useEffect and you have some logic and you depend on this increment function.
  // so we dont want this increment funciton to be changing all the time or else useEffect will keep firing off.

  useEffect(() => {
  
  }, [increment])

  // we can add parameters to the function inside useCallback()
  // const increment1 = useCallback((n) => {
  //   setCount1(c =>  c + n);
  // }, [setCount1])

  //--------------------------------------------------------------------------------------------------------------
  // Practical eg - looping over an array

   const [count2, setCount2] = useState(0);
  const favouriteNums = [7, 21, 37];
  // lets say we llop over these numbers 

    const increment2 = useCallback((n) => {
      setCount2(c =>  c + n);
    }, [setCount2])
    
    // so with this its renderign each one on those every time we click on the buttons.
    // So we pass  the increment down and we dont have the onclick logic right here. We put the onlcik logic inside of Square
    // so now its not logging everytime we click the button
  //************************************************************************************** */

    const [number, setNumber] = useState(1);
    const [dark, setDark] = useState(false)

    // const getItems = () => {
    //   return [number, number + 1, number + 2]
    // }

    // useCalback has exact same signature as useMemo(). 
    // It takes second argument as dependency array which is just number in this case
    // This stops 'updating items' being printed to the console when we click chnage theme button
    // because the useCallback only recreated our getItems function when the number chnages and not when the 'dark' variable chnages
    // This code looks similar to useMemo() hook but the diff is with useMemo takes a function and it returns to you the return value of that function.
    // But useCallback takkes a function and that is what it returns. This allows us to pass parameters to this function (incrementor)
    // we cant do this with useMemo because useMemo doesnt return a function.
    // The only reason we would use useCallback is when we care about referential equality (same as useMemo usecase).
    const getItems = useCallback((incrementer) => {
      return [number + incrementer, number + 1 + incrementer, number + 2 + incrementer]
    }, [number])

    const theme = {
      backgroundColor: dark ? '#333' : '#fff',
      color: dark ? '#fff' : '#333'
    } 


  return (
    <div className="App">
      <h1>Hello World</h1>
      {/* Normaly we would create a lambda function and pass it like this */}
      {/* So like this we create a finction on every render */}
      {/* We display the count here like this */}
      <div>count: {count}</div>
      {/* Everytime the app is rerendered, the () => setCount(count + 1) will be recreated */}
      <Hello increment={() => setCount(count + 1)}/>
      <hr/>
      {/* with React.memo */}
      <div>count: {count1}</div>
      {/* <Hello1 increment={() => setCount1(count1 + 1)}/> */}

      {/* after updated useCallback */}
      {/* <Hello1 increment={increment}/> */}
      <Hello1 increment={increment1}/>
      <hr/>

      {/* ------------------------------------------------------------------------------------------------------------ */}

      {/* when i clock on the square i want to incrementit byt the favourite number (n) */}
      {/* We are using a lambda here but if we want to memoize the Sqaure thenthe things gets messed up or when the function (lanbda) gets changed on every single render */}
      <div>count: {count2}</div>
      {favouriteNums.map(n => {
        return (
          // <Square onClick={() => increment2(n)} n={n} key={n}/>
          <Square increment={increment2}  n={n} key={n}/>
        )
      })}
      <hr/>
      {/* *************************************************************************** */}
      <div style={theme}>
        <input type="number" value={number} onChange={e => setNumber(parseInt(e.target.value))} />
        <button onClick={() => setDark(prevDark => !prevDark)}>Toggle Theme</button>

        {/*  we pass getItems function to the List component */}
        <List getItems={getItems} />
      </div>
    </div>
  );
}

export default App;
