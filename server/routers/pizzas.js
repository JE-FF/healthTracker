const { Router } = require("express");
const pizza = require("../models/Pizza");
const router = Router();

// Create record in MongoDB
router.post("/", (request, response) => {
  const newPizza = new pizza.model(request.body);
  newPizza.save((err, pizza) => {
    return err ? response.sendStatus(500).json(err) : response.json(pizza);
  });
});

// Query records from MongoDB
router.get("/", (request, response) => {
  pizza.model.find({}, (error, data) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(data);
  });
});

// findById is more efficient than querying the property within {} in the previous get request ^.
router.get("/:id", (request, response) => {
  pizza.model.findById(request.params.id, (error, data) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(data);
  });
});

router.delete("/:id", (request, response) => {
  // findById params (ID that matches database entry, filter by entry properties, error or data)
  pizza.model.findByIdAndRemove(request.params.id, {}, (error, data) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(data);
  });
});

// $set is a mongoose / mongoDB function that checks the properties are valid and commits changes.
router.put("/:id", (request, response) => {
  const body = request.body;
  pizza.model.findByIdAndUpdate(
    request.params.id,
    {
      $set: {
        crust: body.crust,
        cheese: body.cheese,
        sauce: body.sauce,
        toppings: body.toppings
      }
    },

    (error, data) => {
      if (error) return response.sendStatus(500).json(error);
      return response.json(request.body);
    }
  );
});

module.exports = router;
