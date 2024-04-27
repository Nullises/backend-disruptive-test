import Categories from "./categories.model";
import { usersRoles } from "../../enums/users.enum";
import { get as usersGet } from "../users/users.service";
import { categoriesAllowed } from "../../enums/categories.enum";

async function getAll() {
  return Categories.find();
}

async function get(id) {
  try {
    if (id) {
      const category = await Categories.findOne({ name: name });
      return category;
    }
  } catch (error) {
    throw new Error("Category doesn't exist");
  }
}

async function create(data) {
  // Validate data
  try {
    if (data) {
      const existingCategory = await get(data.name);
      if (existingCategory) throw new Error("Category already created");
      // validate exclusive roles
      const getUser = await usersGet(data.adminAccountId);
      if (getUser && getUser.role == usersRoles.ADMIN) {
        // save user into MongoDB

        // check if is valid category
        if (
          data.name === categoriesAllowed.IMAGES ||
          data.name === categoriesAllowed.TEXT ||
          data.name === categoriesAllowed.VIDEOS
        ) {
          const categoryData = {
            name: data.name,
            writePermission: data.writePermission || false,
            readPermission: data.readPermission || false,
            adminAccountId: data.adminAccountId,
          };

          return new Categories(categoryData).save();
        } else {
          throw new Error("Invalid Category");
        }
      } else {
        throw new Error("User not authorized to create Category");
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
      if (
        data.name === categoriesAllowed.IMAGES ||
        data.name === categoriesAllowed.TEXT ||
        data.name === categoriesAllowed.VIDEOS
      ) {
        return Categories.findOneAndUpdate({ _id: id }, data);
      } else {
        throw new Error("Invalid Category");
      }
    } else {
      throw new Error("User not authorized to update Category");
    }
  } catch (error) {
    throw new Error(error);
  }
}

async function remove(id, accountID) {
  try {
    const existingUser = await usersGet(accountID);
    if (existingUser && existingUser.role == usersRoles.ADMIN) {
      return Categories.findOneAndDelete({ _id: id });
    } else {
      throw new Error("Invalid Role");
    }
  } catch (error) {
    throw new Error(error);
  }
}

export { getAll, get, create, update, remove };
