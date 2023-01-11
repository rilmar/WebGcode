// handle move, extrusion, and metadata based on line

/**
 * 
 * @param {*} gcode line of gcode to interpret
 */
const interpretGcodeLine = (gcode) => {
    switch (gcode.slice(0,2)) {
        case "G0":
        case "G1":
            //movement or extrusion command
            let gcodeObject = {}
            gcode.split(" ").map((g) => gcodeObject = {...gcodeObject, ...getMovementData(g)})
            return gcodeObject
            
        // case ";":
        //     return {"metadata" : gcode}
        default:
            return null;
    }

}

const getMovementData = (text) => {
    switch (text.slice(0,1)) {
        case "G":
            return {"Movement": "Linear"}
        case "F":
            return {"F": parseFloat(text.slice(1))} // acceleration
        case "X":
            return {"X": parseFloat(text.slice(1))}
        case "Y":
            return {"Y": parseFloat(text.slice(1))}
        case "Z":
            return {"Z": parseFloat(text.slice(1))}
        case "E":
            return {"E": parseFloat(text.slice(1))}
        default:
            break;
    }
}

// G0 is a movement while G1 is an extrusion

export {interpretGcodeLine}