import Show from "../../../../../Components/Show/Show";
import Format from "../../../../../Utils/Format";
import TopCategorySection from "../../../../Templates/Components/Sections/TopCategorySection";
import NoDataView from "../../../../Templates/View/NoDataView";
import View from "../../../../Templates/View/View";



const CouponTotals = ({ data,title,onClick }) => {
  const onViewAllClick = (e) => {
    
    onClick && onClick(e);
  }
  return (
    <>
      <View.SectionHeader id="CouponTotals" m='2rem 0 .5rem 0' title={title} viewAll={onClick} action="/report/stores/loyalty"/>
      <Show when={data?.length && data.length > 0} fallback={<NoDataView dataName={title} />}>
        {
          data.map(item => {
            return (
              <TopCategorySection.Item name={item.title} subtitle={`${item.quantity} redeemed`} delta={Format.string(item.delta,"percentage")} value={Format.string(item.value,item.format)} />
            )
          })
        }
      </Show>
    </>
  );
}

export default CouponTotals;