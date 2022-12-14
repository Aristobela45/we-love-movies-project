if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const criticsRouter = require("./critics/critics.router.js");
const moviesRouter = require("./movies/movies.router");
const reviewsRouter = require("./reviews/reviews.router");
const theatersRouter = require("./theaters/theaters.router");
const router = require("./critics/critics.router.js");
const cors = require('cors');
// router.use(cors())
app.use(cors())
app.use(express.json());

app.use("/critics", criticsRouter);
app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter);
app.use("/theaters", theatersRouter);

//not found handler
app.use((req, res, next) => {
  next({
    status: 404,
    message: `Not found: ${req.originalUrl}`,
  });
});

//error handler
app.use((error, req, res, next) => {
  const { status = 500, message = "Something went wrong!" } = error;
  res.status(status).json({ error: message });
});

module.exports = app;