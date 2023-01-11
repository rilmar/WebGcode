
import { useMemo, useRef, useCallback, useEffect, useState } from "react";

import * as THREE from "three"
import { Canvas } from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";

import {interpretGcodeLine} from "../File/GcodeParser"

// const Line = (props)=> {
//   const ref = useRef()
//   const points = useMemo(() => [new THREE.Vector3(props.start.X, props.start.Z, props.start.Y), new THREE.Vector3(props.end.X, props.end.Z, props.end.Y)], [])
//   const onUpdate = useCallback(self => self.setFromPoints(points), [points])
//   // console.log(points)
//   return (
//     <>
//       <line ref={ref}>
//         <bufferGeometry attach="geometry" onUpdate={onUpdate} />
//         <lineBasicMaterial attach="material" color={'red'} linewidth={10} linecap={'round'} linejoin={'round'} />
//       </line>
//     </>
//   )

// }

const LineAll = (props)=> {
  const ref = useRef()
  // const points = useMemo(() => [new THREE.Vector3(props.start.X, props.start.Z, props.start.Y), new THREE.Vector3(props.end.X, props.end.Z, props.end.Y)], [])
  const onUpdate = useCallback(self => self.setFromPoints(props.points), [props.points])
  // console.log(points)
  return (
    <>
      <line ref={ref}>
        <bufferGeometry attach="geometry" onUpdate={onUpdate} />
        <lineBasicMaterial attach="material" color={'red'} linewidth={10} linecap={'round'} linejoin={'round'}  />
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

  const [movements, setMovements] = useState([])
  // const lines = useMemo(() => generatePoints(movements), [movements])

  let lines = useRef([])

  useEffect(() => {
    // interpret gcode here
    if(props.gcode){
      let moves = props.gcode.filter((x) => {return x.startsWith("G0") || x.startsWith("G1")})
      // lines.current = generatePoints(moves.map(interpretGcodeLine))
      setMovements(moves.map(interpretGcodeLine))
    }
    
    // props.gcode.map((g) => { 
    //   interpretGcodeLine(g) 

    // })
  }, [props.gcode])

  // const fillInCoordinateBlanks = (point, previous) => {
    
  //   return [point, previous]
  // }

  // const generatePoints = (moves) => {
  //   console.log("generating points!")
  //   // line from previous to current
  //   // will not always contain  value so we need to move according to last coordinate
  //   const arr = []
  //   let previous={"X":0.0,"Y":0.0,"Z":0.0}
  //   // apparently all 3 coordinates can be omitted if the same as the last value
  //   for (let index = 1; index < moves.length; index++) {

  //     // chunk this out into a method
  //     let last = moves[index - 1]
  //     if(!last.hasOwnProperty("X")){
  //       last.X = previous.X
  //     } else {
  //       previous.X = last.X
  //     }
  
  //     if(!last.hasOwnProperty("Y")){
  //       last.Y = previous.Y
  //     } else {
  //       previous.Y = last.Y
  //     }
  
  //     if(!last.hasOwnProperty("Z")){
  //       last.Z = previous.Z
  //     } else {
  //       previous.Z = last.Z
  //     }

  //     let current = moves[index]
  //     if(!current.hasOwnProperty("X")){
  //       current.X = previous.X
  //     } else {
  //       previous.X = current.X
  //     }
  
  //     if(!current.hasOwnProperty("Y")){
  //       current.Y = previous.Y
  //     } else {
  //       previous.Y = current.Y
  //     }
  
  //     if(!current.hasOwnProperty("Z")){
  //       current.Z = previous.Z
  //     } else {
  //       previous.Z = current.Z
  //     }

  //     arr.push(<Line key={index} start={last} end={current} />)
  //   }

  //   return arr

  // }

  // Try to put all points into same object - look @ performance
  const generatePointsAll = (moves) => {
    console.log("generating all points!")
    // line from previous to current
    // will not always contain  value so we need to move according to last coordinate
    const arr = []
    let previous={"X":0.0,"Y":0.0,"Z":0.0}
    // apparently all 3 coordinates can be omitted if the same as the last value
    for (let index = 0; index < moves.length; index++) {

      // chunk this out into a method
      // let last = moves[index - 1]
      // if(!last.hasOwnProperty("X")){
      //   last.X = previous.X
      // } else {
      //   previous.X = last.X
      // }
  
      // if(!last.hasOwnProperty("Y")){
      //   last.Y = previous.Y
      // } else {
      //   previous.Y = last.Y
      // }
  
      // if(!last.hasOwnProperty("Z")){
      //   last.Z = previous.Z
      // } else {
      //   previous.Z = last.Z
      // }

      let current = moves[index]
      if(!current.hasOwnProperty("X")){
        current.X = previous.X
      } else {
        previous.X = current.X
      }
  
      if(!current.hasOwnProperty("Y")){
        current.Y = previous.Y
      } else {
        previous.Y = current.Y
      }
  
      if(!current.hasOwnProperty("Z")){
        current.Z = previous.Z
      } else {
        previous.Z = current.Z
      }

      arr.push(new THREE.Vector3(current.X, current.Z, current.Y))
    }

    return <LineAll points={arr} />

  }
  
  // this might be best if we go by layers rather than individual lines - hundreds ve thousands of objects (i think)

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
        {movements && generatePointsAll(movements)}
      </group>
      <BedVisual x={235} y={235} rotation={[-Math.PI/2,0,0]}/>

      {/* <gridHelper args={[235, 20, 'white', 'teal']} /> */}
  </Canvas>)
}

export default GcodeViewer;