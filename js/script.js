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

	function func() {
		if (ctx.fillStyle = properties.particleColor == "rgba(230, 230, 238, 1)") ctx.fillStyle = properties.particleColor = "rgba(76, 76, 177, 1)";
		else ctx.fillStyle = properties.particleColor = "rgba(230, 230, 238, 1)";
		setTimeout(func, 500);
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
}())