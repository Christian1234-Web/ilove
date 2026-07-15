const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AdminUserSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true,select: false }, // Excludes password by default from queries },
role: { type: String, enum: ['admin', 'moderator', 'superadmin'], default: 'moderator', default:"admin" },
  active: { type: Boolean, default: true }
}, { timestamps: true });

// Hash password automatically before saving
AdminUserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Instance method to compare raw password with database hash
AdminUserSchema.methods.comparePassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = mongoose.model('AdminUser', AdminUserSchema);