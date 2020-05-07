import React, { useState, useEffect } from 'react'
import PencilIcon from '../images/pencil.png'
import BlankProfileImage from '../images/Blank-profile.png'
import { capitalizeFirstLetter } from '../utils/Functions'
import LocationIcon from '../images/network-icon.png'
import WebsiteIcon from '../images/website-icon.png'
import LocationWebsiteFlex from '../components/LocationWebsiteFlex'
import ProfileIconsImages from '../components/ProfileIconsImages'
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
      <ProfileIconsImages background={background} profileImage={profileImage} />
      <h2 style={{ textAlign: 'center', marginTop: '2rem' }}>
        {parsedMetaData ? capitalizeFirstLetter(parsedMetaData.name) : <>N/A</>}
      </h2>
      <LocationWebsiteFlex parsedMetaData={parsedMetaData} />
    </>
  )
}

export default ProfilePage
