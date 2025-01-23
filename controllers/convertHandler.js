function splitterNumberString(input) {
  let number = input.match(/[\d.\/]+/g) || ["1"];
  let string = input.match(/[a-zA-Z]+/g)[0];
  let stringMatch = string ? string[0] : "invalid unit";
  return [number[0], string];
}

function divisionChecker(possibleFraction) {
  let  numbers = possibleFraction.split("/");
  if (numbers.length > 2) {
    return false;
  }
  return numbers;
}

function ConvertHandler() {
  
  this.getNum = function(input) {
    let result = splitterNumberString(input)[0];
    let numbers = divisionChecker(result);
    if (numbers === false) {
      return "invalid number";
    }
    let n1 = numbers[0];
    let n2 = numbers[1] || "1";
    result = parseFloat(n1) / parseFloat(n2);
    if (isNaN(n1) || isNaN(n2)) {
      return "invalid number";
    }
    return result;
  };
  
  this.getUnit = function(input) {
    let result = splitterNumberString(input)[1].toLowerCase();  
    switch (result) {
      case "gal":
        return "gal";
      case "l":
        return "L";
      case "mi":
        return "mi";
      case "km":
        return "km";
      case "lbs":
        return "lbs";
      case "kg":
        return "kg";
      default:
        return "invalid unit";
    }
  };
  
  
  this.getReturnUnit = function(initUnit) {
    let unit = initUnit.toLowerCase();
    switch (unit) {
      case "gal":
        return "L";
      case "l":
        return "gal";
      case "mi":
        return "km";
      case "km":
        return "mi";
      case "lbs":
        return "kg";
      case "kg":
        return "lbs";
      default:
        return "invalid unit";
    }
  };

  this.spellOutUnit = function(initUnit) {
    let unit = initUnit.toLowerCase();
    switch (unit) {
      case "gal":
        return "gallons";
      case "l":
        return "liters";
      case "mi":
        return "miles";
      case "km":
        return "kilometers";
      case "lbs":
        return "pounds";
      case "kg":
        return "kilograms";
      default:
        return "invalid unit";
    }
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let unit = initUnit.toLowerCase();
    let result;

    switch(unit) {
      case "gal":
        result = initNum * galToL;
        break;
      case "l":
        result = initNum / galToL;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "km":
        result = initNum / miToKm;
        break;
      default:
        result = "invalid unit";
    }
    
    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
  
}


module.exports = ConvertHandler;
