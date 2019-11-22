function calc() {
  // Declare vars
  var input = document.getElementById("input").value
  var out = document.getElementById("output")
  var outString = ""
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
  if (input.indexOf(letter,secondExpIndex + 1) == -1) {
    for (var i = secondExpIndex + 1; i < input.length; i++) {
      secondString += input.charAt(i)
    }
  }
  else {
    for (var i = secondExpIndex + 1; i < input.indexOf(letter,secondExpIndex + 1); i++) {
      secondString += input.charAt(i)
    }
  }
  var second = Number(secondString)

  var thirdExpIndex = 0
  var thridExp = ""
  thirdExpIndex = input.indexOf(letter,secondExpIndex) + 1
  thirdExp = (input.charAt(thirdExpIndex) == "-") ? "-" : "+"

  var thirdString = ""
  for (var i = thirdExpIndex + 1; i < input.length; i++) {
    thirdString += input.charAt(i)
  }
  var third = Number(thirdString)
  if (thirdExp == "-") third *= -1
  // Steps
  var count = 0
  for (var i = 0; i < input.length;i++) {
    if (input.charAt(i) == letter) {
      count++
    }
  }
  // No third # & first has x
  if (thirdExpIndex == 0 && count == 1) {
    outString += "\\text{{\\color{red}NOTE: Following might not be accurate.}}"
    outString += "\\\\"
    // Simplify
    outString += "\\text{1. Simplify}"
    outString += "\\\\"
    outString += input + "=0"
    outString += "\\\\"

    var solve = 0
    if (secondExp == "+") {
      outString += first + letter + "^2+" + second + "{\\color{red}-" + second + "}=0{\\color{red}-" + second + "}"
      outString += "\\\\"
      solve -= second
    } else {
      outString += first + letter + "^2-" + second + "{\\color{red}+" + second + "}=0{\\color{red}+" + second + "}"
      outString += "\\\\"
      solve += second
    }
    outString += first + letter + "^2=" + solve
    outString += "\\\\"
    var prevSolve = 0
    var frac = false
    if (first != "") {
      outString += "\\frac{" + first + letter + "^2}{" + first + "}=\\frac{" + solve + "}{" + first + "}"
      outString += "\\\\"
      if (first % solve == 0) {
        solve /= first
      } else {
        frac = true
        if (solve < 0 && first < 0) {
          solve *= -1
          first *= -1
        }
        prevSolve = solve
        solve = "\\frac{" + solve + "}{" + first + "}"
      }
      outString += letter + "^2=" + solve
      outString += "\\\\"
    }
    outString += "\\sqrt{" + letter + "^2}=\\pm\\sqrt{" + solve + "}"
    outString += "\\\\"
    // TODO: Double check this shit works
    if (frac) {
      var a = Math.sqrt(prevSolve)
      var b = Math.sqrt(first)
      solve = "\\frac{" + a + "}{" + b + "}"
      var oppSolve = "\\frac{" + (a * -1) + "}{" + b + "}"
      outString += "{\\color{blue}" + letter + "=" + solve + "\\text{, }" + oppSolve + "}"
      outString += "\\\\"
      outString += "\\text{\\color{blue}Plaintext: " + a + "/" + b + ", " + (a * -1) + "/" + b + "}"
    } else {
      outString += "{\\color{blue}" + letter + "=" + solve + "\\text{, }" + (solve * -1) + "}"
    }
  }
  // No third # & Both have x
  else if (thirdString == "") {
    // Factor
    outString = "\\text{1. Factor}"
    outString += "\\\\"
    outString += letter + "(" + first + letter + secondExp + second + ")=0"
    outString += "\\\\"
    // Solve factors
    outString += "\\text{2. Seperate factors, equal them to 0, and solve.}"
    outString += "\\\\"
    outString += "\\text{(1) }" + letter + "=0"
    outString += "\\\\"
    outString += "\\text{(2) }" + first + letter + secondExp + second + "=0"
    outString += "\\\\"
    var solve = 0
    var frac = false
    if (secondExp == "+") {
      outString += "\\text{(2) }" + first + letter + "+" + second + "{\\color{red}-" + second + "}=0{\\color{red}-" + second + "}"
      outString += "\\\\"
      solve -= second
    } else {
      outString += "\\text{(2) }" + first + letter + "-" + second + "{\\color{red}+" + second + "}=0{\\color{red}+" + second + "}"
      outString += "\\\\"
      solve += second
    }
    outString += "\\text{(2) }" + first + letter + "=" + solve
    outString += "\\\\"
    var prevSolve = 0
    if (first != "") {
      outString += "\\text{(2) }\\frac{" + first + letter + "}{" + first + "}=\\frac{" + solve + "}{" + first + "}"
      outString += "\\\\"
      if (first % solve == 0) {
        solve /= first
      } else {
        frac = true
        if (solve < 0 && first < 0) {
          solve *= -1
          first *= -1
        }
        prevSolve = solve
        solve = "\\frac{" + solve + "}{" + first + "}"
      }
      outString += "\\text{(2) }" + letter + "=" + solve
      outString += "\\\\"
    }
    outString += "{\\color{blue}" + letter + "=0\\text{, }" + solve + "}"
    if (frac) {
      outString += "\\\\"
      outString += "\\text{\\color{blue}Plaintext: 0, " + prevSolve + "/" + first + "}"
    }
  }
  // Third #
  else {
    // Factor
    outString = "\\text{1. Factor}"
    outString += "\\\\"


    var temp = 0
    if (first == "") temp = third
    else {
      temp = first * third
      outString += first + "*" + third + "=" + temp
      outString += "\\\\"
    }

    var winA = 0
    var winB = 0
    var tempB = 0
    outString += "\\begin{array}{| l | c | r |}\\hline A & B & = \\\\ \\hline "
    if (temp < 0) temp *= -1
    for (var i = 1; i <= Math.sqrt(temp); i++) {
      if (temp % i == 0) {
        tempB = temp / i
        var check = i + tempB
        var check2 = second
        if (secondExp == "-") check2 *= -1
        if (check == check2) {
          winA = i
          winB = tempB
          outString += "{\\color{red}" + i + "}&{\\color{red}" + tempB + "}&{\\color{red}" + check + "}\\\\"
        } else {
          outString += i + "&" + tempB + "&" + check + "\\\\"
        }
        tempB /= -1
        check = i + tempB
        if (check == check2) {
          winA = i
          winB = tempB
          outString += "{\\color{red}" + i + "}&{\\color{red}" + tempB + "}&{\\color{red}" + check + "}\\\\"
        } else {
          outString += i + "&" + tempB + "&" + check + "\\\\"
        }
        i /= -1
        tempB /= -1
        check = i + tempB
        if (check == check2) {
          winA = i
          winB = tempB
          outString += "{\\color{red}" + i + "}&{\\color{red}" + tempB + "}&{\\color{red}" + check + "}\\\\"
        } else {
          outString += i + "&" + tempB + "&" + check + "\\\\"
        }
        tempB /= -1
        check = i + tempB
        if (check == check2) {
          winA = i
          winB = tempB
          outString += "{\\color{red}" + i + "}&{\\color{red}" + tempB + "}&{\\color{red}" + check + "}\\\\"
        } else {
          outString += i + "&" + tempB + "&" + check + "\\\\"
        }
        i /= -1
      }
    }
    outString += "\\hline\\end{array}"
    outString += "\\\\"

    temp = (winA < 0) ? "" : "+"
    var temp2 = (winB < 0) ? "" : "+"
    outString += "(" + letter + temp + winA + ")(" + letter + temp2 + winB + ")=0"
    outString += "\\\\"

    var tempA = ""
    tempB = ""
    if (winA % first == 0) winA /= first
    else tempA = first
    if (winB % first == 0) winB /= first
    else tempB = first
    temp = (winA < 0) ? "" : "+"
    temp2 = (winB < 0) ? "" : "+"
    outString += "(" + tempA + letter + temp + winA + ")(" + tempB + letter + temp2 + winB + ")=0"
    outString += "\\\\"
    var gcf = function(a, b) {
      if ( ! b) {
        return a;
      }
      return gcf(b, a % b);
    };
    gcfA = gcf(tempA,winA)
    gcfB = gcf(tempB,winB)
    if (gcfA < 0) gcfA *= -1
    if (gcfB < 0) gcfB *= -1
    if ((gcfA != 1 && tempA != "") || (gcfB != 1 && tempB != "")) {
      if (gcfA != 1) {
        tempA /= gcfA
        winA /= gcfA
      }
      if (gcfB != 1) {
        tempB /= gcfB
        winB /= gcfB
      }
      temp = (winA < 0) ? "" : "+"
      temp2 = (winB < 0) ? "" : "+"
      outString += "(" + tempA + letter + temp + winA + ")(" + tempB + letter + temp2 + winB + ")=0"
      outString += "\\\\"
    }

    // Solve seperate factors
    outString += "\\text{2. Seperate factors, equal them to 0, and solve.}"
    outString += "\\\\"
    if ((tempA + letter + temp + winA) == (tempB + letter + temp2 + winB)) {
      outString += tempA + letter + temp + winA + "=0"
      outString += "\\\\"
      var solve = 0
      if (winA < 0) {
        outString += tempA + letter + temp + winA + " {\\color{red}\\space +\\space" + (winA * -1) + "}=0{\\color{red}\\space +\\space" + (winA * -1) + "}"
        outString += "\\\\"
        solve = (winA * -1)
      } else {
        outString += tempA + letter + temp + winA + " {\\color{red}\\space -\\space" + winA + "}=0{\\color{red}\\space -\\space" + winA + "}"
        outString += "\\\\"
        solve = (winA * -1)
      }
      var frac = false
      var prevSolve = 0
      if (tempA != "") {
        outString += "\\frac{" + tempA + letter + "}{" + tempA + "}=\\frac{" + solve + "}{" + tempA + "}"
        outString += "\\\\"
        if (solve % tempA == 0) {
          solve /= tempA
        } else {
          frac = true
          if (solve < 0 && tempA < 0) {
            solve *= -1
            tempA *= -1
          }
          prevSolve = solve
          solve = "\\frac{" + solve + "}{" + tempA + "}"
        }
      }
      outString += "{\\color{blue}" + letter + "=" + solve + "}"
      if (frac) {
        outString += "\\\\"
        outString += "\\text{\\color{blue}Plaintext: " + prevSolve + "/" + tempA + "}"
      }
    } else {
      outString += "\\text{(1) }" + tempA + letter + temp + winA + "=0"
      outString += "\\\\"
      var solvedA = 0
      var plainSolveA = ""
      if (winA < 0) {
        outString += "\\text{(1) }" + tempA + letter + temp + winA + " {\\color{red}\\space +\\space" + (winA * -1) + "}=0{\\color{red}\\space +\\space" + (winA * -1) + "}"
        outString += "\\\\"
        solvedA = (winA * -1)
        plainSolveA = solvedA
      } else {
        outString += "\\text{(1) }" + tempA + letter + temp + winA + " {\\color{red}\\space -\\space" + winA + "}=0{\\color{red}\\space -\\space" + winA + "}"
        outString += "\\\\"
        solvedA = (winA * -1)
        plainSolveA = solvedA
      }
      var frac = false
      if (tempA != "") {
        outString += "\\text{(1) }\\frac{" + tempA + letter + "}{" + tempA + "}=\\frac{" + solvedA + "}{" + tempA + "}"
        outString += "\\\\"
        if (solvedA % tempA == 0) {
          solvedA /= tempA
          plainSolveA = solvedA
        } else {
          frac = true
          if (solvedA < 0 && tempA < 0) {
            solvedA *= -1
            tempA *= -1
          }
          plainSolveA = solvedA + "/" + tempA
          solvedA = "\\frac{" + solvedA + "}{" + tempA + "}"
        }
      }
      outString += "\\text{(1) }" + letter + "=" + solvedA
      outString += "\\\\"

      outString += "\\text{(2) }" + tempB + letter + temp2 + winB + "=0"
      outString += "\\\\"
      var solvedB = 0
      var plainSolveB = ""
      if (winB < 0) {
        outString += "\\text{(2) }" + tempB + letter + temp2 + winB + " {\\color{red}\\space +\\space" + (winB * -1) + "}=0{\\color{red}\\space +\\space" + (winB * -1) + "}"
        outString += "\\\\"
        solvedB = (winB * -1)
        plainSolveB = solvedB
      } else {
        outString += "\\text{(2) }" + tempB + letter + temp2 + winB + " {\\color{red}\\space -\\space" + winB + "}=0{\\color{red}\\space -\\space" + winB + "}"
        outString += "\\\\"
        solvedB = (winB * -1)
        plainSolveB = solvedB
      }
      if (tempB != "") {
        outString += "\\text{(2) }\\frac{" + tempB + letter + "}{" + tempB + "}=\\frac{" + solvedB + "}{" + tempB + "}"
        outString += "\\\\"
        if (solvedB % tempB == 0) {
          solvedB /= tempB
          plainSolveB = solvedB
        } else {
          frac = true
          if (solvedB < 0 && tempB < 0) {
            solvedB *= -1
            tempB *= -1
          }
          plainSolveB = solvedB + "/" + tempB
          solvedB = "\\frac{" + solvedB + "}{" + tempB + "}"
        }
      }
      outString += "\\text{(2) }" + letter + "=" + solvedB
      outString += "\\\\"

      outString += "\\text{{\\color{blue}$" + letter + "=" + solvedA + "$, $" + solvedB + "$}}"
      if (frac) {
        outString += "\\\\"
        outString += "\\text{\\color{blue}Plaintext: " + plainSolveA + ", " + plainSolveB + "}"
      }
    }
  }
  // Output
  console.log("Out String - " + outString)
  katex.render(outString,out,{
    throwOnError:false
  })
}