function nonLeadCoefficient(currExp,letter,second,secondExp,third,step,outString) {
  // (b/2)^2
  outString += "\\text{" + step + ". Do $(^b/_2)^2$ where $b$ is the coefficient of $" + second + letter + "$}"
  step++
  outString += "\\\\"
  b = Math.pow((second/2),2)
  var temp = currExp.split("=")[1]
  outString += letter + "^2" + secondExp + second + letter + "{\\color{red}\\space +\\space" + b + "}=" + temp + "{\\color{red}\\space +\\space " + b + "}"
  third = third + b
  outString += "\\\\"
  currExp = letter + "^2" + secondExp + second + letter + " + " + b + "=" + third
  outString += currExp
  outString += "\\\\"
  // Factor
  outString += "\\text{" + step + ". Factor left side}"
  step++
  outString += "\\\\"
  b = second/2
  currExp = "(" + letter + secondExp + b + ")^2=" + third
  outString += currExp
  outString += "\\\\"
  // Square root
  outString += "\\text{" + step + ". Square root both sides}"
  step++
  outString += "\\\\"
  outString += "\\sqrt{(" + letter + secondExp + b + ")^2}=\\pm\\space \\sqrt{" + third + "}"
  outString += "\\\\"
  if (third < 0) third = Math.sqrt(third * -1)
  else third = Math.sqrt(third)
  third = +third.toFixed(2)
  currExp = letter + secondExp + b + "=\\pm\\space " + third
  outString += currExp
  outString += "\\\\"
  // Split
  outString += "\\text{" + step + ". Split and Solve}"
  outString += "\\\\"
  var final = ""
  if (secondExp == "+") {
    outString += "\\text{(+) }" + letter + "+" + b + "{\\color{red}\\space -\\space " + b + "}=" + third + "{\\color{red}\\space -\\space " + b + "}"
    outString += "\\\\"
    temp = +(third - b).toFixed(2)
    outString += "\\text{(+) }" + letter + "=" + temp
    outString += "\\\\"
    outString += "\\text{( - ) }" + letter + "+" + b + "{\\color{red}\\space -\\space " + b + "}=" + (third * -1) + "{\\color{red}\\space -\\space " + b + "}"
    outString += "\\\\"
    var temp2 = +((third * -1) - b).toFixed(2)
    outString += "\\text{( - ) }" + letter + "=" + temp2
    outString += "\\\\"
    final = temp + ", " + temp2
  } else {
    outString += "\\text{(+) }" + letter + "-" + b + "{\\color{red}\\space +\\space " + b + "}=" + third + "{\\color{red}\\space +\\space " + b + "}"
    outString += "\\\\"
    temp = +(third + b).toFixed(2)
    outString += "\\text{(+) }" + letter + "=" + temp
    outString += "\\\\"
    outString += "\\text{( - ) }" + letter + "-" + b + "{\\color{red}\\space +\\space " + b + "}=" + (third * -1) + "{\\color{red}\\space +\\space " + b +"}"
    outString += "\\\\"
    var temp2 = +((third * -1) + b).toFixed(2)
    outString += "\\text{( - ) }" + letter + "=" + temp2
    outString += "\\\\"
    final = temp + ", " + temp2
  }
  outString += "\\text{{\\color{blue}$" + letter + "=$ " + final + "}}"
  return outString
}

function calc() {
  // Declare vars
  var input = document.getElementById("input").value
  var out = document.getElementById("output")
  var step = 1
  var outString = ""
  var hasEquals = input.includes("=")
  var currExp = input

  // Find vars
  var letter = input.match("[A-Za-z]")

  var firstString = ""
  for (var i = 0; i < input.toLowerCase().indexOf(letter); i++) {
    firstString += input.charAt(i)
  }
  var first = 0
  if (firstString != "") {
    first = Number(firstString)
  } else {
    first = ""
  }

  var secondExpIndex = input.indexOf("^2") + 2
  var secondExp = input.charAt(secondExpIndex)

  var secondString = ""
  for (var i = secondExpIndex + 1; i < input.indexOf(letter,secondExpIndex + 1); i++) {
    secondString += input.charAt(i)
  }
  var second = Number(secondString)

  var thirdExpIndex = 0
  var thridExp = ""
  if (hasEquals) thirdExpIndex = input.indexOf("=") + 1
  else thirdExpIndex = input.indexOf(letter,secondExpIndex) + 1
  thirdExp = (input.charAt(thirdExpIndex) == "-") ? "-" : "+"

  var thirdString = ""
  var temp = (!hasEquals) ? 1 : 0
  for (var i = thirdExpIndex + temp; i < input.length; i++) {
    thirdString += input.charAt(i)
  }
  var third = Number(thirdString)

  // Steps
  if (!hasEquals) {
    // Add/Sub third to both sides
    step++
    var temp2 = ""
    if (thirdExp == "+") {
      outString = "\\text{1. Subtract " + third + " from both sides}"
      temp = "-"
      temp2 = "-"
    }
    else {
      outString = "\\text{1. Add " + third + " to both sides}"
      temp = "+"
    }
    outString += "\\\\"
    outString += input + "{\\color{red}\\space " + temp + "\\space " + third + "}=0{\\color{red}\\space " + temp + "\\space " + third + "}"
    outString += "\\\\"
    currExp = first + letter + "^2" + secondExp + second + letter + "=" + temp2 + third
    outString += currExp
    outString += "\\\\"
  }
  var b = 0
  // no leading coefficient
  if (first == "") {
    outString = nonLeadCoefficient(currExp,letter,second,secondExp,third,step,outString)
  }
  // leading coefficient
  else {
    // Divide both sides
    outString += "\\text{" + step + ". Divide both sides by the leading coefficient (" + first + ")}"
    outString += "\\\\"
    step++
    temp = currExp.split("=")[1]
    outString += "\\frac{" + first + letter + "^2" + secondExp + second + letter + "}{{\\color{red}" + first + "}}=\\frac{" + temp + "}{\\color{red}" + first + "}"
    outString += "\\\\"
    second /= (first > 0) ? first : (first * -1)
    secondExp = ((secondExp == "-" && first > 0) || (secondExp == "+" && first < 0)) ? "-" : "+"
    third = temp / first
    currExp = letter + "^2" + secondExp + second + letter + "=" + third
    outString += currExp
    outString += "\\\\"
    outString = nonLeadCoefficient(currExp,letter,second,secondExp,third,step,outString)
  }
  // Output
  console.log("Out String - " + outString)
  katex.render(outString,out,{
    throwOnError:false
  })
}