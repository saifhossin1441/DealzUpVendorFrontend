import React from 'react'
import '../../assets/css/addtowallet.css'
import Header from './../../components/vendors/Header';


const VendorAddToWallet = () => {

    // const [email, setEmail] = useState("");
    // const handleEmailChange = (event) => {
    //     setEmail(event.target.value);
    // };

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     // Here you can perform authentication logic with the username and password
    //     console.log('Username:', email);
    // };

    return (
        <>
            <Header />
            <div className="contain">

                <div className='bloat'>
                    <h6 style={{ margin: 10 }}>Wallet Balance</h6>
                    <div style={{ fontSize: 35, lineHeight: 0.8, margin: 10 }}>$50.00</div>

                    <div style={{ color: 'wheat', borderTop: '1px solid white', width: '100%' }}></div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <h6 style={{ lineHeight: 0.8, margin: 10 }}>Used Balance</h6>
                        <div style={{ lineHeight: 0.8, margin: 10 }}>$00.00</div>
                    </div>
                    <div style={{ color: 'wheat', borderTop: '1px solid white', width: '100%' }}></div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <h6 style={{ lineHeight: 0.8, margin: 10 }}>All Transactions</h6>
                        <div style={{ lineHeight: 0.8, margin: 10, fontSize: 35, }}> {'>'}</div>
                    </div>

                </div>
                <aside className="add-money-section">
                    <h4>Add money</h4>
                    <input type="number" placeholder="Enter Amount" className="amount-input" onWheel={() => document.activeElement.blur()} />
                    <div className="quick-buttons">
                        <button>+ ₹100</button>
                        <button>+ ₹500</button>
                    </div>

                    {/* <h6>Add Cards</h6> */}
                    <button className="add-money-btn">Add money</button>
                </aside>
            </div >
        </>
    );

}

export default VendorAddToWallet; 