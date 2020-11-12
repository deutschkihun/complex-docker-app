import React ,{useState,useEffect} from 'react'
import logo from './logo.svg';
import axios from 'axios'
import './App.css';

function App() {

  const [lists, setLists] = useState([])
  const [value, setValue] = useState("")

  useEffect(() => {
    axios.get('/api/values')
      .then(response => {
        console.log('response',response)
        setLists(response.data)
      })
  }, [])

  const changeHandler = (event) => {
    setValue(event.currentTarget.value)
  }

  const submitHandler = (event) => {
    event.preventDefault();

    axios.post('/api/value', {value:value})
      .then(response => {
        if(response.data.success) {
            setLists([...lists,response.data])
            setValue("")
        }else{
          alert('fail')
        }
      })

  }
  

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <form onSubmit={submitHandler}> 
            <input type="text"
            placeholder="입력해주세요"
            onChange={changeHandler}
            value={value}/>
            <button type="submit">확인</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
