import React from 'react';

const RightSidebar = () => {
  return (
    <div className="col-md-2 right-sidebar" style={{ justifyContent: 'center' }}>
      <div className="balance-box" style={{ justifyContent: 'center' }}><h6>Balance</h6>$89990.27</div>
      <br/>
      <div className="balance-box balance-box-pink"><h6>Points</h6>4140</div>
    </div>
  );
}

export default RightSidebar;
