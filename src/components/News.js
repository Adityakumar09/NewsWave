import React, { useEffect, useState } from 'react'
import Newsitems from './Newsitems'
import Spinner from './Spinner'
import propTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'
import './News.css'

const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    // articles = [
    //     {
    //         "source": {
    //             "id": "abc-news-au",
    //             "name": "ABC News (AU)"
    //         },
    //         "author": "Dean Bilton",
    //         "title": "West Indies bring light to Test cricket on a day of impossible joy as Australia is beaten at the Gabba",
    //         "description": "With a win for the ages at the Gabba the West Indies bring precious life to Australia's summer, their own hopes for a prosperous future and the health of Test cricket in its entirety.",
    //         "url": "https://www.abc.net.au/news/2024-01-28/west-indies-bring-light-to-test-cricket-australia-gabba-day-four/103398786",
    //         "urlToImage": "https://live-production.wcms.abc-cdn.net.au/7044721d8c5c9c05aee4e2eaeeee4284?impolicy=wcms_crop_resize&cropH=2710&cropW=4818&xPos=0&yPos=344&width=862&height=485",
    //         "publishedAt": "2024-01-28T08:41:10Z",
    //         "content": "None of this was supposed to happen. None of it seemed even remotely possible.\r\nThey weren't even meant to be playing for one, such was the biblical downpour that smashed Brisbane for almost the enti… [+5637 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": "espn-cric-info",
    //             "name": "ESPN Cric Info"
    //         },
    //         "author": null,
    //         "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
    //         "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
    //         "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
    //         "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
    //         "publishedAt": "2020-04-27T11:41:47Z",
    //         "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": "espn-cric-info",
    //             "name": "ESPN Cric Info"
    //         },
    //         "author": null,
    //         "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
    //         "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
    //         "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
    //         "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
    //         "publishedAt": "2020-03-30T15:26:05Z",
    //         "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
    //     }
    // ]


    // constructor(props) {
    //     super(props);
    //     console.log("Hello ")
    // }

    const updatenews = async () => {
        props.setProgress(10);
        // console.log("cdm");
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pagesize=${props.pagesize}`;
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(30);
        let parseddata = await data.json();
        props.setProgress(70);
        // console.log(data);
        setArticles(parseddata.articles);
        setTotalResults(parseddata.totalResults);
        setLoading(false);
        // setState({
        //     articles: parseddata.articles,
        //     totalResults: parseddata.totalResults,
        //     loading: false
        // });
        props.setProgress(100);
    }

    useEffect(() => {
    document.title = `${props.category} - NewsWave`;

        updatenews();
    }, [])



    // const handlenext = async () => {
    //     setPage(page + 1);
    //     updatenews()
    // }


    // const handleprev = async () => {
        
    //     setPage(page - 1);
    //     updatenews()
    // }

    
    const fetchMoreData = async () => {
        
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pagesize=${props.pagesize}`;
        setPage(page + 1)
        // setState({ loading: true });
        let data = await fetch(url);
        let parseddata = await data.json();
        // console.log(data);
        setArticles(articles.concat(parseddata.articles))
        setTotalResults(parseddata.totalResults)

    };

    return (
        <>
            <h2 className="text-center " style={{margin:"20px 0px",marginTop:"120px"}}>NewsWave - Top headlines</h2>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                // style={{ display: 'flex', flexDirection: 'column-reverse' }} 
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className='container boxx my-3'>
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <Newsitems title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageurl={element.urlToImage} newsurl={element.url}
                                    author={element.author} publishedAt={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
            {/* <div className="container d-flex justify-content-between">
                    <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={handleprev}>Previous</button>
                    <button type="button" disabled={page + 1 > Math.ceil(totalResults / props.pagesize)} className="btn btn-dark" onClick={handlenext}>Next</button>

                </div> */}
        </>
    )
}

News.defaultProps = {
    country: "in",
    pagesize: 8,
    category: "general"
}
News.propTypes = {
    country: propTypes.string,
    pagesize: propTypes.number,
    category: propTypes.string
}
export default News