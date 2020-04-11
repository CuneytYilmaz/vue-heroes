import { format } from 'date-fns';

import * as axios from 'axios';

import { inputDateFormat } from './constants';

import { API } from './config';

const getHeroes = async function() {
  try {
    const response = await axios.get(`${API}/heroes.json`);
    const data = parseList(response);
    const heroes = data.map(h => {
      h.originDate = format(h.originDate, inputDateFormat);
      return h;
    });
    return heroes;
  } catch(error) {
    console.log(error);
    return [];
  }
}

const parseList = response => {
  if (response.status !== 200) throw Error(response.message);
  if (!response.data) return []
  let list = response.data;
  if (typeof(list) !== 'object') {
    list = []
  }
  return list;
}

export const data = {
  getHeroes
}