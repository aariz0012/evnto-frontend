import Link from 'next/link';
import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  useTheme
} from '@mui/material';

const PrivacyPolicy = () => {
  const theme = useTheme();

  const dataCollectionTable = [
    {
      category: 'Identifiers & Contact Data',
      specificdataPoints: 'Full name, email address, phone number, physical address (for invoicing and service address).',
      purpose: 'To create and manage your account, verify your identity, facilitate communication between you and your booked party (Client/Vendor), and send service-related notifications.'
    },
    {
      category: 'Financial Information',
      specificdataPoints: 'Bank account details (for Vendor payouts), or credit/debit card details (for Client bookings).',
      purpose: 'To process payments securely through our third-party payment processors (UPIs, NetBanking, Cards), handle refunds, and manage commissions (Take Rate). Venuity does not store full payment card numbers.'
    },
    {
      category: 'Profile Data & Preferences',
      specificdataPoints: 'Profile photos, biography, stated event needs (e.g., guest count, date, budget), preferred venue styles.',
      purpose: 'To create a comprehensive profile, enable personalized venue searching, and help Vendors tailor their offers to your needs.'
    },
    {
      category: 'Verification Data (For Hosts/Vendors)',
      specificdataPoints: 'Government-issued ID, business licenses, proof of insurance, and tax documentation.',
      purpose: 'Crucial for Vendor Vetting (Section 3.3). This ensures regulatory compliance, builds trust in the marketplace, and verifies the legal operation of the venue/service.'
    },
    {
      category: 'Booking & Event Data',
      specificdataPoints: 'Specific event details (start/end time, guest count, purpose of event), booking history, messages exchanged via the Platform.',
      purpose: 'To finalize and manage the legally binding contract between the Client and Vendor, execute the escrow payment process, and maintain service records.'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, borderRadius: 2 }}>
        {/* Add the logo code here */}
    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3, mt: 2 }}>
      <img 
        src="/images/logo.png" 
        alt="Venuity Logo" 
        style={{ 
          maxWidth: '380px', 
          height: 'auto',
          objectFit: 'contain'
        }} 
      />
    </Box>
        {/* Header */}
        <Box textAlign="center" mb={4}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ 
            color: theme.palette.primary.main,
            fontWeight: 700
          }}>
            Venuity Platform Privacy Policy
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Effective Date: October 16, 2025
          </Typography>
        </Box>

        {/* Introduction */}
        <Box mb={4}>
          <Typography paragraph>
            This Privacy Policy describes how Venuity ("Venuity," "we," "us," or "our") collects, uses, processes, 
            and shares your personal information when you access or use the Venuity mobile application and website (the "Platform").
          </Typography>
        </Box>

        {/* Section 1 */}
        <Box mb={6} id="information-we-collect">
          <Typography variant="h4" component="h2" gutterBottom sx={{ 
            color: theme.palette.primary.main,
            fontWeight: 600,
            mb: 3
          }}>
            1. Information We Collect
          </Typography>
          
          <Typography paragraph>
            We collect information necessary to operate our marketplace, facilitate bookings between Clients and Vendors, 
            ensure security, and comply with legal obligations. We collect information directly from you, automatically 
            when you use the Platform, and from third parties.
          </Typography>

          <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 3, fontWeight: 600 }}>
            A. Personal Information
          </Typography>
          <Typography paragraph>
            This data is provided by you during account registration, profile creation, booking, or direct communication.
          </Typography>

          {/* Data Collection Table */}
          <TableContainer component={Paper} sx={{ my: 3, border: `1px solid ${theme.palette.divider}` }}>
            <Table>
              <TableHead sx={{ bgcolor: theme.palette.primary.main }}>
                <TableRow>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Category</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Specific Data Points</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Purpose of Collection</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataCollectionTable.map((row, index) => (
                  <TableRow 
                    key={index}
                    sx={{ 
                      '&:nth-of-type(odd)': { 
                        backgroundColor: theme.palette.action.hover 
                      } 
                    }}
                  >
                    <TableCell sx={{ fontWeight: 'medium' }}>{row.category}</TableCell>
                    <TableCell>{row.specificdataPoints}</TableCell>
                    <TableCell>{row.purpose}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
           {/* Section 1 - Part B: Automated Data Collection */}
<Typography variant="h6" component="h3" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
  B. Automated Data Collection
</Typography>
<Typography paragraph>
  We automatically collect certain information when you use our Platform:
</Typography>

<TableContainer component={Paper} sx={{ my: 3, border: `1px solid ${theme.palette.divider}` }}>
  <Table>
    <TableHead sx={{ bgcolor: theme.palette.primary.main }}>
      <TableRow>
        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Category</TableCell>
        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>specificdataPoints</TableCell>
        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Purpose</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow sx={{ '&:nth-of-type(odd)': { backgroundColor: theme.palette.action.hover } }}>
        <TableCell sx={{ fontWeight: 'medium' }}>Technical Data</TableCell>
        <TableCell>IP address, device type, operating system, browser type and version</TableCell>
        <TableCell>To ensure the Platform loads correctly for your device, perform necessary debugging, and analyze usage to optimize server capacity and network performance</TableCell>
      </TableRow>
      <TableRow sx={{ '&:nth-of-type(odd)': { backgroundColor: theme.palette.action.hover } }}>
        <TableCell sx={{ fontWeight: 'medium' }}>Usage Data</TableCell>
        <TableCell>Pages visited, time spent on pages, referral sources, search terms, features used (e.g., filter application, viewing a specific Vendor profile)</TableCell>
        <TableCell>To understand user behavior, improve the user interface (UI) and user experience (UX), and personalize content and recommendations</TableCell>
      </TableRow>
      <TableRow sx={{ '&:nth-of-type(odd)': { backgroundColor: theme.palette.action.hover } }}>
        <TableCell sx={{ fontWeight: 'medium' }}>Clickstream Data</TableCell>
        <TableCell>The sequence of pages a user visits and links clicked</TableCell>
        <TableCell>To measure the effectiveness of navigation and features, and to optimize the conversion funnel (e.g., booking process)</TableCell>
      </TableRow>
      <TableRow sx={{ '&:nth-of-type(odd)': { backgroundColor: theme.palette.action.hover } }}>
        <TableCell sx={{ fontWeight: 'medium' }}>Location Data</TableCell>
        <TableCell>General location (derived from IP address) or precise GPS data (if explicitly permitted by your device settings)</TableCell>
        <TableCell>To show you relevant Venues and Vendors near you, provide geo-specific pricing (if applicable), and ensure regulatory compliance based on your region</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</TableContainer>
                    {/* Section 1 - Part C: Information from Third Parties */}
<Typography variant="h6" component="h3" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
  C. Information from Third Parties
</Typography>
<Typography paragraph>
 We receive information from external entities to streamline services and enhance security:
</Typography>

<TableContainer component={Paper} sx={{ my: 3, border: `1px solid ${theme.palette.divider}` }}>
  <Table>
    <TableHead sx={{ bgcolor: theme.palette.primary.main }}>
      <TableRow>
        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Category</TableCell>
        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>source</TableCell>
        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Purpose</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow sx={{ '&:nth-of-type(odd)': { backgroundColor: theme.palette.action.hover } }}>
        <TableCell sx={{ fontWeight: 'medium' }}>Social Login Data</TableCell>
        <TableCell>Platforms like Google or Facebook (if you choose to use social login)</TableCell>
        <TableCell>To simplify the account creation process, allowing you to register quickly without manually typing your name and email</TableCell>
      </TableRow>
      <TableRow sx={{ '&:nth-of-type(odd)': { backgroundColor: theme.palette.action.hover } }}>
        <TableCell sx={{ fontWeight: 'medium' }}>Background Checks & Vetting</TableCell>
        <TableCell>Dedicated third-party identity verification and background check service providers</TableCell>
        <TableCell>Used specifically for Vendors/Hosts to fulfill Venity’s vetting criteria (Section 3.3 of ToS) and mitigate risk for Clients using the platform</TableCell>
      </TableRow>
      <TableRow sx={{ '&:nth-of-type(odd)': { backgroundColor: theme.palette.action.hover } }}>
        <TableCell sx={{ fontWeight: 'medium' }}>Payment Processor Data</TableCell>
        <TableCell>UPIs, Net Banking, Cards or other financial institutions.</TableCell>
        <TableCell>To confirm payment authorization, verify the transaction status, and conduct fraud screening to protect both the Client and Venity from financial abuse</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</TableContainer>
        </Box>

        {/* Section 2 */}
<Box mb={6} id="how-we-use">
  <Typography variant="h4" component="h2" gutterBottom sx={{ 
    color: theme.palette.primary.main,
    fontWeight: 600,
    mb: 3
  }}>
    2. How We Use Your Information
  </Typography>
  <Typography paragraph>
    We use the information collected (detailed in Section 1) to operate and improve the Venuity Platform, 
    fulfill our contractual obligations, enhance security, and communicate with you, all based on a specific legal basis.
  </Typography>

  {/* Part A */}
  <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
    A. Service Provision: Fulfillment of Contractual Obligations
  </Typography>
  <Typography paragraph>
    The primary use of your data is to deliver the services you requested through the Platform. This is necessary 
    for the performance of the contract between you and Venuity, and between the Client and the Vendor.
  </Typography>
  
  <Box component="ul" sx={{ pl: 4, mb: 3 }}>
    <Typography component="li" paragraph>
      <strong>Process Bookings and Payments:</strong> Using your financial and booking data to secure the venue/service, 
      manage the escrow payment lifecycle, and process commission deductions (Take Rate).
    </Typography>
    <Typography component="li" paragraph>
      <strong>Facilitate Communication:</strong> Using contact information (email, phone) to enable secure messaging 
      between the Client and the Vendor, necessary for event coordination.
    </Typography>
    <Typography component="li" paragraph>
      <strong>Provide Customer Support:</strong> Using account and booking history to quickly and accurately resolve 
      disputes, address technical issues, and answer service inquiries.
    </Typography>
    <Typography component="li" paragraph>
      <strong>Send Updates:</strong> Providing essential, non-marketing communications such as booking confirmations, 
      payment receipts, policy changes, and security alerts.
    </Typography>
  </Box>

  {/* Part B */}
  <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
    B. Business Operations: Based on Legitimate Interests
  </Typography>
  <Typography paragraph>
    We process data to maintain and improve the Platform, which serves our legitimate business interests 
    (provided these interests do not override your fundamental rights).
  </Typography>
  
  <Box component="ul" sx={{ pl: 4, mb: 3 }}>
    <Typography component="li" paragraph>
      <strong>Improve Our Services:</strong> Analyzing aggregated usage data (Section 1.B) to identify trends, 
      optimize search algorithms, and develop new features to enhance the overall user experience.
    </Typography>
    <Typography component="li" paragraph>
      <strong>Conduct Analytics and Research:</strong> Performing internal reporting, forecasting, and data modeling 
      to understand market demands and refine our pricing and commission structures.
    </Typography>
    <Typography component="li" paragraph>
      <strong>Prevent Fraud and Ensure Security:</strong> Monitoring activity, using IP and device data, and 
      leveraging background check information (for Vendors) to protect against unauthorized access, malicious 
      activities, and financial fraud, ensuring the integrity of the marketplace.
    </Typography>
    <Typography component="li" paragraph>
      <strong>Comply with Legal Obligations:</strong> Using identity and financial data to comply with laws related 
      to taxation, financial reporting, and consumer protection.
    </Typography>
  </Box>

  {/* Part C */}
  <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
    C. Marketing: Based on Consent
  </Typography>
  <Typography paragraph>
    We use your data for promotional activities only when we have obtained your clear, affirmative consent.
  </Typography>
  
  <Box component="ul" sx={{ pl: 4, mb: 3 }}>
    <Typography component="li" paragraph>
      <strong>Send Promotional Offers:</strong> Sending emails or in-app notifications about new Venues, 
      special discounts, or Venuity partner services.
    </Typography>
    <Typography component="li" paragraph>
      <strong>Newsletter Subscriptions:</strong> Managing your subscription status to receive periodic updates 
      on events, platform news, or industry trends.
    </Typography>
    <Typography component="li" paragraph>
      <strong>Personalized Recommendations:</strong> Using your booking history and preferences to show you 
      relevant recommendations for future events, helping you find the right service faster.
    </Typography>
  </Box>

  <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
    Note: You have the right to withdraw this consent at any time via the unsubscribe link in the email or through your account settings.
  </Typography>
</Box>

{/* Section 3 */}
<Box mb={6} id="information-sharing">
  <Typography variant="h4" component="h2" gutterBottom sx={{ 
    color: theme.palette.primary.main,
    fontWeight: 600,
    mb: 3
  }}>
    3. Information Sharing
  </Typography>
  <Typography paragraph>
    Venuity is a marketplace, and sharing information is fundamental to facilitating the core service. 
    We only share information to the extent necessary to fulfill your booking, operate our business, 
    or comply with legal requirements.
  </Typography>

  {/* Part A */}
  <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
    A. Sharing With Other Users and Service Providers
  </Typography>
  <Typography paragraph sx={{ fontStyle: 'italic' }}>
    This sharing is necessary for the performance of the contract (your booking).
  </Typography>
  
  <Box component="ul" sx={{ pl: 4, mb: 3 }}>
    <Typography component="li" paragraph>
      <strong>Hosts/Vendors and Guests/Clients:</strong> When a booking is confirmed, necessary contact and event 
      details are shared between the Client and the respective Vendor/Venue. This allows them to coordinate event 
      logistics, payment timelines, and service execution (e.g., a Client needs the Vendor's number for check-in; 
      a Vendor needs the Client's email for the service contract).
    </Typography>
    <Typography component="li" paragraph>
      <strong>Service Providers for Event Coordination:</strong> If you utilize the "Flex Vendor" option or contract 
      other services through the platform, relevant event details may be shared with those third-party providers 
      (e.g., caterers, decorators) for necessary integration and verification (Vendor ID).
    </Typography>
  </Box>

  {/* Part B */}
  <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
    B. Sharing With External Service Providers
  </Typography>
  <Typography paragraph sx={{ fontStyle: 'italic' }}>
    This sharing is based on legitimate interests or contractual necessity for our operations.
  </Typography>
  
  <Box component="ul" sx={{ pl: 4, mb: 3 }}>
    <Typography component="li" paragraph>
      <strong>Payment Processors (e.g., UPI (Google Pay, PhonePe, Paytm), NetBanking, Cards (Debit Card, Credit card)):</strong> 
      Financial details are shared with these PCI DSS compliant providers to securely process all transactions, 
      commissions, and payouts.
    </Typography>
    <Typography component="li" paragraph>
      <strong>Cloud Storage and Hosting Providers:</strong> Data is stored on secure, encrypted cloud servers 
      (e.g., AWS, Google Cloud). These providers act as data processors under Venuity's instruction.
    </Typography>
    <Typography component="li" paragraph>
      <strong>Analytics and Marketing Platforms:</strong> Data is shared (often in a pseudonymous or aggregated form) 
      with services like Google Analytics or marketing tools to measure platform performance and manage advertising 
      campaigns effectively.
    </Typography>
    <Typography component="li" paragraph>
      <strong>Fraud Prevention Services:</strong> Sharing necessary identity and transaction data to screen for 
      fraudulent activities, protecting the financial security of the marketplace.
    </Typography>
  </Box>

  {/* Part C */}
  <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
    C. Legal Requirements and Business Transfers
  </Typography>
  <Typography paragraph sx={{ fontStyle: 'italic' }}>
    This sharing is based on legal obligation or legitimate interests (corporate transactions).
  </Typography>
  
  <Box component="ul" sx={{ pl: 4, mb: 3 }}>
    <Typography component="li" paragraph>
      <strong>Legal Compliance:</strong> We may disclose your information if we are legally required to do so by 
      government authorities, court orders, or subpoenas.
    </Typography>
    <Typography component="li" paragraph>
      <strong>Protection of Rights and Safety:</strong> We may share information when we believe it is necessary to 
      investigate, prevent, or take action regarding illegal activities, suspected fraud, potential threats to the 
      physical safety of any person, or violations of our Terms of Service.
    </Typography>
    <Typography component="li" paragraph>
      <strong>During Business Transfers:</strong> Should Venuity be involved in a merger, acquisition, financing, 
      or sale of assets, your information may be transferred to the acquiring entity as part of the transaction, 
      provided they adhere to the same level of data protection outlined in this policy.
    </Typography>
  </Box>
</Box>

{/* Section 4 */}
<Box mb={6} id="data-security">
  <Typography variant="h4" component="h2" gutterBottom sx={{ 
    color: theme.palette.primary.main,
    fontWeight: 600,
    mb: 3
  }}>
    4. Data Security
  </Typography>
  <Typography paragraph>
    Venuity is committed to protecting your personal information. We employ industry-standard technical and 
    organizational security measures to prevent unauthorized access, disclosure, alteration, or destruction of your data.
  </Typography>

  <Box component="ul" sx={{ pl: 4, mb: 3 }}>
    <Typography component="li" paragraph>
      <strong>Encryption in Transit (SSL/TLS):</strong> All data transferred between your web browser or mobile app 
      and our servers is secured using SSL/TLS encryption (Secure Socket Layer/Transport Layer Security) to prevent 
      eavesdropping and data interception.
    </Typography>
    <Typography component="li" paragraph>
      <strong>Encryption at Rest:</strong> Sensitive personal data, verification files, and payment details (if held 
      by our processors) are encrypted when stored in our databases or on our cloud storage, adding an additional 
      layer of protection against breaches.
    </Typography>
    <Typography component="li" paragraph>
      <strong>Payment Processing Security:</strong> We do not store full credit card numbers on Venuity servers. 
      Payment data is tokenized and processed exclusively by PCI DSS compliant third-party processors (UPIs, NetBanking, Cards), 
      ensuring the highest level of security for financial information.
    </Typography>
    <Typography component="li" paragraph>
      <strong>Access Controls and Authentication:</strong> Access to personal data by Venuity employees is strictly 
      limited and monitored. We use role-based access controls (RBAC), which ensures employees only access the data 
      absolutely necessary for their job function, along with mandatory multi-factor authentication.
    </Typography>
    <Typography component="li" paragraph>
      <strong>Regular Security Audits:</strong> We conduct routine penetration testing, vulnerability scanning, and 
      security audits performed by third-party experts to proactively identify and fix potential weaknesses in our system.
    </Typography>
    <Typography component="li" paragraph>
      <strong>Data Minimization:</strong> We adhere to the principle of data minimization, retaining data only for 
      the necessary period (see Section 12).
    </Typography>
    <Typography component="li" paragraph>
      <strong>Employee Training:</strong> All personnel handling personal data undergo mandatory, regular data 
      protection and security awareness training to reinforce responsible data practices.
    </Typography>
  </Box>
</Box>

{/* Section 5 */}
<Box mb={6} id="your-rights">
  <Typography variant="h4" component="h2" gutterBottom sx={{ 
    color: theme.palette.primary.main,
    fontWeight: 600,
    mb: 3
  }}>
    5. Your Rights
  </Typography>
  <Typography paragraph>
    Venuity respects your control over your personal data. Depending on your jurisdiction (especially if you are a 
    resident of the EU/EEA or California), you may have the following rights, which you can typically exercise 
    through your account settings or by contacting us (see Section 10).
  </Typography>
  <Typography paragraph>
    [List of specific rights based on jurisdiction would be added here, such as right to access, rectification, 
    erasure, restriction of processing, data portability, objection to processing, and withdrawal of consent]
  </Typography>
</Box>

{/* Section 6 */}
<Box mb={6} id="cookies-tracking">
  <Typography variant="h4" component="h2" gutterBottom sx={{ 
    color: theme.palette.primary.main,
    fontWeight: 600,
    mb: 3
  }}>
    6. Cookies and Tracking
  </Typography>
  <Typography paragraph>
    We use cookies and similar technologies (like web beacons, tags, and scripts) to collect information 
    automatically and enhance your experience.
  </Typography>

  {/* Part A */}
  <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
    A. Types of Cookies and Technologies
  </Typography>
  
  <Box component="ul" sx={{ pl: 4, mb: 3 }}>
    <Typography component="li" paragraph>
      <strong>Essential/Strictly Necessary:</strong> These cookies are vital for the platform to function 
      (e.g., logging you in, processing a booking, security against fraud). They cannot be switched off.
    </Typography>
    <Typography component="li" paragraph>
      <strong>Performance/Analytical:</strong> These cookies help us count visits and traffic sources so we can 
      measure and improve the performance of our site. They collect aggregated, anonymous data.
    </Typography>
    <Typography component="li" paragraph>
      <strong>Functional:</strong> These allow the website to provide enhanced functionality and personalization 
      (e.g., remembering your preferred language, region, or previous search criteria).
    </Typography>
    <Typography component="li" paragraph>
      <strong>Advertising/Targeting:</strong> These cookies may be set through our site by our advertising partners. 
      They are used to build a profile of your interests and show you relevant Venuity ads on other sites.
    </Typography>
  </Box>

  {/* Part B */}
  <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
    B. Managing Cookies
  </Typography>
  
  <Box component="ul" sx={{ pl: 4, mb: 3 }}>
    <Typography component="li" paragraph>
      <strong>Consent:</strong> For users in jurisdictions requiring it (like the EU/EEA), we only deploy 
      non-essential cookies (Performance, Functional, Advertising) after receiving your affirmative consent via 
      a clear cookie banner.
    </Typography>
    <Typography component="li" paragraph>
      <strong>Browser Settings:</strong> You can modify your browser settings to accept, reject, or delete cookies. 
      Note that disabling essential cookies may severely limit the functionality of the Platform.
    </Typography>
    <Typography component="li" paragraph>
      <strong>Third-Party Controls:</strong> You can utilize third-party services like the Digital Advertising 
      Alliance (DAA) or Network Advertising Initiative (NAI) to manage opt-outs for targeted advertising.
    </Typography>
  </Box>
</Box>

{/* Section 7 */}
<Box mb={6} id="international-transfers">
  <Typography variant="h4" component="h2" gutterBottom sx={{ 
    color: theme.palette.primary.main,
    fontWeight: 600,
    mb: 3
  }}>
    7. International Data Transfers
  </Typography>
  <Typography paragraph>
    As a global marketplace, Venuity may transfer, store, and process your personal data in countries 
    outside of your country of residence, including to the United States and India (where Venuity may be 
    headquartered or operate its servers).
  </Typography>
  <Typography paragraph>
    <strong>Risk Mitigation:</strong> Data protection laws vary between countries. To ensure your data remains 
    protected when transferred internationally, we implement the following safeguards:
  </Typography>
  
  <Box component="ul" sx={{ pl: 4, mb: 3 }}>
    <Typography component="li" paragraph>
      <strong>Standard Contractual Clauses (SCCs):</strong> For transfers of data originating from the 
      European Economic Area (EEA), we use the SCCs approved by the European Commission, which contractually 
      obligate the recipient to protect the data to the GDPR standard.
    </Typography>
    <Typography component="li" paragraph>
      <strong>Adequacy Decisions:</strong> We rely on any existing adequacy decisions recognized by relevant 
      regulatory bodies when transferring data to specific countries deemed to provide an adequate level of 
      protection.
    </Typography>
    <Typography component="li" paragraph>
      <strong>Intra-Group Agreements:</strong> For transfers within the Venuity corporate structure, we use 
      robust agreements that enforce the same privacy standards globally.
    </Typography>
  </Box>
</Box>

{/* Section 8 */}
<Box mb={6} id="childrens-privacy">
  <Typography variant="h4" component="h2" gutterBottom sx={{ 
    color: theme.palette.primary.main,
    fontWeight: 600,
    mb: 3
  }}>
    8. Children's Privacy
  </Typography>
  <Typography paragraph>
    The Venuity Platform is strictly intended for individuals who are legally eligible to enter into 
    binding financial contracts.
  </Typography>
  
  <Box component="ul" sx={{ pl: 4, mb: 3 }}>
    <Typography component="li" paragraph>
      <strong>Age Restriction:</strong> The Platform is not directed to individuals under the age of 
      thirteen (13). Consistent with COPPA (Children's Online Privacy Protection Act) and other laws, we do 
      not knowingly collect Personal Information from children under 13.
    </Typography>
    <Typography component="li" paragraph>
      <strong>Account Requirements:</strong> As specified in our Terms of Service (Section 3), account 
      creation requires the user to affirm they meet the minimum age.
    </Typography>
    <Typography component="li" paragraph>
      <strong>Action Upon Discovery:</strong> If we become aware that we have inadvertently collected data 
      from a child under 13, we will take immediate steps to delete that information from our records. 
      We require parental consent for any minor who may access the platform for viewing purposes, though 
      only users of legal contracting age (recommended 18, as per the ToS review) may initiate or finalize 
      bookings.
    </Typography>
  </Box>
</Box>

{/* Section 9 */}
<Box mb={6} id="policy-changes">
  <Typography variant="h4" component="h2" gutterBottom sx={{ 
    color: theme.palette.primary.main,
    fontWeight: 600,
    mb: 3
  }}>
    9. Changes to This Policy
  </Typography>
  <Typography paragraph>
    We reserve the right to modify this Privacy Policy at any time to reflect changes in our services, 
    applicable laws, or data processing practices.
  </Typography>
  
  <Box component="ul" sx={{ pl: 4, mb: 3 }}>
    <Typography component="li" paragraph>
      <strong>Notification:</strong> We will post the revised policy on the Platform and update the 
      "Effective Date" at the top of the document.
    </Typography>
    <Typography component="li" paragraph>
      <strong>Material Changes:</strong> For any significant or material changes that affect your rights 
      or the way we use your data, we will notify you through a prominent notice on the Platform or by 
      sending a direct notification to your registered email address prior to the change becoming effective.
    </Typography>
    <Typography component="li" paragraph>
      <strong>Acceptance:</strong> Your continued access to or use of the Platform after any changes to 
      this Privacy Policy constitutes your acknowledgment and acceptance of the revised terms. We encourage 
      you to review the policy regularly.
    </Typography>
  </Box>
</Box>

{/* Section 10 */}
<Box mb={6} id="contact-us">
  <Typography variant="h4" component="h2" gutterBottom sx={{ 
    color: theme.palette.primary.main,
    fontWeight: 600,
    mb: 3
  }}>
    10. Contact Us
  </Typography>
  <Typography paragraph>
    If you have questions, concerns, or wish to exercise your data privacy rights, please contact our 
    designated privacy team.
  </Typography>
  
  <Box component="ul" sx={{ pl: 4, mb: 3 }}>
    <Typography component="li" paragraph>
      <strong>Email:</strong> Direct all privacy inquiries, data access requests, and deletion requests to{' '}
      <Link 
      href="mailto:privacy@venuity.com"
      sx={{ 
    color: '#64b5f6 !important', 
    textDecoration: 'none',
    '&:hover': {
      color: '#1976d2 !important',
      textDecoration: 'underline'
    }
  }}
      >privacy@venuity.com
      </Link>.
    </Typography>
    <Typography component="li" paragraph>
      <strong>Mailing Address:</strong> [Your Company Address, City, State, ZIP, Country]
    </Typography>
    <Typography component="li" paragraph>
      <strong>Dedicated Privacy Contact:</strong> "The Data Protection Officer"
    </Typography>
  </Box>
  
  <Typography paragraph>
    We are committed to resolving complaints about our collection or use of your personal data.
  </Typography>
</Box>

{/* Section 11 */}
<Box mb={6} id="legal-compliance">
  <Typography variant="h4" component="h2" gutterBottom sx={{ 
    color: theme.palette.primary.main,
    fontWeight: 600,
    mb: 3
  }}>
    11. Legal Compliance
  </Typography>
  <Typography paragraph>
    Venuity is committed to adhering to global privacy standards and regulations. The compliance includes, 
    but is not limited to, specific provisions for major international laws:
  </Typography>
  
  <Box component="ul" sx={{ pl: 4, mb: 3 }}>
    <Typography component="li" paragraph>
      <strong>GDPR (General Data Protection Regulation - EU/EEA):</strong> We ensure compliance by defining 
      the lawful basis for every data process (e.g., Contract, Consent, Legitimate Interest) and providing 
      the full suite of rights (Access, Rectification, Erasure, Portability, Restriction, Objection) to 
      EU/EEA residents.
    </Typography>
    <Typography component="li" paragraph>
      <strong>CCPA/CPRA (California Consumer Privacy Act/Rights Act):</strong> We provide California residents 
      with the right to know what personal information is collected, the right to request deletion, and the 
      right to opt-out of the "sale" or "sharing" of their personal information. Venuity does not sell personal 
      information for monetary value but processes opt-out requests for targeted advertising/sharing.
    </Typography>
    <Typography component="li" paragraph>
      <strong>PIPEDA (Personal Information Protection and Electronic Documents Act - Canada):</strong> We ensure 
      data is collected with appropriate consent and used only for the purpose for which it was collected, 
      ensuring accountability and accuracy.
    </Typography>
  </Box>
</Box>

{/* Section 12 */}
<Box mb={6} id="data-retention">
  <Typography variant="h4" component="h2" gutterBottom sx={{ 
    color: theme.palette.primary.main,
    fontWeight: 600,
    mb: 3
  }}>
    12. Data Retention
  </Typography>
  <Typography paragraph>
    We retain your personal data only for as long as necessary to fulfill the purposes for which it was 
    collected, including satisfying any legal, accounting, or reporting requirements.
  </Typography>
  
  <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 4, fontWeight: 600 }}>
    Duration Based on Purpose:
  </Typography>
  
  <Box component="ul" sx={{ pl: 4, mb: 3 }}>
    <Typography component="li" paragraph>
      <strong>Active Account Data:</strong> Retained for the duration your account is active to facilitate 
      recurring use of the Platform.
    </Typography>
    <Typography component="li" paragraph>
      <strong>Booking Records:</strong> Retained for a minimum of seven years after the event date for tax, 
      financial auditing, and dispute resolution purposes.
    </Typography>
    <Typography component="li" paragraph>
      <strong>Marketing Consent:</strong> Retained until you withdraw consent.
    </Typography>
    <Typography component="li" paragraph>
      <strong>Legal Requirements:</strong> We retain some financial transaction data and verification documents 
      for the statutory period required by relevant tax and corporate law in the jurisdictions we operate.
    </Typography>
  </Box>
  
  <Typography paragraph>
    <strong>Account Deletion Process:</strong> When you request account deletion, we first remove public-facing 
    data (e.g., your profile) and anonymize or delete non-essential data. Remaining data is placed in a secure, 
    isolated archive for a final limited period (e.g., 90 days) for security and backup purposes before final, 
    permanent destruction.
  </Typography>
</Box>

{/* Horizontal line after Section 12 */}
<Box sx={{ my: 4 }}>
  <Divider />
</Box>
        {/* Closing statement */}
<Box sx={{ textAlign: 'center', mt: 4, mb: 4, fontFamily: 'Times New Roman, serif' }}>
  <Typography variant="body1" paragraph>
    This Privacy Policy is designed to be transparent about our data practices and your rights. 
    If you have any questions or concerns, please contact us at{' '}
    <Link
    href="mailto:privacy@venuity.com"
  sx={{ 
    color: '#64b5f6 !important', 
    textDecoration: 'none',
    fontFamily: 'Times New Roman, serif',
    '&:hover': {
      color: '#1976d2 !important',
      textDecoration: 'underline'
    }
  }}
    >
      privacy@venuity.com
    </Link>.
  </Typography>
</Box>

      </Paper>
    </Container>
  );
};

export default PrivacyPolicy;