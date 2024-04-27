import { usersRoles } from "../../enums/users.enum";
import Users from "./users.model";

async function getAll() {
  return Users.find();
}

async function get(id) {
  try {
    if (id) {
      const user = await Users.findOne({ _id: id });
      return user;
    }
  } catch (error) {
    throw new Error("User doesn't exist");
  }
}

async function getByAccountId(id) {
  try {
    if (id) {
      const user = await Users.findOne({ accountID: id });
      return user;
    }
  } catch (error) {
    throw new Error("User doesn't exist");
  }
}

async function create(data) {
  // Validate data
  try {
    if (data) {
      const existingUser = await get(data.accountID);
      if (existingUser) throw new Error("User Already Created!");
      // validate exclusive roles
      if (
        data.role == usersRoles.ADMIN ||
        data.role == usersRoles.READER ||
        data.role == usersRoles.WRITTER
      ) {
        // save user into MongoDB
        const userData = {
          accountID: data.accountID,
          email: data.email,
          username: data.username,
          role: data.role,
        };

        return new Users(userData).save();
      } else {
        throw new Error("Invalid Role");
      }
    }
  } catch (error) {
    throw new Error(error);
  }
}

async function update(id, data) {
  try {
    if (
      data.role == usersRoles.ADMIN ||
      data.role == usersRoles.READER ||
      data.role == usersRoles.WRITTER
    ) {
      return Users.findOneAndUpdate({ _id: id }, data);
    } else {
      throw new Error("Invalid Role");
    }
  } catch (error) {
    throw new Error(error);
  }
}

async function remove(id, adminAccountId) {
  try {
    const existingUser = await get(adminAccountId);
    if (existingUser && existingUser.role == usersRoles.ADMIN) {
      return Users.findByIdAndDelete(id);
    } else {
      throw new Error("Invalid Role");
    }
  } catch (error) {
    throw new Error(error);
  }
}

export { getAll, get, getByAccountId, create, update, remove };
