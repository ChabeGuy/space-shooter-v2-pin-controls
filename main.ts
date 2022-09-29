input.onPinPressed(TouchPin.P0, function () {
    Player.turn(Direction.Left, 90)
    Player.move(1)
    Player.turn(Direction.Right, 90)
})
input.onButtonPressed(Button.A, function () {
	
})
input.onGesture(Gesture.TiltLeft, function () {
	
})
input.onPinPressed(TouchPin.P2, function () {
    if (Started == true) {
        Laser = game.createSprite(Player.get(LedSpriteProperty.X), Player.get(LedSpriteProperty.Y) - 1)
        Laser.turn(Direction.Left, 90)
        while (!(Laser.get(LedSpriteProperty.Y) <= 0)) {
            basic.pause(100)
            Laser.move(1)
            for (let Asteroid of Asteroids) {
                if (Laser.isTouching(Asteroid)) {
                    Asteroid.delete()
                    Laser.delete()
                    game.addScore(1)
                    music.playSoundEffect(music.createSoundEffect(WaveShape.Sawtooth, 646, 0, 255, 0, 500, SoundExpressionEffect.Tremolo, InterpolationCurve.Logarithmic), SoundExpressionPlayMode.InBackground)
                }
            }
        }
        if (Laser.get(LedSpriteProperty.Y) <= 0) {
            Laser.delete()
        }
    }
})
input.onPinPressed(TouchPin.P1, function () {
    Player.turn(Direction.Right, 90)
    Player.move(1)
    Player.turn(Direction.Left, 90)
})
input.onGesture(Gesture.TiltRight, function () {
	
})
let Time = 0
let Laser: game.LedSprite = null
let Player: game.LedSprite = null
let Asteroids: game.LedSprite[] = []
let Started = false
Started = false
game.setLife(3)
Asteroids = []
music.playSoundEffect(music.builtinSoundEffect(soundExpression.giggle), SoundExpressionPlayMode.UntilDone)
Started = true
Player = game.createSprite(2, 4)
Player.turn(Direction.Left, 90)
for (let Rows = 0; Rows <= 1; Rows++) {
    for (let Asteroid = 0; Asteroid <= 4; Asteroid++) {
        Asteroids.push(game.createSprite(Asteroid, Rows))
    }
}
let Elapsed = input.runningTime()
basic.forever(function () {
    if (game.score() >= 10) {
        Started = false
        Time = input.runningTime() - Elapsed
        Player.delete()
        for (let Asteroid of Asteroids) {
            Asteroid.delete()
        }
        basic.clearScreen()
        music.playSoundEffect(music.builtinSoundEffect(soundExpression.twinkle), SoundExpressionPlayMode.InBackground)
        basic.showString("YOU WIN")
        while (Started == false) {
            basic.showString("TIME:")
            basic.showString("" + Time / 1000 + " SECONDS")
        }
    }
})
