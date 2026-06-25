import Layout from "../components/Layout";

function ContactPage() {
    return (
        <Layout>
            <div className="contact-page">
                <div className="contact-page__container">
                    {/* Header */}
                    <div className="contact-page__header">
                        <h1 className="contact-page__title">Get in Touch</h1>
                        <p className="contact-page__subtitle">
                            Have a question, feedback, or want to list your turf? We'd love to hear from you.
                        </p>
                    </div>

                    <div className="contact-page__grid">
                        {/* Contact Info Cards */}
                        <div className="contact-page__info">
                            <div className="contact-page__card">
                                <div className="contact-page__card-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                        <polyline points="22,6 12,13 2,6" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="contact-page__card-title">Email</h3>
                                    <a href="mailto:contact@booktheturf.com" className="contact-page__card-link">
                                        contact@booktheturf.com
                                    </a>
                                    <p className="contact-page__card-text">We reply within 24 hours</p>
                                </div>
                            </div>

                            <div className="contact-page__card">
                                <div className="contact-page__card-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="contact-page__card-title">Phone</h3>
                                    <a href="tel:+919876543210" className="contact-page__card-link">
                                        +91 9876 543 210
                                    </a>
                                    <p className="contact-page__card-text">Mon–Sat, 9 AM – 8 PM</p>
                                </div>
                            </div>

                            <div className="contact-page__card">
                                <div className="contact-page__card-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="contact-page__card-title">Location</h3>
                                    <p className="contact-page__card-text">Bangalore, Karnataka, India</p>
                                    <p className="contact-page__card-text">Serving all major areas</p>
                                </div>
                            </div>
                        </div>

                        {/* Quick Response */}
                        <div className="contact-page__response">
                            <div className="contact-page__response-card">
                                <div className="contact-page__response-icon">
                                    ⚡
                                </div>
                                <h3 className="contact-page__response-title">Quick Response</h3>
                                <p className="contact-page__response-text">
                                    For the fastest response, drop us an email or give us a call. We typically respond within a few hours during business hours.
                                </p>
                                <div className="contact-page__response-divider" />
                                <p className="contact-page__response-text">
                                    Want to list your turf on our platform? Reach out to us and we'll get you set up in no time!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ContactPage;