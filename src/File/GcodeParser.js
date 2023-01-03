// handle move, extrusion, and metadata based on line

/**
 * 
 * @param {*} gcode line of gcode to interpret
 */
const interpretGcodeLine = (gcode) => {
    switch (gcode.slice(0,1)) {
        case "G":
            //movement or extrusion command
            let gcodeObject = {}
            gcode.split(" ").map((g) => {gcodeObject = {...gcodeObject, ...getData(g)}})
            return gcodeObject
            
        // case ";":
        //     return {"metadata" : gcode}
        default:
            return null;
    }

}

const getData = (text) => {
    switch (text.slice(0,1)) {
        case "G":
            return {"Extrusion": parseInt(text.slice(1))}
        case "F":
            //acceleration
            break;
        case "X":
            return {"X": parseFloat(text.slice(1))}
        case "Y":
            return {"Y": parseFloat(text.slice(1))}
        case "Z":
            return {"Z": parseFloat(text.slice(1))}
        case "E":
            // extrusion amount
            break;
        default:
            break;
    }
}

// G0 is a movement while G1 is an extrusion

export {interpretGcodeLine}