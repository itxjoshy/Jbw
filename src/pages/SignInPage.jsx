import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";

function SignInPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("credentials");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  const handleCredentialsSubmit = (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("otp");
    }, 900);
  };

  const handleVerify = (e) => {
    e.preventDefault();
    if (loading) return;
    if (otp !== "070806") {
      setOtpError("Invalid number");
      return;
    }
    setOtpError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("done");
    }, 900);
  };
  if (step === "done") {
    setTimeout(() => {
      navigate("/home");
    }, 1000);
  }
  return (
    <div className="page sign-in-page">
      <header className="auth-navbar">
        <div className="wrapper-hdr">
          <div className="logo">
            <img src={logo} alt="Netflix" />
          </div>
        </div>
      </header>

      <main className="center-panel-signin">
        <div className="auth-card">
          {step === "credentials" && (
            <>
              <h1>Enter your info to sign in</h1>
              <h2>Or get started with a new account</h2>
              <form onSubmit={handleCredentialsSubmit}>
                <input
                  type="email"
                  placeholder="Email"
                  disabled={loading}
                  required
                />

                <button
                  type="submit"
                  className="button button--primary"
                  disabled={loading}
                  aria-busy={loading}
                >
                  {loading ? (
                    <span className="button-spinner" aria-hidden="true" />
                  ) : (
                    "Continue"
                  )}
                </button>
              </form>
            </>
          )}

          {step === "otp" && (
            <>
              <h1>Enter OTP</h1>
              <h2 style={{ fontSize: "1rem", fontWeight: "normal" }}>
                We sent a one-time code to your email
              </h2>
              <form onSubmit={handleVerify}>
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="OTP"
                  disabled={loading}
                  required
                />
                {otpError && <p className="field-error">{otpError}</p>}
                <button
                  type="submit"
                  className="button button--primary"
                  disabled={loading}
                  aria-busy={loading}
                >
                  {loading ? (
                    <span className="button-spinner" aria-hidden="true" />
                  ) : (
                    "Verify"
                  )}
                </button>
                <button
                  type="button"
                  className="button button--ghost"
                  onClick={() => setStep("credentials")}
                  disabled={loading}
                >
                  Back
                </button>
              </form>
            </>
          )}

          {step === "done" && (
            <p className="success-state">
              Signed in successfully. <br />
              Redirecting...
            </p>
          )}
        </div>
      </main>

      <footer className="sign-in-footer">
        <p className="sign-in-footer-query">
          Questions? <a href="#">Contact us.</a>
        </p>
        <div className="sign-in-footer-links-grid">
          {[
            "FAQ",
            "Help Center",
            "Privacy",
            "Security",
            "Contact Us",
            "Terms of Use",
            "Cookie Preferences",
            "Legal Notices",
            "Corporate Information",
            "Jobs",
            "Media Center",
            "Gift Cards",
          ].map((link) => (
            <a key={link} href="#">
              {link}
            </a>
          ))}
        </div>
        <div className="sign-in-footer-settings">
          <select className="select-language">
            <option>English</option>
            <option>Español</option>
            <option>Français</option>
          </select>
          <span className="sign-in-footer-note">
            Happy birthday, Princess! Love you!
          </span>
          <span className="sign-in-footer-copy">© 2026 Netflix Clone</span>
        </div>
      </footer>
    </div>
  );
}

export default SignInPage;
