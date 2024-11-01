export const USER_QUERIES = {
  FIND_USER_BY_DEVICE_ID: 'SELECT * FROM user WHERE deviceId = ?',
  CREATE_USER: 'INSERT INTO user (deviceId) VALUES (?)',
  UPDATE_USER_LOGIN:
    'UPDATE user SET lastLogin = CURRENT_TIMESTAMP WHERE deviceId = ?',
  UPDATE_USER_LOCATION:
    'UPDATE user SET xCoord = ?, yCoord = ? WHERE deviceId = ?',
};
