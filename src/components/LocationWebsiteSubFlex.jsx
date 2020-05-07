import React from 'react'

const LocationWebsiteSubFlex = ({
  parsedMetaData,
  parsedMetaDataKey,
  icon,
}) => {
  return (
    <>
      <img
        style={{
          height: '1rem',
          marginRight: '.5rem',
          marginLeft: '.5rem',
        }}
        src={icon}
      />
      <span
        className="location-website-text"
        style={{
          color: 'white',
          fontSize: '.75rem',
        }}
      >
        {parsedMetaData && !parsedMetaDataKey ? <>N/A</> : parsedMetaDataKey}
      </span>
    </>
  )
}

export default LocationWebsiteSubFlex
