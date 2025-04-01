const INIT_AUDIOS= [
{
    key: 'gameover',
    path: 'assets/sound/music/gameover.mp3'
},
{
    key: 'jump', 
    path: 'assets/sound/effects/jump.mp3'
},
{
    key: 'kick', 
    path: 'assets/sound/effects/kick.mp3'
},
{
    key: 'goomba-stomp', 
    path: 'assets/sound/effects/goomba-stomp.wav'
}
]
export const initAudio= ({ load })=>{
    INIT_AUDIOS.forEach(({ key , path} )=>
    {
        load.audio(key , path)
    })
}    
export const playAudio=(id,  sound , { volume = 1 }={})=>{
    try{
        sound.add(id, { volume }).play()

    }catch (e)
    {
        console.error(e)
    }
}