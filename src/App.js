import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import data from './data'
import Tours from './Tours'

// 
// Can be used to get refresh buttom to work
//const url = 'https://course-api.com/react-tours-project'

function App() {

  const [loading,setLoading] = useState(true);
  const[tours,setTours]= useState(data);

  const removeTour =(id) => {
    const newTours = tours.filter((tour)=> tour.id !== id );
    setTours(newTours);
  }
 
  const fetchTours = async ()=>
  {
    setLoading(true);

    try {
       const response = await fetch(data);
    const tours = await response.json();
    setLoading(false);
    setTours(tours);
    } catch (error) {
      setLoading(false);
      console.log(error);
      
    }

  };

  useEffect(()=>
  {
    fetchTours();

  },[]);


  if(loading){
    return( 
      <main>
  <Loading/>
    </main>);
  }
  if(tours.length===0){
    return <main>
    <div className='title'>
    <h2>No Tours Left :(</h2>
    <button onClick={fetchTours}>refresh</button>
    </div>
    </main>

  }
  return( <main>
  <Tours  tours ={tours} removeTour={removeTour}/> 
  </main>);
}

export default App;
