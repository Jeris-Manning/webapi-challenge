const express = require('express');
const router = express.Router();
const Action = require('./data/helpers/actionModel');

// DISPLAYS ACTION BY SUPPLYING ACTION'S ID AS PARAM

router.get('/:action', async (req, res) => {
  try {
    const actionId = await req.actionId;
    const action = await Action.get(actionId);
    console.log(action);
    res.status(200).json({ action });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server failed' });
  }
});

// EDIT EXISTING ACTION

router.put('/:action', async (req, res) => {
  try {
    const actionId = await req.action.id;
    const actionUpdate = await req.body;
    const updatedAction = await Action.update(actionId, actionUpdate);

    console.log('Updated Action: ', updatedAction);
    res.status(200).json(updatedAction);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json(
        { success: false, message: "Server couldn't do your updates pal!" },
        err
      );
  }
});

// DELETE EXISTING ACTION

router.delete('/:id', async (req, res) => {
  try {
    const id = await req.params.id;
    const action = req.action;

    await Action.remove(id);

    console.log(
      `Action ${id} was successfully eradicated.`
    );
    res.status(200).json({
      message: `Action ${id} was successfully eradicated.`
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'The server was not strong enough to destroy the action!'
    });
  }
});

module.exports = router;
