const express = require('express');
const server = express();
const projectRouter = require('./projectRouter.js');
const actionRouter = require('./actionRouter.js');
const Project = require('./data/helpers/projectModel');
const Action = require('./data/helpers/actionModel');

server.use(express.json());

server.use('/projects/:projectId', validateProjectId)
server.use('/actions/:actionId', validateActionId);
server.use('/actions', actionRouter);
server.use('/projects', projectRouter);



server.get('/', async (req, res) => {
  try {
    const allProjects = await Project.get();
    console.log(allProjects);
    res.status(200).json(allProjects);
  } catch (err) {
    
    res.status(500).json({ success: false, message: "Server didn't serve." });
    console.log(err);
  }
});


// MIDDLEWARE FUNCTIONS TO MAKE SURE NO FAKE PROJECT IDS OR ACTION IDS MAKE IT OUT OF THE GATE

async function validateProjectId(req, res, next) {
  try {
    const projectId = await req.params.projectId;
    const project = await Project.get(projectId);

    if (project) {
      req.project = project;
      req.projectId = projectId;
      next();
    } else {
      res.status(400).json({
        success: false,
        message: "Well taters! This project ain't in the sytem yet!"
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server Error' }, err);
  }
}

async function validateActionId(req, res, next) {
  try {
    
    const actionId = await req.params.actionId;
    const action = await Action.get(actionId);

    if (action) {
      req.action = action;
      req.actionId = actionId;
      next();
    } else {
      res.status(400).json({
        success: false,
        message: "Well spuds! This action ain't in the sytem yet!"
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server Error' }, err);
  }
}


module.exports = server;
