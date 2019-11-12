const express = require('express');
const router = express.Router();
const Project = require('./data/helpers/projectModel');
const Action = require('./data/helpers/actionModel');

// RETURNS PROJECT WITH SUBMITTED ID IF IT EXISTS
router.get('/:id', async (req, res) => {
  try {
    const project = await req.project;
    res.status(200).json({ project });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "Server didn't serve." }, err);
  }
});

// RETURNS ALL ACTIONS WITHIN A GIVEN PROJECT

router.get('/:id/actions', async (req, res) => {
  try {
    const projectId = await req.projectId;
    const projectActions = await Project.getProjectActions(projectId);
    console.log(
      `Returning actions for project ${projectId}: ${req.project.name}`
    );
    res.status(200).json({ projectActions });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json(
        { success: false, message: "Server couldn't get those actions" },
        err
      );
  }
});

// POSTS A NEW PROJECT TO THE DATABASE
router.post('/', async (req, res) => {
  try {
    const projectBody = await req.body;
    const newProject = await Project.insert(projectBody);
    console.log('Added the following project to the database', newProject);
    res.status(200).json({ newProject });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Server spit the darn thing out!'
    });
  }
});

// DELETES PROJECT WITH THE GIVEN ID FROM THE DATABASE

router.delete('/:id', async (req, res) => {
  try {
    const id = await req.params.id;
    const project = req.project;

    await Project.remove(id);

    console.log(
      `Project ${id}: "${project.name}" was successfully eradicated.`
    );
    res.status(200).json({
      message: `Project ${id}: "${project.name}" was successfully eradicated.`
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'The server was not strong enough to destroy the project!'
    });
  }
});

//UPDATES AN EXISTING PROJECT GIVEN THE PROJECT'S ID AND BODY WITH NEW KEY/VALUE PAIRS AS PARAMETERS

router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const projectUpdate = await req.body;

    const updatedProject = await Project.update(id, projectUpdate);

    console.log('Updated Project: ', updatedProject);
    res.status(200).json(updatedProject);
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

// ADDS NEW ACTION TO EXISTING PROJECT. PROJECT ID AUTO POPULATED FROM REQ PARAM ADDED BY MIDDLEWARE

router.post('/:id', async (req, res) => {
  try {
    const projectId = await req.projectId;
    let actionBody = await req.body;
    actionBody.project_id = projectId;
    const newAction = await Action.insert(actionBody);
    res.status(200).json(newAction);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server failed' });
  }
});

module.exports = router;
