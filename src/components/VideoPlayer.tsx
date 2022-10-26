import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FC, useEffect, useState } from 'react'
import { getData } from '../API/getData'
import { useParams, Link } from 'react-router-dom'

import { FaThumbsUp, FaThumbsDown, FaUserCircle } from 'react-icons/fa';

import ReactPlayer from 'react-player'

const VideoPlayer: FC = () => {

    const { videoID } = useParams();

    const[video, setVideo] = useState<any>('');
    const[expanded, setExpanded] = useState<boolean>(false);
    const[suggestedVideos, setSuggestedVideos] = useState<any[]>([]);
    const[comments, setComments] = useState<any[]>([]);
    const[commentExpanded, setCommentExpanded] = useState<string[]>([]);

    let date = new Date()
    const shortMonthName = new Intl.DateTimeFormat("en-US", { month: "short" }).format

    useEffect(() => {
        // fetch video info
        getData(`videos?part=contentDetails,snippet,statistics&id=${videoID}`)
            .then((res) => {
                setVideo(res.items[0]);
                // console.log(res.items[0]);
            }).catch((err) => {
                console.log(err);
            })

        // fetch suggested videos
        getData(`search?part=contentDetails,snippet,statistics&type=video&relatedToVideoId=${videoID}`)
            .then((res) => {
                setSuggestedVideos(res.items);
                // console.log(res.items);
            }).catch((err) => {
                console.log(err);
            })

        // fetch video comments
        getData(`commentThreads?part=snippet&videoId=${videoID}`)
        .then((res) => {
            setComments(res.items);
            console.log(res.items);
        }).catch((err) => {
            console.log(err);
        })

    }, [videoID])

    const expandComment = (commentID: string) => {
        if (!commentExpanded.some((el) => el === commentID)) {
            setCommentExpanded([...commentExpanded, commentID]);
        }
        else {
            const filteredComments = commentExpanded.filter((el) => {
                return el !== commentID;
            })

            setCommentExpanded(filteredComments);
        }
    }

  return (
    <div className='video-page'>
        <Row>
        { video &&
        <Col className="video-player">
            <ReactPlayer url={`https://www.youtube.com/watch?v=${videoID}`} playing controls muted width='100%' height='650px' className='video' />

            <div className="video-info">
                <h2>{ video.snippet.title }</h2>

                <div className="stats">
                    <p>{ Number(video.statistics.viewCount).toLocaleString() } views • { shortMonthName(new Date(video.snippet.publishedAt)) + ' ' + new Date(video.snippet.publishedAt).getDate() + ', ' + new Date(video.snippet.publishedAt).getFullYear() }</p>

                    <div className="video-actions">
                        <button><FaThumbsUp className='thumb' /> { video.statistics.likeCount.slice(0, 3) }K</button>
                        <button><FaThumbsDown className='thumb' /> Dislike</button>
                    </div>
                </div>
            </div>


            <div className="description">
                <hr />
                    <p>{ expanded ? video.snippet.description : video.snippet.description.slice(0, 200) + '...' }</p>
                    <button onClick={() => setExpanded(!expanded)}>{ expanded ? 'Shoe less' : 'Show more' }</button>
                <hr />
            </div>

            <div className='comment-section'>
            { comments && comments.map((comment) => (
                <div className='comment-list' key={ comment.id } >
                    <img src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl} alt='commentator profile' />

                    <div className="comment-content-container">
                        <div className="comment-content">
                            <h5>{ comment.snippet.topLevelComment.snippet.authorDisplayName }</h5>
                            <h5>{ commentExpanded.some((el) => el === comment.id) ? comment.snippet.topLevelComment.snippet.textOriginal : (comment.snippet.topLevelComment.snippet.textOriginal.length !== comment.snippet.topLevelComment.snippet.textOriginal.slice(0, 600).length ? comment.snippet.topLevelComment.snippet.textOriginal.slice(0, 600) + '...' : comment.snippet.topLevelComment.snippet.textOriginal.slice(0, 600))}</h5>
                            { comment.snippet.topLevelComment.snippet.textOriginal.length !== comment.snippet.topLevelComment.snippet.textOriginal.slice(0, 600).length ? <button onClick={() => expandComment(comment.id)}>{ commentExpanded.some((el) => el === comment.id) ? 'Show less' : 'Read more' }</button> : null }
                        </div>

                        <div className="rate-buttons">
                            <button><FaThumbsUp className='thumb' /> { video.statistics.likeCount.slice(0, 3) }K</button>
                            <button><FaThumbsDown className='thumb' /></button>
                        </div>
                    </div>
                </div>
            )) }
        </div>

        </Col> }

        <Col className="suggested" lg={3}>
            { suggestedVideos && suggestedVideos.map((suggestedVideo) => (
                <div className='suggested-list' key={ suggestedVideo.id.videoId }>
                    <Link to={`/video/${suggestedVideo.id.videoId}`} ><img src={suggestedVideo.snippet.thumbnails.medium.url} alt='thumbnail' /></Link>

                    <div className="video-details">
                        <h5>{ suggestedVideo.snippet.title.slice(0, 30) }</h5>
                        <h6>{ suggestedVideo.snippet.channelTitle }</h6>
                        <h6>1.8M views • { date.getFullYear() - new Date(suggestedVideo.snippet.publishTime).getFullYear() !== 0 ? date.getFullYear() - new Date(suggestedVideo.snippet.publishTime).getFullYear() : date.getMonth() - new Date(suggestedVideo.snippet.publishTime).getMonth() } { date.getFullYear() - new Date(suggestedVideo.snippet.publishTime).getFullYear() === 1 ? 'year' : date.getFullYear() - new Date(suggestedVideo.snippet.publishTime).getFullYear() === 0 ? 'months' : 'years' } ago</h6>
                    </div>
                </div>
            ))}
        </Col>
        </Row>
    </div>
  )
}

export default VideoPlayer