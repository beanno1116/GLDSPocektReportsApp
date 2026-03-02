
import FlexRow from '../../../../Components/FlexComponents/FlexRow';
import SearchField from '../../../../Components/Inputs/SearchField';
import FinancialListItem from '../../../../Components/Lists/Components/FinancialListItem';
import ScrollView from '../../../../Components/ScrollView/ScrollView';
import Sort from '../../../../Utils/Sort';
import styles from '../safeReportsView.module.css';

const SafeMediaTabView = ({ safeData }) => {
  
  return (
    <div className={styles.safe_report_tab}>
      <FlexRow m='0 0 1rem 0'>
       <SearchField placeholder="Search for safe media" />
      </FlexRow>
       <ScrollView bottom='83px'>
        {Sort.byPickup(safeData.tenderSafeDetails).filter(t => t.pickup || t.deposit || t.loan).map(tender => {
            return (
              <FinancialListItem type="green" header={<FinancialListItem.Title text={tender.description} overShort={tender.overShort} />}>
                <FinancialListItem.Value label={"Pickup"} value={tender.pickup} format={tender.format}/>
                <FinancialListItem.Value label={"Deposit"} value={tender.deposit} format={tender.format} />
                <FinancialListItem.Value label={"Loan"} value={tender.loan} format={tender.format} />
              </FinancialListItem>
            )
          })}
       </ScrollView>
    </div>
  );
}

export default SafeMediaTabView;