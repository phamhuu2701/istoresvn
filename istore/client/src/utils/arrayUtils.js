// get array by size
export function getNewArrayBySize(array, firstIndex, size){
    let newArray = [];
    if(array.length - firstIndex > size){
        for(let i=firstIndex; i<(firstIndex+size); i++){
            newArray.push(array[i]);
        }
    }
    else{
        for(let i=firstIndex; i<array.length; i++){
            newArray.push(array[i]);
        }
    }
    // console.log(newArray);
    return newArray;
}