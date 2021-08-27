var appdata = {
    maincolor : "2a797a",
    qcount : 5,
}

if(localStorage.getItem("ttsasyik") === null){
    saveData()
}else{
    appdata = JSON.parse(localStorage.getItem("ttsasyik"));
}

function saveData(){
    localStorage.setItem("ttsasyik", JSON.stringify(appdata))
}	

function startttsgame(){

    // words[i] correlates to clues[i]
    var words = [];
    var clues = [];
    
    for(var i = 0; i < appdata.qcount; i++){
        var rn = genrandom(ttss.length-1)
        var q = ttss[rn]
        words.push(q.word)
        clues.push(q.clue)
        ttss.splice(rn,1)
    }
    
    function genrandom(maxnum){
        return Math.floor(Math.random() * maxnum)
    }

    // Create crossword object with the words and clues
    var cw = new Crossword(words, clues);

    // create the crossword grid (try to make it have a 1:1 width to height ratio in 10 tries)
    var tries = 10; 
    var grid = cw.getSquareGrid(tries);

    // report a problem with the words in the crossword
    if(grid == null){
        var bad_words = cw.getBadWords();
        var str = [];
        for(var i = 0; i < bad_words.length; i++){
            str.push(bad_words[i].word);
        }
        //alert("Shoot! A grid could not be created with these words:\n" + str.join("\n"));
        location.reload()
        return;
    }

    // turn the crossword grid into HTML
    var show_answers = true;
    document.getElementById("crossword").innerHTML = CrosswordUtils.toHtml(grid, show_answers);

    // make a nice legend for the clues
    var legend = cw.getLegend(grid);
    addLegendToPage(legend);

    function addLegendToPage(groups){
        for(var k in groups){
            var html = [];
            for(var i = 0; i < groups[k].length; i++){
                html.push("<li><strong>" + groups[k][i]['position'] + ".</strong> " + groups[k][i]['clue'] + "</li>");
            }
            document.getElementById(k).innerHTML = html.join("\n");
        }
    }
}


function setqcount(n){
    appdata.qcount = n
    saveData()
    location.reload()
}

function resetsettings(){
    localStorage.clear()
    location.reload()
}

function tsep(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function vtext(text){
    var letters = /^[A-Za-z0-9]+$/;
    if(text.match(letters)) return true;
    else return false;
}
function toggledrawer(){
    $("#drawer").toggle()
}

var canswershown = false;
			function toggleAnswer(){
				if(canswershown){
					$(".canswer").hide()
					$(".uanswer").show()
					canswershown = false
				}else  {
					$(".canswer").show()
					$(".uanswer").hide()
					canswershown = true
				}  
			}
            // đoạn code hiển thị thông báo chỉnh sửa bên dưới
            document
              .getElementById("check-answer")
              .addEventListener("click", function () {
                
                let unswer = $(".uanswer").text();
                const correctAnswer = $(".canswer").text();
                const result = correctAnswer.replace(/[^a-zA-Z ]/g, "");
                console.log(result);
                if (unswer.includes(result)) {
                  alert(
                    "Congratulation! you are a winner and you got 10 score"
                  );
                } else {
                  alert("Please try again!");
                }
              });
			function activatetts(){
				$("td").click(function(){
					if($(this).find(".canswer").html() != "&nbsp;" && $(this).find(".canswer").html() != undefined){
						console.log("Clicked: " + $(this).find(".canswer").html())
						console.log($(this).find(".uanswer").attr('id'))
						selectedua = $(this).find(".uanswer").attr('id')
						$("#vkeyboard").show()
					}
				})
			}
				
			var selectedua = -1
			function typechar(c){
				$("#"+selectedua).html(c)
				$("#vkeyboard").hide()
			}
			
			// function initvkeyboard(){
			// 	var chars = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",]
			// 	for(var i = 0; i < chars.length; i++){
			// 		$("#kbtnlist").append("<div class='kbtn' onclick=typechar('"+chars[i]+"')>"+chars[i]+"</div>")
			// 	}
			// }
			function initvkeyboard(){
				var charsq = ["q","w","e","r","t","y","u","i","o","p",]
				for(var i = 0; i < charsq.length; i++){
					$("#kbtnlist1").append("<div class='kbtn' onclick=typechar('"+charsq[i]+"')>"+charsq[i]+"</div>")
				}
                var charsa = ["a","s","d","f","g","h","j","k","l",]
				for(var i = 0; i < charsa.length; i++){
					$("#kbtnlist2").append("<div class='kbtn' onclick=typechar('"+charsa[i]+"')>"+charsa[i]+"</div>")
				}
                var charsz = ["z","x","c","v","b","n","m",]
				for(var i = 0; i < charsz.length; i++){
					$("#kbtnlist3").append("<div class='kbtn' onclick=typechar('"+charsz[i]+"')>"+charsz[i]+"</div>")
				}
			}
            
           
			
			setTimeout(function(){
				startttsgame()
				activatetts()
				initvkeyboard()
				$("#crossword").css({ "width" : ($("tbody:eq(0)").find("tr:eq(0)").find("td").length * 52) + "px" })
				$("#game").show()
			},500)