import logo from './logo.svg';
import './App.css';
import GcodeViewer from './Renderer/Gcode';
import FileUpload from './File/FileUpload';

function App() {
  return (
    <div className="App FlexContainer">
      <div className="Left">
        <FileUpload></FileUpload>
      </div>
      <div className="Right">
        <GcodeViewer></GcodeViewer>
      </div>
    </div>
  );
}

export default App;
