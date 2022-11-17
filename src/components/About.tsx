import { FC, useState } from 'react'
import { shortMonthName } from '../shortMonth';
import { FaRegFlag } from 'react-icons/fa';

type IProps = {
    channel: any
}

const About: FC<IProps> = ({ channel }) => {

    const[poke, setPoke] = useState<string>('');

    const pokeUser = () => {
        setPoke(`You just poked ${channel?.snippet?.title}`);

        window.setTimeout(() => setPoke(''), 3000)
    }

  return (
        <div className='About'>
                <div className="channel-description">
                    <h5>Description</h5>
                    <h6>{ channel?.brandingSettings?.channel?.description }</h6>
                    <hr />
                </div>

                <div className="channel-statistics-container">
                    <h5>Stats</h5>
                    <hr />

                    <div className="channel-statistics">
                        { channel?.snippet?.publishedAt && <h6>Joined { shortMonthName(new Date(channel?.snippet?.publishedAt)) + ' ' + new Date(channel?.snippet?.publishedAt).getDay() + ', ' +  new Date(channel?.snippet?.publishedAt).getFullYear()}</h6> }
                        <hr />
                        <h6>{ Number(channel?.statistics?.viewCount).toLocaleString() } Views</h6>
                        <hr />

                        <button onClick={pokeUser} className={poke !== '' ? 'btn-poked' : ''}><FaRegFlag /></button>
                        { poke !== '' ? <h5 className='poke-msg'>{ poke }</h5> : null }
                    </div>
                </div>
            </div>
  )
}

export default About