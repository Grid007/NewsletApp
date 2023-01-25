import React, { Component } from "react";
import Navbar from './components/Navbar.jsx';
import News from './components/News.jsx';
import NewsTemp from './components/NewsTemp.jsx';
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";


export default class App extends Component{

  apikey=process.env.REACT_APP_NEWS_API

  state={
    progress:0
  }
  
setProgress=(progress)=>{
  this.setState({progress:progress})
}

  render(){
  return(
  <div>
  <Router>
          <Navbar />
          <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        
      />
          <Routes>
            <Route path='/' element={<News setProgress={this.setProgress} apikey={this.apikey} key='general' pageSize={12} country='us' category='general' />}></Route>
            <Route path='/business' element={<News setProgress={this.setProgress} apikey={this.apikey} key='business' pageSize={12} country='us' category='business' />}></Route>
            <Route path='/entertainment' element={<News setProgress={this.setProgress} apikey={this.apikey} key='entertainment' pageSize={12} country='us' category='entertainment' />}></Route>
            <Route path='/health' element={<News setProgress={this.setProgress} apikey={this.apikey} key='health' pageSize={12} country='us' category='health' />}></Route>
            <Route path='/science' element={<News setProgress={this.setProgress} apikey={this.apikey} key='science' pageSize={12} country='us' category='science' />}></Route>
            <Route path='/sports' element={<News setProgress={this.setProgress} apikey={this.apikey} key='sports' pageSize={12} country='us' category='sports' />}></Route>
            <Route path='/technology' element={<News setProgress={this.setProgress} apikey={this.apikey} key='technology' pageSize={12} country='us' category='technology' />}></Route>
          </Routes>
        </Router>
    
  </div>
  )
  }
}