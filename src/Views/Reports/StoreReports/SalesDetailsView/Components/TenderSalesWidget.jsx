
import { Pie, PieChart, Sector, Tooltip } from 'recharts';
import FlexColumn from '../../../../../Components/FlexComponents/FlexColumn';
import FlexRow from '../../../../../Components/FlexComponents/FlexRow';
import Show from '../../../../../Components/Show/Show';
import Format from '../../../../../Utils/Format';
import Sort from '../../../../../Utils/Sort';
import View from '../../../../Templates/View/View';
import TenderPieChart from '../../Components/Charts/Tender/TenderPieChart';
import WEAccordion from '../../../../../Components/WEAccordion/WEAccordion';
import styles from '../../storeReportsView.module.css';
import TrendCard from '../../../../Templates/Components/Cards/TrendCard';
import {take} from '../../../../../Utils/Utils.js';

const monthlyData = [
  { month: "Jan", revenue: 42000, expenses: 28000, profit: 14000 },
  { month: "Feb", revenue: 51000, expenses: 31000, profit: 20000 },
  { month: "Mar", revenue: 47000, expenses: 29500, profit: 17500 },
  { month: "Apr", revenue: 63000, expenses: 34000, profit: 29000 },
  { month: "May", revenue: 58000, expenses: 32000, profit: 26000 },
  { month: "Jun", revenue: 71000, expenses: 38000, profit: 33000 },
  { month: "Jul", revenue: 69000, expenses: 36500, profit: 32500 },
  { month: "Aug", revenue: 80000, expenses: 41000, profit: 39000 },
  { month: "Sep", revenue: 74000, expenses: 39000, profit: 35000 },
  { month: "Oct", revenue: 88000, expenses: 44000, profit: 44000 },
  { month: "Nov", revenue: 95000, expenses: 47000, profit: 48000 },
  { month: "Dec", revenue: 102000, expenses: 51000, profit: 51000 },
];

