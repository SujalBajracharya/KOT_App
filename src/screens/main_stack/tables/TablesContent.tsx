import React from 'react';
import { FlatList, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, RefreshCw } from 'lucide-react-native';
import { useTheme } from '@/theme/ThemeContext';
import { AppHeader, IconButton } from '@/components/common';
import { TableStatus, TablesContentProps } from './types';
import { createStyles } from './styles';

export function TablesContent({ state, action }: TablesContentProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  function cellStyles(status: TableStatus) {
    switch (status) {
      case 'occupied':
        return styles.tableCellOccupied;
      case 'bill':
        return styles.tableCellBill;
      default:
        return styles.tableCellFree;
    }
  }

  function isDark(status: TableStatus) {
    return status === 'occupied' || status === 'bill';
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom', 'left', 'right']}>
      <View style={styles.container}>
        {/* ── Stack Header Component ── */}
        <AppHeader
          title="Tables"
          onBack={action.onBack}
          rightComponent={
            <>
              <IconButton onPress={action.onSearch}>
                <Search size={20} color={theme.colors.text} />
              </IconButton>
              <IconButton onPress={action.onRefresh}>
                <RefreshCw size={20} color={theme.colors.text} />
              </IconButton>
            </>
          }
        />

        {/* ── Floor tabs ── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.floorTabs}
          contentContainerStyle={{ flexDirection: 'row' }}
        >
          {state.floors.map((floor) => (
            <Pressable
              key={floor.id}
              style={[styles.floorTab, floor.active && styles.floorTabActive]}
              onPress={() => action.onFloorSelect(floor.id)}
            >
              <Text
                style={[
                  styles.floorTabText,
                  floor.active && styles.floorTabTextActive,
                ]}
              >
                {floor.name.toUpperCase()}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* ── Legend ── */}
        <View style={styles.legend}>
          {[
            { label: 'FREE', variant: 'free' },
            { label: 'OCCUPIED', variant: 'occupied' },
            { label: 'BILL', variant: 'bill' },
            { label: 'HELD', variant: 'held' },
          ].map(({ label, variant }) => (
            <View key={label} style={styles.legendItem}>
              <View
                style={[
                  styles.legendSwatch,
                  variant === 'free' && styles.legendSwatchFree,
                  variant === 'occupied' && styles.legendSwatchOccupied,
                  variant === 'bill' && styles.legendSwatchBill,
                  variant === 'held' && styles.legendSwatchHeld,
                ]}
              />
              <Text style={styles.legendText}>{label}</Text>
            </View>
          ))}
        </View>

        {/* ── Table grid ── */}
        <FlatList
          data={state.tables}
          keyExtractor={(t) => t.id}
          numColumns={2}
          style={styles.tableGrid}
          contentContainerStyle={styles.tableGridContent}
          renderItem={({ item: t }) => {
            const dark = isDark(t.status);
            return (
              <Pressable
                style={[styles.tableCell, cellStyles(t.status)]}
                onPress={() => action.onTablePress(t.id)}
              >
                <View style={styles.tableCellHeader}>
                  <Text
                    style={[
                      styles.tableNumber,
                      dark ? styles.tableNumberDark : styles.tableNumberLight,
                    ]}
                  >
                    {t.name}
                  </Text>
                  <Text
                    style={[
                      styles.tableStatus,
                      dark ? styles.tableStatusDark : styles.tableStatusLight,
                    ]}
                  >
                    {t.statusLabel}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.tableMeta,
                    dark ? styles.tableMetaDark : styles.tableMetaLight,
                  ]}
                >
                  {t.meta}
                </Text>
                <Text
                  style={[
                    styles.tableAmount,
                    dark ? styles.tableAmountDark : styles.tableAmountLight,
                  ]}
                >
                  {t.amount}
                </Text>
              </Pressable>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}