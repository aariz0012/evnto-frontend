import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  List, 
  ListItem, 
  ListItemText,
  Collapse,
  Divider,
  Link
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const TermsOfService = () => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState({});

  const handleClick = (section) => {
    setExpanded(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const sections = [
    { id: 'acceptance', title: '1. Acceptance of Terms' },
    { id: 'role', title: '2. Venuity\'s Role as a Marketplace Intermediary' },
    { id: 'account', title: '3. Account Registration and Eligibility' },
    { id: 'booking', title: '4. Booking, Contracts, and Payment' },
    { id: 'cancellation', title: '5. Cancellation and Refund Policy' },
    { id: 'flex-vendor', title: '6. Venuity Advantage and Flex Vendor Policy' },
    { id: 'user-conduct', title: '7. User Conduct and Content' },
    { id: 'liability', title: '8. Limitation of Liability and Indemnification' },
    { id: 'governing-law', title: '9. Governing Law' },
    { id: 'termination', title: '10. Termination' },
    { id: 'license', title: 'License Grant and Restrictions' }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        {/* Logo */}
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
        <Typography variant="h4" component="h1" gutterBottom color="primary" fontWeight="bold">
          Venuity Platform Terms of Service
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          Effective Date: October 16, 2025
        </Typography>

        {/* Table of Contents */}
        <Box sx={{ 
          backgroundColor: theme.palette.grey[100], 
          p: 3, 
          borderRadius: 1,
          mb: 4,
          borderLeft: `4px solid ${theme.palette.primary.main}`
        }}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Table of Contents
          </Typography>
          <List dense>
            {sections.map((section) => (
              <React.Fragment key={section.id}>
                <ListItem 
                  button 
                  onClick={() => handleClick(section.id)}
                  sx={{ 
                    pl: 2,
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                      borderRadius: 1
                    }
                  }}
                >
                  <Link 
                    href={`#${section.id}`} 
                    underline="none" 
                    color="inherit"
                    onClick={(e) => e.stopPropagation()}
                    sx={{
                      flexGrow: 1,
                      '&:hover': {
                        color: theme.palette.primary.main
                      }
                    }}
                  >
                    {section.title}
                  </Link>
                  {expanded[section.id] ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={expanded[section.id]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {/* Add sub-items here if needed */}
                  </List>
                </Collapse>
              </React.Fragment>
            ))}
          </List>
        </Box>

          {/* Sections */}
        <Box sx={{ mt: 4 }}>
          {/* Section 1 */}
          <Box id="acceptance" sx={{ scrollMarginTop: '80px' }}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            1. Acceptance of Terms
          </Typography>
          <Typography paragraph>
            By accessing or using the Venuity mobile application and website (the "Platform"), you agree to be bound by these Terms and Agreements (the "Terms") and our Privacy Policy. If you do not agree to these Terms, you may not access or use the Platform. These Terms apply to Clients (users booking venues and services) and Vendors (Venue Owners and Service Providers offering services).
          </Typography>
          </Box>
          <Box sx={{ my: 4 }}>
  <Divider />
</Box>
          
          {/* Section 2 */}
           <Box id="role" sx={{ mt: 4, pt: 2, scrollMarginTop: '80px' }}>
          <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ mt: 3 }}>
            2. Venity's Role as a Marketplace Intermediary
          </Typography>
          <Typography paragraph>
            Venuity is solely a technology platform and marketplace. We provide a venue for Clients and Vendors to meet, negotiate, and enter into contracts for event space rental and related services.
          </Typography>
          <Typography paragraph>
            Venuity is NOT:
          </Typography>
          <List dense>
            {[
              "A party to the service or rental contract between the Client and the Vendor/Venue.",
              "The owner, operator, or manager of any Venue listed on the Platform.",
              "A Service Provider (Caterer, Decorator, Planner, etc.) itself.",
              "Liable for the quality, safety, legality, or suitability of any services provided by Vendors or Venues.",
              "Any agreements, service deliveries, cancellations, or disputes are solely between the Client and the respective Vendor or Venue."
            ].map((item, index) => (
              <ListItem key={index} sx={{ display: 'list-item', listStyleType: 'disc', pl: 2, ml: 2 }}>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
          </Box>
          <Box sx={{ my: 4 }}>
  <Divider />
</Box>

          {/* Section 3 */}
           <Box id="account" sx={{ mt: 4, pt: 2, scrollMarginTop: '80px' }}>
          <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ mt: 3 }}>
            3. Account Registration and Eligibility
          </Typography>
          <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
           i. Eligibility:
          </Typography>
          <Typography paragraph>
            You must be at least thirteen (13) years old to create an account and use the Platform.
          </Typography>
          <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
           ii. Account Responsibility:
          </Typography>
          <Typography paragraph>
            You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify Venuity immediately of any unauthorized use.
          </Typography>
          <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
           iii. Vendor Vetting:
          </Typography>
          <Typography paragraph>
            Vendors must complete a detailed registration process and meet Venuity's vetting criteria, which may include providing insurance, licenses, and references. Venity reserves the right to remove any Vendor at its sole discretion.
          </Typography>
          </Box>  
          <Box sx={{ my: 4 }}>
  <Divider />
</Box>

          {/* Section 4 */}
           <Box id="booking" sx={{ mt: 4, pt: 2, scrollMarginTop: '80px' }}>
          <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ mt: 3 }}>
            4. Booking, Contracts, and Payment
          </Typography>
          <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
           i. Binding Booking:
          </Typography>
          <Typography paragraph>
            All bookings confirmed through the Platform (via digital signature or final deposit payment) constitute a legally binding contract between the Client and the Vendor/Venue.
          </Typography>
          <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
           ii. Payment Processing (Escrow):
          </Typography>
          <Typography paragraph>
            All payments, including deposits, are processed securely through Venuity. Funds for the final payment are held in an escrow-like account until the services are successfully rendered and confirmed by both parties.
          </Typography>
          <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
           iii. Venuity Commission (Take Rate):
          </Typography>
          <Typography paragraph>
            Venuity retains a pre-agreed commission (the "Take Rate") from the total booking value. This commission is deducted before funds are disbursed to the Vendor. Vendors agree to this deduction as compensation for platform usage and client acquisition.
          </Typography>
          <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
           iv. Payout to Vendors:
          </Typography>
          <Typography paragraph>
            ⦁	Deposit/Advance: The Vendor’s share of the initial deposit (net of commission) will be paid within a specified number of business days following receipt of the Client’s deposit.
          </Typography>
          <Typography paragraph>
            ⦁	Final Balance: The remaining balance (net of final commission) will be released to the Vendor within a specified period (e.g., 2-5 business days) after the event date, contingent upon Client confirmation that services were satisfactorily rendered.
          </Typography>
          </Box>
          <Box sx={{ my: 4 }}>
  <Divider />
</Box>
          
           {/* Section 5 */}
            <Box id="cancellation" sx={{ mt: 4, pt: 2, scrollMarginTop: '80px' }}>
          <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ mt: 3 }}>
            5. Cancellation and Refund Policy
            </Typography>
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
           i. Governing Policy:
          </Typography>
          <Typography paragraph>
            All cancellations and refund eligibility are governed solely by the individual cancellation policy set by the specific Venue or Vendor as listed on their Venuity profile and included in the final booking contract.
          </Typography>
          <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
           ii. Venuity's role :
          </Typography>
          <Typography paragraph>
            Venuity processes the refund transaction based on the Vendor's policy but is not responsible for the Vendor’s refusal to grant a refund outside of their stated policy. Any dispute must be resolved directly between the Client and Vendor.
          </Typography>
          </Box>
