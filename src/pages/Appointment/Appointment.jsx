import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, MessageSquare, Phone, User, CheckCircle, Trash2, AlertCircle } from "lucide-react";
// import { Alert, AlertDescription } from "@/components/ui/alert";

// Color palette
const COLORS = {
  primary: "#2E5077",    // Deep blue
  secondary: "#4DA1A9",  // Teal
  accent: "#79D7BE",     // Mint
  background: "#F6F4F0", // Off-white
};

// Constants
const STORAGE_KEY = 'medical_appointments';
const ADMIN_WHATSAPP = '8668722207'; // Replace with actual admin number

const formatWhatsAppMessage = (data) => {
  const formattedDate = new Date(data.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return `
🏥 *New Appointment Request*
---------------------------
👤 *Patient Name:* ${data.name}
📞 *Phone:* ${data.phone}
📅 *Date:* ${formattedDate}
⏰ *Time:* ${data.time}
${data.message ? `💬 *Message:* ${data.message}` : ''}
---------------------------
Appointment ID: ${data.id}
Created: ${new Date(data.createdAt).toLocaleString()}
  `.trim();
};

const AppointmentCard = ({ appointment, onDelete }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="bg-white rounded-xl shadow-lg p-6 mb-4 border-l-4"
    style={{ borderLeftColor: COLORS.primary }}
  >
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-xl font-bold" style={{ color: COLORS.primary }}>
          Appointment Details
        </h3>
        <p className="text-sm text-gray-500">
          {new Date(appointment.createdAt).toLocaleString()}
        </p>
      </div>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onDelete(appointment.id)}
        className="text-red-500 hover:text-red-600 transition-colors p-2 rounded-full hover:bg-red-50"
      >
        <Trash2 className="w-5 h-5" />
      </motion.button>
    </div>

    <div className="space-y-4">
      <div className="flex items-center">
        <User className="w-5 h-5 mr-3" style={{ color: COLORS.secondary }} />
        <span>{appointment.name}</span>
      </div>
      <div className="flex items-center">
        <Phone className="w-5 h-5 mr-3" style={{ color: COLORS.secondary }} />
        <span>{appointment.phone}</span>
      </div>
      <div className="flex items-center">
        <Calendar className="w-5 h-5 mr-3" style={{ color: COLORS.secondary }} />
        <span>{new Date(appointment.date).toLocaleDateString()}</span>
      </div>
      <div className="flex items-center">
        <Clock className="w-5 h-5 mr-3" style={{ color: COLORS.secondary }} />
        <span>{appointment.time}</span>
      </div>
      {appointment.message && (
        <div className="flex items-start">
          <MessageSquare className="w-5 h-5 mr-3 mt-1" style={{ color: COLORS.secondary }} />
          <span className="text-gray-700">{appointment.message}</span>
        </div>
      )}
    </div>
  </motion.div>
);

