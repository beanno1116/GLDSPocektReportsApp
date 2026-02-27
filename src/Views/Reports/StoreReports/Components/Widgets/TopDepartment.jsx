
import Show from '../../../../../Components/Show/Show';
import Format from '../../../../../Utils/Format';
import { take } from '../../../../../Utils/Utils';
import TopCategorySection from '../../../../Templates/Components/Sections/TopCategorySection';
import NoDataView from '../../../../Templates/View/NoDataView';
import View from '../../../../Templates/View/View';
import styles from './widgets.module.css';



{/* Top department sales */}
const TopDepartment = ({ data,title,onClick }) => {
  return (
    <>
      <View.SectionHeader id="Top Departments" m='2rem 0 .5rem 0' title={title} viewAll={onClick} action="/report/stores/departments"/>
      <Show when={data?.length > 0} fallback={<NoDataView />}>
        <TopCategorySection>
          {[...take(5,data)].map(cat => {
            return (
              <TopCategorySection.Item 
                name={cat.description.toLowerCase()}
                subtitle={`${Format.string(cat.quantity,Format.NUMBER_FORMAT)} units sold`}
                value={Format.moneyAbbreviation(parseFloat(cat.total))} 
                delta={Format.string(cat.totalDelta,"percentage")}/>

            )
          })}          
        </TopCategorySection>
      </Show>
    </>
  );
}

export default TopDepartment;