import { fighterRepository } from "../repositories/fighterRepository.js";

const DEFAULT_HEALTH = 85;

class FighterService {
  getAll() {
    return fighterRepository.getAll();
  }

  getOne(id) {
    const fighter = fighterRepository.getOne({ id });
    if (!fighter) throw new Error("Fighter not found");
    return fighter;
  }

  create(data) {
    const all = fighterRepository.getAll();
    if (all.some((f) => f.name.toLowerCase() === data.name.toLowerCase()))
      throw new Error("Fighter with this name already exists");
    if (data.health == null) data.health = DEFAULT_HEALTH;
    return fighterRepository.create(data);
  }

  update(id, data) {
    const fighter = fighterRepository.getOne({ id });
    if (!fighter) throw new Error("Fighter not found");

    if (data.name) {
      const all = fighterRepository.getAll();
      if (all.some((f) => f.id !== id && f.name.toLowerCase() === data.name.toLowerCase()))
        throw new Error("Fighter with this name already exists");
    }

    return fighterRepository.update(id, data);
  }

  delete(id) {
    const fighter = fighterRepository.getOne({ id });
    if (!fighter) throw new Error("Fighter not found");
    return fighterRepository.delete(id);
  }
}

const fighterService = new FighterService();

export { fighterService };
