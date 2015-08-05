# genome

Generator based utility belt

[![Build Status](https://travis-ci.org/fleekjs/genome.svg?branch=master)](https://travis-ci.org/fleekjs/genome) [![npm](https://img.shields.io/npm/l/express.svg)](https://github.com/fleekjs/genome/blob/master/LICENSE)  [![Dependencies](https://img.shields.io/david/fleekjs/genome.svg)](https://david-dm.org/fleekjs/genome)

`$ npm install genome`

# Key

- [Usage](#usage)
  - [Direct](#direct)
  - [Module Extention](#moduleextension)
- [Utilities](#utilities)
  - [Synchronous](#Synchronous)
    - [Mixed](#mixed-synchronous)
      - [each](#each)
      - [map](#map)
  - [Asynchronous](#Synchronous)
    - _Coming Soon_
  - [Miscellaneous](#miscellaneous)
    - [isGenerator](#isgenerator)
    - [inject](#inject)

# Usage

### Direct

```javascript
  'use strict'

  let genome  = require('genome');
  let fooFunc = function *(someSet) {
    return yield genome.map(someSet, function *(value, index) {
      return yield someGeneratorFunction('foo', 'bar', value);  
    });
  }
```

### Module Extension

```javascript
  'use strict'

  let _       = require('lodash');
  let genome  = require('genome');

  genome.inject(lodash);

  _.each(someSet, function () { }); //existing
  _.isGenerator(mightBeAGenerator) // injected
  function *() {
    return yield _.genome.map(someSet, function *(value, index) {  }); // injected to .genome property (name collision)
  }
```


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

## Asynchronous

**Coming Soon**

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

#### `inject`

- Parameters
  - [Required] [Object] - object to inject properties to
- Functionality
  - Inject properties into target Object
  - Collision in property name move genome property to the `.genome` property
- Returns
  - target object with injected properties

```javascript
  'use strict'

  let test   = { each : function () { return 'Original Each'; } };
  let genome = require('genome');

  genome.inject(test);

  console.log(test.each()); // => "Original Each"
  console.log(test.isGenerator(function () {})) // => "false"
  console.log(test.isGenerator(test.genome.each)) // => "true"
   ```

# Authors

- John Hofrichter
