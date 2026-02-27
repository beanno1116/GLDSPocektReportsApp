
import TextField from '../../../Components/Inputs/TextField';
import styles from '../reportBuilder.module.css';

const availableMetrics = [
    {
      category: 'Revenue Metrics',
      metrics: [
        { id: 'total_revenue', label: 'Total Revenue', icon: '💰', popular: true },
        { id: 'gross_profit', label: 'Gross Profit', icon: '💵' },
        { id: 'net_profit', label: 'Net Profit', icon: '💎' },
        { id: 'revenue_by_category', label: 'Revenue by Category', icon: '📊' }
      ]
    },
    {
      category: 'Sales Metrics',
      metrics: [
        { id: 'total_transactions', label: 'Total Transactions', icon: '🛒', popular: true },
        { id: 'avg_transaction', label: 'Average Transaction Value', icon: '💳' },
        { id: 'items_sold', label: 'Items Sold', icon: '📦' },
        { id: 'refunds', label: 'Refunds & Returns', icon: '↩️' }
      ]
    },
    {
      category: 'Customer Metrics',
      metrics: [
        { id: 'unique_customers', label: 'Unique Customers', icon: '👥', popular: true },
        { id: 'new_customers', label: 'New Customers', icon: '🆕' },
        { id: 'returning_customers', label: 'Returning Customers', icon: '🔄' },
        { id: 'customer_satisfaction', label: 'Customer Satisfaction', icon: '⭐' }
      ]
    },
    {
      category: 'Inventory Metrics',
      metrics: [
        { id: 'stock_levels', label: 'Stock Levels', icon: '📦' },
        { id: 'low_stock_items', label: 'Low Stock Items', icon: '⚠️' },
        { id: 'out_of_stock', label: 'Out of Stock Items', icon: '❌' },
        { id: 'inventory_turnover', label: 'Inventory Turnover', icon: '🔄' }
      ]
    },
    {
      category: 'Department Performance',
      metrics: [
        { id: 'dept_revenue', label: 'Department Revenue', icon: '🏬' },
        { id: 'top_departments', label: 'Top Performing Departments', icon: '🏆' },
        { id: 'dept_growth', label: 'Department Growth Rate', icon: '📈' }
      ]
    },
    {
      category: 'Product Performance',
      metrics: [
        { id: 'top_products', label: 'Top Selling Products', icon: '⭐', popular: true },
        { id: 'product_revenue', label: 'Product Revenue', icon: '💰' },
        { id: 'slow_movers', label: 'Slow Moving Products', icon: '🐌' }
      ]
    },
    {
      category: 'Operational Metrics',
      metrics: [
        { id: 'labor_costs', label: 'Labor Costs', icon: '👷' },
        { id: 'avg_checkout_time', label: 'Average Checkout Time', icon: '⏱️' },
        { id: 'waste_shrinkage', label: 'Waste & Shrinkage', icon: '🗑️' },
        { id: 'staff_productivity', label: 'Staff Productivity', icon: '⚡' }
      ]
    }
  ];

const SelectMetricsStep = ({ data=[],reportConfig,onSelect }) => {

  const setReportConfig = (e) => {

  }
  const selectPopularMetrics = (e) => {

  }

  return (
    <div className={styles.step_content}>

      

      {/* Metrics List */}
      <div className={styles.metrics_container} style={{margin:"1.5rem 0 0 0"}}>
        {/* {availableMetrics.map((category, catIndex) => ( */}
        {data.map((category, catIndex) => (
          <div key={catIndex} className={styles.metric_category}>
            <div className={styles.category_header}>
              <div className={styles.category_title}>{category.category}</div>
              <div className={styles.category_count}>
                {category.metrics.filter(m => reportConfig.selectedMetrics.includes(m.id)).length}/{category.metrics.length}
              </div>
            </div>

            <div className={styles.metrics_list}>
              {category.metrics.map((metric) => {
                const isSelected = reportConfig.selectedMetrics.includes(metric.id);
                return (
                  <button
                    key={metric.id}
                    className={`${styles.metric_item} ${isSelected && styles.metric_item_selected}`}
                    onClick={() => onSelect(metric.id)}
                  >
                    <div className={styles.metric_checkbox}>
                      {isSelected && <span className={styles.checkmark}>✓</span>}
                    </div>
                    <div className={styles.metric_icon}>{metric.icon}</div>
                    <div className={styles.metric_label}>
                      {metric.label}
                      {metric.popular && (
                        <span className={styles.popular_badge}>Popular</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectMetricsStep;