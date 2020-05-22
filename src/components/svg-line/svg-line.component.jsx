import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { select, scaleTime, scaleLinear, extent, min, max, line, curveCardinal } from 'd3';
import { colors } from 'theme';

const SVGLine = ({
  field,
  data: lineData,
  width: configuredWidth,
  height: configuredHeight,
  margin,
  color
}) => {
  let element = React.createRef();

  useEffect(() => {
    select(`svg#${field.toLowerCase()}`).remove();
    const width = configuredWidth - margin.left - margin.right;
    const height = configuredHeight - margin.top - margin.bottom;
    const svgdocument = select(element).append('svg').attr('id', `${field.toLowerCase()}`);

    const svg = svgdocument
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // define x and y scales
    let x = scaleTime().range([0, width]);
    let y = scaleLinear().range([height, 0]);

    // set x and y scale domains
    x.domain(
      extent(lineData, function (d) {
        return new Date(d.Date);
      })
    );
    y.domain([
      min(lineData, function (d) {
        return d.Confirmed;
      }),
      max(lineData, function (d) {
        return d.Confirmed;
      })
    ]);

    // draw lines
    let dataLine = line()
      .curve(curveCardinal)
      .defined(function (d) {
        return d[field]; // return true if Confirmed ket is defined or not equal to null
      })
      .x(function (d) {
        return x(new Date(d.Date));
      })
      .y(function (d) {
        return y(d[field]);
      });

    svg
      .append('path')
      .datum(lineData)
      .attr('fill', 'none')
      .attr('stroke', colors[field])
      .attr('stroke-width', 2)
      .attr('d', dataLine);
  }, [lineData, configuredWidth, configuredHeight, margin, element, field, color]);

  return (
    <div
      className="element"
      ref={(node) => {
        element = node;
      }}
    ></div>
  );
};

SVGLine.propTypes = {
  field: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  margin: PropTypes.object.isRequired,
  color: PropTypes.string
};

export default SVGLine;
