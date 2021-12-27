import React, { Component } from 'react'

export class Newsitem extends Component {
    render() {
        let {title, description, imageUrl, newsUrl, author, date, source} = this.props;
        return (
            <div className='my-3'>
                <div className="card">
                    <img src= {imageUrl? imageUrl: "https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/13590/production/_97584297_breaking_news.png"} className="card-img-top" alt="..."/>
                    <span className="position-absolute top-0 translate-middle badge rounded-pill bg-dark" style={{left: '90%', zIndex:1 }}> {source}
                    </span>
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{description}</p>
                            <p class="card-text"><small class="text-muted">by {author ? author: "Unknown"} on {new Date(date).toGMTString()}</small></p>
                            <a  rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-dark btn-sm">Read More</a>
                        </div>
                </div>
            </div>
        )
    }
}

export default Newsitem
