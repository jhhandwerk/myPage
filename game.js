kaboom({
	global: true,
	fullscreen: true,
	scale: 1,
	debug: true,
});


	loadSprite("link", "link.png")
	loadSprite("wall", "steel.png")
	
	const SPEED = 120
	const player = add([
		sprite("link"),
		pos(80,40),
		area(),
		body()
	])
	
	const wall = add([
		sprite("wall"),
		pos(200,150)
	])
	// floor
	add([
		rect(width(), 48),
		pos(0, height() - 48),
		outline(4),
		area(),
		solid(),
		color(127, 200, 255),
	])
	// obstacle
	loop(2, () => {
		// add tree
		add([
			rect(48, rand(24,200)),
			area(),
			outline(4),
			pos(width(), height() - 48),
			origin("botleft"),
			color(255, 180, 255),
			move(LEFT, 240),
			"tree", // add a tag here
		]);
	});
	player.onCollide("tree", () => {
		addKaboom(player.pos);
		shake();
	});
	
	onKeyDown("right", () => {
		player.move(SPEED, 0)
		player.dir = vec2(1,0)
	})
	onKeyDown("left", () => {
		player.move(-SPEED, 0)
		player.dir = vec2(-1,0)
	})
	onKeyDown("up", () => {
		player.move(0,-SPEED)
		player.dir = vec2(0,-1)
	})
	onKeyDown("down", () => {
		player.move(0,SPEED)
		player.dir = vec2(0,1)
	})
	
	onKeyPress("space", () => {
		player.jump()
	})




	