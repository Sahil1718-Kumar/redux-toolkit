const { models } = require("../../models");
const { users } = models;
const { fileUpload } = require("../../utils/fileUpload");

module.exports = {
  add_user: async (req, res) => {
    const { name, email } = req.body;
    try {
      const imageFile = req.files.image;
      const fileUploader = await fileUpload(imageFile);
      const image = `images/${fileUploader}`;
      const new_user = await users.create({ name, email, image });
      res.status(201).json({ message: "user added", new_user });
    } catch (error) {
      throw error;
    }
  },
  user_list: async (req, res) => {
    try {
      const user = await users.findAll();
      res.status(200).json({ message: "users list", users: user });
    } catch (error) {
      throw error;
    }
  },

  view_user: async (req, res) => {
    const { id } = req.params;
    try {
      const user_details = await users.findOne({ where: { id } });
      res.status(200).json({ message: "user view", user_details });
    } catch (error) {
      throw error;
    }
  },
  edit_user: async (req, res) => {
    const { name, email, id } = req.body;
    const imageFile = req.files ? req.files.image : undefined;
    console.log(req.body);
    try {
      const user_exists = await users.findOne({ where: { id } });
      if (!user_exists) {
        return res.status(404).json({ message: "user not found" });
      }
      const updatedData = { name, email };
      if (imageFile) {
        const fileUploader = await fileUpload(imageFile);
        updatedData.image = `images/${fileUploader}`;
      } else {
        updatedData.image = user_exists.image;
      }
      await users.update(updatedData, { where: { id } });
      res.status(201).json({ message: "user added" });
    } catch (error) {
      throw error;
    }
  },
  delete_user: async (req, res) => {
    const { id } = req.params;
    try {
      const user_exists = await users.findOne({ where: { id } });
      if (!user_exists) {
        return res.status(404).json({ message: "user not found" });
      }
      await users.destroy({ where: { id } });
      res.status(200).json({ message: "user deleted" });
    } catch (error) {
      throw error;
    }
  },
  toggle_status: async (req, res) => {
    const { id } = req.params;
    try {
      const user_exists = await users.findOne({ where: { id } });
      if (!user_exists) {
        return res.status(404).json({ message: "user not found" });
      }
      const status = user_exists.status == 0 ? 1 : 0;
      await users.update({ status }, { where: { id } });
      res.status(200).json({ message: "status toggled" });
    } catch (error) {
      throw error;
    }
  },
};
