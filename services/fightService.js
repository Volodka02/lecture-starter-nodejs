import { fightRepository } from "../repositories/fightRepository.js";
import { fighterRepository } from "../repositories/fighterRepository.js";

function simulate(fighter1, fighter2) {
  let health1 = fighter1.health;
  let health2 = fighter2.health;
  const log = [];

  while (health1 > 0 && health2 > 0) {
    const fighter1Shot = Math.max(1, fighter1.power - fighter2.defense);
    const fighter2Shot = Math.max(1, fighter2.power - fighter1.defense);

    health1 = Math.max(0, health1 - fighter2Shot);
    health2 = Math.max(0, health2 - fighter1Shot);

    log.push({ fighter1Shot, fighter2Shot, fighter1Health: health1, fighter2Health: health2 });
  }

  const winner = health1 > health2 ? fighter1.id : health2 > health1 ? fighter2.id : null;
  return { log, winner };
}

class FightService {
  getAll() {
    return fightRepository.getAll();
  }

  start(fighter1Id, fighter2Id) {
    const fighter1 = fighterRepository.getOne({ id: fighter1Id });
    if (!fighter1) throw new Error("Fighter 1 not found");

    const fighter2 = fighterRepository.getOne({ id: fighter2Id });
    if (!fighter2) throw new Error("Fighter 2 not found");

    if (fighter1Id === fighter2Id) throw new Error("A fighter cannot fight themselves");

    const { log, winner } = simulate(fighter1, fighter2);
    return fightRepository.create({ fighter1: fighter1Id, fighter2: fighter2Id, winner, log });
  }
}

const fightService = new FightService();

export { fightService };
