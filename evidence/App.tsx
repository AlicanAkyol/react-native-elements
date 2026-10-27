import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TabViewBase as Before} from './BeforeTabView';
import {TabViewBase as After} from './AfterTabView';
import {TabViewItem} from './TabView.Item';

const records: Record<string, {width: number; height: number; x: number}> = {};
(globalThis as any).recordLayout = (key: string, layout: any) => { records[key] = layout; };
export default function App() {
  const [index, setIndex] = useState(0);
  const [measurements, setMeasurements] = useState('Waiting for native layout…');
  useEffect(() => {
    const change = setTimeout(() => setIndex(1), 2000);
    const read = setTimeout(() => {
      setMeasurements(Object.entries(records).map(([key, v]) => `${key}: x=${v.x.toFixed(1)} width=${v.width.toFixed(1)}`).join('\n'));
      console.log('NATIVE_LAYOUT_RESULT ' + JSON.stringify(records));
    }, 3500);
    return () => {clearTimeout(change); clearTimeout(read);};
  }, []);
  const pages = ['#e7a2a2', '#a2d8b1', '#a3b9ee'].map((color, i) => (
    <TabViewItem key={i} style={{width: '100%', backgroundColor: color}}>
      <Text style={{fontSize: 23, padding: 14}}>{['First', 'Second', 'Third'][i]}</Text>
    </TabViewItem>
  ));
  return (
    <View style={{flex: 1, paddingTop: 70, alignItems: 'center', backgroundColor: 'white'}}>
      <Text style={{fontSize: 20, fontWeight: '700'}}>Elements TabView · RN 0.87.1</Text>
      <Text style={{margin: 8}}>Three pages · selected page: {index + 1}</Text>
      <Text style={{fontSize: 18, marginTop: 12}}>Before: current next branch</Text>
      <Before value={index} disableTransition containerStyle={styles.frame}>{pages}</Before>
      <Text style={{fontSize: 18, marginTop: 20}}>After: supported absoluteFill</Text>
      <After value={index} disableTransition containerStyle={styles.frame}>{pages}</After>
      <Text style={{fontSize: 12, marginTop: 20, fontFamily: 'Menlo'}}>{measurements}</Text>
    </View>
  );
}
const styles = StyleSheet.create({frame: {flex: 0, width: 320, height: 150, overflow: 'hidden', borderWidth: 1, borderColor: '#222'}});
