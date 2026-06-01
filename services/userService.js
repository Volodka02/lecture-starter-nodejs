import { userRepository } from "../repositories/userRepository.js";

class UserService {
  getAll() {
    return userRepository.getAll();
  }

  getOne(id) {
    const user = userRepository.getOne({ id });
    if (!user) throw new Error("User not found");
    return user;
  }

  create(data) {
    const all = userRepository.getAll();
    if (all.some((u) => u.email.toLowerCase() === data.email.toLowerCase()))
      throw new Error("User with this email already exists");
    if (all.some((u) => u.phone === data.phone))
      throw new Error("User with this phone already exists");
    return userRepository.create(data);
  }

  update(id, data) {
    const user = userRepository.getOne({ id });
    if (!user) throw new Error("User not found");

    const all = userRepository.getAll();
    if (data.email && all.some((u) => u.id !== id && u.email.toLowerCase() === data.email.toLowerCase()))
      throw new Error("User with this email already exists");
    if (data.phone && all.some((u) => u.id !== id && u.phone === data.phone))
      throw new Error("User with this phone already exists");

    return userRepository.update(id, data);
  }

  delete(id) {
    const user = userRepository.getOne({ id });
    if (!user) throw new Error("User not found");
    return userRepository.delete(id);
  }

  search(search) {
    return userRepository.getOne(search) || null;
  }
}

const userService = new UserService();

export { userService };
