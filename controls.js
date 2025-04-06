import { playAudio } from "./audio.js"
const MARIO_ANIMATION= {
    grown:{
        idle:'mario-grown-idle',
        walk:'mario-grown-idle',
        jump:'mario-grown-idle'

    },
    normal:{
        idle:'mario-idle',
        walk:'mario-walk',
        jump:'mario-jump'

    }
}

export function checkControls({mario, keys, sound}){
       
    if (mario.isDead) return

    const marioAnimations=mario.isGrown
        ? MARIO_ANIMATION.grown
        : MARIO_ANIMATION.normal

    if (keys.left.isDown){

        mario.body.touching.down && mario.anims.play('mario-walk',true)
        mario.x -=2
        mario.flipX=true//para girar la animacion
     
        
    }else if (keys.right.isDown){
        mario.body.touching.down && mario.anims.play('mario-walk',true)
        mario.x +=2
        mario.flipX=false
     
    }else if(mario.body.touching.down){
        mario.anims.stop()
        mario.anims.play(marioAnimations.idle, true)
    }
    if (keys.up.isDown && mario.body.touching.down){
        mario.setVelocityY(-250)
        mario.anims.play('mario-jump',true)
        
        playAudio('jump', sound, {volume: 0.2})
    }
  
}