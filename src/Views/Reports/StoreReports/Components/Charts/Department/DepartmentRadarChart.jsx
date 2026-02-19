import { Bar, BarChart, Cell, Legend, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, Tooltip, XAxis, YAxis } from "recharts";
import PrimaryButton from "../../../../../../Components/Buttons/PrimaryButton";
import FlexRow from "../../../../../../Components/FlexComponents/FlexRow";
import TrendCard from "../../../../../Templates/Components/Cards/TrendCard";
import WEAccordion from "../../../../../../Components/WEAccordion/WEAccordion";
import Sort from "../../../../../../Utils/Sort";
import Format from "../../../../../../Utils/Format";
import styles from '../../../storeReportsView.module.css'

const data = [
  {
    subject: 'Grocery',
    A: 120,
    B: 110,
    fullMark: 150,
  },
  {
    subject: 'Meat',
    A: 98,
    B: 130,
    fullMark: 150,
  },
  {
    subject: 'Hardware',
    A: 86,
    B: 130,
    fullMark: 150,
  },
  {
    subject: 'Deli',
    A: 99,
    B: 100,
    fullMark: 150,
  },
  {
    subject: 'Produce',
    A: 85,
    B: 90,
    fullMark: 150,
  },
  {
    subject: 'Lotto',
    A: 65,
    B: 85,
    fullMark: 150,
  },
];

const RadarChartView = ({chartData}) => {
  return (
    <RadarChart
      style={{ width: '100%', height: '100%', maxWidth: '500px', maxHeight: '80vh', aspectRatio: 1 }}
      responsive
      outerRadius="80%"
      data={chartData}
      margin={{
        top: 20,
        left: 20,
        right: 20,
        bottom: 20,
      }}
    >
      <Legend />
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" />
      <PolarRadiusAxis />
      <Radar name="Mike" dataKey="A" stroke="#00d4ff" fill="#00d4ff" fillOpacity={0.6} />
    </RadarChart>
  )
}

const BarChartView = ({chartData}) => {
  return (
    <BarChart
      style={{ width: '100%', maxWidth: '700px', maxHeight: '80vh', aspectRatio: 1.618 }}
      responsive
      data={chartData}
      barGap={0}
      barCategoryGap={4}
      margin={{
        top: 0,
        right: 5,
        left: 5,
        bottom: 0,
      }}>
      {/* <CartesianGrid /> */}
      <XAxis dataKey="description" />
      <YAxis dataKey="description" width="auto"  mirror={true} yAxisId={1} stroke="snow" hide={false} tickLine={false} axisLine={false}/>
      <Tooltip />
      {/* <Legend /> */}
      <Bar type="monotone" dataKey="total" fill="#8884d8" radius={[10, 10, 0, 0]}>
        {data.map((entry, index) => (
  <>
   <defs>
    <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='100%' spreadMethod='reflect'>
     <stop offset='0' stopColor='#00d4ff' />
     <stop offset='1' stopColor="#00ff88" />
     </linearGradient>
    </defs>
    <Cell key={`cell-${index}`} fill='url(#colorUv)' />
   </>
  ))}
      </Bar>
    </BarChart>
  )
}


const DepartmentRadarChart = ({ chartData }) => {
  return (
    <TrendCard>
      <FlexRow hAlign="space-between" vAlign="center" p="0 0 0 .5rem">
        <FlexRow flex="1">
          <h2>Departments</h2>
        </FlexRow>
      </FlexRow>
      <RadarChartView chartData={data} />
      {/* <BarChartView chartData={chartData} /> */}
      
      <FlexRow width="100%" m="1.5rem 0 .5rem 0">
        <WEAccordion>
          <WEAccordion.Panel>
            <WEAccordion.Panel.Header>
              <h3>Department Totals</h3>
            </WEAccordion.Panel.Header>
            <WEAccordion.Panel.Content>
              {Sort.hourlySales(chartData).map((data,index) => {
                return (
                  <div key={index} className={styles.sub_item}>
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

      <FlexRow p="1rem 0 0 0">
        <PrimaryButton>Department Sales Report</PrimaryButton>
      </FlexRow>
    </TrendCard>
  );
}

export default DepartmentRadarChart;