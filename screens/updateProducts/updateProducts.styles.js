import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 10,
  },
  sectionTitleHead: {
    paddingHorizontal: 16,
    marginBottom: 8, 
    marginLeft: 2,
    fontSize: 16, 
    fontWeight: '700', 
    color: '#1A1A1A'
  },
  sectionViewCartTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center'
  },
  categorySection: {
    paddingVertical: 10, 
    backgroundColor: '#FFFFFF', 
    borderBottomWidth: 1, 
    borderBottomColor: '#F0F0F0'
  },
  categoryList: {
    paddingHorizontal: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F1F3F5',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCategoryButton: {
    backgroundColor: '#1C7ED6',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#495057',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  productCount: {
    fontSize: 12,
    color: '#868E96',
  },
  deliveryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1C7ED6',
  },
  productList: {
    padding: 16,
    paddingBottom: 90, // Space for bottom cart summary
  },

  // --- Horizontal Product Card Styles ---
  productCard: {
    flexDirection: 'row', // Places image on left, info on right
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    alignItems: 'center',
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#F8F9FA',
    position: 'relative',
    marginRight: 12,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  addedBadge: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingVertical: 2,
    alignItems: 'center',
  },
  addedBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  productDetails: {
    flex: 1, // Takes up the remaining space on the right
    justifyContent: 'center',
  },
  productCategory: {
    fontSize: 11,
    color: '#868E96',
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  productName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 2,
  },
  productUnit: {
    fontSize: 12,
    color: '#adb5bd',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 15,
    fontWeight: '750',
    color: '#1C7ED6',
    marginBottom: 8,
  },
  cardActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F3F5',
    borderRadius: 6,
    paddingHorizontal: 4,
  },
  quantityButton: {
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#495057',
  },
  quantityText: {
    fontSize: 13,
    fontWeight: '600',
    paddingHorizontal: 6,
    color: '#212529',
  },
  addToCartButton: {
    backgroundColor: '#1C7ED6',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  addToCartText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },

  // Empty list & Cart bar styles...
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 36,
    marginBottom: 10,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#343a40',
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#868E96',
    marginTop: 4,
  },
  bottomCart: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  bottomCartItems: {
    fontSize: 12,
    color: '#868E96',
  },
  bottomCartPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#212529',
  },
  viewCartButton: {
    backgroundColor: '#1C7ED6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  viewCartText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  addToCartButtonFull: {
    flex: 1,
    backgroundColor: '#1C7ED6', // Your primary theme color
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityRowFull: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F1F8E9',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});