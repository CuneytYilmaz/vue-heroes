import { format } from 'date-fns';

import * as axios from 'axios';

import { inputDateFormat } from './constants';

const getHeroes = async function() {
  const response = await axios.get('api/heroes.json');
  const heroes = response.data.map(h => {
    h.originDate = format(h.originDate, inputDateFormat);
    return h;
  });
  return heroes;
}

export const data = {
  getHeroes
}