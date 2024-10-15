import React from 'react';

const Privacy = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg my-10">
      <h1 className="text-4xl mb-2 text-center text-gray-900 py-7 font-semibold">
        Privacy Policy for Social Media Integrations
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        At <span className="font-semibold">Schedlr</span>, we are committed to protecting the privacy and security of our users’ data.
        When you connect your social media accounts to Schedlr (e.g., Facebook, Instagram, LinkedIn, Pinterest, and others),
        we ensure that any data accessed or shared through these platforms is handled securely and responsibly.
      </p>

      <h2 className="text-2xl font-semibold mb-3 text-gray-800">Data Collection and Usage</h2>
      <p className="text-gray-700 mb-4">
        When you link your social media accounts to Schedlr, we may collect and use the following information:
      </p>
      <ul className="list-disc list-inside mb-6 space-y-2 text-gray-700">
        <li><strong>Your public profile information</strong> (e.g., name, profile picture, and account details).</li>
        <li><strong>Posts, media, and content</strong> you schedule or interact with on social platforms.</li>
        <li><strong>Engagement metrics and performance data</strong> of your posts (e.g., likes, shares, comments).</li>
      </ul>
      <p className="text-gray-700 mb-6">
        This data is used solely to provide and improve our services, such as post scheduling, content management, and analytics.
      </p>

      <h2 className="text-2xl font-semibold mb-3 text-gray-800">Data Security</h2>
      <p className="text-gray-700 mb-6">
        We employ industry-standard security practices, including encryption and secure servers, to protect your data from unauthorized access, loss, or misuse. Only authorized personnel and systems can access your social media data, and we ensure it is handled in accordance with data protection laws.
      </p>

      <h2 className="text-2xl font-semibold mb-3 text-gray-800">User Privacy</h2>
      <p className="text-gray-700 mb-6">
        Your privacy is our priority. We never share your personal or social media data with third parties without your explicit consent. The data collected from your social media accounts is used strictly for the functionality of <span className="font-semibold">Schedlr</span>. We fully comply with each social media platform’s privacy policies and API guidelines, ensuring your data is used appropriately.
      </p>

      <h2 className="text-2xl font-semibold mb-3 text-gray-800">User Control and Consent</h2>
      <p className="text-gray-700 mb-6">
        You have complete control over your data. You may choose to disconnect any of your social media accounts from <span className="font-semibold">Schedlr</span> at any time, after which we will no longer access or store your social media data. Any information previously collected will be securely deleted in line with our data retention policy.
      </p>

      <h2 className="text-2xl font-semibold mb-3 text-gray-800">Transparency and Compliance</h2>
      <p className="text-gray-700 mb-6">
        At <span className="font-semibold">Schedlr</span>, we are transparent about how we collect, use, and store your data. We remain compliant with applicable data protection regulations, including the General Data Protection Regulation (GDPR), to ensure that your rights to privacy are respected.
      </p>
    </div>
  );
};

export default Privacy;
