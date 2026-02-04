

const ViewModalManager = ({ modal }) => {

  const renderModal = (modalName) => {
    switch (modalName.toLowerCase()) {
      case "loyalty":
        return <div>Sore Loyalty reports</div>
      case "coupons":
        return <div>Store Coupon reports</div>
      default:
        return <div>Default view</div>
    }
  }

  return (    
    <>
      {renderModal(modal)}
    </>
  );
}

export default ViewModalManager;