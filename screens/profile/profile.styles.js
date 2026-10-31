/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { StyleSheet, Dimensions } from 'react-native';
import Code from '../../constants/ColorCodes';

const fontReg = 'Roboto';
const fontBold = 'RobotoBold';

const { width } = Dimensions.get('window');
const CARD_MARGIN = 8;
const CARD_WIDTH = (width - 32 - CARD_MARGIN * 2) / 2; // 2-column grid with padding

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  headerContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',     // Centers children horizontally
    justifyContent: 'center',
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1D1E',
  },
  // 2. Logo dimensionsr
  logoImage: {
    width: 160,
    height: 75
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    // Android Elevation
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 110,
  },
  titleContainer: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2D3142',
    textAlign: 'left',
  },
   
});
