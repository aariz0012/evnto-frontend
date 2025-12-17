// frontend/src/pages/faq.js
import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import Head from 'next/head';
import Layout from '../components/Layout';

const FAQ = () => {
  return (
    <Layout>
      <Head>
        <title>Frequently Asked Questions | Venuity</title>
        <meta name="description" content="Find answers to common questions about Venuity's services, bookings, and more." />
      </Head>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Logo */}
<Box sx={{ display: 'flex', justifyContent: 'center', mb: 4, mt: 2 }}>
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
        {/* FAQ Section */}
<Box id="faq" sx={{ mt: 6, mb: 4 }}>
  <Typography variant="h4" component="h2" gutterBottom sx={{ 
    color: '#8eb979',
    fontWeight: 700,
    mb: 4,
    textAlign: 'center'
  }}>
    Venuity FAQ: Consolidated Essential Guide
  </Typography>

  {/* FAQ Item 1 */}
  <Box sx={{ mb: 4 }}>
    <Typography variant="h6" component="h3" sx={{ 
      color: '#8eb979',
      fontWeight: 600,
      mb: 1
    }}>
      1. Getting Started
    </Typography>
    <Box sx={{ 
      backgroundColor: '#f8f9fa',
      p: 3,
      borderRadius: 1,
      borderLeft: `4px solid #8eb979`
    }}>
      <Typography variant="subtitle1" fontWeight="600" color="text.primary" gutterBottom>
        Q: What is Venuity and what is its role in my booking?
      </Typography>
      <Typography variant="body1" color="text.secondary">
        A: Venuity is an intermediary platform connecting Clients and Vendors. We facilitate search, secure communication, and handle escrow payment processing. We are NOT a party to the contract, nor responsible for service quality.
      </Typography>
    </Box>
  </Box>

  {/* FAQ Item 2 */}
  <Box sx={{ mb: 4 }}>
    <Typography variant="h6" component="h3" sx={{ 
      color: '#8eb979',
      fontWeight: 600,
      mb: 1
    }}>
      2. For Venuity Vendors (Supply)
    </Typography>
    <Box sx={{ 
      backgroundColor: '#f8f9fa',
      p: 3,
      borderRadius: 1,
      borderLeft: `4px solid #8eb979`
    }}>
      <Typography variant="subtitle1" fontWeight="600" color="text.primary" gutterBottom>
        Q: What are the commission rates and when do I get paid?
      </Typography>
      <Typography variant="body1" color="text.secondary">
        A: Venuity charges a Take Rate (commission), which is deducted before payout. Payouts are released to you 2-5 business days after the event date to confirm satisfactory service.
      </Typography>
    </Box>
  </Box>
  {/* FAQ Item 3 */}
<Box sx={{ mb: 4 }}>
  <Typography variant="h6" component="h3" sx={{ 
    color: '#8eb979',
    fontWeight: 600,
    mb: 1
  }}>
    3. Booking & Events (Demand)
  </Typography>
  <Box sx={{ 
    backgroundColor: '#f8f9fa',
    p: 3,
    borderRadius: 1,
    borderLeft: `4px solid #8eb979`
  }}>
    <Typography variant="subtitle1" fontWeight="600" color="text.primary" gutterBottom>
      Q: How do I book a venue and is my booking legally binding?
    </Typography>
    <Typography variant="body1" color="text.secondary">
      A: Find your listing, accept the Vendor's quote, and pay the deposit through Venuity. The final booking confirmation constitutes a legally binding contract directly between you and the Vendor.
    </Typography>
  </Box>
</Box>

{/* FAQ Item 4 */}
<Box sx={{ mb: 4 }}>
  <Typography variant="h6" component="h3" sx={{ 
    color: '#8eb979',
    fontWeight: 600,
    mb: 1
  }}>
    4. Payments & Fees
  </Typography>
  <Box sx={{ 
    backgroundColor: '#f8f9fa',
    p: 3,
    borderRadius: 1,
    borderLeft: `4px solid #8eb979`
  }}>
    <Typography variant="subtitle1" fontWeight="600" color="text.primary" gutterBottom>
      Q: Are there any hidden fees, and when is final payment due?
    </Typography>
    <Typography variant="body1" color="text.secondary">
      A: No hidden fees. The Client pays the Vendor's Price + a Venuity Service Fee (itemized at checkout). The final balance due date is determined by the Vendor's contract terms.
    </Typography>
  </Box>
</Box>
{/* FAQ Item 5 */}
<Box sx={{ mb: 4 }}>
  <Typography variant="h6" component="h3" sx={{ 
    color: '#8eb979',
    fontWeight: 600,
    mb: 1
  }}>
    5. Policies, Safety & Insurance
  </Typography>
  <Box sx={{ 
    backgroundColor: '#f8f9fa',
    p: 3,
    borderRadius: 1,
    borderLeft: `4px solid #8eb979`
  }}>
    <Typography variant="subtitle1" fontWeight="600" color="text.primary" gutterBottom>
      Q: What is your cancellation and refund policy?
    </Typography>
    <Typography variant="body1" color="text.secondary">
      A: Venuity enforces the individual Vendor's cancellation policy as stated in your signed booking contract. Refunds are processed according to those specific terms and timelines.
    </Typography>
  </Box>
</Box>

{/* FAQ Item 6 */}
<Box sx={{ mb: 4 }}>
  <Typography variant="h6" component="h3" sx={{ 
    color: '#8eb979',
    fontWeight: 600,
    mb: 1
  }}>
    6. Account & Security
  </Typography>
  <Box sx={{ 
    backgroundColor: '#f8f9fa',
    p: 3,
    borderRadius: 1,
    borderLeft: `4px solid #8eb979`
  }}>
    <Typography variant="subtitle1" fontWeight="600" color="text.primary" gutterBottom>
      Q: How is my financial and personal information protected?
    </Typography>
    <Typography variant="body1" color="text.secondary">
      A: We use SSL encryption and are PCI DSS compliant for all payment handling. We never store full credit card numbers; all data is protected under strict access controls (See Privacy Policy).
    </Typography>
  </Box>
</Box>
{/* FAQ Item 7 */}
<Box sx={{ mb: 4 }}>
  <Typography variant="h6" component="h3" sx={{ 
    color: '#8eb979',
    fontWeight: 600,
    mb: 1
  }}>
    7. Technical Support
  </Typography>
  <Box sx={{ 
    backgroundColor: '#f8f9fa',
    p: 3,
    borderRadius: 1,
    borderLeft: `4px solid #8eb979`
  }}>
    <Typography variant="subtitle1" fontWeight="600" color="text.primary" gutterBottom>
      Q: How do I contact customer support?
    </Typography>
    <Typography variant="body1" color="text.secondary">
      A:  For quick issues, use our Live Chat feature on the website. For booking-specific or technical issues, submit a ticket via the "Contact Us" form, or email support@venuity.in.
    </Typography>
  </Box>
</Box>

{/* FAQ Item 8 */}
<Box sx={{ mb: 4 }}>
  <Typography variant="h6" component="h3" sx={{ 
    color: '#8eb979',
    fontWeight: 600,
    mb: 1
  }}>
    8. Event Customization
  </Typography>
  <Box sx={{ 
    backgroundColor: '#f8f9fa',
    p: 3,
    borderRadius: 1,
    borderLeft: `4px solid #8eb979`
  }}>
    <Typography variant="subtitle1" fontWeight="600" color="text.primary" gutterBottom>
      Q: Are there restrictions on outside vendors or decorations?
    </Typography>
    <Typography variant="body1" color="text.secondary">
      A: Yes. You must review the specific Venue's rules on decorations and receive prior, written approval from the Venue for any Flex Vendors (outside contractors) before booking.
    </Typography>
  </Box>
</Box>
{/* FAQ Item 9 */}
<Box sx={{ mb: 4 }}>
  <Typography variant="h6" component="h3" sx={{ 
    color: '#8eb979',
    fontWeight: 600,
    mb: 1
  }}>
    9. Post-Event & Reviews
  </Typography>
  <Box sx={{ 
    backgroundColor: '#f8f9fa',
    p: 3,
    borderRadius: 1,
    borderLeft: `4px solid #8eb979`
  }}>
    <Typography variant="subtitle1" fontWeight="600" color="text.primary" gutterBottom>
      Q: What should I do if I have an issue after my event?
    </Typography>
    <Typography variant="body1" color="text.secondary">
      A: 1. Contact the Vendor within 7 days.
         2. If unresolved, file a formal dispute with Venuity Support, providing all documented evidence for mediation.
    </Typography>
  </Box>
</Box>

{/* FAQ Item 10 */}
<Box sx={{ mb: 4 }}>
  <Typography variant="h6" component="h3" sx={{ 
    color: '#8eb979',
    fontWeight: 600,
    mb: 1
  }}>
    10. Global & Currency
  </Typography>
  <Box sx={{ 
    backgroundColor: '#f8f9fa',
    p: 3,
    borderRadius: 1,
    borderLeft: `4px solid #8eb979`
  }}>
    <Typography variant="subtitle1" fontWeight="600" color="text.primary" gutterBottom>
      Q: Can I book venues in different currencies?
    </Typography>
    <Typography variant="body1" color="text.secondary">
      A: Yes, you can view estimates in your home currency. However, all contracts and final payments are processed in the Venue's local currency as dictated by the Vendor.
    </Typography>
  </Box>
</Box>
{/* FAQ Item 11 */}
<Box sx={{ mb: 4 }}>
  <Typography variant="h6" component="h3" sx={{ 
    color: '#8eb979',
    fontWeight: 600,
    mb: 1
  }}>
    11. Partnership & Future
  </Typography>
  <Box sx={{ 
    backgroundColor: '#f8f9fa',
    p: 3,
    borderRadius: 1,
    borderLeft: `4px solid #8eb979`
  }}>
    <Typography variant="subtitle1" fontWeight="600" color="text.primary" gutterBottom>
      Q: How can I advertise or partner with Venuity?
    </Typography>
    <Typography variant="body1" color="text.secondary">
      A: Visit the "Advertise with Us" link in the footer to access our media kit and submit an inquiry form to connect with our Marketing and Business Development teams.
    </Typography>
  </Box>
</Box>
</Box>
      </Container>
    </Layout>
  );
};

export default FAQ;