function AreaTooltip({ active, payload, label,monthlyData }) {
  if (!active || !payload || !payload.length) return null;
debugger;
  const idx = monthlyData.findIndex((d) => d.month === label);
  const prev = idx > 0 ? monthlyData[idx - 1] : null;

  const rows = [
    { key: "total",  label: payload[0].payload.description,  color: "#818cf8" },
  ];

  return (
    <div style={{
      background: "#0f172a",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 12,
      padding: "14px 18px",
      boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(129,140,248,0.15)",
      minWidth: 200,
      fontFamily: "'DM Sans', system-ui, sans-serif",
    }}>
      {/* Header */}
      <div style={{
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "#64748b",
        marginBottom: 10,
        paddingBottom: 8,
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        {payload[0].payload.description} 
      </div>

      {/* Rows */}
      {rows.map(({ key, label: rowLabel, color }) => {
        const val = payload.find((p) => p.dataKey === key)?.value ?? 0;
        const prevVal = prev?.[key];
        return (
          <div key={key} style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 8,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{
                width: 8, height: 8, borderRadius: "50%",
                background: color, display: "inline-block",
                boxShadow: `0 0 6px ${color}`,
              }} />
              <span style={{ fontSize: 12, color: "#94a3b8" }}></span>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#f1f5f9" }}>
                {Format.string(val,Format.CURRENCY_FORMAT)}
              </span>
              {/* <Trend current={val} previous={prevVal} /> */}
            </div>
          </div>
        );
      })}

      {/* Margin rate */}
      {/* {(() => {
        const rev = payload.find((p) => p.dataKey === "revenue")?.value ?? 1;
        const profit = payload.find((p) => p.dataKey === "profit")?.value ?? 0;
        const margin = ((profit / rev) * 100).toFixed(1);
        return (
          <div style={{
            marginTop: 10,
            paddingTop: 8,
            borderTop: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            <span style={{ fontSize: 11, color: "#475569" }}>Margin rate</span>
            <span style={{
              fontSize: 12, fontWeight: 700,
              color: margin > 40 ? "#34d399" : "#facc15",
            }}>{margin}%</span>
          </div>
        );
      })()} */}
    </div>
  );
}

          const COLORS = ['#00ff8897', '#00d5ff88', '#ff6b358d', '#a955f77f','#ff00ff83','#ffd90085'];
          const MyCustomPie = ({...props}) => {
  return <Sector {...props} fill={COLORS[props.index % COLORS.length]} />;
};

const TenderSalesWidget = ({ tenderData=[],children }) => {
  
  return (
    <>
      <View.SectionTitle id="tender" m='.5rem 0'>Sales Tenders</View.SectionTitle>
      <Show when={tenderData.length > 0} fallback={<div>No Data found!</div>}>
        <TrendCard>
          <FlexRow hAlign="space-between" vAlign="center" p="0 0 0 .5rem">
            <FlexRow flex="1">
              <h2>Tenders</h2>
            </FlexRow>
          </FlexRow>
          <PieChart style={{ width: '100%', maxHeight: '80vh', aspectRatio: 2 }} isAnimationActive={true} responsive>
            <Pie
            dataKey="total"
            startAngle={180}
            endAngle={0}
            data={[...take(5,Sort.bySales(tenderData))]}
            cx="50%"
            cy="100%"
            outerRadius="150%"
            fill="#8884d8"
            label
            isAnimationActive={true}
            shape={MyCustomPie}
          />
          <Tooltip  wrapperStyle={{ outline: "none" }}  content={<AreaTooltip monthlyData={[...take(5,Sort.bySales(tenderData))]} />} />
          </PieChart>
          <FlexRow m='1rem 0 0 0' wrap={true} hAlign='space-evenly'>
            <span style={{display:"inline-flex",gap:".25rem",alignItems:"center",padding:".25rem"}}><div style={{background:'#00ff8897',height:"25px",width:"25px",borderRadius:".5rem"}}></div> Debit Card</span>
            <span style={{display:"inline-flex",gap:".25rem",alignItems:"center",padding:".25rem"}}><div style={{background:'#00d5ff88',height:"25px",width:"25px",borderRadius:".5rem"}}></div> Visa</span>
            <span style={{display:"inline-flex",gap:".25rem",alignItems:"center",padding:".25rem"}}><div style={{background:'#ff6b358d',height:"25px",width:"25px",borderRadius:".5rem"}}></div> Cash</span>
            <span style={{display:"inline-flex",gap:".25rem",alignItems:"center",padding:".25rem"}}><div style={{background:'#a955f77f',height:"25px",width:"25px",borderRadius:".5rem"}}></div> Master</span>
            <span style={{display:"inline-flex",gap:".25rem",alignItems:"center",padding:".25rem"}}><div style={{background:'#ff00ff83',height:"25px",width:"25px",borderRadius:".5rem"}}></div> Discover</span>
            <span style={{display:"inline-flex",gap:".25rem",alignItems:"center",padding:".25rem"}}><div style={{background:'#ffd90085',height:"25px",width:"25px",borderRadius:".5rem"}}></div> American Experess</span>
          </FlexRow>

          <FlexRow width="100%" m="1.5rem 0 .5rem 0">
            <WEAccordion>
              <WEAccordion.Panel>
                <WEAccordion.Panel.Header>
                  <h3>Tender Totals</h3>
                </WEAccordion.Panel.Header>
                <WEAccordion.Panel.Content>
                  {Sort.hourlySales(tenderData).map(data => {
                    return (
                      <div className={styles.sub_item}>
                        <span>💵 {data.description}</span>
                        <span>{Format.string(data.total,"currency")}</span>
                      </div>
                    )
                  })}
                  {/* <div className={styles.sub_item}>
                    <span>🏦  Debit</span>
                    <span>$128,500</span>
                  </div>
                  <div className={styles.sub_item}>
                    <span>🏦  Credit</span>
                    <span>$85,000</span>
                  </div>
                  <div className={styles.sub_item}>
                    <span>🏦  Discover</span>
                    <span>$45,000</span>
                  </div>
                  <div className={styles.sub_item}>
                    <span>🏦  Check</span>
                    <span>$45,000</span>
                  </div>
                  <div className={styles.sub_item}>
                    <span>🏦  EBT</span>
                    <span>$45,000</span>
                  </div>
                  <div className={styles.sub_item}>
                    <span>🏦  Wic</span>
                    <span>$299,000</span>
                  </div> */}
                  {/* <div className={`${styles.sub_item} ${styles.sub_item_total}`}>
                    <span>🏦  Total</span>
                    <span>$299,000</span>
                  </div> */}
                </WEAccordion.Panel.Content>
              </WEAccordion.Panel>
            </WEAccordion>
          </FlexRow>

          
          {/* <LineLabel text={"Busiest Period"} subtext={formatTimeSpan(max.hour)} value={Format.string(max.total / 365,"shortCurrency")} /> */}
          {/* <LineLabel text={"Slowest Period"} subtext={formatTimeSpan(min.hour)} value={Format.string(min.total / 365,"shortCurrency")} type="negative"/> */}
          <FlexRow p="1rem 0 0 0">
            {children}
          </FlexRow>
        </TrendCard>
      </Show>
    </>
  );
}

export default TenderSalesWidget;