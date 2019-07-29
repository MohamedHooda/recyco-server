const Item = require('../../models/item.model')
const create = async (req, res) => {
  const { name, points } = req.body
  const nweItem = await new Item({
    name,
    points
  }).save()
  return res.send({ data: nweItem })
}
const update = async (req, res) => {
  Item.findByIdAndUpdate(req.body.id, req.body, { new: true }, (err, model) => {
    if (!err) {
      return res.json({ data: model })
    } else {
      return res.json({
        error: `Error, couldn't update a user given the following data`
      })
    }
  })
}
const view_all_admin = async (req, res) => {
  const allItems = await Item.find()
  return res.send({ data: allItems })
}

module.exports = { create, update, view_all_admin }
