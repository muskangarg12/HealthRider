const score = document.querySelector('.score');
const savings = document.querySelector('.savings_text');
const highestscore = document.querySelector('.highestscore');
const startSreen = document.querySelector('.startSreen');
const startSreenText = document.querySelector('.startSreenText');
const playbutton = document.querySelector('.playbutton');
const gameArea = document.querySelector('.gameArea');
const modelviewer = document.getElementById('model-viewer');
const carselector = document.getElementById('car-selector');
const armodel = document.getElementById('ar-model');
const playercar = document.getElementsByClassName('car');

var carImg = 'png/car-2.png';

playbutton.addEventListener('click', start);

let player = { speed: 5, score: 0, highestscore: 0, savings: 0, carimg: 'png/car-2.png'};

let keys = { 
	ArrowUp :  false, 
	ArrowDown : false, 
	ArrowLeft: false, 
	ArrowRight: false 
};

let activity = ["cake", "chips", "carrot", "chocolate", "cookie", "fastfood", "salad", "fries", "vegetable", "pizza", "coffee", "grapes", "hotdog", "strawberry", "bananas", "fruits", "healthyfood", "spinach"];
let effect = [-1, -1, 1, -1, -1, -1, 1, -1, 1, -1, -1, 1, -1, 1, 1, 1, 1, 1];

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function keyDown(e) {
	e.preventDefault();
	keys[e.key] = true;
}

function keyUp(e) {
	e.preventDefault();
	keys[e.key] = false;
}

function isCollide(a, b) {
	if(b.classList.contains('hide')) return false;
	aRect = a.getBoundingClientRect();
	bRect = b.getBoundingClientRect();

	return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) ||(aRect.right < bRect.left) || (aRect.left > bRect.right));
}

function moveLines() {
	let lines = document.querySelectorAll('.lines');

	lines.forEach(function(item) {
		if(item.y >= 700) {
			item.y -= 750;
		}

		item.y += player.speed;
		item.style.top = item.y + "px";
	});
}

function endGame() {
	player.start = false;
	carselector.classList.add('hide');
	armodel.classList.remove('hide')
	startSreen.classList.remove('hide');

	if(player.score > player.highestscore) {
		player.highestscore = player.score;
		highestscore.innerHTML = "Your Highest Score: " + player.score;
		switchModel("trophy", modelviewer);
		startSreenText.innerHTML = "<h4><b>CONGRATULATIONS!</b></h4> You have made a new High Score. You have surely improved your diet management skills while playing! <br><br><h4><b>Your new Highest Score is : " + player.score + "</b></h4><br> Play Again to keep improving!";
	}
	else {
		switchModel("lost", modelviewer);
		startSreenText.innerHTML = "<h4><b>GAME OVER!</b></h4> Unfortunately you were not able to improve this time, but never the less, let's keep practicing.<br><br><h4><b> Your Final Score is " + player.score + "</b></h4><br> Play Again to improve!";
	}
	
}

function moveEnemy(car) {
	let enemy = document.querySelectorAll('.enemy');

	enemy.forEach(function(item) {

		if(isCollide(car, item)) {
			item.classList.add('hide');
			item.innerHTML = "";
			let newSavings = player.savings + item.displayType.saving;
			if(newSavings<0) {
				newSavings = 0;
				endGame();
			}
			player.savings = newSavings;
			savings.innerHTML = player.savings
		}

		if(item.y >= 750) {
			item.classList.remove('hide');
			item.y = -300;
			item.displayType = randomeType();
			let imgfile = 'png/' + item.displayType.val + '.png';
			item.style.backgroundImage = "url(" + imgfile + ")";
			item.style.left = Math.floor(Math.random() * 300) + "px";
		}

		item.y += player.speed;
		item.style.top = item.y + "px";
	});
}

function gamePlay() {
	let car = document.querySelector('.car');
	let road = gameArea.getBoundingClientRect();

	if(player.start) {
		moveLines();
		moveEnemy(car);

		if(keys.ArrowUp && player.y > (road.top + 70)) {
			player.y -= player.speed;
		}
		if(keys.ArrowDown && player.y < (road.bottom - 85)) {
			player.y += player.speed;
		}
		if(keys.ArrowLeft && player.x > 0) {
			player.x -= player.speed;
		}
		if(keys.ArrowRight && player.x < (road.width - 80)) {
			player.x += player.speed;
		}

		car.style.top = player.y + "px";
		car.style.left = player.x + "px";

		window.requestAnimationFrame(gamePlay);
		player.score++;
		let ps = player.score - 1;
		score.innerText = "Score: " + ps;
	}
}

function start() {
	startSreen.classList.add('hide');
	gameArea.innerHTML = "";

	player.carimg = carImg;
	player.start = true;
	player.score = 0;
	player.savings = 0;
	window.requestAnimationFrame(gamePlay);

	for(x=0; x<6; x++){
		let roadLine = document.createElement('div');
		roadLine.setAttribute('class', 'lines');
		roadLine.y = (x*150);
		roadLine.style.top = roadLine.y + "px";
		gameArea.appendChild(roadLine);
	}

	let car = document.createElement('div');
	car.setAttribute('class', 'car');
	car.style.backgroundImage = "url(" + carImg + ")";
	gameArea.appendChild(car);

	player.x = car.offsetLeft;
	player.y = car.offsetTop;

	for(x=0; x<3; x++){
		let enemyCar = document.createElement('div');
		enemyCar.setAttribute('class', 'enemy');
		enemyCar.y = ((x+1) * 350) * -1;
		enemyCar.style.top = enemyCar.y + "px";
		enemyCar.displayType = randomeType();
		let imgfile = 'png/' + enemyCar.displayType.val + '.png';
		enemyCar.style.backgroundImage = "url(" + imgfile + ")";
		//enemyCar.innerHTML = enemyCar.displayType.saving;
		enemyCar.style.left = Math.floor(Math.random() * 300) + "px";
		gameArea.appendChild(enemyCar);
	}
}

function randomeType() {
	let index = Math.floor(Math.random() * activity.length);
	console.log(index);
	return {
		val : activity[index],
		saving : (1 + Math.floor(Math.random() * 10))*effect[index]
	};
}


jQuery(function ($) {
    // init the state from the input
    $(".image-checkbox").each(function () {
        if ($(this).find('input[type="checkbox"]').first().attr("checked")) {
            $(this).addClass('image-checkbox-checked');
        }
        else {
            $(this).removeClass('image-checkbox-checked');
        }
    });

    // sync the state to the input
    $(".image-checkbox").on("click", function (e) {
    	console.log("clicked");
    	console.log($(this).attr("id"));
        if ($(this).attr("id") == "car-1") {
            $('#car-2').removeClass('image-checkbox-checked');
            $('#car-2').find('input[type="checkbox"]').first().removeAttr("checked");

            $('#car-1').addClass('image-checkbox-checked');
            $('#car-1').find('input[type="checkbox"]').first().attr("checked", "checked");
            carImg = 'png/car-2.png'
        }
        else {
        	$('#car-1').removeClass('image-checkbox-checked');
            $('#car-1').find('input[type="checkbox"]').first().removeAttr("checked");

            $('#car-2').addClass('image-checkbox-checked');
            $('#car-2').find('input[type="checkbox"]').first().attr("checked", "checked");
            carImg = 'png/car-1.png';
        }

        e.preventDefault();
    });
});