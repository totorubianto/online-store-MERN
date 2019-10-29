import axios from 'axios';
import { setAlert } from './alert';
import { ADDRESS_API, ADDRESS_API_ERROR } from './types';

export const getProvinceAndRegency = () => async dispatch => {
  try {
    const province = await axios.get('/api/profile/province');
    const regency = await axios.get('/api/profile/regency');
    let hash = Object.create(null);

    let res = province.data.map(
      (hash => province =>
        (hash[province.province_id] = {
          _id: province._id,
          value: province.province,
          label: province.province,
          children: []
        }))(hash)
    );
    regency.data.forEach(
      (hash => regency => {
        hash[regency.province_id].children.push({
          _id: regency._id,
          city_id: regency.city_id,
          value: regency.city_id,
          label: regency.city_name
        });
      })(hash)
    );

    dispatch({
      type: ADDRESS_API,
      payload: res
    });
  } catch (err) {
    dispatch({
      type: ADDRESS_API_ERROR
    });
  }
};
