/**
 * bubble sort
 *
 * @param {array} 等待排序的数组
 * @return {array} 排序产出的数组
 */
let ary = [9, 1, 4, 7, 2, 8, 3];
function bubble(ary) {
  for (let i = 0, l = ary.length; i < l; i++) {
    for (let j = 0, m = l - 1 - i; j < m; j++) {
      if (ary[j] < ary[j + 1]) {
        ary[j] = ary[j + 1] + 0 * (ary[j + 1] = ary[j]);
      }
    }
  }
  return ary;
}
console.log(bubble(ary));

/**
 * select sort
 *
 * @param {array} 等待排序的数组
 * @return {array} 排序产出的数组
 */
function select(ary) {
  let minIndex = null;
  let temp = null;
  for (let i = 0, l = ary.length; i < l; i++) {
    minIndex = i;
    for (let j = i + 1; j < l; j++) {
      if (ary[j] < ary[minIndex]) {
        minIndex = j;
      }
    }
    temp = ary[i];
    ary[i] = ary[minIndex];
    ary[minIndex] = temp;
  }
  return ary;
}
console.log(select(ary));
