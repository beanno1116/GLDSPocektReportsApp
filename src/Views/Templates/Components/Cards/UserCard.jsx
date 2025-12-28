
import styles from './cards.module.css';

const CardHeader = ({name,username,role}) => {
  return (
    <div className={styles.user_card_header}>
      <div className={styles.user_card_header_content}>
        <div className={styles.user_card_avatar}>
          👤
          <div className={styles.user_card_avatar_status}></div>
        </div>
        <div className={styles.user_card_header_info}>
          <div className={styles.user_card_header_name}>{name}</div>
          <div className={styles.user_card_header_username}>{username}</div>
          <div className={styles.user_card_header_role}>
            <span className={styles.user_card_header_role_badge}>
              <span>⭐</span>
              <span>{role}</span>
            </span>
          </div>
        </div>
      </div>
      </div>
  )
}

const CardBody = ({children}) => <div className={styles.user_card_body}>{children}</div>

const CardDetailsRow = ({label,value}) => {
  return (
    <div className={styles.user_card_details_row}>
      <div className={styles.user_card_details_icon}>🏪</div>
      <div className={styles.user_card_details_content}>
        <div className={styles.user_card_details_label}>{label}</div>
        <div className={styles.user_card_details_value}>{value}</div>
      </div>
    </div>
  )
}

const CardDetails = ({children}) => {
  return (
    <div className={styles.user_card_details}>
      {children}
    </div>
  )
}


const UserCard = ({ m="0 0 1.5rem 0",children }) => {
  return (
    <div className={styles.user_card} style={{margin:m}}>
       {children}
       {/* <div className={styles.user_card_header}>
        <div className={styles.user_card_header_content}>
          <div className={styles.user_card_avatar}>
            👤
            <div className={styles.user_card_avatar_status}></div>
          </div>
          <div className={styles.user_card_header_info}>
            <div className={styles.user_card_header_username}>Ben Klimaszewski</div>
            <div className={styles.user_card_header_role}>
              <span className={styles.user_card_header_role_badge}>
                <span>⭐</span>
                <span>Administrator</span>
              </span>
            </div>
          </div>
        </div>
       </div>

       <div className={styles.user_card_body}>

        <div className={styles.user_card_details}>

          <div className={styles.user_card_details_row}>
            <div className={styles.user_card_details_icon}>🏪</div>
            <div className={styles.user_card_details_content}>
              <div className={styles.user_card_details_label}>Username</div>
              <div className={styles.user_card_details_value}>{"devUser"}</div>
            </div>
          </div>

          <div className={styles.user_card_details_row}>
            <div className={styles.user_card_details_icon}>📧</div>
            <div className={styles.user_card_details_content}>
              <div className={styles.user_card_details_label}>Email</div>
              <div className={styles.user_card_details_value}>dev@glds.net</div>
            </div>
          </div>

          <div className={styles.user_card_details_row}>
            <div className={styles.user_card_details_icon}>📱</div>
            <div className={styles.user_card_details_content}>
              <div className={styles.user_card_details_label}>Phone</div>
              <div className={styles.user_card_details_value}>{"(248)356-4100"}</div>
            </div>
          </div>

        </div>



      </div> */}

    </div>
  );
}


UserCard.Header = CardHeader;
UserCard.Body = CardBody;
UserCard.Details = CardDetails;
UserCard.DetailRow = CardDetailsRow


export default UserCard;