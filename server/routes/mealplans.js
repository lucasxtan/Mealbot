const express = require("express");
const router  = express.Router();

const axios = require("axios");

// db queries and helper functions
const { getRandomRecipesForWeek } = require("../db/queries/recipe-queries");
const { saveMealPlan } = require("../db/queries/mealplan-queries");
const { getEmptyMealPlan, mealplanMapper, apiMealPlanMapper} = require("../helpers/mealplan-helper");

// Convenience variables
const apiBaseUrl = "https://api.spoonacular.com";
const apiKey = process.env.API_KEY;
const apiUserName = process.env.API_USERNAME;
const apiUserHash = process.env.API_USER_HASH;
// const testingMealPlan = require("../db/mock/testing-mealplan");

// GET /mealplans/random - get random meal plan for a week




// Get /mealplans/:startDate - get the existing meal plan or new random meal plan depending on the start date
router.get("/:startDate", (req, res) => {
  const { startDate } = req.params;

  axios.get(`${apiBaseUrl}/mealplanner/${apiUserName}/week/${startDate}?hash=${apiUserHash}&apiKey=${apiKey}`)
    .then(result => {
      // if there's no saved mealplan in the api database
      // get random recipes from our pool and send back as meal plan json
      if (result.data.days.length === 0) {
        if (Date.parse(startDate) > new Date()) {
          getRandomRecipesForWeek()
            .then((recipes) => {
              const mealplan = mealplanMapper(recipes);
              res.json(mealplan);
            })
            .catch(err => {
              res
                .status(500)
                .json({ error: err.message });
            });
        } else {
          const mealplan = getEmptyMealPlan(startDate);
          res.json(mealplan);
        }


      } else {
        // If the meal plan exists
        // transform data to the shape we need and send to front end
        const mealplan = apiMealPlanMapper(result.data.days);
        res.json(mealplan);
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });



});

// POST /mealplans/:startDate - save meal plan to database and api
router.post("/:startDate", (req, res) => {
  console.log("req.params.startDate", req.params.startDate, " type:", typeof req.params.startDate);
  const mealplan = req.body.filter(meal => meal.value);
  // console.log(mealplan);

  const userId = Number.parseInt(req.cookies["user_id"]);

  const apiPromise = axios.post(
    `${apiBaseUrl}/mealplanner/${apiUserName}/items?hash=${apiUserHash}&apiKey=${apiKey}`,
    mealplan)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      return { error: err.message };
    });

  const dbPromise = saveMealPlan(userId, req.params.startDate);

  Promise.all([apiPromise, dbPromise])
    .then((results) => {
      res.send(results[0]);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
