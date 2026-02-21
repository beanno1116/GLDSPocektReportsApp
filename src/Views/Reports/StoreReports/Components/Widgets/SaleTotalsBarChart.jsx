import View from "../../../../Templates/View/View";
import ChartTabView from "../ChartTabView";



const SaleTotalsBarChart = ({ data,title }) => {
  return (
  <>
    <View.SectionTitle id="SalesTotalsBarChart" m='2rem 0 .5rem 0'>{title}</View.SectionTitle>
    <ChartTabView chartData={data} />
  </>
  );
}

export default SaleTotalsBarChart;