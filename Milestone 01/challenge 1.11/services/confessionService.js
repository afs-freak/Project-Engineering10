const confessions = []

let confessionIdCounter = 0

const validCategories = [
  "bug",
  "deadline",
  "imposter",
  "vibe-code"
]

function validateConfession(confessionData) {
  if (!confessionData) {
    return {
      valid: false,
      status: 400,
      response: { msg: "bad" }
    }
  }

  if (!confessionData.text) {
    return {
      valid: false,
      status: 400,
      response: { msg: "need text" }
    }
  }

  if (confessionData.text.length >= 500) {
    return {
      valid: false,
      status: 400,
      response: {
        error: "text too big, must be less than 500 characters long buddy"
      }
    }
  }

  if (confessionData.text.length <= 0) {
    return {
      valid: false,
      status: 400,
      response: "too short"
    }
  }

  if (!validCategories.includes(confessionData.category)) {
    return {
      valid: false,
      status: 400,
      response: "category not in stuff"
    }
  }

  return {
    valid: true
  }
}

function createConfession(confessionData) {
  const newConfession = {
    id: ++confessionIdCounter,
    text: confessionData.text,
    category: confessionData.category,
    created_at: new Date()
  }

  confessions.push(newConfession)

  return newConfession
}

function getAllConfessions() {
  return [...confessions].sort(
    (a, b) => b.created_at - a.created_at
  )
}

function findConfessionById(confessionId) {
  return confessions.find(
    confession => confession.id === confessionId
  )
}

function getConfessionsByCategory(category) {
  return confessions
    .filter(confession => confession.category === category)
    .reverse()
}

function deleteConfession(confessionId) {
  const confessionIndex = confessions.findIndex(
    confession => confession.id === confessionId
  )

  if (confessionIndex === -1) {
    return null
  }

  const deletedConfessions = confessions.splice(
    confessionIndex,
    1
  )

  return deletedConfessions[0]
}

function isValidCategory(category) {
  return validCategories.includes(category)
}

module.exports = {
  validateConfession,
  createConfession,
  getAllConfessions,
  findConfessionById,
  getConfessionsByCategory,
  deleteConfession,
  isValidCategory
}