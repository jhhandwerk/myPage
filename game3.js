kaboom({
	// clearColor: [0,0,0,1]
})
gravity(2)
loadSprite("link", "link.png");
loadSprite("wall", "steel.png", area(), solid());

// load game
scene("game", () => {

	addLevel([level
		"	",
		"	",
		"	",
		"	",
		"	",
		"============",
		"                   ======="
	],{
		width: 32,
		height: 32,
		// define what each symbol means, by a function returning a component list (what will be passed to add())
		"=": () => [
			sprite("wall"),
			area(),	
			solid(),
		],
	}
	
	)

    loadSprite("link", "link.png")
	loadSprite("wall", "steel.png", solid())
	
	const SPEED = 120
	const player = add([
		sprite("link"),
		pos(80,40),
		area(),
		body(),
	])
	
	const wall = add([
		sprite("wall"),
		pos(200,150),
		area(),
		solid(),
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
    // score counter
    let score = 0;
    const scoreLabel = add([
    text(score),
    pos(24, 24)
    ])
    onUpdate(() => {
        score++;
        scoreLabel.text = score;
    });
    // lose condtion
    player.onCollide("tree", () => {
        addKaboom(player.pos);
        shake();
        go("lose"); // go to "lose" scene here
    });
});

go("game")

// load lose scene
scene("lose", () => {
    add([
        text("Game Over"),
        pos(center()),
        origin("center"),
    ])
})