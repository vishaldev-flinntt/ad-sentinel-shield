import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Shield, Check, ArrowLeft, CreditCard } from "lucide-react";

export default function Signup() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  
  const [formData, setFormData] = useState({
    // Personal Details
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: "",
    phone: "",
    
    // Brand Protection Setup
    brandKeywords: "",
    whitelistedDomains: "",
    trademarkNumber: "",
    trademarkOwner: "",
    
    // Trial Agreement
    agreedToTrial: false,
    agreedToTerms: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const validateStep1 = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return false;
    }
    
    if (formData.password.length < 8) {
      toast({
        title: "Weak Password",
        description: "Password must be at least 8 characters long",
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  };

  const validateStep2 = () => {
    if (!formData.brandKeywords.trim()) {
      toast({
        title: "Keywords Required",
        description: "Please enter at least one brand keyword to monitor",
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  const handleSignupWithStripe = async () => {
    if (!formData.agreedToTrial || !formData.agreedToTerms) {
      toast({
        title: "Agreement Required",
        description: "Please accept the trial terms and conditions",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      // First create the account
      const fullName = `${formData.firstName} ${formData.lastName}`;
      const success = await register(formData.email, formData.password, fullName);
      
      if (!success) {
        toast({
          title: "Account Creation Failed",
          description: "Unable to create account. Please try again.",
          variant: "destructive"
        });
        setLoading(false);
        return;
      }

      // Store signup data temporarily
      localStorage.setItem('pendingSignupData', JSON.stringify(formData));
      
      // Create Stripe checkout session for trial with subscription
      const stripe = window.Stripe ? window.Stripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY) : null;
      if (!stripe) {
        toast({
          title: "Payment System Error",
          description: "Payment system not available. Please try again.",
          variant: "destructive"
        });
        setLoading(false);
        return;
      }

      // Redirect to Stripe Checkout with trial period
      const response = await fetch('/api/create-trial-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          name: fullName,
          trialDays: 30,
          priceAmount: 2900, // $29.00 in cents
        }),
      });

      const { sessionId } = await response.json();
      
      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionId,
      });

      if (error) {
        toast({
          title: "Payment Error",
          description: error.message,
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during signup. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            placeholder="John"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            placeholder="Doe"
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email Address *</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          placeholder="john@company.com"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="company">Company</Label>
        <Input
          id="company"
          value={formData.company}
          onChange={(e) => handleInputChange("company", e.target.value)}
          placeholder="Your Company Name"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => handleInputChange("phone", e.target.value)}
          placeholder="+1 (555) 123-4567"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Password *</Label>
        <Input
          id="password"
          type="password"
          value={formData.password}
          onChange={(e) => handleInputChange("password", e.target.value)}
          placeholder="Minimum 8 characters"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password *</Label>
        <Input
          id="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
          placeholder="Confirm your password"
          required
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="brandKeywords">Brand Keywords to Monitor *</Label>
        <Textarea
          id="brandKeywords"
          value={formData.brandKeywords}
          onChange={(e) => handleInputChange("brandKeywords", e.target.value)}
          placeholder="Enter your brand keywords, separated by commas (e.g., YourBrand, Your Company Name, trademark terms)"
          rows={4}
          required
        />
        <p className="text-sm text-gray-600">
          These keywords will be monitored across Google Ads for potential trademark infringement.
        </p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="whitelistedDomains">Whitelisted Domains</Label>
        <Textarea
          id="whitelistedDomains"
          value={formData.whitelistedDomains}
          onChange={(e) => handleInputChange("whitelistedDomains", e.target.value)}
          placeholder="Enter trusted domains, separated by commas (e.g., yourcompany.com, partner.com, authorized-reseller.com)"
          rows={3}
        />
        <p className="text-sm text-gray-600">
          Domains in this list will be excluded from infringement alerts.
        </p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="trademarkNumber">Trademark Registration Number</Label>
        <Input
          id="trademarkNumber"
          value={formData.trademarkNumber}
          onChange={(e) => handleInputChange("trademarkNumber", e.target.value)}
          placeholder="e.g., USPTO Registration #1234567"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="trademarkOwner">Trademark Owner</Label>
        <Input
          id="trademarkOwner"
          value={formData.trademarkOwner}
          onChange={(e) => handleInputChange("trademarkOwner", e.target.value)}
          placeholder="Legal entity name that owns the trademark"
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <Shield className="h-5 w-5 mr-2" />
          Complete Your Brand Shield Setup
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
            <div className="flex items-center space-x-3">
              <CreditCard className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">30-Day Free Trial</p>
                <p className="text-sm text-gray-600">No charges for 30 days</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              FREE
            </Badge>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
            <div className="flex items-center space-x-3">
              <CreditCard className="h-5 w-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">After Trial</p>
                <p className="text-sm text-gray-600">Automatic billing starts</p>
              </div>
            </div>
            <Badge variant="default" className="bg-blue-100 text-blue-800">
              $29/month
            </Badge>
          </div>
          
          <div className="border-t border-blue-200 pt-4">
            <h4 className="font-medium text-blue-900 mb-2">What's Included:</h4>
            <ul className="space-y-1 text-sm text-blue-800">
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-600" />
                Automated Google Ads monitoring every 15 minutes
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-600" />
                Real-time infringement alerts within 1 minute
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-600" />
                Automated evidence collection with screenshots
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-600" />
                Case tracking and management dashboard
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-600" />
                Up to 1,000 keywords monitoring
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <CreditCard className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-yellow-800">Payment Required</h4>
            <p className="text-sm text-yellow-700 mt-1">
              A valid payment method is required to start your trial. You won't be charged until after your 30-day free trial ends.
            </p>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="agreedToTrial"
            checked={formData.agreedToTrial}
            onChange={(e) => handleInputChange("agreedToTrial", e.target.checked)}
            className="mt-1"
          />
          <Label htmlFor="agreedToTrial" className="text-sm">
            I understand that I'm starting a 30-day free trial that will automatically convert to a $29/month subscription. I can cancel anytime during the trial with no charges.
          </Label>
        </div>
        
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="agreedToTerms"
            checked={formData.agreedToTerms}
            onChange={(e) => handleInputChange("agreedToTerms", e.target.checked)}
            className="mt-1"
          />
          <Label htmlFor="agreedToTerms" className="text-sm">
            I agree to the Terms of Service and Privacy Policy. I understand that this service is for legitimate trademark protection purposes only.
          </Label>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Button
              variant="ghost"
              onClick={() => step === 1 ? navigate("/") : setStep(step - 1)}
              className="mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {step === 1 ? "Back to Login" : "Previous Step"}
            </Button>
            
            <div className="flex justify-center mb-6">
              <Shield className="h-12 w-12 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Start Your Brand Protection</h1>
            <p className="text-xl text-gray-600">
              30-day free trial • $29/month after trial
            </p>
            
            {/* Progress indicator */}
            <div className="flex justify-center mt-6">
              <div className="flex space-x-2">
                {[1, 2, 3].map((num) => (
                  <div
                    key={num}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step >= num
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {num}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center mt-2 text-sm text-gray-600">
              <span>Account Details</span>
              <span className="mx-4">•</span>
              <span>Brand Setup</span>
              <span className="mx-4">•</span>
              <span>Payment & Start Trial</span>
            </div>
          </div>
          
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>
                {step === 1 && "Personal Information"}
                {step === 2 && "Brand Protection Setup"}
                {step === 3 && "Complete Registration"}
              </CardTitle>
              <CardDescription>
                {step === 1 && "Tell us about yourself and create your secure account"}
                {step === 2 && "Configure your brand monitoring preferences"}
                {step === 3 && "Add payment method and start your free trial"}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {step === 1 && renderStep1()}
              {step === 2 && renderStep2()}
              {step === 3 && renderStep3()}
              
              <div className="flex justify-end space-x-4 mt-6 pt-6 border-t">
                {step < 3 ? (
                  <Button onClick={handleNextStep} className="px-8">
                    Next Step
                  </Button>
                ) : (
                  <Button 
                    onClick={handleSignupWithStripe} 
                    disabled={loading || !formData.agreedToTrial || !formData.agreedToTerms}
                    className="px-8"
                  >
                    {loading ? "Processing..." : "Add Payment & Start Trial"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
