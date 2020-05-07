import React, { useState, useEffect } from 'react'
import PencilIcon from '../images/pencil.png'
import BlankProfileImage from '../images/Blank-profile.png'

const ProfilePage = ({ hiveSignerClient, match }) => {
  const [background, setBackground] = useState('')
  const [profileImage, setProfileImage] = useState(BlankProfileImage)
  const [metaData, setMetaData] = useState(null)
  const [parsedMetaData, setParsedMetaData] = useState(null)
  useEffect(() => {
    if (sessionStorage.getItem('accessToken')) {
      if (sessionStorage.getItem('profileImage')) {
        setProfileImage(sessionStorage.getItem('profileImage'))
      }
      if (sessionStorage.getItem('backgroundImage')) {
        setBackground(sessionStorage.getItem('backgroundImage'))
      }

      hiveSignerClient.setAccessToken(sessionStorage.getItem('accessToken'))
    } else {
      window.location.replace('/login')
    }
    setMetaData(
      JSON.parse(sessionStorage.getItem('user')).account.json_metadata
    )
  }, [])
  //when the metadata is not empty, parse it and return a new object
  useEffect(() => {
    if (metaData) {
      setParsedMetaData(JSON.parse(metaData).profile)
    }
  }, [metaData])
  return (
    <>
      {console.log(parsedMetaData)}
      <img
        style={{
          position: 'relative',
          top: 0,
          left: 0,
          borderBottom: '2px solid white',
          height: '9rem',
          width: '28rem',
          objectFit: 'cover',
        }}
        src={background}
      />
      <i
        class="fas fa-ellipsis-v"
        aria-hidden="true"
        style={{
          marginTop: '-8rem',
          position: 'absolute',
          left: '330px',
        }}
      ></i>
      <img
        style={{
          marginTop: '-2rem',
          position: 'absolute',
          left: '345px',
          height: '1rem',
        }}
        src={PencilIcon}
      />
      <img
        style={{
          position: 'absolute',
          top: '90px',
          left: '150px',
          borderRadius: '50%',
          height: '5rem',
          border: '2px solid white',
        }}
        src={profileImage}
      />
      <h2 style={{ textAlign: 'center', marginTop: '2rem' }}>
        {parsedMetaData && parsedMetaData.name}
      </h2>
    </>
  )
}

export default ProfilePage
