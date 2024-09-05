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
      switch (type) {
        case "agents":
          const agentResponse = await axios.get(
            `https://valorant-api.com/v1/agents/${entityUuid}`
          );
          displayName = agentResponse.data.data.displayName;
          break;
        case "maps":
          const mapResponse = await axios.get(
            `https://valorant-api.com/v1/maps/${entityUuid}`
          );
          displayName = mapResponse.data.data.displayName;
          break;
        case "weapons":
          const weaponResponse = await axios.get(
            `https://valorant-api.com/v1/weapons/${entityUuid}`
          );
          displayName = weaponResponse.data.data.displayName;
          break;
        default:
          return res.status(400).json({ message: "Invalid type" });
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
      profile.type = type || profile.type;
      profile.entityUuid = entityUuid || profile.entityUuid;

      await profile.save();

      res.status(200).json(profile);
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
