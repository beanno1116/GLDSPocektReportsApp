import DollarSignIcon from "../../../../../assets/icons/DollarSignIcon";
import PerentSignIcon from "../../../../../assets/icons/PercentSignIcon";
import KpiGrid from "../../../../../Components/Grids/KpiGrid";
import Show from "../../../../../Components/Show/Show";
import NoDataView from "../../../../Templates/View/NoDataView";
import View from "../../../../Templates/View/View";



const SalesKpiGrid = ({ data,onClick,title }) => {

  const onViewAllClick = (e) => {
    onClick && onClick(e);
  }

  return (
  <>
    <View.SectionHeader id="SalesTotals" m='2rem 0 .5rem 0' title={title} viewAll={onClick} action="/report/stores/sales"/>
    <Show when={data.length > 0} fallback={<NoDataView dataName={title} />}>
      <KpiGrid m="0"> 
        {data.map(stat => {
          return (
            <KpiGrid.SummaryItem 
              icon={stat.format === "percentage" ? <PerentSignIcon size={20} /> : <DollarSignIcon size={24} />} 
              label={stat.title} 
              value={stat.value} 
              type={stat.format} 
              subValue={stat.delta}/>
            )
          })}
      </KpiGrid>
    </Show>
  </>
  );
}

export default SalesKpiGrid;