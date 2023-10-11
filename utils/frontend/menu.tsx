const shiftMenu = (array:any[], left:boolean) =>{//really bad shift array function
    return left ?
     [array[0]-1,array[0],array[1]]
    :
     [array[1],array[2],array[2]+1]
}

export {shiftMenu}