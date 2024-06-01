import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';

import React,{useState} from 'react' ;

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


const App =()=>{
  const pageSize=15 ;
  const apikey='f34d6f5d49c545429dd0981f032c67e0'

  const [progress,setProgress]=useState(0);
  

    return (
      <div>
        <Router>
        <Navbar />
        <LoadingBar
        color='#f11946'
        progress={progress}
        // onLoaderFinished={() => setProgress(0)}
      />
      
        {/* <News pagesize={5} country="in" category="sports"/>  */}
        <Routes>
          <Route exact path="/sports" element = {<News setProgress={setProgress}  apikey={apikey} key='sports' pagesize = {pageSize} country = "in" category = "sports"/>}/>
          <Route exact path="/technology" element = {<News setProgress={setProgress} apikey={apikey} key='technology' pagesize = {pageSize} country = "in" category = "technology"/>}/>
          <Route exact path="/science" element = {<News setProgress={setProgress}  apikey={apikey} key='science' pagesize = {pageSize} country = "in" category = "science"/>}/>
          <Route exact path="/health" element = {<News setProgress={setProgress} apikey={apikey} key='health' pagesize = {pageSize} country = "in" category = "health"/>}/>
          <Route exact path="/entertainment" element = {<News setProgress={setProgress}  apikey={apikey} key='entertainment' pagesize = {pageSize} country = "in" category = "entertainment"/>}/>
          <Route exact path="/" element = {<News setProgress={setProgress}  apikey={apikey} key='general' pagesize = {pageSize} country = "in" category = "general"/>}/>
          <Route exact path="/business" element = {<News setProgress={setProgress} apikey={apikey} key='business' pagesize = {pageSize} country = "in" category = "business"/>}/>
          </Routes>
{/* 
          <Route path='/sports'><News pagesize={5} country="in" category="sports"/></Route>
          <Route path='/business'><News pagesize={5} country="in" category="business"/></Route>
          <Route path='/entertainment'><News pagesize={5} country="in" category="entertainment"/></Route>
          <Route path='/science'><News pagesize={5} country="in" category="science"/></Route>
          <Route path='/'><News pagesize={5} country="in" category="general"/></Route>
          <Route path='/health'><News pagesize={5} country="in" category="health"/></Route>
          <Route path='/technology'><News pagesize={5} country="in" category="technology"/></Route> */}
        
        </Router>
      </div>
    )
  }

export default App ;
