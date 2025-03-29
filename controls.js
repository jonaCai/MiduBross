export function checkControls({mario, keys, sound}){
       

    if (keys.left.isDown){
        mario.anims.play('mario-walk',true)
        mario.x -=2
        mario.flipX=true//para girar la animacion
     
        
    }else if (keys.right.isDown){
        mario.anims.play('mario-walk',true)
        mario.x +=2
        mario.flipX=false
     
    }else{
        mario.anims.stop()
        mario.setFrame('mario-idle', true)
    }
    if (keys.up.isDown && mario.body.touching.down){
        mario.setVelocityY(-250)
        mario.anims.play('mario-jump',true)
        sound.add('jump',{volume:0.1}).play()
    }
    if(mario.body.touching.down==false){
        mario.anims.play('mario-jump',true)
    }
}