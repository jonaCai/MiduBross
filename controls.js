export function checkControls({mario, keys, sound}){
       
    if (mario.isDead) return
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
        mario.setFrame('mario-idle', true)
    }
    if (keys.up.isDown && mario.body.touching.down){
        mario.setVelocityY(-250)
        mario.anims.play('mario-jump',true)
        sound.add('jump',{volume:0.1}).play()
    }
   /* mi humilde solucion a la animacion del salto
    if(mario.body.touching.down==false){
        mario.anims.play('mario-jump',true)
    }*/
}