import React from 'react'
import { connect } from 'react-redux'

import Value from '../types/Value'
import SensorType from '../types/SensorType'

import * as d3 from 'd3'

import './Sensor.css'

class Sensor extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('Component DID MOUNT!')
  }

  componentWillUnmount(){
    console.log('Will be suppressed');
  }

  componentDidUpdate(){
    console.log('UPDATED');

    if(! this.props.noSensor) {
      if(this.props.type === SensorType.TEMPERATURE || this.props.type === SensorType.PERCENT){

        var m = [10, 80, 10, 80]; // margins
        var w = 800 - m[1] - m[3]; // width
        var h = 200 - m[0] - m[2]; // height

        d3.selectAll("svg > *").remove();

        var data = this.props.data;
        var x = d3.scaleLinear().domain([0, data.length]).range([0, w]);
        var mi = 800;
        var ma = 0;
        for (var i =0; i < data.length; i++){
          mi = Math.min(mi,data[i]);
          ma = Math.max(ma,data[i]);
        }
        var y = d3.scaleLinear().domain([mi, ma]).range([h, 0]);

        var line = d3.line()
          .x(function(d,i) {
            return x(i);
          })
          .y(function(d) {
            return y(d);
          })

          var graph = d3.select("svg")
              .append("svg:g")
                .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

          var yAxisLeft = d3.axisLeft().scale(y);

          graph.append("svg:g")
                .attr("class", "y axis")
                .attr("transform", "translate(-25,0)")
                .call(yAxisLeft);

            graph.append("svg:path").attr("d", line(data));
      } else {
          var data = this.props.data;
          var circles = [];
          d3.selectAll("svg > *").remove();
          for (var i=0; i<data.length;i++){
            if (data[i] === 'ON'){
              circles.push({'x_axis': i*60+25, 'y_axis':100, 'radius': 20, 'color':'green'});
            } else {
              circles.push({'x_axis': i*60+25, 'y_axis':100, 'radius': 20, 'color':'red'});
            }
          }
          var svg = d3.select("svg")

          var DrawnCircles = svg.selectAll("circle")
          .data(circles)
          .enter()
          .append("circle");

          var circleAttributes = DrawnCircles
          .attr("cx", function (d) { return d.x_axis; })
          .attr("cy", function (d) { return d.y_axis; })
          .attr("r", function (d) { return d.radius; })
          .style("fill", function(d) { return d.color; });
      }
    }
  }

  render(){
    const unit = (type) => {
      const units = {}
      units[SensorType.TEMPERATURE] = "°C"
      units[SensorType.PERCENT] = "%"
      return units[type] || ""
    }
    const value  = (v, t) => {
      if(v instanceof Value ){
        return v.toString()
      }
      switch(t){
        case SensorType.PERCENT: return (v*100).toFixed(2);
        case SensorType.TEMPERATURE: return (v*1).toFixed(1);
        default : return v;
      }
    }
    console.log("AHAHAHAHAHHAHAHAH");
    const values = this.props.data.map(((datum,index) => (<tr key={index}><td>{value(datum, this.props.type)+" "+unit(this.props.type)}</td></tr>)));
    if(this.props.noSensor) {
      return (<div className="Sensor">nope</div>)
    }
    return (
      <div className="Sensor">
        <h1>{name}</h1>

        <h3>Valeur actuelle</h3>
        <p> <span className="badge">{value(this.props.data.slice(-1), this.props.type)+" "+unit(this.props.type)}</span></p>
        <h3>Historique</h3>
        <svg width="800" height="200"></svg>
      </div>
    )
  }
}
export default connect(
    (state, ownProp) => {
      const sensor = state.sensors.filter((s) => (s.id === ownProp.params.id))
      if(sensor.length === 1){
        return { ...sensor[0], noSensor: false}
      }
      return {noSensor:true}
    }
  )(Sensor)
