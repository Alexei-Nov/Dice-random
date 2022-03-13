document.body.style.overflow = ('hidden');
document.addEventListener('click', diceEvent);

let inpt = document.querySelectorAll('.face__input');
for (let i = 0; i < inpt.length; i++) {
	inpt[i].addEventListener('keyup', keyup);
	inpt[i].addEventListener('keydown', keydown);
	localStorage.setItem(`face${i + 1}`, inpt[i].value);

}

function diceEvent(event) {

	if (event.target.closest('.btn__roll')) {
		let x = -Math.floor(Math.random() * 15) * 90 - 90 * 5;
		let y = -Math.floor(Math.random() * 15) * 90 - 90 * 5;
		let z = -Math.floor(Math.random() * 15) * 90 - 90 * 5;

		if (x % 360 == 0 || x % 360 == -180) {
			x -= 30;
			y -= 45;
		}
		else if (x % 360 == -90 || x % 360 == -270) {
			if (y % 360 == 0 || y % 360 == -180) {
				x -= 30;
				z -= 45;
			}
			else if (y % 360 == -90 || y % 360 == -270) {
				x += 60;
				y -= 45;
			};
		};

		let stepX = x / 100;
		let stepY = y / 100;
		let stepZ = z / 100;
		let rotateX = 0;
		let rotateY = 0;
		let rotateZ = 0;

		requestAnimationFrame(diceRoll);
		function diceRoll() {
			requestAnimationFrame(diceRoll);
			if (y >= rotateY) {
				document.querySelector('.cube').style.transform = `rotateX(${x}deg) rotateY(${y}deg) rotateZ(${z}deg)`;
				return
			}
			document.querySelector('.cube').style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
			rotateX = rotateX + stepX;
			rotateY = rotateY + stepY;
			rotateZ = rotateZ + stepZ;
		};
	}
	else if (event.target.closest('.btn__settings')) {
		document.querySelector('.popup').style.visibility = 'visible';

		for (let i = 0; i < inpt.length; i++) {
			if (eval(`localStorage.face${i + 1}`)) {
				inpt[i].value = localStorage.getItem(`face${i + 1}`);
			};
		};
		keyup();
	}
	else if (event.target.closest('.btn__back')) {
		document.querySelector('.popup').style.visibility = 'hidden';
	}
	else if (event.target.closest('.btn__save')) {
		if (event.target.closest('.btn__blocked')) {
			return
		}
		for (let i = 0; i < inpt.length; i++) {
			localStorage.setItem(`face${i + 1}`, inpt[i].value);
		}
		setNum();
	}
};

function keydown(event) {
	for (let i = 0; i < inpt.length; i++) {
		if (!['1', '2', '3', '4', '5', '6', 'Backspace', 'Delete'].includes(event.key)) {
			event.preventDefault();
		};
		if (document.querySelector('.face__input:focus').value.length == 1 && ['1', '2', '3', '4', '5', '6'].includes(event.key)) {
			event.preventDefault();
		};
	};
};

function keyup() {
	let concat = '';
	for (let i = 0; i < inpt.length; i++) {
		concat += inpt[i].value;
	}

	let arr = concat.split('');
	for (let i = arr.length - 1; i >= 0; i--) {
		if (arr.indexOf(arr[i]) != i) {
			arr.splice(i, 1);
		};
	};

	if (arr.length < inpt.length) {
		document.querySelector('.btn__save').classList.add('btn__blocked');
	} else {
		if (document.querySelector('.btn__save').closest('.btn__blocked')) {
			document.querySelector('.btn__save').classList.remove('btn__blocked');
		};
	};
};

function setNum() {
	let num;
	for (let i = 1; i <= inpt.length; i++) {
		if (eval(`localStorage.face${i}`)) {
			num = localStorage.getItem(`face${i}`);
			if (document.querySelector(`.num${num}`)) {
				document.querySelector(`.num${num}`).classList.remove(`num${num}`);
			};
			document.querySelector(`.side${i}`).classList.add(`num${num}`);
		};
	};
};
setNum()