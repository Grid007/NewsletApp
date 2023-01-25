import React, { Component } from "react";


export default class NewsTemp extends Component{
  

  render(){
      let {title,description,imageurl,newsUrl,author,date,source}=this.props
    return(
  <div className='container'>
    <div className='rows'>
    <div className="card md-4 mt-5">
    <span className="position-absolute top-0 translate-middle badge rounded-pill bg-primary" style={{left:'90%',zIndex:'1'}}>{source}</span>
    <img src={imageurl} class="card-img-top" alt="..."></img>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <p className="card-text"><small className="text-muted">By{!author?"unknown":author} on {new Date(date).toGMTString()}</small></p>
    <a className="btn btn-primary" href={newsUrl} target='_blank'>Read More</a>
  </div>
</div>
    </div>
  </div> 
      )
  }
}