const INIT_SPRITESHETS=[
{
    key:'goomba',
    path:'assets/entities/overworld/goomba.png',
    frameWidth:16,
    frameHeight:16
},
{
    key:'mario',
    path:'assets/entities/mario.png',
    frameWidth:18,
    frameHeight:16

},
{
    key:'coin',
    path:'assets/collectibles/coin.png',
    frameWidth:16,
    frameHeight:16

},

]

export const initSpritesheet=({load})=>{
    INIT_SPRITESHETS.forEach(({key,path,frameWidth,frameHeight})=> 
    {
        load.spritesheet(key , path , {frameWidth , frameHeight})
    })

}