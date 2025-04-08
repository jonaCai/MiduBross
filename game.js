// global phaser
//es un ojeto global, del motor de juegos
//que podemos configurar
import { createAnimations } from "./animations.js"
import { initAudio, playAudio} from "./audio.js"
import{checkControls}from './controls.js'
import { initSpritesheet } from "./spritesheet.js"

const config = {
    type: Phaser.AUTO ,// webgl, canvas
    width:256,
    height:244,
    backgroundColor:'#049cd8',
    parent:'game',
    physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 300 },
          debug: false
        }
    },
    scene: {
        preload,// funcion que se ejecuta para precargar recursos
        create,// se ejecuta cuando el juego comienza
        update//se ejecuta en cada frame,constantemente.
    }
    



}
//creamos el objeto de phaser con la configuracion

new Phaser.Game(config)
// this es el game, el juego que estamos ejecutando
//cada vez que llamamos a this, se llama al juego.
function preload(){
    this.load.image(
        'cloud1',
        'assets/scenery/overworld/cloud1.png'
    )  
    this.load.image(
        'floorbricks',
        'assets/scenery/overworld/floorbricks.png'
    )
    this.load.image(
        'supermushroom',
        'assets/collectibles/super-mushroom.png'
    )

    initSpritesheet(this)
    
    initAudio(this)    
    
}

function create(){
    
    createAnimations(this)

    //image(x,y, id-del-asset)

   this.add.image(100,50, 'cloud1')
   //cambiamos el origin para que se empiece a pintar desde la punta izquierda del recurso.
   .setOrigin(0,0)
   //como la imagen es muy grande hay que escalarla:
   .setScale(0.15)

   this.floor=this.physics.add.staticGroup() 
   this.floor
   .create(0,config.height-16,'floorbricks')
   .setOrigin(0,0.5)
   .refreshBody()

   this.floor
   .create(150, config.height-16,'floorbricks')
   .setOrigin(0,0.5) 
   .refreshBody()


    //Esto es importante!.
    //guardamos al mario en una variable, un objeto.
    //en este caso nos permite guardarlo en un objeto del juego con this.
    
   this.mario = this.physics.add.sprite(50,100,'mario')
   .setOrigin(0,1)
   .setGravityY(300)//para setear la gravedad en particular.
   .setCollideWorldBounds(true) //no escapa del mundo

   this.enemy=this.physics.add.sprite(130, config.height-40,'goomba')
   .setOrigin(0.5,0.5)
   .setGravityY(300)
   .setVelocityX(-50)
   .setCollideWorldBounds(true)

   this.collectibles =this.physics.add.staticGroup()
   this.collectibles.create(150,150,'coin').anims.play('coin-idle',true)
   this.collectibles.create(180,160,'coin').anims.play('coin-idle',true)
   this.collectibles.create(210,150,'coin').anims.play('coin-idle',true)
   this.collectibles.create(240,160,'coin').anims.play('coin-idle',true)
   this.collectibles.create(270,150,'coin').anims.play('coin-idle',true)   
   this.collectibles.create(200,config.height-40, 'supermushroom').anims.play('supermushroom-idle', true)
   this.physics.add.overlap(this.mario, this.collectibles, collectItem, null, this)


   this.physics.world.setBounds(0,0,2000,config.height)
   this.physics.add.collider(this.mario, this.floor)
   this.physics.add.collider(this.enemy,this.floor)
   this.physics.add.collider(this.mario, this.enemy, onHitEnemy,null, this)
   

   this.cameras.main.setBounds(0,0,2000,config.height)
   this.cameras.main.startFollow(this.mario)
    
  
   this.enemy.anims.play('goomba-walk', true)
   //creamos el objeto para detectar el teclado.
   this.keys= this.input.keyboard.createCursorKeys()
}

function collectItem(mario, item){
    const{texture:{key}}=item
    item.destroy()
    if (key=='coin'){
        
        playAudio('coin-pickup',this.sound, {volume: 0.2})
        addToScore(100, item, this)
    } else if(key=='supermushroom') {
        this.physics.world.pause()
        this.anims.pauseAll()

        
        
        playAudio('powerup',this.sound,{volume:0.2})
        let i=0;
        const interval=setInterval(()=>{
            i++
            mario.anims.play(i%2==0
                ? 'mario-grown-idle'
                :'mario-idle'
            )
            
        },100)

        mario.isBlocked=true
        mario.isGrown=true

        setTimeout(()=>{
            mario.setDisplaySize(18,32)
            mario.body.setSize(18,32)
                        
            this.anims.resumeAll()
            mario.isBlocked = false
            clearInterval(interval)
            this.physics.world.resume()
        },1000)
        

    }
}
    function addToScore (scoreToAdd, origin, game){
        const scoreText= game.add.text(
            origin.x,
            origin.y,
            scoreToAdd,
            {
                fontFamily:'pixel',
                fontSize: config.width / 40
            }
        )
    
    game.tweens.add({
        targets: scoreText,
        duration: 500,
        y: scoreText.y - 20,
        onComplete: () => {
            game.tweens.add({
                targets: scoreText,
                duration:100,
                alpha:0,
                onComplete:()=>{
                    scoreText.destroy()
                    
                }
            })
        }
    })    
}
function onHitEnemy(mario, enemy){
    //console.log(enemy.texture.key) **nos da info de que enemigo colisiona   
    if(mario.body.touching.down && enemy.body.touching.up){
        mario.setVelocityY(-200)
        enemy.anims.play('goomba-dead', true)
        
        playAudio('goomba-stomp',this.sound, {volume: 0.2})
        
        setTimeout(()=>{
            enemy.destroy()
        },500 )
        enemy.setVelocityX(0)
        mario.setVelocityX(0)
        enemy.setVelocityY(-100)        
        addToScore(200, enemy, this)
           
    }else{
        //muere mario
        killMario(this)

    }
   }

function update(){
    
    checkControls(this)
    const {mario,enemy}=this
    
    if(mario.y >= config.height){
        killMario(this)
                
    }
    if(enemy.x<=10){
       enemy.setVelocityX(50)
    }else if(enemy.y+8 >= config.height){
        enemy.anims.play('goomba-dead', true)
        setTimeout(()=>{
            enemy.destroy()
        },500 )
        enemy.setVelocityX(0)        
        enemy.setVelocityY(-100)
    }
      

}
function killMario(game){
    const {mario, sound, scene}= game
    if (mario.isDead) return

    mario.anims.play('mario-dead',true)
    mario.setCollideWorldBounds(false)
    mario.isDead=true
    mario.body.checkCollision.none=true
    mario.setVelocityX(0)
    //this.sound.play('game-over')
    playAudio('gameover', sound, {volume:0.2})
   
    setTimeout(() =>{
        mario.setVelocityY(-350)
    },100)
    
    setTimeout(()=>{
        scene.restart()
    },2000)        
}

