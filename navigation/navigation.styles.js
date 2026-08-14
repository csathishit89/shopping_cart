/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { StyleSheet } from 'react-native';
import Code from '../constants/ColorCodes';

export default StyleSheet.create({
  iconBackground: {
    backgroundColor: Code.primary_medium,
    width: '60%',
    padding: 5,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  rightMargin: {
    borderWidth: 0.5,
    borderColor: Code.white,
    borderRadius: 60,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
});
