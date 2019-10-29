import { ADDRESS_API } from '../actions/types';

const initialState = {
  profile: null,
  addressAPI: null,
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADDRESS_API:
      return {
        addressAPI: payload,
        loading: false
      };

    default:
      return state;
  }
}
