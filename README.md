# Marshall Wace UI Developer technical test

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the Vitest test runner in the interactive watch mode.\
More information on the test setup can be found in the Vitest [documentation](https://vitest.dev/guide/).

---

## Part 2: filtering/sorting lists (vanilla TypeScript)

### Background

In this scenario, we intend to use our dashboard widget to allow Marshall Wace portfolio managers to see a list of all the positions within a given porfolio.

Each position contains a unique `id`, an uppercase `ticker`, a human-readable `name`, and the current `exposure` (as an integer number of shares):

```
interface Position {
  id: string;
  ticker: string;
  name: string;
  exposure: number;
}
```

Here's an example position:

```
{
  "id": "b400dcd7-0d2c-4a09-a982-497fea0df1b7",
  ticker: "AAPL",
  name: "Apple Inc",
  exposure: 8135012
}
```

The dashboard widget has already been shared with a test user base for feedback, however without the search filtering working our beta users are finding it hard to quickly pinpoint the positions they're interested in.

We plan to address this by implementing filtering and sorting for the position list. Our implementation will allow the user to type into a text input field to display only the positions that match the given search string. The positions will be ranked so that the most relevant results will appear first.

We'll hook up the UI in the next step; for now you need to provide a function that can be used to filter and sort a list of positions based on a given search string.

### Desired solution

Here is an example of how your solution will be used:

```typescript
// The raw list of unfiltered positions will come from some external source
const positions: Array<Position> = await fetchPositions();

// The search string will come from the current UI state
const filterText: string = 'aapl';

// First we create a reusable 'transform' function based on the current search string...
const transform = createTransform(filterText);

// ...which we can then apply to the list of all positions to get the filtered/sorted results
const filteredPositions = transform(positions);

// Note that this same transform function can be reused on a different array of positions some time in the future
setTimeout(() => {
  const updatedPositions = await fetchPositions();
  const updatedResults = transform(updatedPositions);
}, 1000);
```

Your task is to implement the `createTransform` function shown in the above example.

All implementation requirements are laid out in the bullet points that follow.

### Expected form

The `createTransform` function has the following signature:

```typescript
function createTransform(searchText: string): (positions: Array<Position>) => Array<Position>;
```

- `createTransform` accepts a single string argument, the user-provided search string. If the user has not filtered the results, the search string will be the empty string (`""`).

- It must return a function that transforms an unfiltered array of all `Position` objects into a filtered and sorted array (according to the rules explained below).

- The function returned by `createTransform` must be a pure function that can be reused across different input arrays. It must not mutate the input array.

- The positions list will not contain any duplicate entries with the same `ticker` or `name`

### Filtering rules

When the user has provided a search string, we only return the positions that match the given search string, where a match is determined as follows:

- The search string may occur either in the `ticker` or the `name`.

- The match is case-insensitive (for both `ticker` and `name`).

- When matching against the `ticker`, the ticker must start with the given input string
    > Example: a position with the ticker `"AAPL"` would match the search string `"aap"` but not `"apl"`

- When matching against the `name`, the search string can occur anywhere in the name field
    > Example: a position with the name `"Apple Inc"` would match the search strings `"appl"` and "`ppl`"

- If the user-provided search string is empty, all the positions should be returned.

### Sorting rules

When the user has provided a search string, the results should be sorted according to the following priority (highest to lowest):

1. Exact `ticker` match
    > Example: for a position with the ticker `"AAPL"`, user searches for `"aapl"`
2. `ticker` starts with given search string
    > Example: for a position with the ticker `"AAPL"`, user searches for `"aap"`
3. `name` starts with given search string
    > Example: for a position with the name `"Apple Inc"`, user searches for `"appl"`
4. `name` contains given search string but not at the start
    > Example: for a position with the name `"Apple Inc"`, user searches for `"ppl"`

- If after evaluating each of these sort criteria two positions result in a tie, those positions should retain the order they occur in the input array

- If the user-provided search string is empty, the positions should be returned in their original order.

### Additional notes

- Your solution should be written in vanilla TypeScript (no libraries)
- Don't worry about the the performance of the sort algorithm itself (native JS `Array.prototype.sort` is fine)
- You can assume a modern JavaScript runtime (also note that as of ES2019, `Array.prototype.sort` is a stable sort)
- Add your solution in [`src/utils/transform.ts`](./src/utils/transform.ts)
- We recommend writing unit tests in [`src/utils/transform.test.ts`](./src/utils/transform.test.ts) to verify that your solution works as intended
- Unit tests should verify the general functionality, but there's no need to worry about exhaustively testing all possibilities / 100% test coverage etc
- If you need to create any other files, put them in the `src/utils` directory
- You can start the test runner with `npm test`

---

Once you are happy with your solution, run the following commands to update this `README.md` for the next step:

```
git add .
git commit --allow-empty -m "End of part 2"
git cherry-pick part3 --strategy-option=theirs
```