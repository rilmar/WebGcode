
import { useMemo, useRef, useCallback } from "react";

import * as THREE from "three"
import { Canvas } from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";

function Line(start, end) {
  const ref = useRef()
  const points = useMemo(() => [new THREE.Vector3(-10, 0, 0), new THREE.Vector3(0, 10, 0), new THREE.Vector3(10, 0, 0)], [])
  const onUpdate = useCallback(self => self.setFromPoints(points), [points])
  
  return (
    <>
      <line position={[0, -2.5, -10]} ref={ref}>
        <bufferGeometry attach="geometry" onUpdate={onUpdate} />
        <lineBasicMaterial attach="material" color={'red'} linewidth={10} linecap={'round'} linejoin={'round'} />
      </line>
    </>
  )

}

function BedVisual(props) {
  const mesh = useRef()
  return ( 
    <mesh
    {...props}
    ref = {mesh}>
      <boxGeometry args={[235,1,235]} />
      <meshStandardMaterial color={'lightgrey'} />
    </mesh>
  )

}



function GcodeViewer(props) {
  return (
  <Canvas style={{width: "100%", height: "100%"}} camera={{position: [0, 10, 75]}}>
    <color attach="background" args={['#010101']} />
     <ambientLight intensity={0.75} />
      <OrbitControls></OrbitControls>
      <Line />
      {/* <BedVisual /> */}
      <gridHelper args={[235, 20, 'white', 'teal']} />
  </Canvas>)
}

export default GcodeViewer;