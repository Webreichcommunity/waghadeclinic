import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Deepak',
      role: 'Patient',
      feedback:
        'I had a fantastic experience at Waghade Skin Clinic. Dr. Praful provided high standard care and professional counselling. The clinic was clean, hygienic, and well-equipped with sterilised equipment. The quick service, reasonable pricing, and speedy recovery made it even better. The clinic is easily accessible and well-connected. I didn’t have to wait long for my appointment, and the in-house chemist and testing facilities were convenient for my routine check-up. Highly recommended!',
      image: 'https://www.w3schools.com/w3images/avatar2.png', // User icon
      rating: 5,
    },
    {
      name: 'Sandeep Ingle',
      role: 'Patient',
      feedback:
        'I recently visited Waghade Skin Clinic and had an excellent experience. The customer service was great, and the service was quick. Under the good supervision of Dr. Praful Waghade, I had a speedy recovery. I highly recommend this clinic for any skin-related issues.',
      image: 'https://www.w3schools.com/w3images/avatar2.png', // User icon
      rating: 5,
    },
    {
      name: 'Manoj',
      role: 'Patient',
      feedback:
        'Dr. Praful Waghade at Waghade Skin Clinic provided professional counselling and excellent treatment. The services were reasonably priced and the clinic offered decent coverage. I had a great experience and would highly recommend it.',
      image: 'https://www.w3schools.com/w3images/avatar2.png', // User icon
      rating: 4,
    },
    {
      name: 'Shubhangi K Gaikwad',
      role: 'Patient',
      feedback:
        'If you are looking for a well-experienced dermatologist, do visit Waghade Skin Clinic in Akola. Best diagnosis and treatment.',
      image: 'https://www.w3schools.com/w3images/avatar2.png', // User icon
      rating: 5,
    },
    {
      name: 'Dr. Neeta Punde',
      role: 'Patient',
      feedback:
        'Patient-friendly. Proper counseling time for each and every patient. Less waiting period. Accurate diagnosis and excellent treatment. Highly recommend this clinic for every patient having skin and hair-related problems. Good and humble staff 😊',
      image: 'https://www.w3schools.com/w3images/avatar2.png', // User icon
      rating: 5,
    },
  ];

  // Function to render stars based on rating
  const renderStars = (rating) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 15.27l4.47 2.34-1.16-5.07 3.83-3.64-5.15-.44L10 0l-2.99 7.5-5.15.44 3.83 3.64-1.16 5.07L10 15.27z"
            clipRule="evenodd"
          />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold text-gray-800">What Our Patients Say</h1>
          <p className="text-xl text-gray-600 mt-2">Read the experiences of those who have trusted our care</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 hover:shadow-2xl duration-300"
            >
              <div className="flex items-center mb-4 space-x-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-indigo-600"
                />
                <div>
                  <h3 className="font-semibold text-xl text-gray-800">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <div className="flex mt-2">{renderStars(testimonial.rating)}</div>
                </div>
              </div>
              <p className="text-gray-700 italic mt-4">"{testimonial.feedback}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
