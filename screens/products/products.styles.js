import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const CARD_WIDTH = (width - 48) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F8FC',
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
  },

  headerSubtitle: {
    fontSize: 10,
    color: '#1683D8',
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 5,
  },

  headerTitle: {
    fontSize: 27,
    color: '#172B4D',
    fontWeight: '800',
  },

  cartButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#EAF4FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cartIcon: {
    fontSize: 24,
  },

  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#E53935',
    minWidth: 21,
    height: 21,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },

  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },

  // Search bar
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 20,
    paddingHorizontal: 14,
    height: 52,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E9EDF4',
  },

  searchIcon: {
    fontSize: 27,
    color: '#1683D8',
    marginRight: 10,
  },

  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    color: '#172B4D',
  },

  clearSearch: {
    fontSize: 17,
    color: '#7B8798',
    padding: 6,
  },

  // Section headings
  categorySection: {
    marginBottom: 22,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#172B4D',
    left: 20
  },

  categoryList: {
    paddingHorizontal: 16,
    paddingTop: 13,
    paddingBottom: 3,
  },

  categoryButton: {
    paddingHorizontal: 19,
    paddingVertical: 11,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E5EAF2',
  },

  selectedCategoryButton: {
    backgroundColor: '#087BD5',
    borderColor: '#087BD5',
  },

  categoryText: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '600',
  },

  selectedCategoryText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  // Products heading
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 14,
  },

  productCount: {
    fontSize: 12,
    color: '#8A94A6',
    marginTop: 5,
  },

  deliveryText: {
    fontSize: 11,
    color: '#168B55',
    backgroundColor: '#E3F7EC',
    paddingHorizontal: 9,
    paddingVertical: 7,
    borderRadius: 8,
    fontWeight: '700',
  },

  // Product grid
  productList: {
    paddingHorizontal: 16,
    paddingBottom: 115,
  },

  productRow: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  productCard: {
    width: CARD_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EDF0F5',
    elevation: 2,
    shadowColor: '#172B4D',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 5,
  },

  imageContainer: {
    width: '100%',
    height: 145,
    backgroundColor: '#EEF4FA',
    position: 'relative',
  },

  productImage: {
    width: '100%',
    height: '100%',
  },

  addedBadge: {
    position: 'absolute',
    top: 9,
    right: 8,
    backgroundColor: '#168B55',
    borderRadius: 7,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },

  addedBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },

  // Product information
  productDetails: {
    paddingHorizontal: 11,
    paddingTop: 12,
    paddingBottom: 13,
  },

  productCategory: {
    fontSize: 10,
    color: '#1683D8',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 5,
  },

  productName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#172B4D',
    lineHeight: 19,
    minHeight: 38,
  },

  productUnit: {
    fontSize: 12,
    color: '#8A94A6',
    marginTop: 4,
  },

  productPrice: {
    fontSize: 21,
    fontWeight: '800',
    color: '#087BD5',
    marginTop: 10,
    marginBottom: 12,
  },

  // Quantity selector
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F0F6FD',
    borderRadius: 10,
    padding: 4,
    marginBottom: 11,
  },

  quantityButton: {
    width: 31,
    height: 31,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#DCE8F5',
  },

  quantityButtonText: {
    fontSize: 22,
    color: '#087BD5',
    fontWeight: '600',
    lineHeight: 25,
    textAlign: 'center',
  },

  quantityText: {
    fontSize: 15,
    color: '#172B4D',
    fontWeight: '800',
  },

  // Add to Cart button
  addToCartButton: {
    height: 41,
    borderRadius: 10,
    backgroundColor: '#087BD5',
    alignItems: 'center',
    justifyContent: 'center',
  },

  addToCartText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },

  // Empty state
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 55,
    paddingHorizontal: 20,
  },

  emptyIcon: {
    fontSize: 40,
    marginBottom: 12,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#172B4D',
  },

  emptySubtitle: {
    fontSize: 13,
    color: '#8A94A6',
    textAlign: 'center',
    marginTop: 8,
  },

  // Bottom cart summary
  bottomCart: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E9EDF4',
    paddingHorizontal: 20,
    paddingTop: 13,
    paddingBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 12,
    shadowColor: '#172B4D',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },

  bottomCartItems: {
    fontSize: 12,
    color: '#7B8798',
    marginBottom: 3,
  },

  bottomCartPrice: {
    fontSize: 21,
    fontWeight: '800',
    color: '#172B4D',
  },

  viewCartButton: {
    backgroundColor: '#087BD5',
    borderRadius: 12,
    paddingHorizontal: 22,
    paddingVertical: 14,
  },

  viewCartText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
});

export default styles;