function deepEqual(value1: any, value2: any, depth?: number) {

  if (value1 instanceof Object && value2 instanceof Object) {

    const nextDepth = depth > 0 ? depth - 1 : depth;

    if (value1.constructor !== value2.constructor) return false;

    if (value1 instanceof Array) {
      if (value1?.length !== value2?.length) return false;
      for (const index in value1) {
        if (depth === 0 && value1[index] !== value2[index]) return false;
        else if (deepEqual(value1[index], value2[index], nextDepth)) return false;
        
      }
      return true;
    }

    const keys1 = Object.keys(value1);
    const keys2 = Object.keys(value2);
    if (keys1?.length !== keys2?.length) return false;
    for (const index in keys1) {
      const key = keys1[index];
      if (key !== keys2[index]) return false;
      if (depth === 0 && value1[key] !== value2[key]) return false;
      else if (deepEqual(value1[key], value2[key], nextDepth)) return false;
    }
    return true;

  }

  return value1 === value2;
}

export default deepEqual

// console.log(shallowEqual(
//   1,
//   1
// ) === true);
// console.log(shallowEqual(
//   1,
//   2
// ) === false);
// console.log(shallowEqual(
//   'asd',
//   'asd'
// ) === true);
// console.log(shallowEqual(
//   'asd',
//   'asdf'
// ) === false);
// console.log(shallowEqual(
//   [1, 2],
//   [1, 2]
// ) === true);
// console.log(shallowEqual(
//   [1, 2],
//   [1, 2, 3]
// ) === false);
// console.log(shallowEqual(
//   [1, 2],
//   [1, 3]
// ) === false);
// console.log(shallowEqual(
//   { a: 'asd', b: 'qwe' },
//   { a: 'asd', b: 'qwe' }
// ) === true);
// console.log(shallowEqual(
//   { a: 'asd', b: 'qwe' },
//   { a: 'asd', b: 'asd' }
// ) === false);
// console.log(shallowEqual(
//   { a: 'asd', b: 'qwe' },
//   { a: 'asd', b: 'qwe', c: 'zxc' }
// ) === false);
// console.log(shallowEqual(
//   { 0: 1, 1: 3 },
//   [1, 3]
// ) === false);
// console.log(shallowEqual(
//   'asd',
//   [1, 3]
// ) === false);