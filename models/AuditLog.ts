import mongoose, { Schema } from "mongoose";

const auditLogSchema = new Schema(
  {
    action: String,
    performedBy: String,
    targetUser: String,
  },
  { timestamps: true }
);

export default mongoose.models.AuditLog ||
  mongoose.model("AuditLog", auditLogSchema);
