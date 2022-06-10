kaboom();

loadSprite("link", "link.png")

const SPEED = 120
const player = add([
	sprite("link"),
	pos(80,40),
	area(),
	// body()
])

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
