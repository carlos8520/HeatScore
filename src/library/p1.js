export function Sum(arr){
  /**
   * Props: An array with values that will be summed
   * 
   * Return: An value that represents the sum of the array
   */
    var res = 0;
    arr.forEach(i => { res+=i; });
    return res;
}

export function Avg(arr){
  /**
   * Props: An array with values that will be calculated
   * 
   * Return: The average of the array
   */
  return Sum(arr)/arr.length;
}

export function Var(arr){
  /**
   * Props: An array with the values 
   * 
   * Return: the Standard Variation of the values in the array
   */
  var sum = 0,
      n = arr.length,
      avg = Avg(arr);

  for(var i = 0 ; i < n ; i++)
    sum+=Math.pow((arr[i]-avg),2);
  return sum/(n-1);
}