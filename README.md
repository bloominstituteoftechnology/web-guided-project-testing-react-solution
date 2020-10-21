# Space X - Testing React Testing Library II

# Testing React

### Repos

Starter Project Repo: https://github.com/LambdaSchool/Space-X-Web-GuidedProject

Solution Project Repo: (This repo 😉)

### Testing prop changes

1. Look through the app with the students. Make sure you and they understand where the data is, where it's being fetched, where the data is being passed to, etc.

2. Since we want to test prop changes, we need to test a component that has props. We'll start by testing the `MissionForm` component.

- create a `MissionForm.test.js` file
- import React, import { render }, and import the component
- Start building the first test (Note that we render the component and pass in props, just like we would in a parent component):

```jsx
test("Missions list shows data when rerendered with new missions data", () => {
  const {} = render(<MissionsList error="" missions={[]} />);
});
```

3. When we run this test, we pass in an empty state to mimick the "starting" state of the component
4. Write some assertions for our empty/starting state ( you will need to write in the `data-testid`'s in the component as show in this repo):

```jsx
test("Missions list shows data when rerendered with new missions data", () => {
  const { queryAllByTestId } = render(<MissionsList error="" missions={[]} />);

  // assert that there are no missions listed when the component first renders
  // queryBy, something that returns an array if more than one match ("All" query)
  expect(queryAllByTestId("mission")).toStrictEqual([]);
  expect(queryAllByTestId("mission")).toHaveLength(0);
});
```

_You may want to explain why we are using `queryAllByTestId` (or even let students try and figure out what query to use 😁) - if there is no match found, a `queryBy` function will return an empty array, making it easy for us to test something that is **not** there_

**Run tests to make sure they are passing. Break tests for our sanity check**

4. When the `App` component finishes fetching the data for the missions, `MissionList` will receive new props. Let's add that to our test.

- get the `rerender` function from where we are rendering the component: `const { queryAllByTestId, rerender } = render(...)`
- use that function to rerender the component with new props

```jsx
test("Missions list shows data when rerendered with new missions data", () => {
  const { queryAllByTestId, rerender } = render(
    <MissionsList error="" missions={[]} />
  );

  // assert that there are no missions listed when the component first renders
  // queryBy, something that returns an array if more than one match ("All" query)
  expect(queryAllByTestId("mission")).toStrictEqual([]);
  expect(queryAllByTestId("mission")).toHaveLength(0);

  rerender(<MissionsList error="" missions={???} />);
});
```

5. What do we pass in as the `missions` data? Build a simple array with > 1 object to pass into the prop. I usually define these outside of the test, in case I can reuse that mock data in a different test

```js
const missions = [
  {
    mission_name: "Thaicom",
    mission_id: "9D1B7E0",
    manufacturers: ["Orbital ATK"],
    payload_ids: ["Thaicom 6", "Thaicom 8"],
    wikipedia: "https://en.wikipedia.org/wiki/Thaicom",
    website: "http://www.thaicom.net/en/satellites/overview",
    twitter: "https://twitter.com/thaicomplc",
    description:
      "Thaicom is the name of a series of communications satellites operated from Thailand, and also the name of Thaicom Public Company Limited, which is the company that owns and operates the Thaicom satellite fleet and other telecommunication businesses in Thailand and throughout the Asia-Pacific region. The satellite projects were named Thaicom by the King of Thailand, His Majesty the King Bhumibol Adulyadej, as a symbol of the linkage between Thailand and modern communications technology."
  },
  {
    mission_name: "Telstar",
    mission_id: "F4F83DE",
    manufacturers: ["SSL"],
    payload_ids: ["Telstar 19V", "Telstar 18V"],
    wikipedia: "https://en.wikipedia.org/wiki/Telesat",
    website: "https://www.telesat.com/",
    twitter: null,
    description:
      "Telstar 19V (Telstar 19 Vantage) is a communication satellite in the Telstar series of the Canadian satellite communications company Telesat. It was built by Space Systems Loral (MAXAR) and is based on the SSL-1300 bus. As of 26 July 2018, Telstar 19V is the heaviest commercial communications satellite ever launched, weighing at 7,076 kg (15,600 lbs) and surpassing the previous record, set by TerreStar-1 (6,910 kg/15230lbs), launched by Ariane 5ECA on 1 July 2009."
  }
];
```

Now the test will look like this:

```jsx
test("Missions list shows data when rerendered with new missions data", () => {
  const { queryAllByTestId, rerender } = render(
    <MissionsList error="" missions={[]} />
  );

  // assert that there are no missions listed when the component first renders
  // queryBy, something that returns an array if more than one match ("All" query)
  expect(queryAllByTestId("mission")).toStrictEqual([]);
  expect(queryAllByTestId("mission")).toHaveLength(0);

  rerender(<MissionsList error="" missions={missions} />);

  expect(queryAllByTestId("mission")).toHaveLength(2);
});
```

At this point you can ask something like "What other assertions could we write here?"

### Using Mocks

I use the TK to explain the importance of mocks. The example with the UUID library is a great example to show the why. I also explain that another use case for mocks is for async operations.

1. After explaining why we use mocks, I start testing the `App` component where we are making a fetch request.

- Create an `App.test.js` file
- Add the normal imports and start a test function

2. In order to test the API call easier, we have set up the async function in a separate `/api` directory. This helps us isolate the function so we can mock it. (This can also be acheived using axios' mock function - students can look that up on their own).

3. `App.js` is importing a dependency! `fetchMissions`! Our test will need to import it as well so we can mock it.

- `import { fetchMissions as mockFetchMissions } from "./api/fetchMissions";`
- we rename the function so we now it's the function being mocked
- Use `jest.mock` to mock the function - `jest.mock("./api/fetchMissions");`
- I like to `console.log(mockFetchMissions)` and show students what we just created. Point out all the functions we can run off of this now.
- One function to point out is `mockResolvedValueOnce`. This is a function we can call inside each test to tell the function what data is _supposed_ to be returned by the database.
- We need to "seed" this with mocked data as well. Add this array outside of your tests, then pass it into the `mockResolvedValueOnce` function:

_Note: If you want to show a really hard to find bug, then you can mock this data like the other mock data (as an array, without the object or the data property. Console log in the component where the data is being set to state and show students that we are not mocking the correct shape for the data_

```js
const missions = {
  data: [
    {
      mission_name: "Thaicom",
      mission_id: "9D1B7E0",
      manufacturers: ["Orbital ATK"],
      payload_ids: ["Thaicom 6", "Thaicom 8"],
      wikipedia: "https://en.wikipedia.org/wiki/Thaicom",
      website: "http://www.thaicom.net/en/satellites/overview",
      twitter: "https://twitter.com/thaicomplc",
      description:
        "Thaicom is the name of a series of communications satellites operated from Thailand, and also the name of Thaicom Public Company Limited, which is the company that owns and operates the Thaicom satellite fleet and other telecommunication businesses in Thailand and throughout the Asia-Pacific region. The satellite projects were named Thaicom by the King of Thailand, His Majesty the King Bhumibol Adulyadej, as a symbol of the linkage between Thailand and modern communications technology."
    },
    {
      mission_name: "Telstar",
      mission_id: "F4F83DE",
      manufacturers: ["SSL"],
      payload_ids: ["Telstar 19V", "Telstar 18V"],
      wikipedia: "https://en.wikipedia.org/wiki/Telesat",
      website: "https://www.telesat.com/",
      twitter: null,
      description:
        "Telstar 19V (Telstar 19 Vantage) is a communication satellite in the Telstar series of the Canadian satellite communications company Telesat. It was built by Space Systems Loral (MAXAR) and is based on the SSL-1300 bus. As of 26 July 2018, Telstar 19V is the heaviest commercial communications satellite ever launched, weighing at 7,076 kg (15,600 lbs) and surpassing the previous record, set by TerreStar-1 (6,910 kg/15230lbs), launched by Ariane 5ECA on 1 July 2009."
    }
  ]
};
```

Now the we are mocking this function, we don't have to wait for the actual async request in our tests, which would take a long time! We should have something like this now:

```jsx
import React from "react";
import { render } from "@testing-library/react";
import { fetchMissions as mockFetchMissions } from "./api/fetchMissions";
import App from "./App";

jest.mock("./api/fetchMissions");
console.log(mockFetchMissions);

test("App fetches missions data and render data", () => {
  mockFetchMissions.mockResolvedValueOnce(missions);

  render(<App />);
});
```

Now let's fire out the event that actually triggers the get request

- import the `fireEvent` function
- find the "Get data" button, and fire off a click event on it

```jsx
test("App fetches missions data and render data", () => {
  mockFetchMissions.mockResolvedValueOnce(missions);

  const { getByText } = render(<App />);
  const button = getByText(/get data/i);
  fireEvent.click(button);
  // Or simply fireEvent.click(getByText(/get data/i));
});
```

... now what???

### Testing Async API calls

Now that we have mocked the function, we have to test the component after the API call has returned

1. Breifly explain async/await since we will use that for all async tests
2. Look at the `App` component (or even better, look at the actuall UI) to see what happens when we click the button.

- First there is a loading message
- When the data returns, it is displayed

3. Right after the button click, test for the fetching message:

```jsx
test("App fetches missions data and render data", async () => {
  mockFetchMissions.mockResolvedValueOnce(missions);

  const { getByText } = render(<App />);

  const button = getByText(/get data/i);
  fireEvent.click(button);

  getByText(/we are fetching data/i);
```

4. Now we need to `await` for the API call to return

- import the `wait` function from RTL
- call `await wait()`
- make your final assertions.

```jsx
test("App fetches missions data and render data", async () => {
  mockFetchMissions.mockResolvedValueOnce(missions);

  const { getByText, queryAllByTestId } = render(<App />);

  const button = getByText(/get data/i);
  fireEvent.click(button);

  getByText(/we are fetching data/i);
  await wait();
  expect(queryAllByTestId("mission")).toHaveLength(2);
});
```

#### Possible breakout session if you have enough time

Have students work on testing the `MissionForm` component. This is what a final test could look like:

```jsx
import React from "react";
import { render } from "@testing-library/react";
import MissionForm from "./MissionForm";

test("Mission Form renders correctly", () => {
  const mockGetData = jest.fn();
  const { getByText, queryByText } = render(
    <MissionForm getData={mockGetData} isFetchingData={false} />
  );

  // test that the button is rendered, and the loading state is not
  getByText(/get data/i);
  expect(queryByText(/we are fetching data/i)).toBeNull();

  // line 12 is shorthand for this:
  // expect(getByText(/get data/i)).toBeInTheDocument();
});

test("Component trasitions to loading state when isFetchingData is true", () => {
  const mockGetData = jest.fn();
  const { getByText, queryByText, rerender } = render(
    <MissionForm getData={mockGetData} isFetchingData={false} />
  );

  // test that the button is rendered, and the loading state is not
  getByText(/get data/i);
  expect(queryByText(/we are fetching data/i)).toBeNull();

  // re-render the component becuase isFetchingData has been changed to true
  rerender(<MissionForm getData={mockGetData} isFetchingData={true} />);

  getByText(/we are fetching data/i);
  expect(queryByText(/get data/i)).toBeNull();
});

// TODO: add a test to test the transition from the loading state back to the resting state
// TODO: look through this test file and list out all the functions come from RTL, and all the functions coming from Jest
```
