export default function Disclaimer() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-20 prose dark:prose-invert prose-headings:font-serif prose-a:text-teal inline-block w-full">
      <h1>Disclaimer</h1>
      <p>Last updated: {new Date().toLocaleDateString()}</p>

      <h2>1. Educational Purposes Only</h2>
      <p>The information provided on Vasudev AI Chronicles (blog.vasudevai.in) is for educational and informational purposes only. We share experiments, tutorials, and insights regarding artificial intelligence, Android modding, performance optimization, and automation. This content should not be construed as professional, financial, or legal advice.</p>

      <h2>2. Accuracy of Information</h2>
      <p>While we strive to provide accurate and up-to-date information, the tech landscape—especially Artificial Intelligence—evolves rapidly. We make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics contained on the website.</p>

      <h2>3. Technical Execution and Liability</h2>
      <p>Tutorials involving coding, system modification, ethical hacking, and hardware tuning carry inherent risks. Vasudev AI Chronicles, its authors, and affiliates will not be liable for any damage to your hardware, software, servers, or any loss of data resulting from following the guides on this website. You assume full responsibility for your actions when executing discussed techniques.</p>

      <h2>4. External Links</h2>
      <p>Through this website, you are able to link to other websites which are not under the control of Vasudev AI Chronicles. We have no control over the nature, content, and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.</p>

      <h2>5. Affiliates and Advertising</h2>
      <p>This website may contain affiliate links or advertisements. If you click on an affiliate link and make a purchase, we may receive a small commission at no extra cost to you. This helps support the maintenance and growth of this publication. Our editorial content is not heavily influenced by advertisers or affiliate partnerships.</p>
    </div>
  );
}
