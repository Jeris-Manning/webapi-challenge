const express = require('express');
const router = express.Router();
const Action = require('./data/helpers/actionModel');



// ADDS NEW ACTION TO EXISTING PROJECT. PROJECT ID AUTO POPULATED FROM URL
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

// DISPLAYS ACTION BY SUPPLYING ACTION'S ID AS PARAM

router.get('/:action', async (req, res)=> {
  try{
const actionId = await req.action.id;
const action = await Action.get(actionId);
console.log(action)
res.status(200).json({action});

  }catch (err){
    res.status(500).json({ success: false, message: 'Server failed' });
  } 
})

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

router.delete('/:actionId', async (req, res) => {
  try {
    const id = await req.params.actionsId;
    

    await Project.remove(id);

    console.log(
      `Action ${id} was successfully eradicated.`
    );
    res
      .status(200)
      .json({
        message: `Action ${id} was successfully eradicated.`
      });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({
        message: 'The server was not strong enough to destroy the action!'
      });
  }
});


module.exports = router;
