# Sort By Multiple Criteria

## Prerequisite
JavaScript's sort function can receive a custom sort function. This custom sort function takes two arguments (X and Y) and returns a negative number if X should come before Y, a positive number if X should come after Y, or zero if they are equivalent.

## Goal
Create a function that generates a custom sort function using data mappers and sort order specifications.

## Implementation
Instead of using separate arrays for mappers and sort orders, we use an array of objects that each contain a mapper function and sort order:

```javascript
[
  {mapper: (json) => json.name.length, order: "desc"},
  {mapper: (json) => json.height > 180, order: "asc"},
  {mapper: (json) => json.date, order: "desc"},
]
```

This approach keeps related information together and prevents issues with mismatched array lengths.

## Code

```javascript
/**
 * Creates a sorting function based on multiple criteria
 * @param {Array<{mapper: Function, order: string}>} sortCriteria - Array of sorting criteria
 * @returns {Function} Sorting function
 */
function createMultiSortFunction(sortCriteria) {
  return function(a, b) {
    for (const { mapper, order } of sortCriteria) {
      const valueA = mapper(a);
      const valueB = mapper(b);
      
      // Skip to next criterion if values are equal
      if (valueA === valueB) continue;
      
      // Determine sort direction based on order
      const sortDirection = order.toLowerCase() === "asc" ? 1 : -1;
      
      // For boolean values, true comes before false in ascending order
      if (typeof valueA === "boolean") {
        return ((valueA === valueB) ? 0 : (valueA ? -1 : 1)) * sortDirection;
      }
      
      // For other comparable values
      return ((valueA > valueB) ? 1 : -1) * sortDirection;
    }
    
    // If all criteria are equal
    return 0;
  };
}
```

## Example Usage

```javascript
const data = [
  { name: "Alice", date: new Date(2023, 5, 15), height: 165 },
  { name: "Bob", date: new Date(2023, 5, 14), height: 185 },
  { name: "Charlie", date: new Date(2023, 5, 15), height: 175 }
];

const sortCriteria = [
  { mapper: (item) => item.name.length, order: "desc" }, // Sort by name length (longest first)
  { mapper: (item) => item.height > 180, order: "asc" }, // People under 180 height first
  { mapper: (item) => item.date, order: "desc" }         // Most recent date first
];

// Apply sorting
const sortedData = data.sort(createMultiSortFunction(sortCriteria));
console.log(sortedData);
```

## Notes
- This implementation provides an unstable sort, meaning the original order of equal elements is not guaranteed to be preserved.
- The sort is applied sequentially through each criterion until a difference is found.
- The sort order can be specified as "asc" (ascending) or "desc" (descending) for each criterion.


*Generated with assistance from Claude*

