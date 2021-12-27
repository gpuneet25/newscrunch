import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spiner from './Spiner';
import PropTypes from 'prop-types'
import Navbar from './Navbar';

export class News extends Component {

    static defaultProps ={
        country: 'in',
        pageSize: 9,
        category: 'general'
    }

    static propTypes ={
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    constructor(props){
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
        document.title= `${this.capitalizeFirstLetter(this.props.category)} - News Crunch`
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }      

    async updateNews(){
        const url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ceaebbcd59a54699a95a7d7a181750c7&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json()
        // console.log(parsedData);
        this.setState({articles: parsedData.articles, 
            totalResults: parsedData.totalResults,
            loading: false})
    }

    async componentDidMount(){
        //  run after render
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ceaebbcd59a54699a95a7d7a181750c7&page=1&pagesize=${this.props.pageSize}`;
        // this.setState({loading: true});
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // console.log(parsedData);
        // this.setState({articles: parsedData.articles, 
        //     totalResults: parsedData.totalResults,
        //     loading: false})
        this.updateNews();
    }

    handlePreviousClick = async () =>{
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ceaebbcd59a54699a95a7d7a181750c7&page=${this.state.page-1}&pagesize=${this.props.pageSize}`;
        // this.setState({loading: true});
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // console.log(parsedData);
        // this.setState({articles: parsedData.articles,
        //     page: this.state.page-1,
        //     loading: false})
        this.setState({page: this.state.page - 1});
        this.updateNews();
    }

    handleNextClick = async () =>{
        // if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ceaebbcd59a54699a95a7d7a181750c7&page=${this.state.page+1}&pagesize=${this.props.pageSize}`;
        // this.setState({loading: true});
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // console.log(parsedData);
        // this.setState({articles: parsedData.articles,
        //     page: this.state.page+1,
        //     loading: false})
        this.setState({page: this.state.page + 1});
        this.updateNews();
    }


    render() {
        // run before this.componentDidMount
        return (
            <div>
                <Navbar />
                <div className='container my-3'>
                    <h2 className='text-center' style={{margin: '30px 0px' }}>News Crunch- Top {this.capitalizeFirstLetter(this.props.category)} Headlines  </h2>
                    {this.state.loading && <Spiner />}
                    <div className='row'>
                     {!this.state.loading && this.state.articles.map((element)=>{
                            return <div className='col-md-4'  key={element.url}>
                            <Newsitem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                            </div>
                     })}
                    </div>
                    <div className='container'>
                    <div class="d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)}  type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                    </div>
                    
                    </div>
                </div>
            </div>
        )
    }
}

export default News
