
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingBottom: 100,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#343A40',
    marginBottom: 12,
    marginTop: 8,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },

  dropdownContainer: {
    width: '100%',
    height: 55,
    borderWidth: 1,
    borderColor: '#DEE2E6',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  dropdown: {
    width: '100%',
    height: 55,
    color: '#212529',
    marginLeft: -5,
  },

  fieldContainer: {
    marginVertical: 9,
  },

  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 7,
  },

  inputField: {
    height: 45,
    borderWidth: 1,
    borderColor: '#DEE2E6',
    borderRadius: 7,
    paddingHorizontal: 12,
    fontSize: 14,
    color: '#212529',
    backgroundColor: '#FFFFFF',
  },

  dateButton: {
    height: 45,
    borderWidth: 1,
    borderColor: '#DEE2E6',
    borderRadius: 7,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  dateText: {
    fontSize: 14,
    color: '#212529',
  },

  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginTop: 5,
    borderTopWidth: 1,
    borderTopColor: '#F1F3F5',
  },

  switchLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#495057',
  },

  floatingSaveButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    height: 54,
    paddingHorizontal: 22,
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1C7ED6',
    elevation: 6,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },

  floatingSaveButtonText: {
    marginLeft: 9,
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },

});

export default styles;
