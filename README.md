# Sprint 3 - Module 1 : Unit Testing React Components

## [Training Kit](https://github.com/LambdaSchool/Full-Stack-Web-Curriculum/tree/main/03-WebApplications-II/Sprint%2003%20-%20Advanced%20Web%20Applications/Module%201%20-%20Testing%20React)

### [Previous Lesson Plan](https://github.com/LambdaSchool/Space-X-Web-GuidedProject-Solution)

----

## Objectives

By the end of this module, learners should be able to:
* test React components as the props change
* use mocks in web application tests
* test asynchronous API calls that are made in a component

----

## Instructor Resources
* 🐙 [Guided Project Starter](https://github.com/LambdaSchool/web-guided-project-testing-react)
* 🐙 [Guided Project Solution](https://github.com/LambdaSchool/web-guided-project-testing-react-solution)
* 🐙 [Module Project](https://github.com/LambdaSchool/React-Testing-TV-Show)
* 🐙 [Module Project Solution](https://github.com/LambdaSchool/web-module-project-testing-react)

----

## Guided Project Slack Message
> 1. Clone without forking the following repo: *base guided project repo*
> 2. Navigate into both the root folder and run npm i to load dependences.
>
> :point_right: Technical issues spinning up the project? Please head over to the help channel!
> :point_right: If you fall behind during lecture and wish to catch up:
>
> git fetch && git reset --hard origin/lecture
>
> :point_right: Slido event: *insert slido link*

----

## Guided Project Zoom Invitation:
> **Unit 3 | Sprint 3 | Module 1: Unit Testing React Componentse**
> _______________________________________________________
> Zoom Link : *insert zoom link*
> Slido: *insert slido link*
>
> Guided Project: https://github.com/LambdaSchool/web-guided-project-testing-react
>
> Module Project: https://github.com/LambdaSchool/web-module-project-testing-react

----

## Check for Understanding Questions

These are the questions used internally to check student understanding. Students will be instructed to answer these questions after the guided project. Please make sure to emphasize the concepts behind these answers.

#### rerender must be run _ the initial assertion.
* in a seperate assertion than
* alongside
* **after**
* before

#### What is the purpose of the following code?
```js
  rerender(<PhoneNumber phoneNumber={"2025550113"} />);
```
* to set a default value for phoneNumber
* to render a phone number to the DOM
* **to update phoneNumber state**
* to run a test after a user input

#### Mocks should be created _ of the test function
* outside
* **inside**
* next to the spy
* inside a loop of the test function

#### What is the proper syntax to create a fake version of an object for testing?
* useMock(object, () => () => "abcde");
* mock(object, () => () => "abcde");
* **jest.mock(object, () => () => "abcde");**
* jest.spy(object, () => () => "abcde");

#### What is an assertion we can make to see if a function has been called?
* if (toHaveBeencalled(someFunction)) === TRUE {
console.log('pass'))
* **expect(someFunction).toHaveBeenCalled()**
* it('has been called')
* expect(toHaveBeenCalled, someFunction)

## Guided Project Outline

### Layout the week
* Last week of frontend coding
* Going into the last steps of creating and deploying a polished CRUD application.

### Layout of the Day
* Previously we went over general techniques with testing frontend code.
* Today we will go into the specifics of testing react components.
* In detail, we will learn how in tests to:
    1. Pass in data props to a component.
    2. Pass in mock functions into a component
    3. Test a fake api call with mocks.
    4. Test transitions with rerendering

### Review types of testing
* Discuss different test types.
* We will focus on unit tests today.
* Discuss the use of Arrange / Act / Assert in the creation of tests.

### Tour code for the day
* Show the result of our code in UI.
* Tour App.js, MissionForm.js and MissionList.js
* We will start with our simplest component first, MissionForm.

### Create a test suite for MissionForm
* Create MissionForm.test.js.
* Import basic items
```js
  import React from 'react';
  import { render, screen} from '@testing-library-react';
  import userEvent from '@testing-library/userEvent';
  import MissionForm from './MissionForm';
```
* Run the test runner.
* Create base test
```js
  test("MissionForm renders correctly", ()=>{
    render <MissionForm />
  });
```
* Discuss what should be tested on the MissionForm.

### Review questions to ask yourself when unit testing
* Specfic to implementation
* Deals with specific inputs and returns of pieces of code
* Be specific TO THE CODE WE ARE WORKING WITH.

### Discuss what kind of tests should be run.
* Does the component render?
* Does the component render correctly when isFetchingData is true?
* Does the component render correctly when isFetchingData is false?
* When we have a piece of user input, does getData execute.

### Adding Data Props to a component
* Arrange: Pass in isFetchingData={true} to MissionForm.
* Act: Get the test that should appear.
```js
  const displayText = screen.queryByText(/we are fetching data/i);
```
* Assert: test if text is in document.
```js
  expect(displayText).toBeInDocument();
  expect(displayText).not.ToBeNull();
```

### Breakout group for isFetchingData is false.

### BREAK

### Introduction to mocks
* Note that we have two different props, one is a data property, one is function.
* Introduce that mocks are fake functions.
* Mocks are placeholders for where functions could be.
* We will be going through two different types.
  * Faking a functional prop.
  * Faking a library call.

### Start building our test
* Arrange: Build our mockFunction.
```js
  const mockGetData = jest.fn();
  render(<MissionForm getData={mockGetData}>)
```
* Act: get the button
```js
  const button = screen.getByRole("button);
  userEvent.click(button);
```
* Note that our component fails when we don't pass in mockGetData.

### Experiment with our mock
* Display the mockGetData.
* Display mockGetData.mock.
* Demonstrate calls array, passing in a function into the mock and monitoring results, and monitoring parameters passed into a mock.
* Discuss how to test if our mock was called.
```js
  expect(mockGetData.mock.calls.length === 1);
  expect(mockGetData.mock.calls.length).toBe(1);
  expect(mockGetData.mock.calls).toHaveLength(1);
  expect(mockGetData).toHaveBeenCalledTimes(1);
```

### BREAK

### Quick review of async calls
* Note that async is just a simplier way of capturing an async call.
* Convert our module into async code.

### Next test App.js
* Add in imports.
* Add in render without errors test.
* We are testing that missions will be rendered on the screen
* Add in basic means to capture missions
```js
  render(<App/>);
  
  const button = screen.getByRole("button");
  userEvent.click(button);
  await wait(()=>{
    expect(screen.getAllByTestId("mission")).toHaveLength(10);
  });
```

### Introduce library mocks (spys)
* Discuss why it's scary to make a test based on a live api.
* Note that we are testing the response to the api, thus requiring us to control the api output.
* Mocks are the answer.
* Add in the mock import:
```js
import {fetchMission as mcokFetchMissions } from './api/fetchMissions';
jest.mock('./api/fetchMissions);
```
* Add mock to our component with whatever needs to be returned from our api.
* Note the minimum that needs to be in our result and copy the structure.
```js
  mockFetchMissions.mockResolvedValueOnce({
    data: [
      {mission_name:"Mission 1", mission_id:1},
      {mission_name:"Mission 2", mission_id:2}
    ]
  });
```
* Note that our mock function is the same as our old mock function.
* We want to see what our mock returns.
```js
  await waitFor(()=> {
    expect(missions).toHaveLength(2);
  });
```

### BREAK

### Add test for MissionList
```js
  import React from 'react';
  import {render, screen} from '@testing-library/react';
  import MissionList;
  ```
### Make our base rendering test
* Note that it fails due to the need to props by default

### Introduce rerendering
* Tests the transition between property changes.
* Need to get rerender from our MissionList.
```js
  const { rerender } = render(<MissionList mission={[]}>)
```
* Rerender allow us to render the component with new props.
```js
  let missioObjects = screen.queryAllByTestId("mission");
  expect(missionObjects).toEqual([]);
```
* Add in new missions array and test again.
```js
  rerender(<MissionsList missions={missions}/>);
  missionObjects = screen.queryByTestId("mission");
  expect(missionObject).toHaveLength(2);
```

### Module Project Review
* [Testing TV Show](https://github.com/LambdaSchool/React-Testing-TV-Show)

## Breakout Slack Messages

----

## After Class Message
Hope you all enjoyed today's guided Lesson!
A reminder if that office hours are from 2:30 - 3:30 Lambda Time. Don't forget to complete the days Check for Understanding and Pulse Checks! 

Module Project
https://github.com/LambdaSchool/web-module-project-testing-react

Here is a review of today's material.

Key Terminology
* 📝 *mock functions* - [Function placeholders use to monitor function execution within a test.](https://jestjs.io/docs/en/mock-functions.html)
* 📝 *mock spys* - [Function placeholders that mock the execution of external libraries](https://silvenon.com/blog/mocking-with-jest/functions)
* 📝 *rerender* - [A react testing library module use to render a component more then once in a test.](https://testing-library.com/docs/react-testing-library/api/#rerender)
* 📝 *async / await* - [A javascript syntax that allows simpler, cleaner async code.](https://javascript.info/async-await)
* 📝 *wait / waitFor* - [React testing library modules that allow a component test to wait until an async call or state chance occurs.](https://testing-library.com/docs/dom-testing-library/api-async/)

Key Concepts
* 📝 *unit testing* - [description](https://www.guru99.com/unit-testing-guide.html)
* 📝 *integration testing* - [description](https://www.edureka.co/blog/what-is-integration-testing-a-simple-guide-on-how-to-perform-integration-testing/)

Reference Materials
* 📝 [React Testing Library query cheatsheet](https://testing-library.com/docs/react-testing-library/cheatsheet/)
* 📝 [Jest expect functions](https://jestjs.io/docs/en/expect.html)
* 📝 [Jest Mock functions reference](https://www.w3resource.com/jest/mock-functions-api-reference.php)

