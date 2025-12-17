import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { FiUser, FiMail, FiPhone, FiLock, FiMapPin } from 'react-icons/fi';
import Layout from '../components/Layout/Layout';
import OTPVerification from '../components/auth/OTPVerification';

// Static export - no server-side rendering needed

const Register = () => {
  const [showOTPForm, setShowOTPForm] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [registeredMobile, setRegisteredMobile] = useState('');
  
  const router = useRouter();

  // Validation schema
  const RegisterSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(3, 'Name must be at least 3 characters')
      .required('Full name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    mobileNumber: Yup.string()
      .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
      .required('Mobile number is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 8 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
    address: Yup.string()
      .required('Address is required'),
    termsAccepted: Yup.boolean()
      .oneOf([true], 'You must accept the terms and conditions')
  });

  // Handle registration submission
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      // Build payload expected by backend
      const userData = {
        fullName: values.fullName,       // backend expects "fullName"
        email: values.email,
        mobileNumber: values.mobileNumber,
        password: values.password,
        address: values.address
      };

      // Call backend directly
      const response = await fetch("https://venuity-backend.onrender.com/api/auth/register/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (response.ok) {
        setRegisteredEmail(values.email);
        setRegisteredMobile(values.mobileNumber);
        setShowOTPForm(true);
        toast.success('Registration successful! Please verify your email and mobile.');
      } else {
        toast.error(data.error || 'Registration failed. Please try again.');
        setErrors({ submit: data.error || 'Registration failed' });
      }
    } catch (error) {
      toast.error('Registration failed. Please try again.');
      setErrors({ submit: 'Registration failed' });
    } finally {
      setSubmitting(false);
    }
  };

  // Handle OTP verification success
  const handleOTPVerified = () => {
    toast.success('Verification successful!');
    router.push('/login');
  };

  return (
    <Layout title="Register - Venuity">
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 py-4 px-6">
            <h1 className="text-2xl font-bold text-white text-center">Create an Account</h1>
          </div>

          {!showOTPForm ? (
            <div className="p-6">
              <Formik
                initialValues={{
                  fullName: '',
                  email: '',
                  mobileNumber: '',
                  password: '',
                  confirmPassword: '',
                  address: '',
                  termsAccepted: false
                }}
                validationSchema={RegisterSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, errors, touched }) => (
                  <Form className="space-y-4">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="fullName" className="form-label">Full Name</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiUser className="text-gray-400" />
                        </div>
                        <Field
                          type="text"
                          name="fullName"
                          id="fullName"
                          className={`form-input pl-10 ${errors.fullName && touched.fullName ? 'border-red-500' : ''}`}
                          placeholder="Enter your full name"
                        />
                      </div>
                      <ErrorMessage name="fullName" component="div" className="form-error" />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="form-label">Email Address</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiMail className="text-gray-400" />
                        </div>
                        <Field
                          type="email"
                          name="email"
                          id="email"
                          className={`form-input pl-10 ${errors.email && touched.email ? 'border-red-500' : ''}`}
                          placeholder="Enter your email"
                        />
                      </div>
                      <ErrorMessage name="email" component="div" className="form-error" />
                    </div>

                    {/* Mobile Number */}
                    <div>
                      <label htmlFor="mobileNumber" className="form-label">Mobile Number</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiPhone className="text-gray-400" />
                        </div>
                        <Field
                          type="text"
                          name="mobileNumber"
                          id="mobileNumber"
                          className={`form-input pl-10 ${errors.mobileNumber && touched.mobileNumber ? 'border-red-500' : ''}`}
                          placeholder="Enter your mobile number"
                        />
                      </div>
                      <ErrorMessage name="mobileNumber" component="div" className="form-error" />
                    </div>

                    {/* Password */}
                    <div>
                      <label htmlFor="password" className="form-label">Password</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiLock className="text-gray-400" />
                        </div>
                        <Field
                          type="password"
                          name="password"
                          id="password"
                          className={`form-input pl-10 ${errors.password && touched.password ? 'border-red-500' : ''}`}
                          placeholder="Create a password"
                        />
                      </div>
                      <ErrorMessage name="password" component="div" className="form-error" />
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiLock className="text-gray-400" />
                        </div>
                        <Field
                          type="password"
                          name="confirmPassword"
                          id="confirmPassword"
                          className={`form-input pl-10 ${errors.confirmPassword && touched.confirmPassword ? 'border-red-500' : ''}`}
                          placeholder="Confirm your password"
                        />
                      </div>
                      <ErrorMessage name="confirmPassword" component="div" className="form-error" />
                    </div>

                    {/* Address */}
                    <div>
                      <label htmlFor="address" className="form-label">Address</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiMapPin className="text-gray-400" />
                        </div>
                        <Field
                          as="textarea"
                          name="address"
                          id="address"
                          rows="3"
                          className={`form-input pl-10 ${errors.address && touched.address ? 'border-red-500' : ''}`}
                          placeholder="Enter your address"
                        />
                      </div>
                      <ErrorMessage name="address" component="div" className="form-error" />
                    </div>

                    {/* Terms */}
                    <div>
  <label className="flex items-center">
    <Field
      type="checkbox"
      name="termsAccepted"
      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
    />
    <span className="ml-2 text-sm text-gray-600">
      I agree to the{' '}
      <Link href="/terms" className="text-primary-600 hover:text-primary-500">
        Terms of Service
      </Link>{' '}
      and{' '}
      <Link href="/privacy" className="text-primary-600 hover:text-primary-500">
        Privacy Policy
      </Link>
    </span>
  </label>
  <ErrorMessage name="termsAccepted" component="div" className="form-error" />
</div>
                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Creating Account...' : 'Create Account'}
                      </button>
                    </div>

                    {errors.submit && (
                      <div className="text-red-500 text-sm text-center">{errors.submit}</div>
                    )}

                    <div className="text-sm text-center text-gray-600">
                      Already have an account?{' '}
                      <Link href="/login" className="font-medium text-primary-600 hover:text-primary-500">
                        Sign in
                      </Link>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          ) : (
            <OTPVerification
              email={registeredEmail}
              mobileNumber={registeredMobile}
              onVerificationSuccess={handleOTPVerified}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Register;
