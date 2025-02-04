// src/pages/TermsAndConditions.js
import React from 'react';

const TermsAndConditions = () => {
  const styles = {
    container: {
      padding: '2rem',
      maxWidth: '1200px',
      margin: 'auto',
      fontFamily: 'Arial, sans-serif',
    },
    heading: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
    },
    subHeading: {
      fontSize: '2rem',
      fontWeight: '600',
      marginTop: '2rem',
    },
    paragraph: {
      fontSize: '1rem',
      lineHeight: '1.6',
      marginBottom: '1rem',
    },
    list: {
      paddingLeft: '1.5rem',
      listStyleType: 'disc',
    },
    listItem: {
      marginBottom: '0.5rem',
    },
    link: {
      color: '#007BFF',
      textDecoration: 'none',
    },
    sectionDivider: {
      margin: '2rem 0',
      borderBottom: '1px solid #ddd',
    },
    footer: {
      marginTop: '3rem',
      fontSize: '1rem',
    },
  };

  return (
    <>
    <div style={styles.container}>
    <h1 className="text-3xl font-bold text-center mb-4">Terms and Conditions</h1>
   

      <p>Welcome to <strong>DealzUp Technology Ltd.</strong> ("we," "our," "us"). By accessing or using our <strong>DealzUp</strong> mobile application and website (<a href="https://dealzup.ca/" style={styles.link}>https://dealzup.ca/</a>), you agree to these <strong>Terms and Conditions</strong>. If you do not agree, please do not use our services.</p>

      <div style={styles.sectionDivider}></div>

      <h2 style={styles.subHeading}>1. Definitions</h2>
      <ul style={styles.list}>
        <li style={styles.listItem}><strong>“DealzUp”</strong> refers to our platform, including the website and mobile application.</li>
        <li style={styles.listItem}><strong>“User”</strong> refers to anyone using DealzUp, including vendors and customers.</li>
        <li style={styles.listItem}><strong>“Vendor”</strong> refers to businesses or individuals offering deals, flyers, or promotions through DealzUp.</li>
        <li style={styles.listItem}><strong>“Customer”</strong> refers to users who browse or purchase deals and use other features of DealzUp.</li>
      </ul>

      <h2 style={styles.subHeading}>2. Account Registration & Use</h2>
      <p style={styles.paragraph}><strong>Vendor Registration:</strong> Vendors must register and provide accurate business details to post deals.</p>
      <p style={styles.paragraph}><strong>Customer Registration:</strong> Customers must register to access exclusive features like earning money or getting special offers.</p>
      <p style={styles.paragraph}><strong>Account Responsibility:</strong> You are responsible for maintaining account confidentiality and activity.</p>
      <p style={styles.paragraph}><strong>Age Restriction:</strong> You must be <strong>at least 13 years old</strong> to use DealzUp.</p>

      <h2 style={styles.subHeading}>3. Vendor Terms</h2>
      <ul style={styles.list}>
        <li style={styles.listItem}>Vendors must provide <strong>accurate, lawful, and non-misleading</strong> offers.</li>
        <li style={styles.listItem}>Deals must have clear pricing, expiration dates, and terms.</li>
        <li style={styles.listItem}>Vendors are responsible for fulfilling their offers as advertised.</li>
        <li style={styles.listItem}>Any fraudulent, misleading, or deceptive deals may result in <strong>account suspension or termination</strong>.</li>
      </ul>

      <h2 style={styles.subHeading}>4. Customer Terms</h2>
      <ul style={styles.list}>
        <li style={styles.listItem}>Customers can browse deals freely.</li>
        <li style={styles.listItem}>To access premium features (e.g., earning money, exclusive deals), registration is required.</li>
        <li style={styles.listItem}>Customers must comply with all terms and not misuse the platform.</li>
      </ul>

      <h2 style={styles.subHeading}>5. Prohibited Activities</h2>
      <ul style={styles.list}>
        <li style={styles.listItem}>Users (both vendors and customers) <strong>must not</strong>:</li>
        <ul style={{ ...styles.list, paddingLeft: '2rem' }}>
          <li style={styles.listItem}>Violate any local, national, or international laws.</li>
          <li style={styles.listItem}>Submit false, misleading, or unauthorized content.</li>
          <li style={styles.listItem}>Attempt to hack, damage, or disrupt the platform.</li>
          <li style={styles.listItem}>Use the service for any illegal or fraudulent activity.</li>
        </ul>
      </ul>

      <h2 style={styles.subHeading}>6. Payments & Transactions</h2>
      <p style={styles.paragraph}>DealzUp <strong>does not process payments</strong> for vendor deals directly. Vendors handle payments independently or through third-party payment providers.</p>
      <p style={styles.paragraph}>Customers must review deals carefully before purchasing, as DealzUp is not responsible for disputes between vendors and customers.</p>

      <h2 style={styles.subHeading}>7. Intellectual Property</h2>
      <p style={styles.paragraph}>All <strong>logos, trademarks, and content</strong> on DealzUp are our property or licensed to us. Users <strong>may not copy, modify, or distribute</strong> any part of DealzUp without permission.</p>

      <h2 style={styles.subHeading}>8. Disclaimers & Liability Limitations</h2>
      <ul style={styles.list}>
        <li style={styles.listItem}><strong>No Guarantee:</strong> We do not guarantee the accuracy, availability, or quality of vendor deals.</li>
        <li style={styles.listItem}><strong>No Liability:</strong> We are not responsible for any direct, indirect, or incidental damages from using our services.</li>
        <li style={styles.listItem}><strong>Third-Party Links:</strong> DealzUp may contain links to third-party websites; we are not responsible for their content or policies.</li>
      </ul>

      <h2 style={styles.subHeading}>9. Account Suspension & Termination</h2>
      <p style={styles.paragraph}>We <strong>reserve the right</strong> to suspend or terminate accounts that violate these terms. Vendors or customers may delete their accounts anytime by contacting <strong>[Support Email]</strong>.</p>

      <h2 style={styles.subHeading}>10. Changes to Terms</h2>
      <p style={styles.paragraph}>We may update these Terms at any time. The latest version will always be available at <a href="https://dealzup.ca/terms" style={styles.link}>https://dealzup.ca/terms</a>.</p>

      <h2 style={styles.subHeading}>11. Contact Us</h2>
      <p style={styles.footer}>For any questions about these Terms, contact us at:</p>
      <ul>
        <li style={styles.footer}>📧 <strong>info@dealzup.ca</strong></li>
        
      </ul>
    </div>
    <hr />
    </>
  );
};

export default TermsAndConditions;
