/* global phaser
es un ojeto global, del motor de juegos
que podemos configurar*/
import { createAnimations } from "./animations.js"
import{checkControls}from './controls.js'
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

    this.load.spritesheet(
        'mario',
        'assets/entities/mario.png',
        //indicamos el framewidith, el tamaño de los frames.
        {frameWidth: 18, frameHeight: 16}
    ) 

    this.load.spritesheet(
        'goomba',
        'assets/entities/overworld/goomba.png',
        {frameWidth: 16, frameHeight: 16}
    )

    this.load.audio('game-over', 
        'assets/sound/music/gameover.mp3')


    this.load.audio('jump', 
        'assets/sound/effects/jump.mp3')

    this.load.audio('kick', 
        'assets/sound/effects/kick.mp3')
    

    this.load.audio('theme', 
        'assets/sound/music/overworld/theme.mp3')
    
    this.load.audio('goomba-stomp', 
        'assets/sound/effects/goomba-stomp.wav')

}

function create(){
    
    
    //image(x,y, id-del-asset)

   this.add.image(100,50, 'cloud1')
   //cambiamos el origin para que se empiece a pintar desde la punta izquierda del recurso.
   .setOrigin(0,0)
   //como la imagen es muy grande hay que escalarla:
   .setScale(0.15)

   

   //this.add.tileSprite(0, config.height , config.width, 32, 'floorbricks')
   //.setOrigin(0,1) 
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

   this.enemy=this.physics.add.sprite(120, config.height-30,'goomba')
   .setOrigin(0,1)
   .setGravityY(300)
   .setVelocityX(-50)

   this.physics.world.setBounds(0,0,2000,config.height)
   this.physics.add.collider(this.mario, this.floor)
   this.physics.add.collider(this.enemy,this.floor)
   this.physics.add.collider(this.mario, this.enemy, onHitEnemy, null, this)
   

   this.cameras.main.setBounds(0,0,2000,config.height)
   this.cameras.main.startFollow(this.mario)
    
   createAnimations(this)

   this.enemy.anims.play('goomba-walk', true)
   //creamos el objeto para detectar el teclado.
   this.keys= this.input.keyboard.createCursorKeys()
}
function onHitEnemy(mario, enemy){
    if(mario.body.touching.down && enemy.body.touching.up){
        
        mario.setVelocityY(-200)
        enemy.anims.play('goomba-dead', true)
        setTimeout(()=>{
            enemy.destroy()
        },500)
        enemy.destroy()
        

    }else{
        //muere mario

    }
   }

function update(){
    
    checkControls(this)
    const {mario, sound}=this
    if (mario.isDead) return
    if(mario.y >= config.height){
        
        mario.anims.play('mario-dead',true)
        mario.setCollideWorldBounds(false)
        mario.isDead=true
        //this.sound.play('game-over')
        sound.add('game-over',{volume:0.1}).play()
       
        setTimeout(() =>{
            mario.setVelocityY(-350)
        },100)
        
        setTimeout(()=>{
            this.scene.restart()
        },2000)
        
    }
   
   


}