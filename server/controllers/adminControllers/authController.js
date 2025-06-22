require("dotenv").config();
const { models } = require("../../models");
const { users } = models;
const { fileUpload } = require("../../utils/fileUpload");

module.exports = {
  signup: async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const emailExists = await users.findOne({ where: { email } });
      if (emailExists) {
        return res.status(400).json({ message: "Email already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const imageFile = req.files.image;
      const fileUploader = await fileUpload(imageFile);
      const image = `images/${fileUploader}`;
      const admin = await users.create({
        name,
        email,
        image,
        role: 0,
      });
      res.status(201).json({ message: "Signup successful", admin });
    } catch (error) {
      throw error;
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const admin = await users.findOne({ where: { email, role: 0 } });
      if (!admin) {
        return res.status(404).json({ message: "Email not found" });
      }
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Incorrect password" });
      }
      const token = jwt.sign(
        { id: admin.id, name: admin.name },
        process.env.SECRET_KEY
      );
      res.status(200).json({ message: "Login successfully", token });
    } catch (error) {
      throw error;
    }
  },

  adminProfile: async (req, res) => {
    const { id } = req.params;
    try {
      const admin = await users.findOne({ where: { id } });
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }
      res.status(200).json({ message: "Admin profile", admin });
    } catch (err) {
      throw err;
    }
  },

  updateProfile: async (req, res) => {
    const { id } = req.params;
    const { name, email, country_code, phone_no, location } = req.body;
    const imageFile = req.files ? req.files.image : undefined;
    try {
      const admin = await users.findOne({ where: { id } });
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }
      const updatedData = { name, email, country_code, phone_no, location };
      if (imageFile) {
        const fileUploader = await fileUpload(imageFile);
        updatedData.image = `images/${fileUploader}`;
      } else {
        updatedData.image = admin.image;
      }
      await users.update(updatedData, { where: { id } });
      res.status(200).json({ message: "Admin profile updated" });
    } catch (err) {
      throw err;
    }
  },

  updatePassword: async (req, res) => {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;
    try {
      const admin = await users.findOne({ where: { id } });
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }
      const isValidPassword = await bcrypt.compare(oldPassword, admin.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Incorrect current password" });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await users.update({ password: hashedPassword }, { where: { id } });
      res.status(200).json({ message: "Password reset successfully" });
    } catch (err) {
      throw err;
    }
  },
  update_commission_serviceFee: async (req, res) => {
    const { service_fee, admin_commission } = req.body;
    try {
      await users.update(
        { admin_commission, service_fee },
        { where: { role: 0 } }
      );
      res.status(200).json({ message: "Commission and service fee updated" });
    } catch (err) {
      throw err;
    }
  },
};
