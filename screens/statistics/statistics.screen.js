import React, { useState, useMemo, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';
import { loggedInDetails } from '../../redux/login/login.selectors';
import { 
  fetchTotalOrdersRespReset, 
  fetchTotalOrdersStart,
  fetchTotalRevenueProfitRespReset,
  fetchTotalRevenueProfitStart,
  fetchTopTenProductSalesRespReset,
  fetchTopTenProductSalesStart,
} from '../../redux/statistics/statistics.action';

import { 
  selectTotalOrdersData, 
  selectTotalOrdersResponse, 
  selectTotalRevenueProfitData, 
  selectTotalRevenueProfitResponse, 
  selectTopTenProductSalesData, 
  selectTopTenProductSalesResponse, 
} from '../../redux/statistics/statistics.selectors';

// Sample fallback data (replace with API / Redux state props)
const DEFAULT_STATS = {
  totalOrders: 1420,
  todayOrders: 48,
  totalRevenue: 285400,
  totalProfit: 64250,
  todayRevenue: 9640,
  todayProfit: 2180,
};

const DEFAULT_TOP_PRODUCTS = [
  { id: '1', name: 'Full Cream Milk (500ml)', qtySold: 64, stockOutCount: 3 },
  { id: '2', name: 'Standardized Milk (500ml)', qtySold: 52, stockOutCount: 2 },
  { id: '3', name: 'Curd Pouch (400g)', qtySold: 41, stockOutCount: 2 },
  { id: '4', name: 'Toned Milk (500ml)', qtySold: 38, stockOutCount: 1 },
  { id: '5', name: 'Butter Milk (200ml)', qtySold: 35, stockOutCount: 2 },
  { id: '6', name: 'Ghee Jar (500ml)', qtySold: 22, stockOutCount: 1 },
  { id: '7', name: 'Paneer Fresh (200g)', qtySold: 19, stockOutCount: 1 },
  { id: '8', name: 'Badam Milk Bottle (200ml)', qtySold: 17, stockOutCount: 1 },
  { id: '9', name: 'Mysore Pak Box (250g)', qtySold: 14, stockOutCount: 0 },
  { id: '10', name: 'Mango Lassi (200ml)', qtySold: 12, stockOutCount: 0 },
];

const formatINR = (amount) =>
  `₹${Number(amount || 0).toLocaleString('en-IN')}`;

export default function StatisticsScreen({
  navigation,
  stats = DEFAULT_STATS,
  topProducts = DEFAULT_TOP_PRODUCTS,
}) {
  const dispatch = useDispatch();
  const loginData = useSelector(loggedInDetails);
  const userRecord = (loginData && loginData.length > 0) ? loginData[0] : {};
  const totalOrdersResponse = useSelector(selectTotalOrdersResponse);
  const totalOrdersData = useSelector(selectTotalOrdersData) || [];
  const totalRevenueProfitResponse = useSelector(selectTotalRevenueProfitResponse);
  const totalRevenueProfitData = useSelector(selectTotalRevenueProfitData) || [];
  const topTenProductSalesResponse = useSelector(selectTopTenProductSalesResponse);
  const topTenProductSalesData = useSelector(selectTopTenProductSalesData) || [];

  useEffect(() => {
    const getTotalOrdersData = {
      shopID: userRecord.ShopID,
      databaseName: 'General'
    };
    dispatch(fetchTotalOrdersStart(getTotalOrdersData));
    dispatch(fetchTotalRevenueProfitStart(getTotalOrdersData));
    dispatch(fetchTopTenProductSalesStart(getTotalOrdersData));
  }, []);

  useEffect(() => {
    if (totalOrdersResponse !== null) {
      console.log(totalOrdersData);
      dispatch(fetchTotalOrdersRespReset())
    }

    if (totalRevenueProfitResponse !== null) {
      console.log(totalRevenueProfitData);
      dispatch(fetchTotalRevenueProfitRespReset())
    }

    if (topTenProductSalesResponse !== null) {
      console.log(topTenProductSalesData);
      dispatch(fetchTopTenProductSalesRespReset())
    }
  }, [totalOrdersResponse, totalRevenueProfitResponse, topTenProductSalesResponse]);
  
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {navigation && (
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <FontAwesome name="arrow-left" size={20} color="#1e293b" />
          </TouchableOpacity>
        )}
        <Text style={styles.headerTitle}>Sales & Profit Statistics</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Row 1: Orders */}
        <Text style={styles.sectionLabel}>Orders Overview</Text>
        <View style={styles.row}>
          <StatCard
            title="Total Orders"
            value={totalOrdersData.total_orders}
            icon="shopping-bag"
            iconColor="#2563eb"
            bgTint="#eff6ff"
          />
          <StatCard
            title="Today Orders"
            value={totalOrdersData.today_orders}
            icon="calendar-check-o"
            iconColor="#0284c7"
            bgTint="#f0f9ff"
          />
        </View>

        {/* Row 2: Overall Revenue & Profit */}
        <Text style={styles.sectionLabel}>Overall Performance</Text>
        <View style={styles.row}>
          <StatCard
            title="Total Revenue"
            value={formatINR(totalRevenueProfitData.total_revenue)}
            icon="line-chart"
            iconColor="#7c3aed"
            bgTint="#f5f3ff"
          />
          <StatCard
            title="Total Profit"
            value={formatINR(totalRevenueProfitData.total_profit)}
            icon="bar-chart"
            iconColor="#16a34a"
            bgTint="#f0fdf4"
          />
        </View>

        {/* Row 3: Today Revenue & Profit */}
        <Text style={styles.sectionLabel}>Today's Performance</Text>
        <View style={styles.row}>
          <StatCard
            title="Today Revenue"
            value={formatINR(totalRevenueProfitData.today_revenue)}
            icon="rupee"
            iconColor="#d97706"
            bgTint="#fffbeb"
          />
          <StatCard
            title="Today Profit"
            value={formatINR(totalRevenueProfitData.today_profit)}
            icon="area-chart"
            iconColor="#059669"
            bgTint="#ecfdf5"
          />
        </View>
        
        {/* Top 10 Products Sold Out Frequently Today */}
        <View style={styles.listCard}>
          <View style={styles.listHeader}>
            <FontAwesome name="fire" size={18} color="#ea580c" />
            <Text style={styles.listTitle}>
              Top 10 Fast-Moving / Sold Out Today
            </Text>
          </View>

          {topProducts.slice(0, 10).map((item, index) => {
            const isTopThree = index < 3;
            return (
              <View
                key={item.id}
                style={[
                  styles.productRow,
                  index === topProducts.length - 1 && styles.noBorder,
                ]}
              >
                <View
                  style={[
                    styles.rankBadge,
                    isTopThree ? styles.rankTop : styles.rankNormal,
                  ]}
                >
                  <Text
                    style={[
                      styles.rankText,
                      isTopThree ? styles.rankTextTop : styles.rankTextNormal,
                    ]}
                  >
                    #{index + 1}
                  </Text>
                </View>

                <View style={styles.productInfo}>
                  <Text style={styles.productName} numberOfLines={1}>
                    {item.name}
                  </Text>
                  {item.stockOutCount > 0 && (
                    <Text style={styles.stockOutTag}>
                      Sold out {item.stockOutCount}x today
                    </Text>
                  )}
                </View>

                <View style={styles.qtyBadge}>
                  <Text style={styles.qtyText}>{item.qtySold} sold</Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function StatCard({ title, value, icon, iconColor, bgTint }) {
  return (
    <View style={styles.card}>
      <View style={[styles.iconCircle, { backgroundColor: bgTint }]}>
        <FontAwesome name={icon} size={18} color={iconColor} />
      </View>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    height: 56,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    position: 'relative',
  },
  backBtn: {
    position: 'absolute',
    left: 16,
    padding: 6,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0f172a',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 8,
    marginTop: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 12,
  },
  card: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '500',
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
  },
  listCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  listTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  rankBadge: {
    width: 30,
    height: 30,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rankTop: {
    backgroundColor: '#ffedd5',
  },
  rankNormal: {
    backgroundColor: '#f1f5f9',
  },
  rankText: {
    fontSize: 12,
    fontWeight: '700',
  },
  rankTextTop: {
    color: '#c2410c',
  },
  rankTextNormal: {
    color: '#475569',
  },
  productInfo: {
    flex: 1,
    paddingRight: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  stockOutTag: {
    fontSize: 11,
    color: '#dc2626',
    fontWeight: '500',
    marginTop: 2,
  },
  qtyBadge: {
    backgroundColor: '#eff6ff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  qtyText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2563eb',
  },
});