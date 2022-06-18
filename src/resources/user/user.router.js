import express from 'express';

import User from './user.model';

const router = express.Router();

router.route('/')
// create User
  .post(async (req, res) => {
    const { username } = req.body.bio;
    try {
    // check if user exists already
      const ifUserExists = await User.findOne({
        bio: {
          username,
        },
      });
      if (ifUserExists) {
        return res.status(404).json({ errMessage: 'User already exists' });
      }

      // save user
      await User.create(req.body);
      return res.status(200).json({ data: req.body.bio });
    } catch (e) {
      return res.status(400).json({ error: e });
    }
  })
  // get all users
  .get(async (req, res) => {
    try {
      const users = await User.find({});
      return res.status(200).json({ data: users });
    } catch (e) {
      return res.status(400).json({ error: e });
    }
  });

router.route('/:userId')
  // get User
  .get(async (req, res) => {
    const user = await User.findById(req.params.userId)
      .populate(['followers', 'following']);
    res.json({ data: user });
  })
  // update user
  .put()
  // delete user
  .delete();

export default router;
