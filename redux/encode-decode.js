/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import JWT from 'expo-jwt';

// JWT Token Encode
export const encodeJson = (encodeData, key) => JWT.encode(encodeData, key, { algorithm: 'HS512' });

// JWT Token Decode
export const decodeJson = (decodeData, key) => JWT.decode(decodeData, key, { algorithm: 'HS512' });
