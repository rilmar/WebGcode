// import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

import GcodeViewer from './Renderer/Gcode';
import FileUpload from './File/FileUpload';

function App() {
  
  const [gcode, setGcode] = useState()

  const handleGcode = (g) => {
    setGcode(g)
  }

  return (
    <div className="App FlexContainer">
      <div className="Left">
        <FileUpload onGcodeLoad={handleGcode}></FileUpload>
      </div>
      <div className="Right">
        <GcodeViewer gcode={gcode}></GcodeViewer>
      </div>
    </div>
  );
}

export default App;
