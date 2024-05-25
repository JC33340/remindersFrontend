import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [message,setMessage] = React.useState("")

  React.useEffect(()=>{
    fetch('http://127.0.0.1:8000/backend/hello-world/')
    .then(res=>res.json())
    .then(data=>setMessage(data))
  },[])

  return (
    <div>{message}</div>
  );
}

export default App;
