import * as React from "react";
import { View, Text, ScrollView, Pressable, Button, Share, Linking, Alert } from "react-native";

function Row({ children }) { return <Text style={{ marginVertical: 8, fontSize: 16, color: "#0a7" }}>{children}</Text>; }
function Section({ title, children }) { return (<View style={{ marginTop: 18 }}><Text style={{ fontWeight: "700", marginBottom: 8 }}>{title}</Text><View>{children}</View></View>); }
function Screen({ title, children, back }) { return (
  <ScrollView style={{ padding: 16 }}>
    <Text style={{ fontSize: 28, fontWeight: "800" }}>{title}</Text>
    <View style={{ marginTop: 10 }}>{children}</View>
    {back && <View style={{ marginTop: 18 }}><Button title="← Back" onPress={back} /></View>}
  </ScrollView>
); }
function KV({ k, v }) { return (<View style={{ marginTop: 10 }}><Text style={{ color: "#555" }}>{k}</Text><Text style={{ fontWeight: "600" }}>{v}</Text></View>); }
function Disclaimer(){ return <Text style={{ marginTop: 16, fontSize: 12, color: "#555" }}>Educational use only. Not medical advice.</Text>; }

export default function App() {
  const [screen, setScreen] = React.useState("home");
  const protocol = { summary: "(demo) Your tailored plan appears here.", savings: "£0", ref: "ETL-DEMO" };
  const compare = [
    { id:"1", name:"NAD+ 500mg", country:"DE", price:"£42.30", url:"https://example.com?ref=demo" },
    { id:"2", name:"Glutathione 1000mg", country:"AR", price:"£19.90", url:"https://example.com?ref=demo" }
  ];
  const insurance = {
    gaps:["plasmapheresis","HBOT"],
    recs:[
      { name:"Gold Health Plus", provider:"Acme Insurance", premium:"£189/mo", coverage:"76%" },
      { name:"GlobalCare Optimum", provider:"WorldHealth", premium:"£165/mo", coverage:"71%" }
    ]
  };
  const groups=[{ id:"g1", title:"NAD 3‑month bundle", stats:"7/20 • ends 22 Aug, 18:00", tiers:"5+ → £38 • 10+ → £34 • 20+ → £29" }];

  const NavBtn = ({to,label}) => <Pressable onPress={()=>setScreen(to)}><Row>→ {label}</Row></Pressable>;

  if (screen==="protocol") return (
    <Screen title="My Protocol" back={()=>setScreen("home")}>
      <Text style={{ marginTop:8 }}>{protocol.summary}</Text>
      <Button title="Share protocol" onPress={()=>Share.share({ message:`My EternaLife plan saved me ${protocol.savings}. Try it: https://eternalife.app/?ref=${protocol.ref}` })}/>
      <Disclaimer/>
    </Screen>
  );
  if (screen==="compare") return (
    <Screen title="Compare & Save" back={()=>setScreen("home")}>
      {compare.map(it=>(
        <View key={it.id} style={{ paddingVertical:12, borderBottomWidth:1, borderColor:"#eee" }}>
          <Text style={{ fontWeight:"600" }}>{it.name} • {it.country}</Text>
          <Text>Best price: {it.price}</Text>
          <Pressable onPress={()=>Linking.openURL(it.url)}><Text style={{ color:"#0a7", marginTop:6 }}>Buy / Book</Text></Pressable>
        </View>
      ))}
    </Screen>
  );
  if (screen==="insurance") return (
    <Screen title="Insurance Optimizer" back={()=>setScreen("home")}>
      <Text>Gaps detected: {insurance.gaps.length}</Text>
      {insurance.recs.map((r,i)=>(
        <View key={i} style={{ marginTop:12 }}>
          <Text style={{ fontWeight:"600" }}>{r.name} • {r.provider}</Text>
          <Text>Premium: {r.premium} • Coverage match: {r.coverage}</Text>
        </View>
      ))}
      <Text style={{ marginTop:16, fontSize:12, color:"#555" }}>Informational only. Consult a licensed broker.</Text>
    </Screen>
  );
  if (screen==="group") return (
    <Screen title="Group Buys" back={()=>setScreen("home")}>
      {groups.map(g=>(
        <View key={g.id} style={{ marginTop:12, padding:12, borderWidth:1, borderColor:"#eee", borderRadius:8 }}>
          <Text style={{ fontWeight:"600" }}>{g.title}</Text>
          <Text>{g.stats}</Text>
          <Text>Price tiers: {g.tiers}</Text>
          <Button title="Join (hold card)" onPress={()=>Alert.alert("Joined","Card hold placed (demo).")} />
        </View>
      ))}
    </Screen>
  );
  if (screen==="education") return (
    <Screen title="Education" back={()=>setScreen("home")}><Text>Glossary (AI) • Research Hub • Global Feedback</Text></Screen>
  );
  if (screen==="referrals") return (
    <Screen title="Referrals & Rewards" back={()=>setScreen("home")}><Text>Your code: <Text style={{ fontWeight:"700" }}>ETL-DEMO</Text></Text><Text>Progress: 0 / 5 (next: 1 month free)</Text></Screen>
  );
  if (screen==="profile") return (
    <Screen title="Profile & Settings" back={()=>setScreen("home")}>
      <KV k="Tier" v="Free (demo)" /><KV k="Locale" v="en‑GB" /><KV k="Currency" v="GBP" />
      <Text style={{ marginTop:16, fontSize:12, color:"#555" }}>Manage data export/delete in Settings.</Text>
    </Screen>
  );

  return (
    <Screen title="EternaLife">
      <Text style={{ marginTop:6, color:"#333" }}>Today’s highlights • Savings • Updates</Text>
      <Section title="Core">
        <NavBtn to="protocol" label="My Protocol" />
        <NavBtn to="compare" label="Compare & Save" />
        <NavBtn to="insurance" label="Insurance Optimizer" />
        <NavBtn to="group" label="Group Buys" />
      </Section>
      <Section title="Knowledge & Account">
        <NavBtn to="education" label="Education" />
        <NavBtn to="referrals" label="Referrals & Rewards" />
        <NavBtn to="profile" label="Profile & Settings" />
      </Section>
    </Screen>
  );
}
