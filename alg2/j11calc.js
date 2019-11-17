function calc() {
  // Declare vars
  var input = document.getElementById("input").value
  var out = document.getElementById("output")
  var step = 1
  var outString = ""
  var hasEquals = input.includes("=")
  var currExp = input
  // Output
  outString = "\\textit{Dude, it's not yet done...}"
  console.log("Out String - " + outString)
  katex.render(outString,out,{
    throwOnError:false
  })
}