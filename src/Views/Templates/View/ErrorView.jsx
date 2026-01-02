
import View from './View';
import styles from './view.module.css';

const ErrorView = ({ ...props }) => {
  return (
    <div class="error-screen">
      <div class="error-icon">❌</div>
      <div class="error-title">Something Went Wrong</div>
      <div class="error-message">
          We encountered an unexpected error while processing your request. Please try again or contact support if the problem persists.
      </div>
      <div class="error-code">
          <span>Error Code:</span>
          <span>ERR_500</span>
      </div>
      <div class="error-actions">
          <button class="error-btn error-btn-primary" onclick="alert('Retry clicked')">
              <span>🔄</span>
              <span>Try Again</span>
          </button>
          <button class="error-btn error-btn-secondary" onclick="alert('Go back clicked')">
              <span>←</span>
              <span>Go Back</span>
          </button>
      </div>
    </div>
  );
}

export default ErrorView;