
import { useMemo, useRef, useCallback, useEffect, useState } from "react";

import * as THREE from "three"
import { Canvas, group } from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";

import {interpretGcodeLine} from "../File/GcodeParser"

const Line = (props)=> {
  const ref = useRef()
  const points = useMemo(() => [new THREE.Vector3(props.start.X, props.start.Z, props.start.Y), new THREE.Vector3(props.end.X, props.end.Z, props.end.Y)], [])
  const onUpdate = useCallback(self => self.setFromPoints(points), [points])
  console.log(points)
  return (
    <>
      <line ref={ref}>
        <bufferGeometry attach="geometry" onUpdate={onUpdate} />
        <lineBasicMaterial attach="material" color={'red'} linewidth={10} linecap={'round'} linejoin={'round'} />
      </line>
    </>
  )

}

const BedVisual = (props) => {
  const mesh = useRef()
  return ( 
    <mesh
    rotation={props.rotation}
      // {...props}
      ref = {mesh}>
      <planeGeometry args={[props.x,props.y]} />
      <meshStandardMaterial color={'lightgrey'} />
    </mesh>
  )

}



const GcodeViewer = (props) => {

  const [movements, setMovements] = useState() 

  useEffect(() => {
    // interpret gcode here
    if(props.gcode){
      let moves = props.gcode.filter((x) => {return x.startsWith("G0") || x.startsWith("G1")})
      setMovements(moves.map(interpretGcodeLine))
    }
    
    // props.gcode.map((g) => { 
    //   interpretGcodeLine(g) 

    // })
  }, [props.gcode])

  const getPoints = () => {
    // line from previous to current
    // will not always contain  value so we need to move according to last coordinate
    const arr = []
    let lastZ = 0.0;
    for (let index = 1; index < movements.length; index++) {
      let last = movements[index - 1]
      if(!last.Z){
        last.Z = lastZ
      } else {
        lastZ = last.Z
      }
      let current = movements[index]
      if(!current.Z){
        current.Z = lastZ
      } else {
        lastZ = current.Z
      }
      console.log(last)
      console.log(current)
      arr.push(<Line key={index} start={last} end={current} />)
    }

    return arr

  }
  
  

  return (
  <Canvas style={{width: "100%", height: "100%"}} camera={{position: [0, 10, 75]}}>
    <color attach="background" args={['#010101']} />
     <ambientLight intensity={0.75} />
      <OrbitControls></OrbitControls>
      <mesh>
        <boxGeometry />
        <meshStandardMaterial />
      </mesh>
      {/* <Line start={{"X": 90, "Y": 90, "Z": 0}} end={{"X": -90, "Y": -90, "Z": 0}} /> */}
      
      <group position={[-117.5, 0, -117.5]}>
      {movements && getPoints() }
      </group>
      <BedVisual x={235} y={235} rotation={[-Math.PI/2,0,0]}/>

      {/* <gridHelper args={[235, 20, 'white', 'teal']} /> */}
  </Canvas>)
}

export default GcodeViewer;