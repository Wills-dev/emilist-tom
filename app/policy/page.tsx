import React from "react";

const page = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-gray-600">Effective Date: February 31st, 2025</p>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
        <p>
          We collect information for providing and improving our services,
          facilitating interaction between customers and artisans.
        </p>

        <h3 className="text-xl font-semibold mt-4">a. Personal Information</h3>
        <ul className="list-disc ml-6">
          <li>Full name</li>
          <li>Contact information (email, phone number, address)</li>
          <li>Payment information</li>
          <li>Profile picture</li>
          <li>User credential (for artisans)</li>
        </ul>

        <h3 className="text-xl font-semibold mt-4">
          b. Non-Personal Information
        </h3>
        <ul className="list-disc ml-6">
          <li>Browser type and version</li>
          <li>Device type and operating system</li>
          <li>IP address and interaction data</li>
        </ul>

        <h3 className="text-xl font-semibold mt-4">c. Artisan Information</h3>
        <ul className="list-disc ml-6">
          <li>Professional credentials</li>
          <li>Portfolio and prior work</li>
          <li>Customer ratings and reviews</li>
          <li>Work history and performance metrics</li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold">
          2. How We Use Your Information
        </h2>
        <ul className="list-disc ml-6">
          <li>Matching customers with artisans</li>
          <li>Sending notifications and updates</li>
          <li>Processing transactions</li>
          <li>Service improvement through analytics</li>
          <li>Marketing and promotional content (with consent)</li>
          <li>Security and fraud prevention</li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold">3. Sharing Your Information</h2>
        <p>
          We do not sell, rent, or lease your data. However, we may share it in
          the following cases:
        </p>
        <ul className="list-disc ml-6">
          <li>With artisans for service facilitation</li>
          <li>With service providers under confidentiality agreements</li>
          <li>For legal obligations</li>
          <li>In business transfers such as mergers or acquisitions</li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold">4. Data Security</h2>
        <p>
          We implement security measures like encryption, regular audits, and
          restricted data access. However, users should maintain strong
          passwords and report security concerns promptly.
        </p>
      </section>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold">5. Your Rights</h2>
        <p>You have the right to:</p>
        <ul className="list-disc ml-6">
          <li>Access your personal data</li>
          <li>Request corrections</li>
          <li>Request data erasure (subject to legal obligations)</li>
          <li>Object to direct marketing</li>
          <li>Receive data in a structured format</li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold">
          6. Cookies and Tracking Technologies
        </h2>
        <p>
          We use cookies to enhance user experience. You can disable them in
          browser settings, but functionality may be affected.
        </p>
      </section>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold">7. Third-Party Links</h2>
        <p>
          We are not responsible for third-party privacy policies and encourage
          users to review them when visiting external sites.
        </p>
      </section>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold">8. Children's Privacy</h2>
        <p>
          Our services are not intended for users under 18. We do not knowingly
          collect their data and will delete such data if found.
        </p>
      </section>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold">
          9. Modification of Privacy Policy
        </h2>
        <p>
          We may update this policy, and continued use of our platform signifies
          acceptance of the new terms.
        </p>
      </section>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold">10. Contact Us</h2>
        <p>If you have questions, contact us:</p>
        <ul className="list-disc ml-6">
          <li>
            Email:{" "}
            <a href="mailto:msgemilist@gmail.com" className="text-blue-500">
              msgemilist@gmail.com
            </a>
          </li>
          <li>Phone: +15103317003</li>
        </ul>
      </section>
    </div>
  );
};

export default page;
