import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { fallbackSvg } from './fallbackSvg'
import { PARTY_COLORS } from './partyColors'

const mapshaper = require('mapshaper-with-patch')

const useStyles = makeStyles(theme => ({
  customCardContent: {
    padding: 5,
    paddingBottom: '5px!important',
    backgroundColor: '#f7f7f7'
  },
  customHeadingText: {
    color: '#41aaa8',
    fontStyle: 'italic',
    fontWeight: 'bold'
  },
  customTextFormatting: {
    textTransform: 'capitalize'
  },
  customRidingShape: {
    width: '50%',
    maxHeight: '100%'
  }
}))

export function isValidColor (color) {
  return /^([0-9A-F]{3}){1,2}$/i.test(color.substr(3))
}

export function addColorFillToRidingShape (svg, color) {
  if (!isValidColor(color)) {
    console.error('invalid color format, using fallback color')
    color = '%237766E4'
  }
  const position = svg.indexOf('<path') + 5
  const partyColor = ` fill="${color}"`
  const coloredSvg = [
    svg.slice(0, position),
    partyColor,
    svg.slice(position)
  ].join('')
  return coloredSvg
}

export default function RidingShape (props) {
  const classes = useStyles()
  const [svgData, setSvgData] = React.useState('')

  useEffect(() => {
    if (props.ridingShapeCoordinates && props.politicalParty) {
      // get color for given party
      const thisPartyColor = PARTY_COLORS[props.politicalParty]

      // convert geoJSON data to svg shape and set fill color to the party color
      const input = props.ridingShapeCoordinates
      const cmd = '-i point.json -o svg-data=* format=SVG'
      mapshaper.applyCommands(cmd, { 'point.json': input }, function (err, out) {
        if (err) {
          console.error(err)
        }
        let svg = ''
        try {
          svg = out['point.svg']
        } catch (err) {
          console.error(
            'Problematic GeoJSON file, unable to convert to SVG format'
          )
          svg = fallbackSvg
        }

        const coloredSvgTestable = addColorFillToRidingShape(
          svg,
          thisPartyColor
        )
        setSvgData(coloredSvgTestable)
      })
    }
  }, [props.ridingShapeCoordinates, props.politicalParty])

  return (
    <img
      src={`data:image/svg+xml;utf8,${svgData}`}
      alt='riding shape'
      className={classes.customRidingShape}
    />
  )
}
