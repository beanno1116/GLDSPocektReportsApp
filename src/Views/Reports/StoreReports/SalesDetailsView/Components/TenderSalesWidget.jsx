
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

const data = [
            {
              name: 'Cash',
              value: 593.45
            },
            {
              name: 'Debit',
              value: 734.75
            },
            {
              name: 'Visa',
              value: 895.32
            },
            {
              name: 'Discover',
              value: 342.56
            },
            {
              name: 'EBT',
              value: 412.24
            },
            {
              name: 'Check',
              value: 75.54
            },
          ];

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
          <Tooltip />
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