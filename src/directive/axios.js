import axios from 'axios';
import Vue from 'vue';

const Axios = axios.create({
  baseURL: globals.serverUrl,
});

export async function get(url, data) {
  try {
    let res = await Axios.get(url, {
      params: data,
    });
    res = res.data;
    return new Promise((resolve, reject) => {
      resolve(res.data);
    });
  } catch (err) {
    console.error('服务器错误', err);
  }
}
export async function post(url, data) {
  try {
    let res = await Axios.post(url, data);
    res = res.data;
    return new Promise((resolve, reject) => {
      resolve(res.data);
    });
  } catch (err) {
    console.error('服务器错误', err);
  }
}
