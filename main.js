const fs = require("fs");
const readline = require("readline");

class WalkingRobot {
    constructor(filePath) {
        this.filePath = filePath;
    }

    static validInstructions() {
        return ['PLACE', 'MOVE', 'LEFT', 'RIGHT', 'REPORT'];
    };

    static instructionFormats() {
        return {
            'PLACE': new RegExp('^PLACE\\s\\d\\,\\d\\,(NORTH|SOUTH|EAST|WEST)$'),
            'MOVE': new RegExp('^MOVE$'),
            'LEFT': new RegExp('^LEFT$'),
            'RIGHT': new RegExp('^RIGHT$'),
            'REPORT': new RegExp('^REPORT$')
        };
    }

    static directionMap() {
        return {
            "LEFT": { "NORTH": "WEST", "WEST": "SOUTH", "SOUTH": "EAST", "EAST": "NORTH" },
            "RIGHT": { "NORTH": "EAST", "EAST": "SOUTH", "SOUTH": "WEST", "WEST": "NORTH" }
        };
    }
    
    static maxIndex() {
        return 6;
    }

    async readFile() {
        return new Promise((resolve, reject) => {
            if(!fs.existsSync(this.filePath))
                reject(`File [${this.filePath}] does not exist`);
            
            let inputStream =fs.createReadStream(this.filePath);
            let lineArray = [];
    
            let rd = readline.createInterface({
                input: inputStream,
                // output: process.stdout,
                // console: false
            });
    
            inputStream.on('end', () => {
                resolve(lineArray);
            });
    
            rd.on('line', (input) => {
                lineArray.push(input.trim());
            });
        });
    }

    sanitizeInput(lineArray) 
    {
        let instructionArray = lineArray.filter(line => {
            let instruction = line.trim();
            if(instruction !== '' && new RegExp('^' + WalkingRobot.validInstructions().join("|")).test(instruction))
                return true;
            else
                return false;
        });

        let validInstructionArray = [];
        let invalidInstructionArray = [];
    
        instructionArray.map(instruction => {
            let valid = false;
            for(let key in WalkingRobot.instructionFormats())
            {
                if(new RegExp('^' + key).test(instruction) && WalkingRobot.instructionFormats()[key].test(instruction))
                {
                    valid = true;
                    break;
                }
            }
    
            if(valid)
                validInstructionArray.push(instruction);
            else
                invalidInstructionArray.push(instruction);
        });
    
        if(invalidInstructionArray.length > 0)
            throw  new Error(`invalid instructions found`);
    
        return validInstructionArray;
    }

    initializePosition(instructionArray)
    {
        let placementArray = instructionArray.filter(instruction => {
            if(/^PLACE.+/.test(instruction))
                return true;
            else
                return false;
        });
    
        if(placementArray.length <= 0)
            throw new Error(`No [PLACE] instructions found. Cannot initialize`);
    
        if(placementArray.length > 1)
            throw new Error(`Multiple [PLACE] instructions found. Cannot process`);
    
        let placeInstruction = placementArray[0];
        placeInstruction = placeInstruction.replace('PLACE ', "");
        let commandArray = placeInstruction.split(",");
        let positionX = commandArray[0];
        let positionY = commandArray[1];
        let positionDirection = commandArray[2];
    
        return { positionX: parseInt(positionX), positionY: parseInt(positionY), positionDirection: positionDirection };
    }

    async walk()
    {
        try
        {
            // filePath = `./pathway.txt`;
            let lineArray = await this.readFile();
        
            // console.log(lineArray);
            let instructionArray = this.sanitizeInput(lineArray);
            // console.log(instructionArray);
    
            if(instructionArray.length <= 0)
                throw new Error('no valid instruction found...');
    
            let { positionX, positionY, positionDirection } = this.initializePosition(instructionArray);
    
            let placementFound = false;
            for(let i = 0; i < instructionArray.length; i++)
            {
                let instruction = instructionArray[i];
                if(/^PLACE.+/.test(instruction))
                {
                    placementFound = true;
                    continue;
                }
    
                if(placementFound)
                {
                    if(instruction == 'RIGHT' || instruction == 'LEFT')
                        positionDirection = WalkingRobot.directionMap()[instruction][positionDirection];
                    else if(instruction == 'REPORT')
                        console.log(`${positionX},${positionY},${positionDirection}`);
                    else if(instruction == 'MOVE')
                    {
                        if(positionDirection == 'NORTH' && (positionX - 1) >= 0)
                            positionX = (positionX - 1);
                        else if(positionDirection == 'SOUTH' && (positionX + 1) <= WalkingRobot.maxIndex())
                            positionX = (positionX + 1);
                        else if(positionDirection == 'WEST' && (positionY - 1) >= 0)
                            positionY = (positionY - 1);
                        else if(positionDirection == 'EAST' && (positionY + 1) <= WalkingRobot.maxIndex())
                            positionY = (positionY + 1);
                    }
                }
                else
                    console.log(`instruction [${instruction}] cannot be executed as placement has not been initialized yet.`);
            }
        }
        catch(err)
        {
            console.log(`ERROR: `, err.message);
        }
    }
}

module.exports = WalkingRobot;





