import { get, post } from "../requestHelper";

const entity = 'fights';

export const getFights = async () => {
    return await get(entity);
}

export const startFight = async (fighter1Id, fighter2Id) => {
    return await post(entity, { fighter1: fighter1Id, fighter2: fighter2Id });
}