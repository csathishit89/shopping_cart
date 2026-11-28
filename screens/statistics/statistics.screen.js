import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';
import styles from './statistics.styles';
import { loggedInDetails } from '../../redux/login/login.selectors';
import {
  fetchTotalOrdersRespReset,
  fetchTotalOrdersStart,
  fetchTotalRevenueProfitRespReset,
  fetchTotalRevenueProfitStart,
  fetchMonthRevenueProfitRespReset,
  fetchMonthRevenueProfitStart,
  fetchTopTenProductSalesRespReset,
  fetchTopTenProductSalesStart,
} from '../../redux/statistics/statistics.action';
import {
  selectTotalOrdersData,
  selectTotalOrdersResponse,
  selectTotalRevenueProfitData,
  selectTotalRevenueProfitResponse,
  selectMonthRevenueProfitData,
  selectMonthRevenueProfitResponse,
  selectTopTenProductSalesData,
  selectTopTenProductSalesResponse,
} from '../../redux/statistics/statistics.selectors';

const MONTHS = [
  { label: 'January', short: 'Jan', value: 1 },
  { label: 'February', short: 'Feb', value: 2 },
  { label: 'March', short: 'Mar', value: 3 },
  { label: 'April', short: 'Apr', value: 4 },
  { label: 'May', short: 'May', value: 5 },
  { label: 'June', short: 'Jun', value: 6 },
  { label: 'July', short: 'Jul', value: 7 },
  { label: 'August', short: 'Aug', value: 8 },
  { label: 'September', short: 'Sep', value: 9 },
  { label: 'October', short: 'Oct', value: 10 },
  { label: 'November', short: 'Nov', value: 11 },
  { label: 'December', short: 'Dec', value: 12 },
];

const EMPTY_MONTH_STATS = {
  month_revenue: 0,
  month_profit: 0,
};

const formatINR = (amount) =>
  `₹${Number(amount || 0).toLocaleString('en-IN')}`;

const normalizeMonthStats = (rawData) => {
  if (!rawData) {
    return EMPTY_MONTH_STATS;
  }
  const record = Array.isArray(rawData) ? rawData[0] : rawData;
  if (!record || typeof record !== 'object') {
    return EMPTY_MONTH_STATS;
  }
  return {
    month_revenue: Number(record.month_revenue) || 0,
    month_profit: Number(record.month_profit) || 0,
  };
};

