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

## Part 3: React integration

This section involves integrating your list filtering/sorting solution from the previous step into the React widget that you've styled up.

The app structure is already in place; your task is to add the functionality described in bullet points below:

### Filtering results based on user input

The `PositionGrid` component renders a list of positions passed into its `positions` prop, and the `SearchInput` is intended to allow the user to type in their search string.

You will need to add the filtering behaviour so that the grid results are filtered based on the user's search string.

- The existing `SearchInput` component currently isn't hooked up to filter the grid. You'll need to address this.
- You can perform the filtering using the `createTransform` function that you wrote in the previous step

### Performance optimisation and testing

- We're keen to assess your understanding of how to write performant React components. Assume your solution will be used as part of a complex UI, making sure that your decisions will not impact the rendering performance of other components due to unnecessary re-renders.
- Add some unit tests to [`SearchInput.test.tsx`](./src/components/SearchInput.test.tsx) to cover the basic behaviour of the search input component.

### Additional notes

- For any performance optimisations, it's safe to assume that individual `Position` objects are immutable
- [react-testing-library](https://testing-library.com/docs/react-testing-library/intro/) is installed in the project dependencies to simplify testing components (see [`SearchInput.test.tsx`](./src/components/SearchInput.test.tsx) for a usage example)
- Your unit tests for the search input component should verify the general functionality for that component, but don't worry about unlikely edge cases / 100% test coverage etc.
- There's no need to add any integration/end-to-end tests; you can assume all the other components apart from `SearchInput` have been tested separately

---

Once you are happy with your answer, run the following commands to update this `README.md` for the next step:

```
git add .
git commit --allow-empty -m "End of part 3"
git cherry-pick submit --strategy-option=theirs
```