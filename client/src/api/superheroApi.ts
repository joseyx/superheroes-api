import axios from 'axios';

const API_BASE = '/superheroes';

export const getSuperheroes = async () => {
  const response = await axios.get(API_BASE);
  return response.data;
};

export const createSuperhero = async (newHero: {
  name: string;
  power: string;
  humilityScore: number;
}) => {
  const response = await axios.post(API_BASE, newHero);
  return response.data;
};

export const deleteSuperhero = async (id: number) => {
  const response = await axios.delete(`${API_BASE}?id=${id}`);
  return response.data;
};