export default function StatisticsScreen({ navigation }) {
  const dispatch = useDispatch();
  const loginData = useSelector(loggedInDetails);
  const userRecord = loginData && loginData.length > 0 ? loginData[0] : {};

  const currentMonthValue = new Date().getMonth() + 1;
  const [selectedMonth, setSelectedMonth] = useState(
    MONTHS.find((m) => m.value === currentMonthValue) || MONTHS[0]
  );
  const [monthDropdownVisible, setMonthDropdownVisible] = useState(false);
  const [monthStats, setMonthStats] = useState(EMPTY_MONTH_STATS);

  const totalOrdersResponse = useSelector(selectTotalOrdersResponse);
  const totalOrdersData = useSelector(selectTotalOrdersData) || {};
  const totalRevenueProfitResponse = useSelector(selectTotalRevenueProfitResponse);
  const totalRevenueProfitData = useSelector(selectTotalRevenueProfitData) || {};
  const monthRevenueProfitResponse = useSelector(selectMonthRevenueProfitResponse);
  const monthRevenueProfitData = useSelector(selectMonthRevenueProfitData);
  const topTenProductSalesResponse = useSelector(selectTopTenProductSalesResponse);
  const topTenProductSalesData = useSelector(selectTopTenProductSalesData) || [];

  useEffect(() => {
    const basePayload = {
      shopID: userRecord.ShopID,
      databaseName: 'General',
    };
    const monthPayload = {
      ...basePayload,
      month: selectedMonth.value,
    };

    dispatch(fetchTotalOrdersStart(basePayload));
    dispatch(fetchTotalRevenueProfitStart(basePayload));
    dispatch(fetchMonthRevenueProfitStart(monthPayload));
    dispatch(fetchTopTenProductSalesStart(basePayload));
  }, [dispatch, userRecord.ShopID]);

  useEffect(() => {
    if (totalOrdersResponse !== null) {
      dispatch(fetchTotalOrdersRespReset());
    }

    if (totalRevenueProfitResponse !== null) {
      dispatch(fetchTotalRevenueProfitRespReset());
    }

    if (monthRevenueProfitResponse !== null) {
      setMonthStats(normalizeMonthStats(monthRevenueProfitData));
      dispatch(fetchMonthRevenueProfitRespReset());
    }

    if (topTenProductSalesResponse !== null) {
      dispatch(fetchTopTenProductSalesRespReset());
    }
  }, [
    dispatch,
    totalOrdersResponse,
    totalRevenueProfitResponse,
    monthRevenueProfitResponse,
    topTenProductSalesResponse,
  ]);

  const handleSelectMonth = (monthItem) => {
    setSelectedMonth(monthItem);
    setMonthStats(EMPTY_MONTH_STATS);
    setMonthDropdownVisible(false);

    const getMonthOrderData = {
      shopID: userRecord.ShopID,
      month: monthItem.value,
      databaseName: 'General',
    };

    console.log(getMonthOrderData);
    dispatch(fetchMonthRevenueProfitStart(getMonthOrderData));
  };

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
            value={totalOrdersData.total_orders ?? 0}
            icon="shopping-bag"
            iconColor="#2563eb"
            bgTint="#eff6ff"
          />
          <StatCard
            title="Today Orders"
            value={totalOrdersData.today_orders ?? 0}
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

        {/* Row 4: Month Revenue & Profit with Month Dropdown */}
        <View style={styles.sectionHeaderRow}>
          <Text style={[styles.sectionLabel, { marginBottom: 0, marginTop: 0 }]}>
            Month's Performance
          </Text>

          <TouchableOpacity
            style={styles.dropdownTrigger}
            onPress={() => setMonthDropdownVisible(true)}
            activeOpacity={0.7}
          >
            <FontAwesome name="calendar" size={13} color="#4f46e5" />
            <Text style={styles.dropdownTriggerText}>{selectedMonth.label}</Text>
            <FontAwesome name="chevron-down" size={11} color="#475569" />
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <StatCard
            title={`${selectedMonth.short} Revenue`}
            value={formatINR(monthStats.month_revenue)}
            icon="calendar"
            iconColor="#4f46e5"
            bgTint="#eef2ff"
          />
          <StatCard
            title={`${selectedMonth.short} Profit`}
            value={formatINR(monthStats.month_profit)}
            icon="money"
            iconColor="#0d9488"
            bgTint="#f0fdfa"
          />
        </View>

        {Array.isArray(topTenProductSalesData) && topTenProductSalesData.length > 0 && (
          <View style={styles.listCard}>
            <View style={styles.listHeader}>
              <FontAwesome name="fire" size={18} color="#ea580c" />
              <Text style={styles.listTitle}>
                Top 10 Fast-Moving / Sold Out Today
              </Text>
            </View>

            {topTenProductSalesData.map((item, index) => {
              const isTopThree = index < 3;
              return (
                <View
                  key={item.id ?? index}
                  style={[
                    styles.productRow,
                    index === topTenProductSalesData.length - 1 && styles.noBorder,
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
                      {item.productName}
                    </Text>
                  </View>

                  <View style={styles.qtyBadge}>
                    <Text style={styles.qtyText}>{item.total_quantity_sold} sold</Text>
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>

      {/* Month Picker Modal */}
      <Modal
        visible={monthDropdownVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMonthDropdownVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setMonthDropdownVisible(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Month</Text>
              <TouchableOpacity onPress={() => setMonthDropdownVisible(false)}>
                <FontAwesome name="times" size={18} color="#64748b" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={MONTHS}
              keyExtractor={(item) => String(item.value)}
              renderItem={({ item }) => {
                const isSelected = item.value === selectedMonth.value;
                return (
                  <TouchableOpacity
                    style={[
                      styles.monthOption,
                      isSelected && styles.monthOptionSelected,
                    ]}
                    onPress={() => handleSelectMonth(item)}
                  >
                    <Text
                      style={[
                        styles.monthOptionText,
                        isSelected && styles.monthOptionTextSelected,
                      ]}
                    >
                      {item.label}
                    </Text>
                    {isSelected && (
                      <FontAwesome name="check" size={14} color="#4f46e5" />
                    )}
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </TouchableOpacity>
      </Modal>
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