import React, { Component } from "react";
import NewsTemp from './NewsTemp.jsx';
import Spinner from './Spinner.jsx';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component"

export default class News extends Component{
  

   capitalizeFirstLetter=(string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);
  }


  static defaultProps={
      country:'in',
      pageSize:8,
      category:'general'
  }

  static propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string
  }

  
 constructor(props){
    super(props)
   this.state={
     articles:[],
     loading:false,
	 page:1,
   totalResults:0
   }
   document.title=`${this.capitalizeFirstLetter(this.props.category)} - NewsMonke`;
  }

 

  async updateNews(){
    this.props.setProgress(0);
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=njhj&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data= await fetch(url);
    this.setState({loading:true});
    let parsedData= await data.json();
    console.log(parsedData)
    this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults,loading:false})
    this.props.setProgress(100);
  }

  async componentDidMount(){
    this.updateNews();
  }
  
  nextHandler= async ()=>{

	  if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)))
		  {
	  
    
    this.setState({page:this.state.page + 1})
    this.updateNews();
  }

  }
  
  
   prevHandler = async ()=>{
	  
    
    this.setState({page:this.state.page - 1})
    this.updateNews();
  }

  fetchMoreData=async()=>{
    this.setState({page:this.state.page + 1})
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=af8902c2d46c4986b71c7cd459152744&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data= await fetch(url);
    this.setState({loading:true});
    let parsedData= await data.json();
    console.log(parsedData)
    this.setState({articles:this.state.articles.concat(parsedData.articles),totalResults:parsedData.totalResults,loading:false})

  }
  
  render(){
  return(
    <>
  
    <h1 className='text-center'>NewsMonke - Headlines</h1>
    {this.state.loading && <Spinner />}
    
    <InfiniteScroll
      dataLength={this.state.articles.length}
      next={this.fetchMoreData}
      hasMore={this.state.articles.length!==this.state.totalResults}
      loader={<Spinner />}
      >
      <div className="container">
    <div className='row'>
           { this.state.articles.map((element)=>{
             return <div className='col-md-4'key={element.url}>
             <NewsTemp  title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageurl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
              </div>
               
            
})}
    </div>
    </div>

  </InfiniteScroll>
	</>
	
  ) 
  }
}

