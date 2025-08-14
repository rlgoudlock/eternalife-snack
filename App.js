import * as React from 'react';
import { View, Text, Pressable, SafeAreaView, ScrollView } from 'react-native';

const TAB_LIST = [
  { key: 'home', label: 'Home', title: 'EternaLife Dashboard' },
  { key: 'protocol', label: 'Protocol', title: 'Your Protocol' },
  { key: 'compare', label: 'Compare', title: 'Compare & Save' },
  { key: 'insurance', label: 'Insurance', title: 'Insurance Optimizer' },
  { key: 'group', label: 'Group Buys', title: 'Group Buying' },
  { key: 'education', label: 'Education', title: 'Learn & Research' },
  { key: 'referrals', label: 'Referrals', title: 'Referrals & Rewards' },
  { key: 'profile', label: 'Profile', title: 'Your Profile' }
];

function Screen({ title, children }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 80 }}>
        <Text style={{ fontSize: 24, fontWeight: '800' }}>{title}</Text>
        <View style={{ marginTop: 12 }}>{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Placeholder({ text }) {
  return <Text style={{ marginTop: 8, fontSize: 16, color: '#333' }}>{text}</Text>;
}

export default function App() {
  const [tab, setTab] = React.useState('home');

  const current = TAB_LIST.find(t => t.key === tab);

  return (
    <View style={{ flex: 1 }}>
      {/* Content */}
      <Screen title={current?.title || ''}>
        {tab === 'home' && (
          <>
            <Placeholder text="Today’s highlights • Savings • Updates" />
            <Placeholder text="Quick links: Protocol • Compare • Insurance • Group Buys" />
          </>
        )}
        {tab === 'protocol' && <Placeholder text="(demo) Your tailored plan appears here." />}
        {tab === 'compare' && (
          <>
            <Placeholder text="Best global prices with FX conversion." />
            <Placeholder text="Tap to buy/book (affiliate when available)." />
          </>
        )}
        {tab === 'insurance' && (
          <>
            <Placeholder text="Upload policy → find gaps → show better plans." />
            <Placeholder text="Informational only. Consult a licensed broker." />
          </>
        )}
        {tab === 'group' && (
          <>
            <Placeholder text="Join pooled discounts. Card hold until threshold." />
            <Placeholder text="Tiers: 5+ → lower price • 10+ → lower • 20+ → lowest." />
          </>
        )}
        {tab === 'education' && (
          <>
            <Placeholder text="Glossary (AI), research tiles, and global feedback." />
            <Placeholder text="Positive highlights with a balanced view toggle." />
          </>
        )}
        {tab === 'referrals' && (
          <>
            <Placeholder text="Your code: ETL-DEMO" />
            <Placeholder text="Progress: 0 / 5 (next: 1 month free)" />
          </>
        )}
        {tab === 'profile' && (
          <>
            <Placeholder text="Tier: Free (demo)" />
            <Placeholder text="Locale: en-GB • Currency: GBP" />
          </>
        )}
      </Screen>

      {/* Simple bottom tab bar (no extra packages) */}
      <View style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        borderTopWidth: 1, borderColor: '#eee', backgroundColor: 'white', paddingVertical: 8
      }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 8 }}>
          {TAB_LIST.map(t => {
            const active = t.key === tab;
            return (
              <Pressable
                key={t.key}
                onPress={() => setTab(t.key)}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  marginRight: 8,
                  borderRadius: 16,
                  backgroundColor: active ? '#0aa' : '#f2f2f2'
                }}
              >
                <Text style={{ color: active ? 'white' : '#222', fontWeight: active ? '700' : '500' }}>
                  {t.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}