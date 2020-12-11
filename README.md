# Basic Unit Tests with Jest

<div style="text-align: center">

![test-coverage](https://i.imgur.com/EqINhDr.png)

</div>

This repository includes basic unit tests with Jest for a simple Discord bot.

The purpose for this is to demonstrate Unit Testing, why it is important, and how we can set it up.

Note: This repository uses TypeScript. However, you can use Jest with JavaScript, too.

## Getting Started

Clone this repository if you wish, and try to implement your own logic for your Discord events or commands.

If you want to run the test cases, simply use:

`yarn test`

or

`npm test`

## What is Unit Testing?

Unit Testing is a method to test your application in single "units". You take each method and ensure what your method is doing is exactly what it _should_ be doing. You want to make sure that the logic you write is working when given inputs x, y, or z.

## Why Unit Test?

Because sitting down and manually testing your code is old school. You're not going to sit there and remember every single scenario you tested last week and re-test it again. Instead, you write Unit Tests which will not only help you keep track of what you've tested so far, but you also get to see what unit tests end up breaking (if any) when you make a minor or major change to your code base.

Let's say you implement a new feature tomorrow, without Unit Tests or any tracking of what you've tested and what worked, you will not know if your feature is breaking other features in your application. Your new feature may work as expected, but it's causing errors and possibly exposing bugs in other parts of your system.

So, Unit Tests are a **great** way to allow developers to keep track of what they've tested, what is causing what to break, and allows them to ask questions like:

- Is my new feature incompatible with my current code base?
- Is there something wrong with my current codebase?
- Is my test actually meaningful?

## Some Things to Note

- When Unit Testing, you always want to make sure you are properly mocking functions, objects, etc. aka Test Doubles.

  - Mocking allows you replace the real implementation with a "mock" or a "fake" version of it. This is done because ideally you do not want to worry about certain implementations of a function, you just want to test if function A works as expected when it receives X, Y, or Z and does something with X, Y, or Z correctly.
  - You usually mock dependencies of a function/method call. An example, let's say we have Function A that has 5 dependencies (functions that it calls)

    ```
    function A() {
      functionB()
      functionC()
      functionD()
      functionE()
      functionF()
    }
    ```

    Your job isn't supposed to test functions B to F's logic. You'll test those functions when you write the unit test for said function. Function A may need to do something with the return value of lets say function B. It may need to check a condition with the return value of function B. In this situation, you need to mock function B's return value. What do you mock it with? That depends on your logic and scenarios. You need to write individual tests for each scenario.

    If your function does 2 things based on 1 condition, then you need to mock for both scenarios. Let's say your function throws an error if the return value of B is 3. You check if the value is 3 and then throw an error. When you mock, you'll mock the return value of B and then test to see if Function A threw an error. Then you'll write a test case for when the return value of function B is _not_ 3, if it isn't then it shouldn't throw an error.

    Writing Unit Tests also requires you to write your code in such ways that it also makes it less stressful to test. Typically, following things like Single Responsibility Principle can go a long way with testing. Test Driven Development is also another practice that can enforce better practices too.

For more info on testing, you can look at the documentation of Jest, Cypress, Mocha, Jasmine, etc. and get a feel. I would suggest Jest since I use it, but you can use any testing library that you find easy to use.

If you would like to watch the video where I did a demo tutorial for the code & tests in this repository, visit https://www.youtube.com/watch?v=5TjXmsJtWZc.
