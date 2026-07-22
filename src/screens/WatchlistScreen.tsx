import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { fetchHistory } from '../api/forex';
import { PairListItem } from '../components/PairListItem';
import { CURRENCY_PAIRS } from '../constants/pairs';
import { RootStackParamList } from '../navigation/types';
import { SignalResult } from '../types';
import { buildSignal } from '../utils/signal';

const HISTORY_DAYS = 90;

type Props = NativeStackScreenProps<RootStackParamList, 'Watchlist'>;

export function WatchlistScreen({ navigation }: Props) {
  const [signals, setSignals] = useState<Record<string, SignalResult>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [refreshing, setRefreshing] = useState(false);

  const loadAll = useCallback(async () => {
    await Promise.all(
      CURRENCY_PAIRS.map(async (pair) => {
        try {
          const history = await fetchHistory(pair.base, pair.quote, HISTORY_DAYS);
          const signal = buildSignal(history);
          setSignals((prev) => ({ ...prev, [pair.id]: signal }));
          setErrors((prev) => {
            const next = { ...prev };
            delete next[pair.id];
            return next;
          });
        } catch (err) {
          setErrors((prev) => ({
            ...prev,
            [pair.id]: err instanceof Error ? err.message : '取得エラー',
          }));
        }
      })
    );
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadAll();
    setRefreshing(false);
  }, [loadAll]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerBlock}>
        <Text style={styles.title}>Hayabusa FX</Text>
        <Text style={styles.subtitle}>テクニカル指標に基づく為替売買シグナル</Text>
      </View>
      <FlatList
        data={CURRENCY_PAIRS}
        keyExtractor={(pair) => pair.id}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        renderItem={({ item }) => (
          <PairListItem
            pair={item}
            signal={signals[item.id] ?? null}
            error={errors[item.id] ?? null}
            onPress={() => navigation.navigate('Detail', { pairId: item.id })}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  headerBlock: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
  },
  subtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
});
