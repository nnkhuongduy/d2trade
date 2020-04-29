function swap(items, leftIndex, rightIndex) {
  var temp = items[leftIndex];
  items[leftIndex] = items[rightIndex];
  items[rightIndex] = temp;
}

function partition(items, left, right, filter) {
  var pivot = items[Math.floor((right + left) / 2)][`${filter.option}`], //middle element
    i = left, //left pointer
    j = right; //right pointer
  while (i <= j) {
    while ((filter.state === "Ascending" && items[i][`${filter.option}`] < pivot) || (filter.state === "Descending" && items[i][`${filter.option}`] > pivot)) {
      i++;
    }
    while ((filter.state === "Ascending" && items[j][`${filter.option}`] > pivot) || (filter.state === "Descending" && items[j][`${filter.option}`] < pivot)) {
      j--;
    }
    if (i <= j) {
      swap(items, i, j); //sawpping two elements
      i++;
      j--;
    }
  }
  return i;
}

export function userQuickSort(items, left, right, filter) {
  var index;
  if (items.length > 1) {
    index = partition(items, left, right, filter); //index returned from partition
    if (left < index - 1) { //more elements on the left side of the pivot
      userQuickSort(items, left, index - 1, filter);
    }
    if (index < right) { //more elements on the right side of the pivot
      userQuickSort(items, index, right, filter);
    }
  }
  return items;
}