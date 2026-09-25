import React from 'react';
import { Pressable, View } from 'react-native';
import { AppText as Text } from '@/components/common/AppText';
import { Minus, Plus } from 'lucide-react-native';

import { useTheme } from '@/theme/ThemeContext';
import { createStyles } from './styles';

interface LineItemProps {
  id: string;
  qty: string;
  name: string;
  unit: string;
  note?: string;
  quantity: number;
  amount: string;
  onDecrement: (id: string) => void;
  onIncrement: (id: string) => void;
}

export function LineItem({
  id,
  qty,
  name,
  unit,
  note,
  quantity,
  amount,
  onDecrement,
  onIncrement,
}: LineItemProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.lineItem}>
      <View style={styles.lineQtyCol}>
        <Text style={styles.lineQty}>0{id}</Text>
      </View>

      <View style={styles.lineBody}>
        <Text style={styles.lineName}>{name}</Text>

        <Text style={styles.lineUnit}>{unit}</Text>

        {note ? (
          <Text style={styles.lineNote}>{note}</Text>
        ) : null}
      </View>

      <View style={styles.lineQtyStepper}>
        <Pressable
          style={styles.stepperBtn}
          onPress={() => onDecrement(id)}
        >
          <Minus size={18} color={theme.colors.text} />
        </Pressable>

        <View style={styles.stepperQty}>
          <Text style={styles.stepperQtyText}>{quantity}</Text>
        </View>

        <Pressable
          style={styles.stepperBtnRight}
          onPress={() => onIncrement(id)}
        >
          <Plus size={18} color={theme.colors.text} />
        </Pressable>
      </View>

      <Text style={styles.lineAmount}>{amount}</Text>
    </View>
  );
}