# Mealbot

Mealbot is a weekly meal plan and grocery list generator. It saves your time searching for recipes, creates a menu that doesn't repeat, and also cuts down on grocery waste.

This project was created in a week and a half by [Lucas Tan](https://github.com/lucasxtan), [Grace Wang](https://github.com/GraceWXT), and [Warren Roque](https://github.com/wawwen1) as the final project of Lighthouse Labs Full-Stack Web Development Bootcamp.

## Table Of Contents
- [Technologies and Libraries Dependencies](#technology-and-library-dependencies)
- [Features](#features)
  - [Homepage & User Profile](#Homepage-and-User-Profile)
  - [Meal Plan](#meal-plan)
  - [Recipe Detail](#recipe-detail)
  - [Grocery List (Desktop)](#Grocery-List-Desktop)
  - [Grocery List (Mobile)](#Grocery-List-Mobile)
- [Getting Started](#Getting-Started)
  - [Server Side](#Server-Side)
  - [Client Side](#Client-Side)


## Technology and Library Dependencies
```
- React
- Chakra UI
- React Router
- React DnD
- React Responsive
- Sass
- Twilio API
- Spoonacular API
- Express
- Axios
- PostgreSQL
- NodeJS
```

## Features
### Homepage & User Profile
Users can switch to light/dark mode and access their profile settings from the drop down menu on nav bar.

![homepage & user profile](https://github.com/lucasxtan/Mealbot/blob/master/doc/img/homepage%20and%20profile%20page.gif?raw=true)


### Meal Plan
Meal plans are generated based on user preferences, but users can also edit the meal plan using drag and drop, shuffle, and delete buttons.

![mealplan](https://github.com/lucasxtan/Mealbot/blob/master/doc/img/mealplan.gif?raw=true)

Users can also access their meal plan history

![mealplan history](https://github.com/lucasxtan/Mealbot/blob/master/doc/img/meal%20plan%20history.gif?raw=true)


### Recipe Detail
Ingredients, instructions and nutrition info are provided on the recipe detail page. Users can change the serving size to get updated ingredient quantity.

![recipe detail](https://github.com/lucasxtan/Mealbot/blob/master/doc/img/recipe%20page.gif?raw=true)


### Grocery List (Desktop)
Users can get a grocery list of their weekly meal plan. The quantity is based on their household size preference setting, and the ingredients are sorted by aisles.
Users can also share the grocery list by sending text message or copy on one click.

![grocery list desktop](https://github.com/lucasxtan/Mealbot/blob/master/doc/img/grocery%20list%20desktop.gif?raw=true)


### Grocery List (Mobile)
Users can take the grocery list on the go.

![grocery list mobile](https://github.com/lucasxtan/Mealbot/blob/master/doc/img/grocery%20list%20mobile.gif?raw=true)


## Getting Started
Fork this project and clone it using the command line: `git clone [SSH link here]`

### Server Side
1. Please follow the [README](/server/README.md) in server folder to set up the database and install the dependencies.
2. For the text message function, register a trial account with [Twilio](https://www.twilio.com/docs/usage/tutorials/how-to-use-your-free-trial-account) and read up to and including "Get your first Twilio phone number".
3. For the recipe database, register an account with [Spoonacular](https://spoonacular.com/food-api/console#Dashboard) and [connect a user](https://spoonacular.com/food-api/docs#Connect-User).

### Client Side
1. Run `npm i` to install the dependencies.

2. Before starting the client side server, first go to `node_modules/react-dnd/dist/core/DndProvider.js`.

3. On line 28, where it says `import { jsx as _jsx } from "react/jsx-runtime";`, add an ".js" extention to the file path: `import { jsx as _jsx } from "react/jsx-runtime.js";`.
4. Run `npm start` to start the client side server.
