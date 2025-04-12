import { useState } from 'react';
import { Award, Heart, Users, Shield, Clock, Globe, CheckCircle, ChevronRight, Link as LinkIcon } from 'lucide-react';

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState('mission');
  
  // Team members data - easy to add more in the future
  const teamMembers = [
    {
      id: 'member1',
      name: 'Dr. Sarah Johnson',
      role: 'Chief Medical Officer',
      image: '/api/placeholder/150/150',
      specialty: 'Cardiology',
      description: 'Dr. Johnson leads our medical team with over 15 years of experience in cardiovascular research and AI diagnostics.',
      link: '/team/sarah-johnson'
    },
    {
      id: 'member2',
      name: 'Dr. Michael Chen',
      role: 'Head of AI Research',
      image: '/api/placeholder/150/150',
      specialty: 'Neurology',
      description: 'Dr. Chen specializes in neurological disorders and has pioneered our Parkinson\'s detection algorithm.',
      link: '/team/michael-chen'
    },
    {
      id: 'member3',
      name: 'Dr. Rebecca Torres',
      role: 'Emergency Services Director',
      image: '/api/placeholder/150/150',
      specialty: 'Emergency Medicine',
      description: 'Dr. Torres oversees our emergency response systems and ambulance services with precision and care.',
      link: '/team/rebecca-torres'
    },
    {
      id: 'member4',
      name: 'Alex Williams',
      role: 'Technology Director',
      image: '/api/placeholder/150/150',
      specialty: 'Medical Informatics',
      description: 'Alex leads our technology development, ensuring our platforms are secure, accessible, and cutting-edge.',
      link: '/team/alex-williams'
    }
  ];
  
  // Achievements data
  const achievements = [
    {
      id: 'achievement1',
      title: '98% Accuracy',
      description: 'Our heart disease detection model has achieved 98% accuracy in clinical trials',
      icon: <CheckCircle size={24} />,
      color: 'text-green-600'
    },
    {
      id: 'achievement2',
      title: '24/7 Service',
      description: 'Round-the-clock emergency services available in 15 major cities',
      icon: <Clock size={24} />,
      color: 'text-blue-600'
    },
    {
      id: 'achievement3',
      title: '100,000+ Patients',
      description: 'Successfully served and diagnosed over one hundred thousand patients',
      icon: <Users size={24} />,
      color: 'text-purple-600'
    },
    {
      id: 'achievement4',
      title: 'HIPAA Compliant',
      description: 'Highest standards of data security and patient privacy',
      icon: <Shield size={24} />,
      color: 'text-red-600'
    }
  ];
  
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About HealthPlum</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transforming healthcare through artificial intelligence and compassionate service
          </p>
        </div>
        
        {/* Tabs Navigation */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          <button 
            onClick={() => setActiveTab('mission')}
            className={`px-5 py-2 rounded-full font-medium text-sm transition-all ${
              activeTab === 'mission' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Our Mission
          </button>
          
          <button 
            onClick={() => setActiveTab('team')}
            className={`px-5 py-2 rounded-full font-medium text-sm transition-all ${
              activeTab === 'team' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Our Team
          </button>
          
          <button 
            onClick={() => setActiveTab('achievements')}
            className={`px-5 py-2 rounded-full font-medium text-sm transition-all ${
              activeTab === 'achievements' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Achievements
          </button>
          
          <button 
            onClick={() => setActiveTab('partners')}
            className={`px-5 py-2 rounded-full font-medium text-sm transition-all ${
              activeTab === 'partners' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Our Partners
          </button>
        </div>
        
        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Mission Tab */}
          {activeTab === 'mission' && (
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 bg-blue-600 text-white p-10 md:p-16 flex items-center">
                <div>
                  <h3 className="text-3xl font-bold mb-6">Our Mission & Vision</h3>
                  <p className="text-blue-100 mb-6">
                    At HealthPlum, we believe that cutting-edge technology and compassionate care should be accessible to everyone. Our mission is to revolutionize healthcare by combining artificial intelligence with medical expertise.
                  </p>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start">
                      <div className="mt-1 mr-4">
                        <Heart size={20} />
                      </div>
                      <p className="text-blue-50">Providing early disease detection that saves lives</p>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-1 mr-4">
                        <Users size={20} />
                      </div>
                      <p className="text-blue-50">Ensuring healthcare equity through accessible technology</p>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-1 mr-4">
                        <Shield size={20} />
                      </div>
                      <p className="text-blue-50">Maintaining the highest standards of medical ethics and data privacy</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 p-10 md:p-16">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Approach</h3>
                <p className="text-gray-600 mb-6">
                  HealthPlum combines the expertise of medical professionals with state-of-the-art artificial intelligence to create solutions that are both highly accurate and deeply human-centered.
                </p>
                
                <div className="space-y-6 mb-8">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Research-Driven Innovation</h4>
                    <p className="text-gray-600">
                      Our disease detection models are built on peer-reviewed research and continuously refined through clinical validation.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Patient-Centered Care</h4>
                    <p className="text-gray-600">
                      Technology is only meaningful when it improves patient outcomes. We design all our services with the patient experience in mind.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Global Accessibility</h4>
                    <p className="text-gray-600">
                      We're committed to making advanced healthcare technology available to underserved communities worldwide.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Globe size={20} className="text-blue-600 mr-2" />
                  <span className="text-blue-600 font-medium">Serving communities across 30+ countries</span>
                </div>
              </div>
            </div>
          )}
          
          {/* Team Tab */}
          {activeTab === 'team' && (
            <div className="p-8 md:p-12">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Expert Team</h3>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  Our diverse team of medical professionals, researchers, and technologists work together to create healthcare solutions that are both innovative and compassionate.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {teamMembers.map((member) => (
                  <div key={member.id} className="bg-gray-50 rounded-lg overflow-hidden transition-all hover:shadow-md">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-48 object-cover object-center"
                    />
                    <div className="p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h4>
                      <p className="text-blue-600 text-sm font-medium mb-2">{member.role}</p>
                      <p className="text-gray-500 text-sm italic mb-3">Specialty: {member.specialty}</p>
                      <p className="text-gray-600 text-sm mb-4">{member.description}</p>
                      <a 
                        href={member.link}
                        className="flex items-center text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors"
                      >
                        <span>Full Profile</span>
                        <ChevronRight size={16} className="ml-1" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-12">
                <a 
                  href="/team"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  <span>View All Team Members</span>
                  <ChevronRight size={18} className="ml-2" />
                </a>
              </div>
            </div>
          )}
          
          {/* Achievements Tab */}
          {activeTab === 'achievements' && (
            <div className="p-8 md:p-12">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Achievements</h3>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  HealthPlum has reached significant milestones in healthcare innovation, service quality, and patient outcomes.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {achievements.map((item) => (
                  <div key={item.id} className="bg-gray-50 rounded-lg p-6 text-center">
                    <div className={`mx-auto mb-4 ${item.color}`}>{item.icon}</div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="bg-blue-50 rounded-lg p-8 mb-8">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/4 mb-6 md:mb-0 flex justify-center">
                    <Award size={80} className="text-blue-600" />
                  </div>
                  <div className="md:w-3/4">
                    <h4 className="text-2xl font-bold text-gray-900 mb-4">Healthcare Innovation Award 2024</h4>
                    <p className="text-gray-600 mb-4">
                      HealthPlum was recognized for breakthrough advancements in early Parkinson's disease detection using AI technology, demonstrating a 94% accuracy rate in preliminary trials.
                    </p>
                    <a 
                      href="/achievements"
                      className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
                    >
                      <span>Read the full story</span>
                      <ChevronRight size={16} className="ml-1" />
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-8">
                <h4 className="text-xl font-bold text-gray-900 mb-6">Publications & Research</h4>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="mt-1 mr-4 text-blue-600">
                      <LinkIcon size={18} />
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900">Neural Network Approaches to Heart Disease Detection</h5>
                      <p className="text-gray-500 text-sm">Journal of Medical AI, 2024</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mt-1 mr-4 text-blue-600">
                      <LinkIcon size={18} />
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900">Improving Emergency Response Times Through Predictive Analytics</h5>
                      <p className="text-gray-500 text-sm">Emergency Medicine Technology Review, 2023</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mt-1 mr-4 text-blue-600">
                      <LinkIcon size={18} />
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900">Machine Learning Applications in Early Parkinson's Detection</h5>
                      <p className="text-gray-500 text-sm">Frontiers in Neurological AI, 2023</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <a 
                    href="/research"
                    className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
                  >
                    <span>View all publications</span>
                    <ChevronRight size={16} className="ml-1" />
                  </a>
                </div>
              </div>
            </div>
          )}
          
          {/* Partners Tab */}
          {activeTab === 'partners' && (
            <div className="p-8 md:p-12">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Partners</h3>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  We collaborate with leading healthcare institutions, research organizations, and technology partners to advance our mission.
                </p>
              </div>
              
              {/* Partner Categories */}
              <div className="mb-12">
                <h4 className="text-xl font-bold text-gray-900 mb-6">Healthcare Partners</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {/* Partner Logos - Using placeholder images */}
                  {[1, 2, 3, 4].map((item) => (
                    <div key={`health-partner-${item}`} className="bg-white rounded-lg p-6 flex items-center justify-center h-32 border border-gray-100 shadow-sm">
                      <img 
                        src={`/api/placeholder/180/80`} 
                        alt={`Healthcare Partner ${item}`}
                        className="max-h-full"
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-12">
                <h4 className="text-xl font-bold text-gray-900 mb-6">Research Institutions</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {/* Partner Logos - Using placeholder images */}
                  {[1, 2, 3, 4].map((item) => (
                    <div key={`research-partner-${item}`} className="bg-white rounded-lg p-6 flex items-center justify-center h-32 border border-gray-100 shadow-sm">
                      <img 
                        src={`/api/placeholder/180/80`} 
                        alt={`Research Partner ${item}`}
                        className="max-h-full"
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-12">
                <h4 className="text-xl font-bold text-gray-900 mb-6">Technology Partners</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {/* Partner Logos - Using placeholder images */}
                  {[1, 2, 3, 4].map((item) => (
                    <div key={`tech-partner-${item}`} className="bg-white rounded-lg p-6 flex items-center justify-center h-32 border border-gray-100 shadow-sm">
                      <img 
                        src={`/api/placeholder/180/80`} 
                        alt={`Technology Partner ${item}`}
                        className="max-h-full"
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Partnership CTA */}
              <div className="bg-blue-600 rounded-lg p-8 text-white text-center">
                <h4 className="text-2xl font-bold mb-4">Partner With Us</h4>
                <p className="mb-6 max-w-2xl mx-auto">
                  We're always looking to collaborate with organizations that share our mission of improving healthcare through innovation and compassion.
                </p>
                <a 
                  href="/contact"
                  className="inline-block px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                >
                  Get in Touch
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}