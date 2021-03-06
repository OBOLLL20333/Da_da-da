(function () {
	var canvas = document.createElement('canvas'),
		ctx = canvas.getContext('2d'),
		w = canvas.width = innerWidth,
		h = canvas.height = innerHeight,
		particles = [],
		properties = {
			bgColor: 'rgba(37, 43, 66,1)',
			particleColor: 'rgba(230, 230, 238, 1)',
			particleRadius: 3,
			particleCount: 120,
			particleMaxVeljcity: 0.5,
		};

	document.querySelector('.main-screen').appendChild(canvas);


	window.onresize = function () {
		w = canvas.width = innerWidth,
			h = canvas.height = innerHeight;
	}

	class Particle {
		constructor() {
			this.x = Math.random() * w;
			this.y = Math.random() * h;
			this.velocityX = Math.random() * (properties.particleMaxVeljcity * 2) - properties.particleMaxVeljcity;
			this.velocityY = Math.random() * (properties.particleMaxVeljcity * 2) - properties.particleMaxVeljcity;
		}
		position() {
			this.x + this.velocityX > w && this.velocityX > 0 || this.x + this.velocityX < 0 && this.velocityX < 0 ? this.velocityX *= -1 : this.velocityX;
			this.y + this.velocityY > h && this.velocityY > 0 || this.y + this.velocityY < 0 && this.velocityY < 0 ? this.velocityY *= -1 : this.velocityY;
			this.x += this.velocityX;
			this.y += this.velocityY;
		}
		reDraw() {
			ctx.beginPath();
			ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI * 2);
			ctx.closePath();
			ctx.fillStyle = properties.particleColor;
			ctx.fill();
		}
	}

	function reDrawBackground() {
		ctx.fillStyle = properties.bgColor;
		ctx.fillRect(0, 0, w, h);
	}

	function reDrawParticles() {
		for (var i in particles) {
			particles[i].position();
			particles[i].reDraw();
		}
	}

	function loop() {
		reDrawBackground();
		reDrawParticles();
		requestAnimationFrame(loop);
	}

	function init() {
		for (var i = 0; i < properties.particleCount; i++) {
			particles.push(new Particle);
		}
		loop();
	}

	init();
}());

const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
	window.addEventListener('scroll', animOnScroll);
	function animOnScroll(params) {
		for (let index = 0; index < animItems.length; index++) {
			const animItem = animItems[index];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = offset(animItem).top;
			const animStart = 4;

			let animItemPoint = window.innerHeight - animItemHeight / animStart;
			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
				animItem.classList.add('_active');
			} else {
				if (!animItem.classList.contains('_anim-no-hide')) {
					animItem.classList.remove('_active');
				}
			}
		}
	}
	function offset(el) {
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
	}
	setTimeout(() => {
		animOnScroll();
	}, 300);
	const button = document.querySelector('.button');
	const poihali = document.querySelector('.main-screen__image_one');
	const rotaite = document.querySelector('.haeder__logo');
	const rotut = document.querySelector('.main-screen__image_two');

	button.onclick = function () {
		poihali.classList.remove('_poihali');
		poihali.classList.add('_poihali');
		setTimeout(() => {
			poihali.classList.remove('_poihali');
		}, 5000);
	}
	rotaite.onclick = function () {
		rotaite.classList.remove('_rotaite');
		rotaite.classList.add('_rotaite');
		setTimeout(() => {
			rotaite.classList.remove('_rotaite');
		}, 1000);
	}
}