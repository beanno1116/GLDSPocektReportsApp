
import styles from '../cards.module.css';

const CardUserListItem = ({ ...props }) => {
  return (
    <div class="card card-action">
        <div class="card-action-content">
            <div class="card-action-icon">📊</div>
            <div class="card-action-text">
                <div class="card-action-title">View Full Report</div>
                <div class="card-action-subtitle">Detailed analytics & insights</div>
            </div>
        </div>
        <div class="card-action-arrow">→</div>
    </div>
  );
}

export default CardUserListItem;