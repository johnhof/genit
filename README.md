# genome

Generator based utility belt

# DO NOT USE. STILL IN PRE-PRODUCTION

# Contributing

To contribute, your PR must
- Have a test description for added functionality
  - Covering each test case
  - in the appropriate file in `/tests/`
- Have a documentation entry below
  - Placed into the proper section

refer to `each` and `map` for examples


# Key

- [Utilities](#utilities)
  - [Synchronous](#Synchronous)
    - [Mixed](#mixed-synchronous)
      - [each](#each)
      - [map](#map)
    - [Array](#array-synchronous)
    - [Object](#object-synchronous)
  - [Asynchronous](#Synchronous)
    - [Mixed](#mixed-asynchronous)
    - [Array](#array-asynchronous)
    - [Object](#object-asynchronous)
  - [Miscellaneous](#miscellaneous)
    -  [isGenerator](#isgenerator)

# Utilities

## Synchronous

### Mixed Synchronous

#### `each`

- Parameters
  - [Required] [Mixed] - Collection to operate on,
  - [Required] [Generator Function] - Operation to perform
- Functionality
  - Iterates over every item in the collection (objec tor array)
  - Executes the operation on each item
- Returns
  - Undefined

```javascript
yield genome.each([one, two, three], function *(value, index) {
  console.log(index + ' = ' + this + ' ~ ' + value);
});
// console:
// 1 = one ~ one
// 2 = two ~ two
// 3 = three ~ three

yield genome.each({ one:'foo', two:'bar', three:'biz' }, function *(value, key) {
  console.log(key + ' = ' + this + ' ~ ' + value);
});
// console:
// one = foo ~ foo
// two = bar ~ bar
// three = biz ~ biz
```

#### `map`

- Parameters
  - [Required] [Mixed] - Collection to operate on,
  - [Required] [Generator Function] - Operation to perform
- Functionality
  - Iterates over every item in the collection (objec tor array)
  - Executes the operation on each item
  - Returned value is added to the resulting array
- Returns
  - Array of values returned

```javascript
let result = yield genome.each(['one', 'two', 'three'], function *(value, index) {
  console.log(index + ' = ' + this + ' ~ ' + value);
  return index * 2;
});
// console:
// 1 = one ~ one
// 2 = two ~ two
// 3 = three ~ three
console.log(result);
// console:
// [0, 1, 2]

let result = yield genome.each({ one:'foo', two:'bar', three:'biz' }, function *(value, key) {
  console.log(key + ' = ' + this + ' ~ ' + value);
  return value;
});
// console:
// one = foo ~ foo
// two = bar ~ bar
// three = biz ~ biz
console.log(result);
// console:
// ['foo', 'bar', 'biz']
```

### Array Synchronous

### Object Synchronous

## Asynchronous

### Mixed Synchronous

### Array Synchronous

### Object Synchronous

## Miscellaneous

#### `isGenerator`


- Parameters
  - [Required] [Mixed] - object to type check
- Functionality
  - Test whether or not a function is a generator
- Returns
  - Boolean of generator status

```javascript
let result = yield genome.isGenerator(function () {});
console.log(result); // => false

let result = yield genome.isGenerator(function *() {});
console.log(result); // => true
```

# Authors

- John Hofrichter
