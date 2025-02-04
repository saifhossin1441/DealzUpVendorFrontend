import React from 'react';

const PrivacyPolicy = () => {
  return (
    <>
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Privacy Policy</h1>
      
      <p className="mt-4">
        <strong>DealzUp Technology Ltd.</strong> ("we," "our," "us") operates the <strong>DealzUp</strong> mobile application and website <a href="https://dealzup.ca/" target="_blank" rel="noopener noreferrer">dealzup.ca</a>. This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you use our services.
      </p>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
        <p>
          We collect different types of information to provide and improve our services:
        </p>
        <h3 className="mt-4 text-xl font-semibold">1.1 Information You Provide</h3>
        <ul className="list-inside list-disc">
          <li><strong>For Vendors:</strong> Business name, email, phone number, location, payment details, and deal or offer details.</li>
          <li><strong>For Customers:</strong> Name, email, phone number, preferences, and optional payment details (if applicable).</li>
          <li><strong>Account Credentials:</strong> Username, password, and profile information.</li>
        </ul>

        <h3 className="mt-4 text-xl font-semibold">1.2 Information Collected Automatically</h3>
        <ul className="list-inside list-disc">
          <li><strong>Usage Data:</strong> Pages viewed, time spent, features used.</li>
          <li><strong>Device Information:</strong> Device type, operating system, and app version.</li>
          <li><strong>Location Data:</strong> If you enable location services, we collect approximate or precise location.</li>
          <li><strong>Cookies & Tracking:</strong> We use cookies to enhance user experience and track preferences.</li>
        </ul>

        <h3 className="mt-4 text-xl font-semibold">1.3 Third-Party Data</h3>
        <p>
          We may collect information from social media logins, third-party services, and marketing partners when you interact with them.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold">2. How We Use Your Information</h2>
        <ul className="list-inside list-disc">
          <li>Account creation, authentication, and management.</li>
          <li>Processing vendor deals, flyers, and offers.</li>
          <li>Providing personalized recommendations.</li>
          <li>Customer support and communication.</li>
          <li>Improving and optimizing our services.</li>
          <li>Security, fraud prevention, and compliance with laws.</li>
          <li>Marketing and promotional activities (with consent).</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold">3. How We Share Your Information</h2>
        <p>
          We do not sell your personal information. However, we may share it in the following cases:
        </p>
        <ul className="list-inside list-disc">
          <li><strong>With Vendors:</strong> If you interact with vendor offers, they may receive necessary data.</li>
          <li><strong>With Service Providers:</strong> Payment processors, cloud hosting, and analytics providers.</li>
          <li><strong>With Legal Authorities:</strong> If required by law or to protect rights and security.</li>
          <li><strong>In Business Transfers:</strong> If we merge, acquire, or sell assets, data may be transferred.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold">4. Data Security & Retention</h2>
        <p>
          We implement strict security measures to protect your data. However, no system is 100% secure.
        </p>
        <h3 className="mt-4 text-xl font-semibold">Retention Policy</h3>
        <ul className="list-inside list-disc">
          <li>Personal data is retained as long as necessary to provide services.</li>
          <li>Inactive accounts may be deleted after [X months/years].</li>
          <li>You may request deletion of your data anytime.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold">5. Your Rights & Choices</h2>
        <ul className="list-inside list-disc">
          <li><strong>Access & Correction:</strong> You can access or update your account details.</li>
          <li><strong>Opt-Out:</strong> You can opt out of marketing communications.</li>
          <li><strong>Location & Cookies:</strong> You can manage location permissions and cookies in settings.</li>
          <li><strong>Data Deletion:</strong> Request account deletion by contacting us at <strong>[Support Email]</strong>.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold">6. Third-Party Links & Services</h2>
        <p>
          Our app and website may contain links to third-party services. We are not responsible for their privacy practices.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold">7. Children’s Privacy</h2>
        <p>
          Our services are not intended for children under 13. If we discover any such data, we will delete it.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold">8. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy periodically. The latest version will always be available at <a href="https://dealzup.ca/privacy" target="_blank" rel="noopener noreferrer">https://dealzup.ca/privacy</a>.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold">9. Contact Us</h2>
        <p>For questions about this policy, contact us at:</p>
        <ul className="list-inside list-disc">
          <li>Email: <strong>info@dealzup.ca</strong></li>
          
        </ul>
      </section>
    </div>
    <hr />
    </>
  );
};

export default PrivacyPolicy;
