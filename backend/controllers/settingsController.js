const Settings = require('../models/Settings');

const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({}); // Create default if not exists
    }
    res.json(settings);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const updateSettings = async (req, res) => {
  try {
    const settings = await Settings.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json(settings);
  } catch (error) { res.status(400).json({ message: error.message }); }
};

module.exports = { getSettings, updateSettings };
