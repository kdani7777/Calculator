$(document).ready( function() {
  var input = '';
  var regex = /^(['\u2212''\u002B''\u00F7''\u00D7']?\d+(\.\d+)?)*/g;
  //               minus    plus   divide  multiply
  
  $('#equals').click(function() {
    $(".equation").submit();
  });
  
  $(".equation").on("submit", function(e) {
    e.preventDefault();
    var answer = 1;
    var splitArr = input.match(/[^\d()]+|[\d.]+/g); //must be entered using calc's buttons
    var equatArr = [];
    
    //controls negatives
    if(splitArr[0] == '-') { 
      splitArr[0] += splitArr[1];
      splitArr.splice(1,1);
    }
    for(var j = 0; j < splitArr.length-1; j++) {
      if(splitArr[j].length == 2 && splitArr[j].substring(1) == '-') {
        splitArr[j] = splitArr[j].substring(0,1);
        splitArr[j+1] *= -1;
      }
    }
    
    while (splitArr.length > 1) {//to control ORDER OF OPERATIONS
      
        if(splitArr.includes('\u00D7') || splitArr.includes('\u00F7')) {//multiply or divide
          
          if(splitArr.indexOf('\u00D7') < splitArr.indexOf('\u00F7') && splitArr.indexOf('\u00D7') != -1 && splitArr.indexOf('\u00F7') != -1) {//if both exist
            var temp = splitArr[splitArr.indexOf('\u00D7') - 1] * splitArr[splitArr.indexOf('\u00D7') + 1];
            splitArr.splice(splitArr.indexOf('\u00D7') - 1, 3, temp);
          } else if(splitArr.indexOf('\u00F7') < splitArr.indexOf('\u00D7') && splitArr.indexOf('\u00D7') != -1 && splitArr.indexOf('\u00F7') != -1) {//if both exist
            var temp = splitArr[splitArr.indexOf('\u00F7') - 1] / splitArr[splitArr.indexOf('\u00F7') + 1];
          splitArr.splice(splitArr.indexOf('\u00F7') - 1, 3, temp);
          } else if(!splitArr.includes('\u00D7')) {//if only division exists
            var temp = splitArr[splitArr.indexOf('\u00F7') - 1] / splitArr[splitArr.indexOf('\u00F7') + 1];
          splitArr.splice(splitArr.indexOf('\u00F7') - 1, 3, temp);
          } else {//if only multiplication exists
            var temp = splitArr[splitArr.indexOf('\u00D7') - 1] * splitArr[splitArr.indexOf('\u00D7') + 1];
            splitArr.splice(splitArr.indexOf('\u00D7') - 1, 3, temp);
          }
        } else if(splitArr.includes('\u002B') || splitArr.includes('\u2212')) {//add or subtract
          
          if(splitArr.indexOf('\u002B') < splitArr.indexOf('\u2212') && splitArr.indexOf('\u002B') != -1 && splitArr.indexOf('\u2212') != -1) {
            var temp = parseFloat(splitArr[splitArr.indexOf('\u002B') - 1]) + parseFloat(splitArr[splitArr.indexOf('\u002B') + 1]);
            splitArr.splice(splitArr.indexOf('\u002B') - 1, 3, temp);
          } else if(splitArr.indexOf('\u2212') < splitArr.indexOf('\u002B') && splitArr.indexOf('\u002B') != -1 && splitArr.indexOf('\u2212') != -1) {
            var temp = splitArr[splitArr.indexOf('\u2212') - 1] - splitArr[splitArr.indexOf('\u2212') + 1];
            splitArr.splice(splitArr.indexOf('\u2212') - 1, 3, temp);
          } else if(!splitArr.includes('\u002B')) {
            var temp = splitArr[splitArr.indexOf('\u2212') - 1] - splitArr[splitArr.indexOf('\u2212') + 1];
            splitArr.splice(splitArr.indexOf('\u2212') - 1, 3, temp);
          } else {
            var temp = parseFloat(splitArr[splitArr.indexOf('\u002B') - 1]) + parseFloat(splitArr[splitArr.indexOf('\u002B') + 1]);
            splitArr.splice(splitArr.indexOf('\u002B') - 1, 3, temp);
          }  
        } else if(splitArr.includes('%')) {
          var temp = splitArr[splitArr.indexOf('%') - 1] - splitArr[splitArr.indexOf('%') + 1];
          splitArr.splice(splitArr.indexOf('%') - 1, 3, temp);
        } else {
          answer = 'Error. You dumb as shit';
          break;
        }
    }
    
    answer = splitArr[0];
    
    /* CODE BELOW MAKES CALC WORK LIKE REAL LIFE; ACTUAL CODE ABOVE USES ORDER OF OPERATIONS.
    for(var i = 1; i < splitArr.length-1; i++) {
      if((i % 2) == 1 && splitArr[i] != '(' && splitArr[i] != ')') {
        if(splitArr[i] == '\u002B') {
          if(splitArr.length == 3 || i == 1)
            answer = parseFloat(splitArr[i-1]) + parseFloat(splitArr[i+1]); //'+' is read as concatenation
          else {
            answer += parseFloat(splitArr[i+1]);
          }
        } else if(splitArr[i] == '\u00F7') {
          if(splitArr.length == 3 || i == 1)
            answer = splitArr[i-1]/splitArr[i+1];
          else {
            answer /= splitArr[i+1];
          }
        } else if(splitArr[i] == '\u00D7') {
          if(splitArr.length == 3 || i == 1)
            answer = splitArr[i-1]*splitArr[i+1];
          else {
            answer *= splitArr[i+1];
          }
        } else if(splitArr[i] == '\u2212') {
          if(splitArr.length == 3 || i == 1)
            answer = splitArr[i-1] - splitArr[i+1];
          else {
            answer -= splitArr[i+1];
          }
        } else {
          if(splitArr.length == 3 || i == 1)
            answer = splitArr[i-1] % splitArr[i+1];
          else {
            answer %= splitArr[i+1];
          }
        }
      }
    } */
    
    $(".equation").val(answer);
    console.log(answer);

  });
  
  $("#clear").click( function() {
    $(".equation").val(null);
    input = '';
  });
  
  $("#sign").click( function() {
    $(".equation").val(input + '-');
    input = $(".equation").val();
    //console.log(typeof input);
    
  });
  
  $("#mod").click( function() {
    $(".equation").val(input + '%');
    input = $(".equation").val();
  });
  
  $("#divide").click( function() {
    $(".equation").val(input + '\u00F7');
    input = $(".equation").val();
  });
  
  $("#multiply").click( function() {
    $(".equation").val(input + '\u00D7');
    input = $(".equation").val();
  });
  
  $("#subtract").click( function() {
    $(".equation").val(input + '\u2212');
    input = $(".equation").val();
  });
  
  $("#add").click( function() {
    $(".equation").val(input + '\u002B');
    input = $(".equation").val();
  });
  
  $("#zero").click( function() {
    $(".equation").val(input + 0);
    input = $(".equation").val();
  });
  
  $("#decimal").click( function() {
    $(".equation").val(input + '.');
    input = $(".equation").val();
  });
  
  $("#one").click( function() {
    $(".equation").val(input + 1);
    input = $(".equation").val();
    //console.log(typeof input);
  });
  
  $("#two").click( function() {
    $(".equation").val(input + 2);
    input = $(".equation").val();
  });
  
  $("#three").click( function() {
    $(".equation").val(input + 3);
    input = $(".equation").val();
  });
  
  $("#four").click( function() {
    $(".equation").val(input + 4);
    input = $(".equation").val();
  });
  
  $("#five").click( function() {
    $(".equation").val(input + 5);
    input = $(".equation").val();
  });
  
  $("#six").click( function() {
    $(".equation").val(input + 6);
    input = $(".equation").val();
  });
  
  $("#seven").click( function() {
    $(".equation").val(input + 7);
    input = $(".equation").val();
  });
  
  $("#eight").click( function() {
    $(".equation").val(input + 8);
    input = $(".equation").val();
  });
  
  $("#nine").click( function() {
    $(".equation").val(input + 9);
    input = $(".equation").val();
  });
  
  
  
  setInterval(function() {
    //console.log($(".equation").val());
  }, 5000);
  
  
});
