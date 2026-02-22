import KpiGrid from "../../../../../Components/Grids/KpiGrid";
import Show from "../../../../../Components/Show/Show";
import NoDataView from "../../../../Templates/View/NoDataView";
import View from "../../../../Templates/View/View";



const LoyaltyTotals = ({ data,title,onClick }) => {
  const onViewAllClick = (e) => {
    onClick && onClick(e);
  }
  return (
    <>
      <View.SectionHeader id="LoyaltyTotals" m='2rem 0 .5rem 0' title={title} viewAll={onClick} action="/report/stores/loyalty"/>
      <Show when={data?.length && data.length > 0} fallback={<NoDataView dataName={title} />}>
        <KpiGrid m="0">
          {
            data.map(item => {
              return (
                <KpiGrid.Item type="blue" title={item.title} value={item.value} subValue={item.delta} format={item.format} />
              )
            })
          }
        </KpiGrid>
      </Show>
    </>
  );
}

export default LoyaltyTotals;