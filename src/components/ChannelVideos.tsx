import { FC, useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row';
import Video from './Video';
import { getData } from '../API/getData'

type IProps = {
  channelId: string
}

const ChannelVideos: FC<IProps> = ({ channelId }) => {

  const[channelVideos, setChannelVideos] = useState<any>();

  useEffect(() => {
    getData(`search?part=snippet,id&channelId=${channelId}&order=date&type=video`)
    .then((res) => {
        setChannelVideos(res);
        console.log(res);
    }).catch((err) => {
        console.log(err);
    })
  }, [channelId])

  return (
    <Row className='uploads'>
        { channelVideos?.items && channelVideos?.items.map((channelVideo: any) => (
            <Video video={channelVideo} />
        )) }
    </Row>
  )
}

export default ChannelVideos