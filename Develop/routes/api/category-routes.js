const router = require('express').Router();
// const e = require('express');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    let data = await Category.findAll({
      include: [{model: Product}]
    });
    res.status(200).json(data);
  } catch(err){
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
    let data = await Category.findByPk(req.params.id, {
      include: [{model: Product}]
    });
    if (data === null){
    res.status(400).json("ID is not valid.");
    } else {
      res.status(200).json(data);
    }
  } catch (err){
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  console.log(req.body);
  try {
    const data = await Category.create(req.body);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const data = await Category.update({where: {id: req.params.id}});
    res.status(200).json(err);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const data = await Category.destroy({where: {id: req.params.id}});
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
