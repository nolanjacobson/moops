import React, { useState, useEffect } from 'react'
import StudioStyles from '../CSS/StudioPage.css'

import BlankProfileImage from '../images/Blank-profile.png'
// import { ReactMediaRecorder } from 'react-media-recorder'
import VideoRecorder from 'react-video-recorder'
import steem from 'steem'

const createTorrent = require('create-torrent')
const fs = require('fs')

const Studio = props => {
  const [testBool, setTestBool] = useState(false)

  const [profileImage, setProfileImage] = useState(BlankProfileImage)
  const [username, setUsername] = useState('')
  const [video, setVideo] = useState('')
  const [post, setPost] = useState(false)
  const [secondBlob, setSecondBlob] = useState('')
  const [webTorrentMagnet, setWebTorrentMagnet] = useState('')
  const permlink = Math.random()
    .toString(36)
    .substring(2)
  useEffect(() => {
    props.client.setAccessToken(sessionStorage.getItem('accessToken'))
    console.log(props.client.accessToken)
    setTestBool(true)
    var query = {
      tag: 'moops', // This tag is used to filter the results by a specific post tag
      limit: 5, // This limit allows us to limit the overall results returned to 5
    }
    steem.api.getDiscussionsByTrending(query, function(err, result) {
      console.log(err, result)
    })
  }, [])
  const makeNewPost = () => {
    props.client.comment(
      '',
      'moops',
      username,
      permlink,
      'WebTorrent Test',
      webTorrentMagnet,
      JSON.stringify({ tags: 'moops' }),
      (err, res) => {
        console.log(err, res)
      }
    )
  }
  useEffect(() => {
    // video.name = 'test'
    if (post && video !== '') {
      // setVideo(...video, (video.name = 'newName'))
      // video.name = 'newName'
      console.log(video)
      // let buf = new Buffer(video)
      // buf.name = 'Some file name'
      // client.seed(buf, torrent => {
      //   console.log('Client is seeding ' + torrent.magnetURI)
      // })
      // props.webTorrentClient.createTorrent(video, torrent => {
      //   console.log('test', torrent)
      // })
      createTorrent(video, (err, torrent1) => {
        if (!err) {
          // `torrent` is a Buffer with the contents of the new .torrent file
          console.log(torrent1)
          props.webTorrentClient.seed(torrent1, torrent => {
            setWebTorrentMagnet(torrent.magnetURI)
            console.log(webTorrentMagnet)
            // props.webTorrentClient.on('torrent', () => {
            //   makeNewPost()
            // })
          })
        }
      })
    }
    // setWebTorrentMagnet(torrent.magnetURI)
    // props.webTorrentClient.seed(video, torrent => {
    //   console.log('test', torrent.magnetURI)
    //   setWebTorrentMagnet(torrent.magnetURI)

    // })
  }, [post])

  useEffect(() => {
    if (testBool) {
      props.client.me((err, res) => {
        let validImage = JSON.parse(res.account.json_metadata)

        if (!err && validImage.profile.profile_image !== '') {
          setProfileImage(validImage.profile.profile_image)
          setUsername(res.user)
        }
      })
    }
  }, [testBool])
  return (
    <>
      <span>
        <img className="studioProfilePicture" src={profileImage} />
        <i class="fas fa-ellipsis-v" aria-hidden="true"></i>
      </span>
      <div className="camera">
        <VideoRecorder
          isOnInitially={true}
          showReplayControls={true}
          replayVideoAutoplayAndLoopOff={true}
          timeLimit={7000}
          onRecordingComplete={videoBlob => {
            setVideo(videoBlob)
            console.log('test1', videoBlob)
          }}
        />
      </div>
      <button onClick={() => setPost(true)}>Post</button>
    </>
  )
}

export default Studio
