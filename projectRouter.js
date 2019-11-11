const express = require('express');
const router = express.Router();
const Project = require('./data/helpers/projectModel');


// USE ID VALIDATING MIDDLEWARE ON ALL /:id  REQUESTS
// router.use('/:id', validateProjectId);

// RETURNS PROJECT WITH SUBMITTED ID IF IT EXISTS
router.get('/:id', async (req, res, project) => {
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
      message: 'Server spit the darn thing back WAY out!'
    });
  }
});

// DELETES PROJECT WITH THE GIVEN ID FROM THE DATABASE

router.delete('/:id', async (req, res, project) => {
  try {
    const id = await req.params.id;
    const project = req.project;

    await Project.remove(id);

    console.log(
      `Project ${id}: "${project.name}" was successfully eradicated.`
    );
    res
      .status(200)
      .json({
        message: `Project ${id}: "${project.name}" was successfully eradicated.`
      });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({
        message: 'The server was not strong enough to destroy the project!'
      });
  }
});

//UPDATES AN EXISTING PROJECT GIVEN THE PROJECT'S ID AND BODY WITH NEW KEY/VALUE PAIRS AS PARAMETERS

router.put('/:id', async (req, res) => {
  try {
    const id = await req.params.id;
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

// CUSTOM MIDDLEWARE TO CONFIRM PROJECT ID EXISTS IN DATABASE --------------------------

// async function validateProjectId(req, res, next) {
//   try {
//     const projId = await req.params.id;
//     const newProject = await Projects.get(projId);

//     if (newProject) {
//       req.project = newProject;
//       next();
//     } else {
//       res.status(400).json({
//         success: false,
//         message: "Well taters! This project ain't in the sytem yet!"
//       });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: 'Server Error' }, err);
//   }
// }

module.exports = router;
