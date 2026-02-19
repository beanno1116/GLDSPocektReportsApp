
import Show from '../../../../../Components/Show/Show';
import TrendCard from '../../../../Templates/Components/Cards/TrendCard';
import View from '../../../../Templates/View/View';
import styles from '../../storeReportsView.module.css';

const OtherSalesWidget = ({ balanceSheet,...props }) => {
  
  const renderOtherData = (data) => {
    if (!data) return <div>No data found!</div>
    debugger;
    const itemDiscounts = data["itemdiscount"] || [];
    const received = data["received"] || [];
    const rbsLynk = data["rbslynkiso"] || [];

    const otherDataArr = [...itemDiscounts,...received,...rbsLynk];

    return otherDataArr.map(data => {
      return (
        <div key={data.description} className={styles.sub_item}>
            <span>💵 {data.description}</span>
            <span>${data.total}</span>
          </div>
      )
    })

  }
  
  return (
    <>
      <View.SectionTitle id="department" m='.5rem 0'>Other</View.SectionTitle>
      <Show when={balanceSheet?.sales} fallback={<div>No data found!</div>}>
        <TrendCard>
        {renderOtherData(balanceSheet)}
        </TrendCard>
      </Show>
    </>
  );
}

export default OtherSalesWidget;