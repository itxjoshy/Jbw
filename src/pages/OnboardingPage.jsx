import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Premium",
    price: "$19.99",
    details: ["4 screens", "Ultra HD", "Downloadable"],
  },
  {
    name: "Standard",
    price: "$13.99",
    details: ["2 screens", "Full HD", "Downloadable"],
  },
  {
    name: "Basic",
    price: "$9.99",
    details: ["1 screen", "SD", "No downloads"],
  },
];

function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState("Standard");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState({ email: true, password: true });
  const navigate = useNavigate();

  const nextStep = () => setStep((current) => Math.min(current + 1, 6));
  const prevStep = () => setStep((current) => Math.max(current - 1, 1));
  const validate = () => {
    const isEmailValid = email.includes("@");
    const isPasswordValid = password.length >= 8;
    setValidation({ email: isEmailValid, password: isPasswordValid });
    return isEmailValid && isPasswordValid;
  };

  const handleContinue = () => {
    if (step === 4 && !validate()) return;
    // if (step === 2) {
    //   navigate("/home");
    //   return;
    // }
    nextStep();
  };

  return (
    <div className="page onboarding-page">
      <header className="auth-navbar">
        <div className="logo">NETFLIX</div>
      </header>
      <main className="center-panel">
        <motion.div
          className="onboarding-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="step-indicator">Step {step} of 6</div>

          {step === 1 && (
            <div>
              <h1>Welcome back.</h1>
              <p>
                Ready to watch? Let’s get you signed into your world of
                entertainment.
              </p>
              <div className="feature-list">
                <span>✓ Personalized recommendations</span>
                <span>✓ Offline access</span>
                <span>✓ No commitments</span>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h1>Pick a plan that fits your day.</h1>
              <p>
                Enjoy flexible pricing and streaming quality designed for your
                devices.
              </p>
              <ul className="feature-list">
                <li>Personalized TV and movie recommendations</li>
                <li>Unlimited downloads and offline streaming</li>
                <li>Watch from any device</li>
              </ul>
            </div>
          )}

          {step === 3 && (
            <div>
              <h1>Choose your plan.</h1>
              <div className="plan-grid">
                {plans.map((plan) => (
                  <button
                    key={plan.name}
                    className={`plan-card ${selectedPlan === plan.name ? "plan-card--selected" : ""}`}
                    onClick={() => setSelectedPlan(plan.name)}
                  >
                    <p className="plan-name">{plan.name}</p>
                    <p className="plan-price">{plan.price}</p>
                    <ul>
                      {plan.details.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </button>
                ))}
              </div>
              <div className="comparison-table">
                <div className="table-row table-row--header">
                  <span>Feature</span>
                  <span>Premium</span>
                  <span>Standard</span>
                  <span>Basic</span>
                </div>
                <div className="table-row">
                  <span>Video Quality</span>
                  <span>Ultra HD</span>
                  <span>Full HD</span>
                  <span>SD</span>
                </div>
                <div className="table-row">
                  <span>Screens</span>
                  <span>4</span>
                  <span>2</span>
                  <span>1</span>
                </div>
                <div className="table-row">
                  <span>Downloads</span>
                  <span>Yes</span>
                  <span>Yes</span>
                  <span>No</span>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h1>Create your account.</h1>
              <p>Enter your details to continue.</p>
              <div className="form-group">
                <label>
                  Email
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={!validation.email ? "invalid" : ""}
                  />
                </label>
                <label>
                  Password
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={!validation.password ? "invalid" : ""}
                  />
                </label>
                {!validation.email && (
                  <p className="field-error">Enter a valid email address.</p>
                )}
                {!validation.password && (
                  <p className="field-error">
                    Password must be at least 8 characters.
                  </p>
                )}
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <h1>Payment information.</h1>
              <p>Select how you want to pay for your plan.</p>
              <div className="payment-grid">
                <label className="payment-card">
                  <input type="radio" name="payment" defaultChecked />
                  <span>Credit Card</span>
                </label>
                <label className="payment-card">
                  <input type="radio" name="payment" />
                  <span>PayPal</span>
                </label>
                <label className="payment-card">
                  <input type="radio" name="payment" />
                  <span>Gift Card</span>
                </label>
              </div>
              <div className="form-group">
                <label>
                  Card Number
                  <input type="text" placeholder="1234 5678 9012 3456" />
                </label>
                <div className="form-row">
                  <label>
                    Expiry
                    <input type="text" placeholder="MM/YY" />
                  </label>
                  <label>
                    CVC
                    <input type="text" placeholder="123" />
                  </label>
                </div>
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="success-state">
              <div className="success-icon">✓</div>
              <h1>Set up complete.</h1>
              <p>
                Your Netflix-inspired experience is ready. Continue to profiles
                now.
              </p>
            </div>
          )}

          <div className="form-actions">
            {step > 1 && (
              <button className="button button--ghost" onClick={prevStep}>
                Back
              </button>
            )}
            <button className="button button--primary" onClick={handleContinue}>
              {step === 6 ? "Continue to profiles" : "Continue"}
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

export default OnboardingPage;
