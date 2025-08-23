'use client';

import { useState } from 'react';
import { site } from '@/config/site';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorDetails, setErrorDetails] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear errors when user starts typing
    if (submitStatus === 'error') {
      setSubmitStatus('idle');
      setErrorMessage('');
      setErrorDetails([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    setErrorDetails([]);
    setSubmitStatus('idle');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.error || 'Failed to send message. Please try again.');
        // Capture validation error details if available
        if (result.details && Array.isArray(result.details)) {
          setErrorDetails(result.details);
        }
      }
    } catch (error) {
      console.error('API submission failed:', error);
      setSubmitStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDirectEmail = () => {
    const mailtoUrl = `mailto:${site.email}?subject=${encodeURIComponent('Portfolio Inquiry')}`;
    window.location.href = mailtoUrl;
  };

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-[var(--text)] mb-6">
            Get In Touch
          </h1>
          <p className="text-xl text-[var(--muted)] max-w-3xl mx-auto">
            I&apos;m always interested in new opportunities, collaborations, and interesting challenges. 
            Whether you have a project in mind or just want to connect, I&apos;d love to hear from you.
          </p>
        </div>

        {/* Primary Contact Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <button
            onClick={handleDirectEmail}
            className="flex items-center justify-center px-6 py-4 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2"
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Email me
          </button>
          
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-6 py-4 bg-[#0077b5] hover:bg-[#005885] text-white rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#0077b5] focus:ring-offset-2"
          >
            <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.047-1.852-3.047-1.853 0-2.136 1.445-2.136 2.939v5.677H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </a>
          
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-6 py-4 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 1.842-1.339 3.694-4.365 4.951.209.18.403.535.403 1.08 0 .533-.01 1.964-.01 2.229 0 .224.18.49.68.407A9.019 9.019 0 0024 12.017C24 6.484 19.523 2 12 2z" clipRule="evenodd" />
            </svg>
            GitHub
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8">
            <h2 className="text-2xl font-bold text-[var(--text)] mb-6">
              Send a Message
            </h2>
            
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-600 text-white border border-green-700 rounded-lg">
                <p className="font-medium">
                  Thank you for your message! I&apos;ll get back to you soon.
                </p>
              </div>
            )}

            {submitStatus === 'error' && errorMessage && (
              <div className="mb-6 p-4 bg-red-600 text-white border border-red-700 rounded-lg">
                <p className="font-medium">
                  {errorMessage}
                </p>
                {errorDetails.length > 0 && (
                  <div className="mt-3">
                    <p className="text-red-100 text-sm font-medium mb-2">Please fix the following:</p>
                    <ul className="text-red-100 text-sm space-y-1">
                      {errorDetails.map((detail, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-red-200 mr-2">•</span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <p className="text-red-100 text-sm mt-3">
                  If the issue persists, you can also email me directly using the button above.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[var(--text)] mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent bg-[var(--surface)] text-[var(--text)] transition-colors duration-200"
                  placeholder="Your name"
                />
                <p className="mt-1 text-xs text-[var(--muted)]">At least 2 characters</p>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[var(--text)] mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent bg-[var(--surface)] text-[var(--text)] transition-colors duration-200"
                  placeholder="your.email@example.com"
                />
                <p className="mt-1 text-xs text-[var(--muted)]">Must be a valid email address</p>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[var(--text)] mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent bg-[var(--surface)] text-[var(--text)] transition-colors duration-200 resize-none"
                  placeholder="Tell me about your project, question, or how we can work together..."
                />
                <p className="mt-1 text-xs text-[var(--muted)]">At least 10 characters</p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 text-base font-medium text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-[var(--text)] mb-6">
                Other Ways to Connect
              </h2>
              <p className="text-[var(--muted)] mb-8">
                Prefer a different communication method? You can also reach out through these channels.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[var(--surface-hover)] rounded-lg flex items-center justify-center text-[var(--primary)]">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-[var(--text)]">
                    Email
                  </h3>
                  <p className="text-[var(--muted)]">
                    {site.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#0077b5]/10 dark:bg-[#0077b5]/20 rounded-lg flex items-center justify-center text-[#0077b5]">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.047-1.852-3.047-1.853 0-2.136 1.445-2.136 2.939v5.677H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-[var(--text)]">
                    LinkedIn
                  </h3>
                  <p className="text-[var(--muted)]">
                    Professional networking
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[var(--surface-hover)] rounded-lg flex items-center justify-center text-[var(--text)]">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 1.842-1.339 3.694-4.365 4.951.209.18.403.535.403 1.08 0 .533-.01 1.964-.01 2.229 0 .224.18.49.68.407A9.019 9.019 0 0024 12.017C24 6.484 19.523 2 12 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-[var(--text)]">
                    GitHub
                  </h3>
                  <p className="text-[var(--muted)]">
                    Code repositories & projects
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
              <h3 className="text-lg font-semibold text-[var(--text)] mb-3">
                Response Time
              </h3>
              <p className="text-[var(--muted)] text-sm">
                I aim to respond to all inquiries within 24 hours during business days. 
                For urgent matters, please include &quot;URGENT&quot; in your subject line.
              </p>
            </div>

            <div className="rounded-lg border border-[var(--primary)]/20 bg-[var(--primary)]/5 p-6">
              <h3 className="text-lg font-semibold text-[var(--primary)] mb-3">
                Let&apos;s Work Together
              </h3>
              <p className="text-[var(--muted)] text-sm">
                Whether you need development help, want to collaborate on a project, 
                or just want to discuss technology, I&apos;m here to help.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
