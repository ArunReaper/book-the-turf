import { useState } from "react";
import { createLead } from "../api/leadService";

function LeadForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!name.trim() || !phone.trim()) return;

    setSubmitting(true);

    try {
      await createLead({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        message: message.trim(),
      });

      setSubmitted(true);
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (error) {
      console.error(error);
      alert("Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="lead-form__success">
        <div className="lead-form__success-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <h4 className="lead-form__success-title">Request Sent!</h4>
        <p className="lead-form__success-text">
          We've received your details. The turf owner will contact you shortly.
        </p>
        <button
          className="btn btn--primary"
          onClick={() => setSubmitted(false)}
          style={{ marginTop: "4px" }}
        >
          Send Another
        </button>
      </div>
    );
  }

  return (
    <form className="lead-form" onSubmit={handleSubmit}>
      <div className="lead-form__field">
        <label className="lead-form__label">Name *</label>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="lead-form__input"
          required
        />
      </div>

      <div className="lead-form__field">
        <label className="lead-form__label">Phone *</label>
        <input
          type="tel"
          placeholder="Your phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="lead-form__input"
          required
        />
      </div>

      <div className="lead-form__field">
        <label className="lead-form__label">Email</label>
        <input
          type="email"
          placeholder="Your email (optional)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="lead-form__input"
        />
      </div>

      <div className="lead-form__field">
        <label className="lead-form__label">Message</label>
        <textarea
          placeholder="Any questions or preferences? (optional)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="lead-form__textarea"
          rows={3}
        />
      </div>

      <button
        type="submit"
        className="lead-form__submit"
        disabled={submitting}
      >
        {submitting ? "Sending..." : "Send Enquiry"}
      </button>
    </form>
  );
}

export default LeadForm;