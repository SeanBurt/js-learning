/**
 * bubble sort
 * 
 * @param {array} 等待排序的数组
 * @return {array} 排序产出的数组
 */
let ary = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48]
function bubbleSort(ary) {
    for(let i=0,l=ary.length; i<l; i++) {
        for(let j=0,m=ary.length-1-i; j<m; j++) {
            if(ary[j] > ary[j+1]) {
                ary[j] = ary[j+1] + (ary[j+1]=ary[j])*0
            }
        }
    }
    return ary
}
console.log(bubbleSort(ary))