<Box sx={{ my: 4 }}>
  <Divider />
</Box>

           {/* Section 6 */}
            <Box id="flex-vendor" sx={{ mt: 4, pt: 2, scrollMarginTop: '80px' }}>
          <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ mt: 3 }}>
            6. Venuity Advantage and Flex Vendor Policy
            </Typography>
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
           i. Venuity Advantages:
          </Typography>
          <Typography paragraph>
            Complimentary services (e.g., extra waiter staff, planning consultation) are offered as non-monetary bonuses and may be adjusted or removed by Venuity at any time without prior notice.
          </Typography>
           <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
           ii. 2.	Flex Vendor Option (Bring Your Own) :
          </Typography>
          <Typography paragraph>
            Clients may be permitted to contract certain services (e.g., catering, decoration) outside of the Venuity network. This option is subject to the Venue’s approval.
          </Typography>
           <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
           iii. Flex fee Vendor:
          </Typography>
          <Typography paragraph>
            If a Client elects to use a Flex Vendor, Venuity will charge a non-refundable Flex Fee (e.g., 2% of the Venue rental price) to the Client. This fee compensates Venuity for platform resources used to facilitate the outside vendor's integration and insurance verification.
          </Typography>
           <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
           iv. Vendor Passport & Verification:
          </Typography>
          <Typography paragraph>
          All Flex Vendors must submit a "Vendor Passport" (including proof of insurance, licensing, and liability waiver) to Venuity for verification prior to the event. The Venue reserves the right to deny entry to any Flex Vendor who fails this verification.
          </Typography>
          </Box>
          <Box sx={{ my: 4 }}>
  <Divider />
</Box>

           {/* Section 7 */}
            <Box id="user-conduct" sx={{ mt: 4, pt: 2, scrollMarginTop: '80px' }}>
           <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ mt: 3 }}>
            7. User Conduct and Content
            </Typography>
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
           i.	Prohibited Conduct:
          </Typography>
          <Typography paragraph>
            Users shall not upload content that is illegal, misleading, defamatory, or infringes on the intellectual property rights of others.
          </Typography>
           <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
           ii. Reviews and Ratings:
          </Typography>
          <Typography paragraph>
            Clients agree that Venuity has the right, but not the obligation, to monitor, edit, or remove reviews and ratings that Venuity deems inappropriate, offensive, or fraudulent.
          </Typography>
           <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
           iii. Venuity License:
          </Typography>
           <Typography paragraph>
            By submitting content (reviews, photos) to the Platform, you grant Venuity a worldwide, royalty-free, perpetual license to use, reproduce, and display that content in connection with the Platform’s marketing and operation.
            </Typography> 
            </Box> 
            <Box sx={{ my: 4 }}>
  <Divider />
