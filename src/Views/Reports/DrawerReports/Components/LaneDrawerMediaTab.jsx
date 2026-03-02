
import FlexRow from '../../../../Components/FlexComponents/FlexRow';
import HorizontalScrollView from '../../../../Components/ScrollView/HorizontalScrollView';
import FinancialCard from '../../../Templates/Components/Cards/FinancialCard';
import styles from '../drawerReportView.module.css';


const laneData = [
  {name:"Lane 1",mainValue:25325.32,start:1172.81,revenue:25325.32,pickup:25350.32,shortOver:+50.00,type:"pink"},
  {name:"Lane 2",mainValue:18163.32,start:0.00,revenue:18163.32,pickup:17163.32,shortOver:-32.35,type:"blue"},
  {name:"Lane 3",mainValue:21105.12,start:385.21,revenue:21105.12,pickup:21105.12,shortOver:0.00,type:"platinum"},
  {name:"Lane 4",mainValue:12105.12,start:85.21,revenue:12105.12,pickup:12105.12,shortOver:0.00,type:"green"},
  {name:"Lane 5",mainValue:11605.12,start:5.21,revenue:11605.12,pickup:11605.12,shortOver:0.00,type:"gold"}
]

const LaneDrawerMediaTab = ({ ...props }) => {
  return (
    <div className={styles.lanes_report_tab}>
       <div style={{position:"relative",width:"100%",height:"100%",padding:"0 0rem"}}>
        <HorizontalScrollView height='100%'>
          <div style={{width:"250px",height:"100%",flexShrink: 0}}></div>

          {laneData.map(lane => {
            return (
              <FinancialCard  type={lane.type}>
                <FinancialCard.Header name={lane.name} type={lane.type} />
                <FinancialCard.SummaryList>
                  <FinancialCard.MediaValue label={"Cash"} value={12342.35} />
                  <FinancialCard.MediaValue label={"Visa"} value={12342.35} />
                  <FinancialCard.MediaValue label={"Debit Card"} value={12342.35} />
                  <FinancialCard.MediaValue label={"EBT"} value={12342.35} />
                  <FinancialCard.MediaValue label={"Check"} value={12342.35} />
                  <FinancialCard.MediaValue label={"American Express"} value={12342.35} />
                  <FinancialCard.MediaValue label={"Discover"} value={12342.35} />
                  <FinancialCard.MediaValue label={"Discover"} value={12342.35} />
                  <FinancialCard.MediaValue label={"Discover"} value={12342.35} />
                  <FinancialCard.MediaValue label={"Discover"} value={12342.35} />
                  <FinancialCard.MediaValue label={"Discover"} value={12342.35} />
                </FinancialCard.SummaryList>
                <FlexRow p='1rem'>
                  <FinancialCard.ActionButton type={lane.type} title={"Report"} />
                </FlexRow>
              </FinancialCard>
            )
          })}
          <div style={{width:"250px",height:"100%",flexShrink: 0}}></div>
        </HorizontalScrollView>
       </div>
    </div>
  );
}

export default LaneDrawerMediaTab;