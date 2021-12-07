const path = require("path");
const express = require("express");
const hbs = require("hbs");
// requiring native modules
const forecast = require("./utils/forecast");
const geoCode = require("./utils/geoCode");

const app = express();
// define paths for  configuration
const publicDir = path.join(__dirname, "../public");
const viewsDir = path.join(__dirname, "../templates/views");
const partialsDir = path.join(__dirname, "../templates/partials");
console.log(publicDir);

// setup template engine and view location
app.set("view engine", "hbs");
app.set("views", viewsDir);
hbs.registerPartials(partialsDir);
// setup static directory to serve static files
app.use(express.static(publicDir));

app.get("", (req, res) => {
  res.render("index", {
    name: "Manish Navlani",
    title: "Weather",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "Manish Navlani",
  });
});
app.get("/help", (req, res) => {
  res.render("help", { title: "Help", name: "Manish Navlani" });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send("Please Provide address.");
  }
  geoCode(req.query.address, (error, response) => {
    if (error) {
      res.send({ error });
    } else {
      forecast(response.location, (error, response) => {
        if (error) {
          return res.send({ error });
        } else {
          res.send({ response });
        }
      });
    }
  });
});

app.get("/products", (req, res) => {
  console.log(req.query);
  res.send({ products: [] });
});

app.get("/help/*", (req, res) => {
  res.render("404page", {
    pageContent: `Can't find help.`,
    name: "Manish  Navlani",
  });
});

app.get("*", (req, res) => {
  res.render("404page", {
    pageContent: "Page not found",
    name: "Manish  Navlani",
  });
});
app.listen(3000, () => {
  console.log("listen on port 3000");
});
