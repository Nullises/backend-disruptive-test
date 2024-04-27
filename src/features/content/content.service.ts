import Content from "./content.model";
import { usersRoles } from "../../enums/users.enum";
import { getByAccountId as usersGet } from "../users/users.service";

async function getAll() {
  return Content.find();
}

async function get(id) {
  try {
    if (id) {
      const content = await Content.findOne({ _id: id });
      return content;
    }
  } catch (error) {
    throw new Error("Content doesn't exist");
  }
}

async function create(data) {
  // Validate data
  try {
    if (data) {
      const existingContent = await get(data.name);
      if (existingContent) throw new Error("Content already created");
      // validate exclusive roles
      const getUser = await usersGet(data.userAccountId);
      if (
        getUser &&
        (getUser.role == usersRoles.ADMIN || getUser.role == usersRoles.WRITTER)
      ) {
        // save user into MongoDB
        const contentData = {
          title: data.title,
          categoryId: data.categoryId,
          themeId: data.themeId,
          url: data.url,
          credits: data.credits,
          userAccountId: data.userAccountId,
        };

        return new Content(contentData).save();
      } else {
        throw new Error("User not authorized to create Content");
      }
    }
  } catch (error) {
    throw new Error(error);
  }
}

async function update(id, data) {
  try {
    const getUser = await usersGet(data.userAccountId);
    if (
      getUser &&
      (getUser.role == usersRoles.ADMIN || getUser.role === usersRoles.WRITTER)
    ) {
      return Content.findOneAndUpdate({ _id: id }, data);
    } else {
      throw new Error("User not authorized to update Content");
    }
  } catch (error) {
    throw new Error(error);
  }
}

async function remove(id, accountID) {
  try {
    const existingUser = await usersGet(accountID);
    if (
      existingUser &&
      (existingUser.role == usersRoles.ADMIN ||
        existingUser.role == usersRoles.WRITTER)
    ) {
      return Content.findByIdAndDelete(id);
    } else {
      throw new Error("Invalid Role");
    }
  } catch (error) {
    throw new Error(error);
  }
}

export { getAll, get, create, update, remove };
