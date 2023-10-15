type audiotrace = 'none' | 'fail' | 'hatching' | 'jingle1' | 'jingle2' | 'jingle3'
const audioList:audiotrace[] = [ 'fail' , 'hatching' , 'jingle1' , 'jingle2' , 'jingle3']
type musictrace = 'none' | 'theme' | 'fight' | 'sleep' | 'egg'
const musicList:musictrace[] = ['theme','fight', 'sleep', 'egg']


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
        case 'egg':
            path+='chocoegg.mp3'
            break;
        default:
            break;
    }
    return path
}

const getAudioPath = (a:audiotrace)=>{
    let path='/audio/'
    switch (a) {
        case 'fail':
            path+='fail.mp3'
            break;
        case 'hatching':
            path+='hatching.mp3'
            break;
        case 'jingle1':
            path+='jingle1.mp3'
            break;
        case 'jingle2':
            path+='jingle2.mp3'
            break;
        case 'jingle3':
            path+='jingle3.mp3'
            break;
        case 'none':
            path+='fail.mp3'
            break;
        default:
            break;
    }
    return path
}

export type {audiotrace, musictrace}
export {getMusicPath, getAudioPath, musicList, audioList}