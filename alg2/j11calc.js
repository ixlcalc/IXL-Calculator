function calc() {
  // Declare vars
  var input = document.getElementById("input").value
  var out = document.getElementById("output")
  var outString = ""
  var hasEquals = input.includes("=")
  // Find vars
  var letter = input.match("[A-Za-z]")
  
  var aString = ""
  for (var i = 0; i < input.toLowerCase().indexOf(letter); i++) {
    aString += input.charAt(i)
  }
  var a = 0
  if (aString != "" && aString != "-") {
    a = Number(aString)
  } else if (aString == "-") {
    a = -1
  } else {
    a = 1
  }

  var count = 0
  for (var i = 0;i < input.length;i++) {
    if (input.charAt(i) == letter) {
      count++
    }
  }
  var bExpIndex = 0
  var bExp = ""
  var bString = ""
  var b = 0
  var cExpIndex = 0
  var cExp = ""
  var cString = ""
  var c = 0
  if (count == 1) {
    bExp = "+"
    b = 0
    
    cExpIndex = input.indexOf("^2") + 2
    cExp = input.charAt(cExpIndex)

    if (input.indexOf(letter,cExpIndex + 1) == -1) {
      for (var i = cExpIndex + 1; i < input.length; i++) {
        cString += input.charAt(i)
      }
    } else {
      for (var i = cExpIndex + 1; i < input.length; i++) {
        cString += input.charAt(i)
      }
    }
    c = Number(cString)
    if (cString == "") {
      cExp = "+"
      c = 1
    }
    if (cExp == "-") c *= -1
  } 
  else {
    bExpIndex = input.indexOf("^2") + 2
    bExp = input.charAt(bExpIndex)

    if (input.indexOf(letter,bExpIndex + 1) == -1) {
      for (var i = bExpIndex + 1; i < input.length; i++) {
        bString += input.charAt(i)
      }
    }
    else {
      for (var i = bExpIndex + 1; i < input.indexOf(letter,bExpIndex + 1); i++) {
        bString += input.charAt(i)
      }
    }
    b = Number(bString)
    if (bString == "") b = 1
    if (bExp == "-") b *= -1

    cExpIndex = input.indexOf(letter,bExpIndex) + 1
    cExp = (input.charAt(cExpIndex) == "-") ? "-" : "+"

    for (var i = cExpIndex + 1; i < input.length; i++) {
      cString += input.charAt(i)
    }
    c = Number(cString)
    if (cString == "") {
      cExp == "+"
      c = 0
    }
    if (cExp == "-") c *= -1
  }
  
  // Steps
  // Replace with quad
  outString = "\\text{1. Replace equation with quadratic function}"
  outString += "\\\\"
  outString += letter + "=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}"
  outString += "\\\\"
  outString += letter + "=\\frac{-{\\color{red}(" + b + ")}\\pm\\sqrt{{\\color{red}(" + b + ")}^2-4{\\color{red}(" + a + ")(" + c + ")}}}{2{\\color{red}(" + a + ")}}"
  outString += "\\\\"
  // Simplify
  outString += "\\text{2. Simplify}"
  outString += "\\\\"
  var topA = b * -1
  var topB = Math.pow(b,2)
  var topC = -4 * a * c
  var bottom = 2 * a
  var topCexp = (topC < 0) ? "" : "+"
  outString += letter + "=\\frac{" + topA + "\\pm\\sqrt{" + topB + topCexp + topC + "}}{" + bottom + "}"
  outString += "\\\\"
  topB = topB + topC
  outString += letter + "=\\frac{" + topA + "\\pm\\sqrt{" + topB + "}}{" + bottom + "}"
  outString += "\\\\"
  topB = Math.sqrt(topB)
  outString += letter + "=\\frac{" + topA + "\\pm" + topB + "}{" + bottom + "}"
  outString += "\\\\"
  // Split
  outString += "\\text{3. Split and Solve}"
  outString += "\\\\"
  outString += "\\text{(1) }" + letter + "=\\frac{" + topA + "+" + topB + "}{" + bottom + "}"
  outString += "\\\\"
  var top1 = topA + topB
  outString += "\\text{(1) }" + letter + "=\\frac{" + top1 + "}{" + bottom + "}"
  outString += "\\\\"
  var gcf = function(a, b) {
    if ( ! b) {
      return a;
    }
    return gcf(b, a % b);
  };
  var frac = false
  var plainFracSolve1 = ""
  var fracSolve1 = ""
  var solve1 = 0
  if (top1 % bottom == 0) {
    solve1 = top1 / bottom
    outString += "\\text{(1) }" + letter + "=" + solve1
  } else {
    frac = true
    var tempGCF = gcf(top1,bottom)
    var tempA = top1 / tempGCF
    var tempB = bottom / tempGCF
    plainFracSolve1 = tempA + "/" + tempB
    fracSolve1 = "\\frac{" + tempA + "}{" + tempB + "}"
    var tempDiv = tempA / tempB
    if (tempDiv < 0) {
      tempDiv *= -1
      solve1 = roundNumber(tempDiv,2)
      solve1 *= -1
    } else {
      solve1 = roundNumber(tempDiv,2)
    }
    outString += "\\text{(1) }" + letter + "=" + fracSolve1 + "\\text{ or }" + solve1
  }
  outString += "\\\\"
  
  outString += "\\text{(2) }" + letter + "=\\frac{" + topA + "-" + topB + "}{" + bottom +"}"
  outString += "\\\\"
  var top2 = topA - topB
  outString += "\\text{(2) }" + letter + "=\\frac{" + top2 + "}{" + bottom + "}"
  outString += "\\\\"
  var plainFracSolve2 = ""
  var fracSolve2 = ""
  var solve2 = 0
  if (top2 % bottom == 0) {
    solve2 = top2 / bottom
    outString += "\\text{(2) }" + letter + "=" + solve2
  } else {
    frac = true
    var tempGCF = gcf(top2,bottom)
    var tempA = top2 / tempGCF
    var tempB = bottom / tempGCF
    plainFracSolve2 = tempA + "/" + tempB
    fracSolve2 = "\\frac{" + tempA + "}{" + tempB + "}"
    var tempDiv = tempA / tempB
    if (tempDiv < 0) {
      tempDiv *= -1
      solve2 = roundNumber(tempDiv,2)
      solve2 *= -1
    } else {
      solve2 = roundNumber(tempDiv,2)
    }
    outString += "\\text{(2) }" + letter + "=" + fracSolve2 + "\\text{ or }" + solve2
  }
  outString += "\\\\"
  
  if (frac) {
    if (plainFracSolve1 == "") {
      outString += "{\\color{blue}" + letter + "=" + solve1 + "\\text{, }" + fracSolve2 + "}"
      outString += "\\\\"
      outString += "\\text{\\color{blue}Plaintext: " + solve1 + ", " + plainFracSolve2 + "}"
    } else if (plainFracSolve2 == "") {
      outString += "{\\color{blue}" + letter + "=" + fracSolve1 + "\\text{, }" + solve2 + "}"
      outString += "\\\\"
      outString += "\\text{\\color{blue}Plaintext: " + plainFracSolve1 + "\\text{, }" + solve2 + "}"
    } else {
      outString += "{\\color{blue}" + letter + "=" + fracSolve1 + "\\text{, }" + fracSolve2 + "}"
      outString += "\\\\"
      outString += "\\text{\\color{blue}Plaintext: " + plainFracSolve1 + "\\text{, }" + plainFracSolve2 + "}"
    }
    outString += "\\\\"
    outString += "\\text{\\color{blue}Exact/Decimal: " + solve1 + ", " + solve2 + "}"
  } else {
    outString += "{\\color{blue}" + letter + "=" + solve1 + "\\text{, }" + solve2 + "}"
  }
  // Output
  console.log("Out String - " + outString)
  katex.render(outString,out,{
    throwOnError:false
  })
}