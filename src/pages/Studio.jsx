import React, { useState, useEffect } from 'react'
import StudioStyles from '../CSS/StudioPage.css'
import BlankProfileImage from '../images/Blank-profile.png'
// import { ReactMediaRecorder } from 'react-media-recorder'
import VideoRecorder from 'react-video-recorder'
import steem from 'steem'
import * as IPFS from 'ipfs'
import { isOnline } from 'ipfs/src/core/components'
import axios from 'axios'
import { hiveSignerClient } from '../utils/HiveSigner'
const dragDrop = require('drag-drop')

// When user drops files on the browser, create a new torrent and start seeding it!

// const Torrent = require('create-torrent')
// const fs = require('fs')
const Studio = ({ hiveSignerClient }) => {
  const username = JSON.parse(sessionStorage.getItem('user')).user

  let form = new FormData()

  const [videoData, setVideoData] = useState(null)
  const string = 'WEBVTTwhyNot'
  const [profileImage, setProfileImage] = useState(BlankProfileImage)
  const [video, setVideo] = useState('')
  const [post, setPost] = useState(false)
  const [secondBlob, setSecondBlob] = useState('')
  const permlink = Math.random()
    .toString(36)
    .substring(2)

  useEffect(() => {
    if (sessionStorage.getItem('accessToken')) {
      if (sessionStorage.getItem('profileImage')) {
        setProfileImage(sessionStorage.getItem('profileImage'))
      }
      hiveSignerClient.setAccessToken(sessionStorage.getItem('accessToken'))
    } else {
      window.location.replace('/login')
    }
  }, [])

  useEffect(() => {}, [])
  const postVideo = async file => {
    // console.log(file)
    // if (file) {
    //   console.log('here')
    //   form.append('file', file)
    // }
    console.log(form)
    console.log(form.length, 'form')
    const resp = await axios.post(
      `http://localhost:5000/uploadVideo?videoEncodingFormats=240p,480p,720p,1080p&sprite=true`,
      form
    )
    if (resp) {
      console.log(resp.data)

      const tokenResponse = await axios.get(`http://localhost:5000/index.html`)
      if (tokenResponse) {
        console.log(tokenResponse.data)
      }
    }
  }

  useEffect(() => {
    if (video) {
      form.append('file', video, 'video.mp4')
      if (form) {
        postVideo()
      }
    }
  }, [video])

  useEffect(() => {
    if (videoData !== null) {
      postVideo(videoData)
    }
  }, [videoData])

  // const makeNewPost = () => {
  //   hiveSignerClient.comment(
  //     '',
  //     'moops',
  //     username,
  //     permlink,
  //     'WebTorrent Test',
  //     webTorrentMagnet,
  //     JSON.stringify({ tags: 'moops' }),
  //     (err, res) => {
  //       console.log(err, res)
  //     }
  //   )
  // }

  useEffect(() => {
    if (video) {
      const file = new File([video], 'testVideo', { type: 'video/mp4' })
      console.log(file)

      if (file) {
        postVideo(file)
      }
    }
  }, [video])

  return (
    <>
      {console.log(videoData, 'test')}
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
