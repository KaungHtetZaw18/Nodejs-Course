const RecipeController = {
  index: (req, res) => {
    return res.json({ msg: "Get all recipes" });
  },
  store: (req, res) => {
    return res.json({ msg: "Stored recipes" });
  },
  show: (req, res) => {
    return res.json({ msg: "Get single recipe" });
  },
  destroy: (req, res) => {
    return res.json({ msg: "Delete recipe" });
  },
  update: (req, res) => {
    return res.json({ msg: "Update recipe" });
  },
};

module.exports = RecipeController;
