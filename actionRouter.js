const express = require('express');
const router = express.Router();
const Action = require('./data/helpers/actionModel');

router.post('/', async (req, res) => {
  try {
    const projectId = await req.projectId;
    let actionBody = await req.body;
    actionBody.project_id = projectId;
    const newAction = await Action.insert(actionBody);
    console.log(projectId, 'ProjectId');
    res.status(200).json({ actionBody });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server failed' });
  }
});

module.exports = router;

module.exports = router;
