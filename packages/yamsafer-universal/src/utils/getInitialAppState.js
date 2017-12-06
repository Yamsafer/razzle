import Immutable from 'immutable';

const getDeviceInitialState = device => {
  switch (device) {
    case 'phone':
      return fromJS({
        [DEVICE_TYPE]: PHONE,
        [DEVICE_ORIENTATION]: DEVICE_ORIENTATION_PORTRAIT,
      });
    case 'tablet':
      return fromJS({
        [DEVICE_TYPE]: TABLET,
        [DEVICE_ORIENTATION]: DEVICE_ORIENTATION_PORTRAIT,
      });
    default:
      // desktop and others
      return fromJS({
        [DEVICE_TYPE]: DESKTOP,
        [DEVICE_ORIENTATION]: DEVICE_ORIENTATION_PORTRAIT,
      });
  }
};

export default function(req) {
  let initialState = new Immutable.Map();
  const deviceInitialState = getDeviceInitialState(req.device.type);
  initialState = initialState.set(DEVICE_STATE_ROOT_NAME, deviceInitialState);
  return initialState;
}