const BookAppointment = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    message: "",
  });

  const [appointments, setAppointments] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const savedAppointments = localStorage.getItem(STORAGE_KEY);
      if (savedAppointments) {
        setAppointments(JSON.parse(savedAppointments));
      }
    } catch (err) {
      console.error('Error loading appointments:', err);
      setError("Failed to load previous appointments");
    }
  }, []);

  const validateForm = () => {
    if (!formData.name.trim()) return "Please enter your name";
    if (!formData.phone.trim()) return "Please enter your phone number";
    if (!formData.phone.match(/^\d{10}$/)) return "Please enter a valid 10-digit phone number";
    if (!formData.date) return "Please select a date";
    if (!formData.time) return "Please select a time";

    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) return "Please select a future date";

    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(""); // Clear any previous errors
  };

  const sendToWhatsApp = async (data) => {
    const message = formatWhatsAppMessage(data);
    const whatsappUrl = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSending(true);

    try {
      const newAppointment = {
        ...formData,
        id: crypto.randomUUID(), // Using native UUID generation
        createdAt: new Date().toISOString(),
      };

      await sendToWhatsApp(newAppointment);

      const updatedAppointments = [newAppointment, ...appointments];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAppointments));
      setAppointments(updatedAppointments);

      setIsSuccess(true);
      setFormData({
        name: "",
        phone: "",
        date: "",
        time: "",
        message: "",
      });

      setTimeout(() => setIsSuccess(false), 3000);
    } catch (err) {
      console.error('Error scheduling appointment:', err);
      setError("Failed to schedule appointment. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  const handleDelete = (id) => {
    try {
      const updatedAppointments = appointments.filter(app => app.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAppointments));
      setAppointments(updatedAppointments);
    } catch (err) {
      console.error('Error deleting appointment:', err);
      setError("Failed to delete appointment");
    }
  };

  // Get today's date in YYYY-MM-DD format for date input min attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.background }}>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden max-w-6xl mx-auto"
        >
          {/* Left Side - Information */}
          <div className="lg:w-1/2 p-12 text-white relative overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})` }}>
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <pattern id="pattern-circles" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="10" cy="10" r="2" fill="currentColor" />
                </pattern>
                <rect x="0" y="0" width="100" height="100" fill="url(#pattern-circles)" />
              </svg>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative z-10"
            >
              <h1 className="text-4xl font-bold mb-6">Welcome to Our Medical Center</h1>
              <p className="text-xl mb-8 opacity-90">Your health is our priority</p>

              <div className="space-y-6">
                {[
                  { icon: User, title: "Expert Physicians", desc: "Board-certified specialists in multiple fields" },
                  { icon: Calendar, title: "Flexible Scheduling", desc: "Book appointments at your convenience" },
                  { icon: CheckCircle, title: "Modern Facilities", desc: "State-of-the-art medical equipment" },
                  { icon: Clock, title: "Timely Care", desc: "Minimal waiting times for appointments" }
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <item.icon className="w-6 h-6" style={{ color: COLORS.accent }} />
                    <div>
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <p className="opacity-80">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Side - Form */}
          <div className="lg:w-1/2 p-12">
            <div className="max-w-lg mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold mb-8"
                style={{ color: COLORS.primary }}
              >
                Book Your Appointment
              </motion.h2>

              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  {/* Name Input */}
                  <div className="form-group">
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4 mr-2" style={{ color: COLORS.primary }} />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:border-transparent transition-all bg-gray-50"
                      style={{ '--tw-ring-color': COLORS.primary }}
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Phone Input */}
                  <div className="form-group">
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <Phone className="w-4 h-4 mr-2" style={{ color: COLORS.primary }} />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      pattern="[0-9]{10}"
                      className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:border-transparent transition-all bg-gray-50"
                      style={{ '--tw-ring-color': COLORS.primary }}
                      placeholder="Enter 10-digit phone number"
                    />
                  </div>

                  {/* Date and Time Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-group">
                      <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="w-4 h-4 mr-2" style={{ color: COLORS.primary }} />
                        Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        min={today}
                        className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:border-transparent transition-all bg-gray-50"
                        style={{ '--tw-ring-color': COLORS.primary }}
                      />
                    </div>

                    <div className="form-group">
                      <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                        <Clock className="w-4 h-4 mr-2" style={{ color: COLORS.primary }} />
                        Time
                      </label>
                      <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:border-transparent transition-all bg-gray-50"
                        style={{ '--tw-ring-color': COLORS.primary }}
                      />
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="form-group">
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <MessageSquare className="w-4 h-4 mr-2" style={{ color: COLORS.primary }} />
                      Additional Message (Optional)
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:border-transparent transition-all bg-gray-50 resize-none"
                      style={{ '--tw-ring-color': COLORS.primary }}
                      placeholder="Tell us about your concerns or any specific requirements..."
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSending}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full p-4 rounded-xl text-white font-semibold text-lg transition-all duration-300
                    ${isSuccess ? 'bg-green-500' : ''} 
                    ${isSending ? 'opacity-75 cursor-not-allowed' : 'hover:opacity-90'}
                  `}
                  style={{
                    backgroundColor: isSuccess ? undefined : COLORS.primary,
                    boxShadow: `0 4px 14px 0 ${COLORS.primary}30`
                  }}
                >
                  {isSending ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Scheduling Appointment...
                    </span>
                  ) : isSuccess ? (
                    <span className="flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Appointment Scheduled Successfully!
                    </span>
                  ) : (
                    "Schedule Appointment"
                  )}
                </motion.button>
              </form>

              {/* Existing Appointments Section */}
              <AnimatePresence>
                {appointments.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mt-12"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold" style={{ color: COLORS.primary }}>
                        Your Appointments
                      </h3>
                      <span className="text-sm text-gray-500">
                        Total: {appointments.length}
                      </span>
                    </div>

                    <div className="space-y-4">
                      <AnimatePresence>
                        {appointments.map(appointment => (
                          <AppointmentCard
                            key={appointment.id}
                            appointment={appointment}
                            onDelete={handleDelete}
                          />
                        ))}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookAppointment;