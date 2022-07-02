function getDirectionText() {
  const mappingDirection = new Map();
  mappingDirection.set("N", "North");
  mappingDirection.set("E", "East");
  mappingDirection.set("S", "South");
  mappingDirection.set("W", "West");

  return mappingDirection.get(this._direction);
}

class Compass {
  constructor(options) {
    this.walkingStep = options.commands;
    this._position = [0, 0];
    this._direction = "N";
  }

  get position() {
    return this._position;
  }

  get direction() {
    return getDirectionText.call(this);
  }

  turnRight() {
    switch (this._direction) {
      case "N": this._direction = "E";
        break;
      case "S": this._direction = "W";
        break;
      case "E": this._direction = "S";
        break;
      case "W": this._direction = "N";
        break;

      default: throw new Error("Invalid direction.");
    }
  }

  turnLeft() {
    switch (this._direction) {
        case "N": this._direction = "W";
          break;
        case "S": this._direction = "E";
          break;
        case "E": this._direction = "N";
          break;
        case "W": this._direction = "S";
          break;
  
        default: throw new Error("Invalid direction.");
      }
  }
  
  walk(pace) {
    switch (this._direction) {
      case "N": this._position[1] += pace;
        break;
      case "S": this._position[1] -= pace;
        break;
      case "E": this._position[0] += pace;
        break;
      case "W": this._position[0] -= pace;
        break;

      default: throw new Error("Invalid direction.");
    }
  }

  execute() {
    if (!this.walkingStep.length) {
        return
    }

    this.walkingStep.forEach((step) => {
      if (step.includes("R")) {
        this.turnRight();
      } else if (step.includes("L")) {
        this.turnLeft(); 
      } else if (/[W]\d+/.test(step)) {
        const regexNumber = new RegExp('\\d+', 'gi')
        const pace = parseInt(step.match(regexNumber)[0]);
        this.walk(pace);
      }
    });
  }
}

module.exports = Compass;
