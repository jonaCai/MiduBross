/* global phaser
es un ojeto global, del motor de juegos
que podemos configurar*/

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

}

function create(){
    //image(x,y, id-del-asset)
   this.add.image(100,50, 'cloud1')
   //cambiamos el origin para que se empiece a pintar desde la punta izquierda del recurso.
   .setOrigin(0,0)
   //como la imagen es muy grande hay que escalarla:
   .setScale(0.15)

   

   this.add.tileSprite(0, config.height , config.width, 32, 'floorbricks')
   .setOrigin(0,1) 
    //Esto es importante!.
    //guardamos al mario en una variable, un objeto.
    //en este caso nos permite guardarlo en un objeto del juego con this.
    
   this.mario = this.add.sprite(50,210,'mario')
   .setOrigin(0,1)
   

    //animaciones mario
    this.anims.create({
        key:'mario-walk',
        frames:this.anims.generateFrameNumbers(
            'mario',
            {start:3,end:2}
        ),
        repeat: -1 //infinito
    })
    this.anims.create({
        key:'mario-jump',
        frames: [{key:'mario',frame:5}]               
        
    })


   //creamos el objeto para detectar el teclado.
   this.keys= this.input.keyboard.createCursorKeys()


}

function update(){
    if (this.keys.left.isDown){
        this.mario.anims.play('mario-walk',true)
        this.mario.x -=2
        this.mario.flipX=true//para girar la animacion
        
    }else if (this.keys.right.isDown){
        this.mario.anims.play('mario-walk',true)
        this.mario.x +=2
        this.mario.flipX=false
    }else{
        this.mario.anims.stop()
        this.mario.setFrame(0)
    }
    if (this.keys.up.isDown){
        this.mario.y -=5
        this.mario.anims.play('mario-jump',true)
    }

}