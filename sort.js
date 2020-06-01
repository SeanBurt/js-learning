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

/**
 * quick sort
 *
 * @param {array} 等待排序的数组
 * @param {number} 左索引
 * @param {number} 右索引
 * @return {array} 排序产出的数组
 */
function quickSort(arr, left, right) {
  let len = arr.length;
  let partitionIndex = 0;
  left = typeof left !== "number" ? 0 : left;
  right = typeof right !== "number" ? len - 1 : right;
  if (left < right) {
    partitionIndex = partition(arr, left, right);
    quickSort(arr, left, partitionIndex - 1);
    quickSort(arr, partitionIndex + 1, right);
  }
  return arr;
}
function partition(arr, left, right) {
  let pivot = left,
    index = pivot + 1;
  for (let i = index; i <= right; i++) {
    if (arr[i] < arr[pivot]) {
      swap(arr, i, index);
      index++;
    }
  }
  swap(arr, pivot, index - 1);
  return index - 1;
}
function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
