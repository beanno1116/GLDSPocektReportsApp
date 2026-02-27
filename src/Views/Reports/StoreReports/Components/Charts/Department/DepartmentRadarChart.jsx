import { Bar, BarChart, Cell, LabelList, Legend, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, RadialBar, RadialBarChart, Tooltip, XAxis, YAxis } from "recharts";
import PrimaryButton from "../../../../../../Components/Buttons/PrimaryButton";
import FlexRow from "../../../../../../Components/FlexComponents/FlexRow";
import TrendCard from "../../../../../Templates/Components/Cards/TrendCard";
import WEAccordion from "../../../../../../Components/WEAccordion/WEAccordion";
import Sort from "../../../../../../Utils/Sort";
import Format from "../../../../../../Utils/Format";
import styles from '../../../storeReportsView.module.css'
import { take } from "../../../../../../Utils/Utils";



const COLORS = ["#6366f1","#f59e0b", '#10b981', '#ef4444', '#8b5cf6','#ff00ff83','#ffd90085'];


const style = {
  top: '100%',
  right: 0,
  transform: 'translate(0, -50%)',
  lineHeight: '24px',
};


const RadialBarChartView = ({ chartData }) => {

  const dataObj = Sort.bySales([...take(5,chartData)],"desc").map((data,index) => {
        
        return {
          name: data.description,
          total: data.total,
          fill: COLORS[index]
        }
      })
  debugger
  return (
    <>
      <RadialBarChart
        style={{ width: '100%',height:"400px" }}
        responsive
        // cx="50%"
        // cy="50%"
        innerRadius="5%"
        outerRadius="100%"
        barCategoryGap={0}
        stackOffset="wiggle"
        startAngle={180}
        endAngle={-180}
        // reverseStackOrder={true}
        barGap={0}
        // barSize={60}
        data={dataObj}>
          <RadialBar minAngle={25}  label={{position:'insideStart',fill:'#fff',fontSize:"18px"}} background={{ fill: '#0a0e27' }} dataKey={"total"} />
          {/* <RadialBar dataKey={"total"}>
            <LabelList
              dataKey="total"
              formatter={(value) => value}
            />
          </RadialBar> */}
          <Tooltip />
        </RadialBarChart>
        <FlexRow m='0' wrap={true} hAlign='flex-start' g=".5rem 1rem">
          {dataObj.map((data,index) => {
            return (
              <span style={{display:"inline-flex",gap:".25rem",alignItems:"center",padding:".25rem",color:COLORS[index],fontWeight:"700"}}><div style={{background:COLORS[index],height:"25px",width:"25px",borderRadius:".5rem"}}></div>{data.name}</span>
            )
          })}
        </FlexRow>
    </>
  );
}



const DepartmentRadarChart = ({ chartData }) => {
  return (
    <TrendCard>
      
      <RadialBarChartView chartData={chartData} />

      
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