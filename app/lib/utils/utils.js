// This file contains util functions

export const count = (arr, target) => {
    let n = arr.length
    let ans = 0
    for(let i = 0; i < n; i++) {
        if(arr[i] === target) {
            ans++
        }
    }

    return ans
}  