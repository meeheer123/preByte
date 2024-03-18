import Application from "../models/application.model.js";

export const apply = async (req, res) => {
  try {
    const { name, email, phone, resume, postId } = req.body;
    // Assuming userId is retrieved from authentication middleware
    const userId = req.user.id;
    const application = new Application({ name, email, phone, resume, userId, postId });
    await application.save();
    res.status(201).json({ success: true, message: 'Application submitted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to submit application', error: error.message });
  }
};