</Box> 

            {/* Section 8 */}
             <Box id="liability" sx={{ mt: 4, pt: 2, scrollMarginTop: '80px' }}>
            <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ mt: 3 }}>
            8. Limitation of Liability and Indemnification
            </Typography>
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
           i.	Limitation of Liability:
          </Typography>
          <Typography paragraph>
            To the maximum extent permitted by law, Venuity shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, arising from your use of the Platform or your inability to use the Platform, or the conduct of any Client or Vendor.
          </Typography>
           <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
           ii. Indemnification:
          </Typography>
          <Typography paragraph>
            You agree to indemnify and hold Venuity harmless from any and all claims, demands, liabilities, damages, and expenses (including attorneys' fees) arising out of or in connection with: (a) your breach of these Terms; (b) your violation of any law or the rights of a third party; or (c) your booking or provision of any services obtained through the Platform.
          </Typography>
          </Box>
          <Box sx={{ my: 4 }}>
  <Divider />
</Box>

          {/* Section 9 */}
           <Box id="governing-law" sx={{ mt: 4, pt: 2, scrollMarginTop: '80px' }}>
          <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ mt: 3 }}>
            9. Governing law:
            </Typography>
            <Typography paragraph>
            These Terms shall be governed by the laws of [INDIA], without regard to its conflict of law provisions.
          </Typography>
          </Box>
          <Box sx={{ my: 4 }}>
  <Divider />
</Box>

          {/* Section 10 */}
           <Box id="termination" sx={{ mt: 4, pt: 2, scrollMarginTop: '80px' }}>
          <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ mt: 3 }}>
            10. Termination:
            </Typography>
            <Typography paragraph>
            Venuity may terminate your access to the Platform immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.

            For questions or concerns regarding these Terms, please contact us at [supportvenuity.in].
            </Typography>
            </Box>
            <Box sx={{ my: 4 }}>
  <Divider />
</Box>


             <Box id="license" sx={{ mt: 4, pt: 2, scrollMarginTop: '80px' }}>
            <Typography variant="h4" component="h1" gutterBottom color="primary" fontWeight="bold">
          License Grant and Restrictions
        </Typography>


         <Typography variant="h6" gutterBottom fontWeight="bold">
            3.1. Venuity's License Grant to Users
          </Typography>
          <Typography paragraph>
           Venuity hereby grants you (the Client or Vendor), subject to these Terms, a limited, non-exclusive, non-transferable, non-sublicensable, and revocable license to access and use the Platform solely for your personal and commercial use in accordance with the stated purpose of Venuity: booking and managing event venues and related services.
          </Typography>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            3.2. User's License Grant to Venuity  
          </Typography>
          <Typography paragraph>
           By submitting, posting, or uploading any content, data, event details, photos, or reviews ("User Content") to the Platform, you grant Venuity a worldwide, royalty-free, perpetual, irrevocable, transferable, and sub-licensable license to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, publicly perform, and publicly display such User Content in connection with the operation, promotion, and improvement of the Platform and Venuity’s business. This includes, without limitation, the use of Vendor and Venue details for marketing and client acquisition.
          </Typography>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            3.3. License Restrictions
          </Typography>
          <Typography paragraph>
           You agree not to do, or permit any third party to do, any of the following:
          </Typography>

           <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
           i. Copy or Modify:
          </Typography>
          <Typography paragraph>
            Reproduce, modify, adapt, translate, or create derivative works of the Platform or any part thereof.
          </Typography>
          <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
           ii. Reverse Engineer:
          </Typography>
          <Typography paragraph>
            Reverse engineer, decompile, or otherwise attempt to discover the source code or underlying structure, ideas, or algorithms of the Platform.
          </Typography>
          <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
           iii. Rent or Sell:
          </Typography>
          <Typography paragraph>
           Rent, lease, lend, sell, sublicense, assign, distribute, publish, transfer, or otherwise make available the Platform or any features of the Platform to any third party.
          </Typography>
          <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
           iv. Circumvalent payment:
          </Typography>
          <Typography paragraph>
            Use the Platform to connect with a Venue or Vendor and then complete the booking or payment transaction entirely outside the Platform to circumvent Venuity’s commission fee. Any such circumvention may result in immediate account termination and financial penalties.
          </Typography>
          <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
           v. Data Harvesting:
          </Typography>
           <Typography paragraph>
            Use any automated system or software to extract data (scraping) from the Platform for commercial or non-commercial purposes without explicit written consent from Venuity.
          </Typography>
          </Box>


        <Typography variant="body2" color="text.secondary" sx={{ mt: 4, fontStyle: 'italic' }}>
            Last updated: December 11, 2023
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default TermsOfService;