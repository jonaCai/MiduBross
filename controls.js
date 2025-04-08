import { playAudio } from "./audio.js"
const MARIO_ANIMATION= {
    grown:{
        idle:'mario-grown-idle',
        walk:'mario-grown-walk',
        jump:'mario-grown-jump',
        down:'mario-grown-down'

    },
    normal:{
        idle:'mario-idle',
        walk:'mario-walk',
        jump:'mario-jump'

    }
}

export function checkControls({mario, keys, sound}){
       
    if (mario.isDead) return
    if (mario.isBlocked)return

    const marioAnimations=mario.isGrown
        ? MARIO_ANIMATION.grown
        : MARIO_ANIMATION.normal

    if (keys.left.isDown){
        if (keys.down.isDown){

        }else{
            mario.body.touching.down && mario.anims.play(marioAnimations.walk,true)
            mario.x -=2
            mario.flipX=true//para girar la animacion

        }
        
     
        
    }else if (keys.right.isDown){
        if (keys.down.isDown){

        }else{
            mario.body.touching.down && mario.anims.play(marioAnimations.walk,true)
            mario.x +=2
            mario.flipX=false

        }
        
     
    }else if(mario.body.touching.down){
        mario.anims.stop()
        mario.anims.play(marioAnimations.idle, true)
    }
    if (keys.up.isDown && mario.body.touching.down){
        mario.setVelocityY(-250)
        mario.anims.play(marioAnimations.jump,true)
        
        playAudio('jump', sound, {volume: 0.2})
    }
    if(keys.down.isDown){
     
        mario.setVelocityX(0)
        mario.anims.play(marioAnimations.down,true)
    }
  
}