// simple rpg style walk and talk

kaboom({
	background: [ 255, 209, 253 ]
})

loadSprite("bag", "/sprites/bag.png")
loadSprite("ghosty", "/sprites/ghosty.png")
loadSprite("grass", "/sprites/grass.png")
loadSprite("steel", "/sprites/steel.png")
loadSprite("door", "/sprites/door.png")
loadSprite("doorL", "/sprites/doorL.png")
loadSprite("key", "/sprites/key.png")
loadSprite("keyL", "/sprites/keyL.png")
loadSprite("bean", "/sprites/bean.png")
loadSprite("flower", "/sprites/eyeflower.png")
loadSound("bgm", "/sounds/bgm.mp3")

const music = play("bgm", {
	loop: true,
})

// Adjust global volume
volume(0.5)

scene("main", (levelIdx) => {

	const SPEED = 150

	// character dialog data
	const characters = {
		"a": {
			sprite: "bag",
			msg: "If you take the key behind me, you will enter a room where there may be a battle. If you win the battle, you may recieve something of value. Press space to take my key...",
		},
		"b": {
			sprite: "ghosty",
			msg: "get out!!",
		},
        "c": {
			sprite: "flower",
			// msg: "My key will open the left door. Behind the left door, you will find a magical meadow.",
		},
	}

	// level layouts
	const levels = [
		[
			"=========",
			"=       ===",
			"=  ?   $   =========",
			"=  a  c    	        |",
			"=          =========",
			"l          =",
			"=        ====",
			"=   @   =",
			"=========",
		],
		[
			"---------",
			"-       -",
			"-       -",
			"-  $    -",
			"|    c  -",
			"-       -",
			"-     b -",
			"-   @   -",
			"---------",
		],
        [
			"=====|=======",
			"=               =",
			"= a             =",
			"=               =",
			"=   c           =",
			"=               =",
			"=   $      x     =",
			"=   @          ==",
			"=============",
		]
	]
	addLevel(levels[levelIdx], {
		width: 64,
		height: 64,
		pos: vec2(64, 64),
		"=": () => [
			sprite("grass"),
			area(),
			solid(),
		],
		"-": () => [
			sprite("steel"),
			area(),
			solid(),
		],
		"$": () => [
			sprite("key"),
			area(),
			"key",
			"bomb"
		],
		"?": () => [
			sprite("keyL"),
			area(),
			"keyL",
			"bomb"
		],
		"@": () => [
			sprite("bean"),
			area(),
			solid(),
			"player",
		],
		"|": () => [
			sprite("door"),
			area(),
			solid(),
			"door",
		
		],
		"l": () => [
			sprite("doorL"),
			area(),
			solid(),
			"doorL",
		
		],
        "c": () => [
			sprite("flower"),
			area(),
			solid(),
			"flower",
		],
		"x": () => [
			sprite("ghosty"),
			area(),
			solid(),
			"ghosty",
		],
		// any() is a special function that gets called everytime there's a
		// symbole not defined above and is supposed to return what that symbol
		// means
		any(ch) {
			const char = characters[ch]
			if (char) {
				return [
					sprite(char.sprite),
					area(),
					solid(),
					"character",
					{ msg: char.msg, },
				]
			}
		},
	})

	// get the player game obj by tag
	const player = get("player")[0]

	function addDialog() {
		const h = 80
		const pad = 16
		const bg = add([
			pos(0, height() - h),
			rect(width(), h),
			color(0, 0, 0),
			z(100),
		])
		const txt = add([
			text("", {
				width: width(),
				size:25
			}),
			pos(0 + pad, height() - h + pad),
			z(100),
		])
		bg.hidden = true
		txt.hidden = true
		return {
			say(t) {
				txt.text = t
				bg.hidden = false
				txt.hidden = false
			},
			dismiss() {
				if (!this.active()) {
					return
				}
				txt.text = ""
				bg.hidden = true
				txt.hidden = true
			},
			active() {
				return !bg.hidden
			},
			destroy() {
				bg.destroy()
				txt.destroy()
			},
		}
	}

	let hasKey = false
	let hasKeyL = false
	const dialog = addDialog()

	player.onCollide("key", (key) => {
		destroy(key)
		// code below is kind of hacky, but it makes options exclusive
		destroyAll("keyL")
		hasKey = true
	})
	player.onCollide("keyL", (keyL) => {
		destroy(keyL)
		destroyAll("key")
		hasKeyL = true
	})
	// right door logic!!!!!!!!!!!!!!!!!!!!!!!
	player.onCollide("door", () => {
		if (hasKey) {
			if (levelIdx + 1 < levels.length) {
				go("main", levelIdx + 1)
			} else {
				go("win")
			}
		} else {
			dialog.say("you dont have the right key...")
		}
	})
	// left door logic!!!!!!!!!!!!!!!!!!!
	player.onCollide("doorL", () => {
		if (hasKeyL) {
			if (levelIdx + 1 < levels.length) {
				// this increments by 2 to skip a level. I wanna add the ai for a battle here...
				go("main", levelIdx + 2)
			} else {
				go("win")
			}
		} else {
			dialog.say("you dont have the right key...")
		}
	})
    player.onCollide("flower", () => {
	    dialog.say("The key behind me will open the right door. Behind the right door, you will find a magical meadow.")
		
	})

	// talk on touch
	player.onCollide("character", (ch) => {
		dialog.say(ch.msg)
	})

	const dirs = {
		"left": LEFT,
		"right": RIGHT,
		"up": UP,
		"down": DOWN,
	}

	for (const dir in dirs) {
		onKeyPress(dir, () => {
			dialog.dismiss()
		})
		onKeyDown(dir, () => {
			player.move(dirs[dir].scale(SPEED))
		})
	}
})
scene("win", () => {
	add([
		text("You Win!"),
		pos(width() / 2, height() / 2),
		origin("center"),
	])
})
go("main", 0)
