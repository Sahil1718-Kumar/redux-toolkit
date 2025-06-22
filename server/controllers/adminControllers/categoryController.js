require("dotenv").config();
const { models } = require("../../models");
const { category } = models;
const { Op } = require("sequelize");
const { fileUpload } = require("../../utils/fileUpload");

module.exports = {
  add_category: async (req, res) => {
    const { name } = req.body;
    try {
      const imageFile = req.files.image;
      const fileUploader = await fileUpload(imageFile);
      const image = `images/${fileUploader}`;
      const new_category = await category.create({ name, image });
      res.status(201).json({ message: "category added", new_category });
    } catch (error) {
      throw error;
    }
  },
  category_list: async (req, res) => {
    try {
      const categories = await category.findAll();
      res.status(200).json({ message: "categorys list", categories });
    } catch (error) {
      throw error;
    }
  },

  view_category: async (req, res) => {
    const { id } = req.params;
    try {
      const category_details = await category.findOne({ where: { id } });
      res.status(200).json({ message: "category view", category_details });
    } catch (error) {
      throw error;
    }
  },
  edit_category: async (req, res) => {
    const { name, id } = req.body;
    const imageFile = req.files ? req.files.image : undefined;

    try {
      const category_exists = await category.findOne({ where: { id } });
      if (!category_exists) {
        return res.status(404).json({ message: "category not found" });
      }
      const updatedData = { name };
      if (imageFile) {
        const fileUploader = await fileUpload(imageFile);
        updatedData.image = `images/${fileUploader}`;
      } else {
        updatedData.image = category_exists.image;
      }
      await category.update(updatedData, { where: { id } });
      res.status(201).json({ message: "category added" });
    } catch (error) {
      throw error;
    }
  },
  delete_category: async (req, res) => {
    const { id } = req.params;
    try {
      const category_exists = await category.findOne({ where: { id } });
      if (!category_exists) {
        return res.status(404).json({ message: "category not found" });
      }
      await category.destroy({ where: { id } });
      res.status(200).json({ message: "category deleted" });
    } catch (error) {
      throw error;
    }
  },
  toggle_status: async (req, res) => {
    const { id } = req.params;
    try {
      const category_exists = await category.findOne({ where: { id } });
      if (!category_exists) {
        return res.status(404).json({ message: "category not found" });
      }
      const status = category_exists.status == 0 ? 1 : 0;
      await category.update({ status }, { where: { id } });
      res.status(200).json({ message: "status toggled" });
    } catch (error) {
      throw error;
    }
  },
};
