import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { submitContact } from '../utils/api';
import toast from 'react-hot-toast';

const contactInfo = [
  { icon: Phone, label: 'Phone',   value: '+01 (123) 4567 90', sub: 'Mon–Fri, 9am–6pm' },
  { icon: Mail,  label: 'Email',   value: 'hello@tourly.com',  sub: 'We reply within 24h' },
  { icon: MapPin, label: 'Office', value: '3146 Koontz Lane',  sub: 'California, USA' },
  { icon: Clock,  label: 'Hours',  value: 'Mon–Sat, 9–18',     sub: 'Sunday closed' },
];

export default function ContactPage() {
  const [form, setForm]       = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await submitContact(form);
      if (res.data.success) {
        toast.success(res.data.message);
        setForm({ name: '', email: '', subject: '', message: '' });
      }
    } catch {
      toast.error('Failed to send. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section
        className="relative pt-40 pb-20 text-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1400&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-ocean-950/70" />
        <div className="relative container-custom animate-fade-up" style={{ animationFillMode: 'both' }}>
          <p className="text-sand-300 text-sm font-semibold uppercase tracking-widest mb-3">Get In Touch</p>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-white/70 max-w-xl mx-auto">
            Have a question or ready to plan your next adventure? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">Let's Connect</h2>
              {contactInfo.map(({ icon: Icon, label, value, sub }) => (
                <div key={label} className="flex items-start gap-4 bg-white rounded-2xl p-5 shadow-card">
                  <div className="w-10 h-10 bg-ocean-50 text-ocean-600 rounded-xl flex items-center justify-center shrink-0">
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{label}</p>
                    <p className="text-gray-800 font-semibold text-sm mt-0.5">{value}</p>
                    <p className="text-gray-400 text-xs">{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-card">
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">Send Us a Message</h2>
              <p className="text-gray-500 text-sm mb-8">Fill out the form below and a travel expert will be in touch shortly.</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ocean-300 transition-all bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ocean-300 transition-all bg-gray-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ocean-300 transition-all bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Tell us about your dream trip, questions, or anything on your mind…"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ocean-300 transition-all bg-gray-50 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary text-base px-8 py-3.5 disabled:opacity-60"
                >
                  <Send size={16} />
                  {loading ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
