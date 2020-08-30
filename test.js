"use strict";
import * as fun from './data.js';

// counterGenre 
test('returns a number of times the value is in the array', () => {
    expect(fun.countGenre([1,1,3,4,2,1,3], 1)).toBe(1);
});