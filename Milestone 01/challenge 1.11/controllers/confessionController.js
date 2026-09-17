require("dotenv").config()

const confessionService = require("../services/confessionService")

function handleCreate(req, res) {
  const confessionData = req.body

  const validation = confessionService.validateConfession(
    confessionData
  )

  if (!validation.valid) {
    return res
      .status(validation.status)
      .json(validation.response)
  }

  const newConfession =
    confessionService.createConfession(confessionData)

  console.log("added one info " + newConfession.id)

  return res.status(201).json(newConfession)
}

function handleGetAll(req, res) {
  const sortedConfessions =
    confessionService.getAllConfessions()

  const result = {
    data: sortedConfessions,
    count: sortedConfessions.length
  }

  console.log("fetching all data result")

  return res.json(result)
}

function handleGetOne(req, res) {
  const confessionId = parseInt(req.params.id)

  const confession =
    confessionService.findConfessionById(confessionId)

  if (!confession) {
    return res.status(404).json({
      msg: "not found"
    })
  }

  if (!confession.text) {
    return res.status(500).send("broken")
  }

  console.log(
    "found info with " + confession.text.length + " chars"
  )

  return res.json(confession)
}

function handleGetCategory(req, res) {
  const category = req.params.cat

  if (!confessionService.isValidCategory(category)) {
    return res.status(400).json({
      msg: "invalid category"
    })
  }

  const categoryConfessions =
    confessionService.getConfessionsByCategory(category)

  return res.json(categoryConfessions)
}

function handleDelete(req, res) {
  if (req.headers["x-delete-token"] !== process.env.DELETE_TOKEN) {
    return res.status(403).json({
      msg: "no permission"
    })
  }

  if (!req.params.id) {
    return res.status(400).send("no id")
  }

  const confessionId = parseInt(req.params.id)

  const deletedConfession =
    confessionService.deleteConfession(confessionId)

  if (!deletedConfession) {
    return res.status(404).json({
      msg: "not found buddy"
    })
  }

  console.log("deleted something")

  return res.json({
    msg: "ok",
    item: deletedConfession
  })
}

module.exports = {
  handleCreate,
  handleGetAll,
  handleGetOne,
  handleGetCategory,
  handleDelete
}