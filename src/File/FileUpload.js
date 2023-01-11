// import {useState} from 'react'

const FileUpload = (props) => {

    // const [metadata, setMetadata] = useState()
    // const [name, setName] = useState()

    // add printer temp, etc as well for reporting purposes

    const showFile = async (e) => {
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (f) => { 
          let rawText = (f.target.result)
          props.onGcodeLoad(rawText.split(/\r?\n/))
        };
        reader.readAsText(e.target.files[0])
      }

      // const handleBedSize = (e) => {
      //   console.log(e.target.value)
      // }

    return (
        <form>
            <h1>Input Gcode</h1>
            <input type="file" onChange={(e) => showFile(e)}/>
            {/* <input type="number" onChange={handleBedSize} /> */}
        </form>
    )
}

export default FileUpload