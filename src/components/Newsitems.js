import React from 'react'

// style={left:'90%',zIndex:'1'} 

// export class Newsitems extends Component {
  // render() {
    const Newsitems = (props)=>{
    let {title,description,imageurl,newsurl,author,publishedAt,source} = props ;
    return (
        <div className='my-3' >
        <div className="card" style={{color:"white",backgroundColor:"#22334c",border:"1px solid white"}} >
        <div style={{display:'flex',justifyContent:'flex-end',position:'absolute',right:'0'}}>
        <span className={`badge rounded-pill bg-success`}  >{source}</span>
        </div>
        <img src={imageurl?imageurl:"https://imgd.aeplcdn.com/642x336/n/cw/ec/173293/nissan-magnite-left-rear-three-quarter0.jpeg?isig=0&art=1&q=80"} className="card-img-top" alt="" style={{maxHeight:'200px'}} />
        <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className='text '>By {!author?"unknown":author} on {new Date(publishedAt).toGMTString()}</small></p>
            <a href={newsurl} target='_blank' className="btn btn-sm btn-primary">Read More</a>
        </div>
        </div>
      </div>
    )
  }


export default Newsitems