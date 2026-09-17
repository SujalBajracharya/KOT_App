import { useCallback, useMemo, useState } from 'react';
import navigation from '@/utils/app_navigation';
import { mockMenuResponse } from '@/data/mock/menu';
import { MenuItem, UseOrderReturn } from './types';

export function useOrder(): UseOrderReturn {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchMode, setSearchMode] = useState<'name' | 'code'>('name');
  const [activeCategory, setActiveCategory] = useState('ALL');

  const categories = useMemo(() => {
    return [
      { id: 'ALL', name: 'All', active: activeCategory === 'ALL' },
      ...Array.from(
        new Set(mockMenuResponse.result.map((item) => item.category)),
      ).map((category) => ({
        id: category,
        name: category,
        active: activeCategory === category,
      })),
    ];
  }, [activeCategory]);

  const items = useMemo<MenuItem[]>(() => {
    const query = searchQuery.trim().toLowerCase();

    return mockMenuResponse.result
      .filter(
        (item) => activeCategory === 'ALL' || item.category === activeCategory,
      )
      .filter((item) => {
        if (!query) return true;
        const searchableValue =
          searchMode === 'name' ? item.itemName : item.itemCode;
        return searchableValue.toLowerCase().includes(query);
      })
      .map((item) => ({
        id: item.itemId,
        name: item.itemName,
        unit: 'plate',
        price: `${item.currency} ${item.unitPrice.toLocaleString()}`,
        thumbCode: item.itemCode,
        badge: item.isAvailable ? undefined : 'UNAVAILABLE',
        inCart: false,
      }));
  }, [activeCategory, searchMode, searchQuery]);

  const onBack = useCallback(() => {
    navigation.goBack();
  }, []);

  const onNewKOT = useCallback(() => {}, []);
  const onItemPress = useCallback((id: string) => {}, []);
  const onReviewKOT = useCallback(() => {}, []);

  return {
    state: {
      tableLabel: 'New order',
      tableMeta: 'Select a table to begin',
      searchQuery,
      searchMode,
      categories,
      items,
      cartItemCount: 0,
      cartTotal: 'NPR 0',
    },
    action: {
      onBack,
      onNewKOT,
      setSearchQuery,
      setSearchMode,
      onCategorySelect: setActiveCategory,
      onItemPress,
      onReviewKOT,
    },
  };
}
