import {useState} from 'react'

function FileUpload(props) {

    const [metadata, setMetadata] = useState()
    const [gcode, setGcode] = useState()

    // add printer temp, etc as well for reporting purposes

    const showFile = async (e) => {
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => { 
          const text = (e.target.result)
          console.log(text)
          alert(text)
        };
        reader.readAsText(e.target.files[0])
      }

    return (
        <form>
            <h1>Input Gcode</h1>
            <input type="file" onChange={(e) => showFile(e)}/>
        </form>
    )
}

export default FileUpload