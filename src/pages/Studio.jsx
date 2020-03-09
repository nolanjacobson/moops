import React, { useState, useEffect } from 'react'
import StudioStyles from '../CSS/StudioPage.css'
import BlankProfileImage from '../images/Blank-profile.png'
// import { ReactMediaRecorder } from 'react-media-recorder'
import VideoRecorder from 'react-video-recorder'
import steem from 'steem'
import * as IPFS from 'ipfs'
import { isOnline } from 'ipfs/src/core/components'
import axios from 'axios'
const dragDrop = require('drag-drop')

// When user drops files on the browser, create a new torrent and start seeding it!

// const Torrent = require('create-torrent')
// const fs = require('fs')
const Studio = props => {
  const [testBool, setTestBool] = useState(false)
  const [videoData, setVideoData] = useState(null)
  const string = 'WEBVTTwhyNot'
  const [profileImage, setProfileImage] = useState(BlankProfileImage)
  const [username, setUsername] = useState('')
  const [video, setVideo] = useState('')
  const [post, setPost] = useState(false)
  const [secondBlob, setSecondBlob] = useState('')
  const [webTorrentMagnet, setWebTorrentMagnet] = useState('')
  const permlink = Math.random()
    .toString(36)
    .substring(2)
  const [data, setData] = useState('')
 
  // const returnDataFromIPFS = async () => {
  //   const node = await IPFS.create()
  //   const version = await node.version()

  //   console.log('Version:', version.version)
  //   const filesAdded = await node.add('hello world 1')
  //   // console.log('Added file:', filesAdded[0].path, filesAdded[0].hash)
  //   // 'hash', known as CID, is a string uniquely addressing the data
  //   // and can be used to get it again. 'files' is an array because
  //   // 'add' supports multiple additions, but we only added one entry
  //   setData(filesAdded)
  // }

  // useEffect(() => {
  //   returnDataFromIPFS()
  // }, [])

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


  useEffect(() => {}, [])
  const postVideo = async file => {
    console.log(file)
    let form = new FormData()
    form.append('file', file)
    console.log(form)
    const resp = await axios.post(
      `http://localhost:5000/uploadVideo?videoEncodingFormats=240p,480p,720p,1080p&sprite=true`,
      form
    )

    const tokenResponse = await axios.get(
      `http://localhost:5000/getProgressByToken/${resp.data.token}`
    )
    console.log(tokenResponse.data)
    console.log(resp.data)
  }

  useEffect(() => {
    if (video) {
      postVideo(video)
    }
  }, [video])


  useEffect(() => {
    if (videoData !== null) {
      postVideo(videoData)
    }
  }, [videoData])

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
    if (video) {
      const file = new File([video], 'testVideo', { type: 'video/mp4' })
      console.log(file)

      if (file) {
        postVideo(file)
      }
    }
  }, [video])
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
      {console.log(videoData)}
      <span>
        <img className="studioProfilePicture" src={profileImage} />
        <i class="fas fa-ellipsis-v" aria-hidden="true"></i>
      </span>
      <div className="camera">
        <VideoRecorder
          onRecordingComplete={videoBlob => {
            setVideo(videoBlob)
            console.log('test1', videoBlob)
          }}
        />
      </div>
      <button onClick={() => setPost(true)}>Post</button>
      <input
        id="upload"
        type="file"
        name="upload"
        multiple
        onChange={e => setVideo(e.target.value)}
      ></input>
    </>
  )
}

export default Studio
