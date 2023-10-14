type audiotrace = 'none'
type musictrace = 'none' | 'theme' | 'fight' | 'sleep'
const musicList:musictrace[] = ['theme','fight', 'sleep']

const getMusicPath = (m:musictrace)=>{
    let path='/music/'
    switch (m) {
        case 'theme':
            path+='chocotheme.mp3'
            break;
        case 'fight':
            path+='chocofight.mp3'
            break;
        case 'sleep':
            path+='chocosleep.mp3'
            break;
        default:
            break;
    }
    return path
}

const getAudioPath = (a:audiotrace)=>{
    let path='/audio/'
    switch (a) {
        case 'none':
            path+='chocotheme.mp3'
            break;
        default:
            break;
    }
    return path
}

export type {audiotrace, musictrace}
export {getMusicPath, getAudioPath, musicList}