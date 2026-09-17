const express = require("express")

const router = express.Router()

const confessionController =
  require("../controllers/confessionController")

router.post(
  "/",
  confessionController.handleCreate
)

router.get(
  "/",
  confessionController.handleGetAll
)

router.get(
  "/category/:cat",
  confessionController.handleGetCategory
)

router.get(
  "/:id",
  confessionController.handleGetOne
)

router.delete(
  "/:id",
  confessionController.handleDelete
)

module.exports = router