const { MyProfile, User } = require("../models");
const axios = require("axios");

class MyProfileController {
  static async create(req, res, next) {
    try {
      const { userId, type, entityUuid } = req.body;
      if (!userId || !type || !entityUuid) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const newProfile = await MyProfile.create({
        userId,
        type,
        entityUuid,
      });

      let displayName;
      try {
        switch (type) {
          case "agents":
            const { data: agentData } = await axios.get(
              `https://valorant-api.com/v1/agents/${entityUuid}`
            );
            displayName = agentData.data?.displayName || "Unknown Agent";
            break;
          case "maps":
            const { data: mapData } = await axios.get(
              `https://valorant-api.com/v1/maps/${entityUuid}`
            );
            displayName = mapData.data?.displayName || "Unknown Map";
            break;
          case "weapons":
            const { data: weaponData } = await axios.get(
              `https://valorant-api.com/v1/weapons/${entityUuid}`
            );
            displayName = weaponData.data?.displayName || "Unknown Weapon";
            break;
          default:
            return res.status(400).json({ message: "Invalid type" });
        }
      } catch (apiError) {
        return res.status(500).json({
          message: "Failed to fetch external API data",
          error: apiError.message,
        });
      }

      res.status(201).json({
        ...newProfile.toJSON(),
        displayName,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const profiles = await MyProfile.findAll({
        include: [{ model: User, attributes: ["id", "email"] }],
      });

      res.status(200).json(profiles);
    } catch (error) {
      next(error);
    }
  }

  static async getOne(req, res, next) {
    try {
      const { id } = req.params;

      const profile = await MyProfile.findOne({
        where: { id },
        include: [{ model: User, attributes: ["id", "email"] }],
      });

      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }

      res.status(200).json(profile);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { type, entityUuid } = req.body;

      const profile = await MyProfile.findByPk(id);

      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }

      // Only update if values are provided
      const updatedFields = {};
      if (type) updatedFields.type = type;
      if (entityUuid) updatedFields.entityUuid = entityUuid;

      if (Object.keys(updatedFields).length === 0) {
        return res.status(400).json({ message: "No changes detected" });
      }

      await profile.update(updatedFields);

      res
        .status(200)
        .json({ message: "Profile updated successfully", profile });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;

      const profile = await MyProfile.findByPk(id);

      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }

      await profile.destroy();

      res.status(200).json({ message: "Profile deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MyProfileController;
