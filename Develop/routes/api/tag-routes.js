const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const testTag = await Tag.findAll({
      include: [{ model: Product }]
    })
    res.status(200).json(testTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const data = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new tag
  try {
    const data = await Tag.create(req.body);
    if (req.body.productIds.length) {
      const productTagIdArr = req.body.productIds.map(product_id => {
        return {
          product_id,
          tag_id: data.id
        };
      });
      const productTagData = ProductTag.bulkCreate(productTagIdArr);
      res.status(200).json(data);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {
    const data = await Tag.update(req.body, {where: {id: req.params.id}});
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    const data = Tag.destroy({where: {id: req.params.id}});
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
