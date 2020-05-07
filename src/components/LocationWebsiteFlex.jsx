import React from 'react'
import LocationWebsiteSubFlex from './LocationWebsiteSubFlex'
import WebsiteIcon from '../images/website-icon.png'
import LocationIcon from '../images/network-icon.png'
const LocationWebsiteFlex = ({ parsedMetaData }) => {
  return (
    <>
      {' '}
      <div
        className="location-website-flex"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <LocationWebsiteSubFlex
          parsedMetaData={parsedMetaData}
          parsedMetaDataKey={parsedMetaData && parsedMetaData.location}
          icon={LocationIcon}
        />
        <LocationWebsiteSubFlex
          parsedMetaData={parsedMetaData}
          parsedMetaDataKey={parsedMetaData && parsedMetaData.website}
          icon={WebsiteIcon}
        />
      </div>
    </>
  )
}

export default LocationWebsiteFlex
