import Themes from "./themes.model";
import { usersRoles } from "../../enums/users.enum";
import { getByAccountId as usersGet } from "../users/users.service";

async function getAll() {
  return Themes.find();
}

async function get(name) {
  try {
    if (name) {
      const theme = await Themes.findOne({ name: name });
      return theme;
    }
  } catch (error) {
    throw new Error("Theme doesn't exist");
  }
}

async function create(data) {
  // Validate data
  try {
    if (data) {
      const existingTheme = await get(data.name);
      if (existingTheme) throw new Error("Theme already created");
      // validate exclusive roles
      const getUser = await usersGet(data.adminAccountId);
      if (getUser && getUser.role == usersRoles.ADMIN) {
        // save user into MongoDB
        const themeData = {
          name: data.name,
          imagePermission: data.imagePermission,
          videoPermission: data.videoPermission,
          textPermission: data.textPermission,
          adminAccountId: data.adminAccountId,
        };

        return new Themes(themeData).save();
      } else {
        throw new Error("User not authorized to create Theme");
      }
    }
  } catch (error) {
    throw new Error(error);
  }
}

async function update(id, data) {
  try {
    const getUser = await usersGet(data.adminAccountId);
    if (getUser && getUser.role == usersRoles.ADMIN) {
      return Themes.findOneAndUpdate({ _id: id }, data);
    } else {
      throw new Error("User not authorized to update Theme");
    }
  } catch (error) {
    throw new Error(error);
  }
}

async function remove(id, adminAccountID) {
  try {
    const existingUser = await usersGet(adminAccountID);
    if (existingUser && existingUser.role == usersRoles.ADMIN) {
      return Themes.findByIdAndDelete(id);
    } else {
      throw new Error("Invalid Role");
    }
  } catch (error) {
    throw new Error(error);
  }
}

export { getAll, get, create, update, remove };
