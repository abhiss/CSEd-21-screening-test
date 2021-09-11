# Design Doc

## Prompt
 - Write a web page containing a Javascript widget that allows the user to populate a table of students (name, email, level) interactively. The level field should be one of “freshman/sophomore/junior/senior”. It should be also possible to edit any line of the table (not necessarily inside the table itself though -- up to you). Your code should make sure that fields are validated before the input is inserted in the table.

 - Code that doesn’t rely on external libraries is strongly encouraged. Ideally, it should be all self-contained.

## Intro
The design decisions I make for this project are guided only by the prompt above, and where it is vague, the choices made should be in the spirit of the prompt. For example, a major design decision dictated by the prompt is the lack of a frontend framework. In the same vein, I also won't be using Typescript, which might fall under "external libraries", and would make the project not "self-contained. Instead, I will write Javascript in a Typescript-like way with JSDoc comments, which serve to aid the reader in understanding the code and help the IDE catch type errors before runtime.

## Table
The table is a major part of this project, so it required some thought. This project targets the web, so in that spirit this project values accesibility. Traditional HTML tables are typically well understood by screenreaders and well supported across browsers, but are often hostile to users on mobile devices. A very different layout is expected on phones compared to desktops. Desktop users expect a layout akin to a spreadsheet, where the data for each object is spread across a row. Obviously, spreading data across a row doesn't make sense on a narrow phone.

[IMAGE SHOWING IDEAL PHONE LAYOUT VS IDEAL DESKTOP LAYOUT]

Alternatively, I could design a flexbox layout that mimics a table, but would be ideal on all devices using reponsive flexbox properties - a "real world" solution to our problem. This however wouldn't "allow the user to populate a _table_ of students ... interactively", which can be understood as requiring an actual table element in the DOM. Making an actual table work well for mobile and desktop devices is difficult and will come at the cost of awkward code that uses Javascript to fix layout. This shouldn't be a problem since the requirements of the project can't be met without Javascript anyway, so I won't be worrying about users who don't have Javascript enabled.
