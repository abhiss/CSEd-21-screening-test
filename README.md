# CSEd-21-screening-test
A screening test for working on a LupLab research project with Professor Porquet-Lupine.

## 🥳Live Demo: https://abhiss.github.io/CSEd-21-screening-test/

## Prompt
 - Write a web page containing a Javascript widget that allows the user to populate a table of students (name, email, level) interactively. The level field should be one of “freshman/sophomore/junior/senior”. It should be also possible to edit any line of the table (not necessarily inside the table itself though -- up to you). Your code should make sure that fields are validated before the input is inserted in the table.

 - Code that doesn’t rely on external libraries is strongly encouraged. Ideally, it should be all self-contained.


# Design decisions

## Intro
The design decisions I make for this project are guided only by the prompt above, and where it is vague, the choices made should be in the spirit of the prompt. For example, a major design decision dictated by the prompt is the lack of a frontend framework. In the same vein, I also won't be using Typescript, which might fall under "external libraries", and would make the project not "self-contained". Instead, I will write Javascript in a Typescript-like way with JSDoc comments, which serves to aid the reader in understanding the code and allow the IDE catch type errors before runtime. I also (regrettably) wrote almost all of the program in the single [index.html](./index.html) file, to ensure it was sufficiently "self-contained". Being able to send someone the webpage by transfering a single file is nice. The exception to this is [test.js](./test.js), which only has automated tests and isn't required to use the website. 

## Table
The table is a major part of this project, so it required some thought. This project targets the web, so in that spirit this project values accesibility. Traditional HTML tables are typically well understood by screenreaders and well supported across browsers, but are often hostile to users on mobile devices. A very different layout is expected on phones compared to desktops. Desktop users expect a layout akin to a spreadsheet, where the data for each object is spread across a row. Obviously, spreading data across a row doesn't make sense on a narrow phone.

[IMAGE SHOWING IDEAL PHONE LAYOUT VS IDEAL DESKTOP LAYOUT]

Alternatively, I could design a flexbox layout that mimics a table, but would be ideal on all devices using reponsive flexbox properties - a "real world" solution to our problem. This however wouldn't "allow the user to populate a _table_ of students ... interactively", which can be understood as requiring an actual table element in the DOM. Making an actual table work well for mobile and desktop devices is difficult and comes at the cost of awkward code that uses Javascript to fix layout. This shouldn't be a problem since the requirements of the project can't be met without Javascript anyway, so I won't be worrying about users who don't have Javascript enabled.

## Storage
Having a user editable data table needs persisting storage to be useful. The browser's LocalStorage API was a great fit for this project because it's simple to use and well supported across browsers. Using LocalStorage, the data is persisted if the tab is closed or the device is restarted, but not if the user opens the website on a different device. It's also automatically saved throughout an editing session, specially when the user finishes entering a new field and once when the page is closing as a fallback. This solution feels quite elegant.

In relation to user input validation, a desired behavior might be to not allow the user to save if there are format mistakes. I think this is unintuitive and a user might lose data if they don't realize only correctly formatted tables can be saved. Becuase of this, the table is still automatically saved, but rows containing incorrectly formatted entries won't be exported. The invalid input is also highlighted red. 

## Visual Design
I chose to use design the webpage following the Material UI design language. Material UI looks minimal and clean, which follows the spirit of the project's requirements: a single simple table.

## Testing
Automated testing gives us a fighting chance at writing correct software. I was initally planning to not have automated tests since most webpage testing involves big frameworks like cypress.io or puppeteer, which would clearly go against the spirit of the prompt which suggests avoiding libraries and frameworks. I had some time to experiment with writing automated tests without the frameworks I'd normally use, and it worked surprisingly well! So I wrote an automated test runner with accompanying integration test in [test.js](./test.js). It's completely self contained and the tests are run in the browser by opening the web page calling the `TestRunner()` function in the console. 