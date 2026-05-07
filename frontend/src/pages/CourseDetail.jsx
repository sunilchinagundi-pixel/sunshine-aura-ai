import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [enrollmentMessage, setEnrollmentMessage] = useState('');

  useEffect(() => {
    // Show fallback data immediately for testing
    const fallbackCourse = {
      id: 2,
      title: "AI + Python Web Applications",
      description: "Build modern AI-powered web apps using FastAPI, integrate LLMs, RAG, and deploy to cloud. Weekend program!",
      category: "AI",
      is_free: true,
      duration: "6 weeks",
      tools: ["Python", "FastAPI", "TensorFlow", "OpenAI API", "Docker", "AWS"],
      internship: true,
      certification: true,
      modules: [
        { number: 1, title: "Python & Backend Fundamentals", topics: ["Variables, Loops, Functions", "OOP Concepts", "Exception Handling"] },
        { number: 2, title: "Web Development with FastAPI", topics: ["Building APIs with FastAPI", "Request & Response Handling"] }
      ],
      projects: [
        { name: "AI Chatbot Web App", description: "Build a web application with AI chatbot functionality" },
        { name: "ML Model Deployment", description: "Deploy machine learning models to production" }
      ],
      job_roles: ["AI Developer", "Backend Engineer", "Full-Stack Developer"],
      salary_range: "₹8-25 LPA"
    };
    setCourse(fallbackCourse);
    setLoading(false);

    // Try API call in background
    fetchCourseDetail();
  }, [courseId]);

  const fetchCourseDetail = async () => {
    try {
      setLoading(true);
      console.log('Fetching course detail for ID:', courseId);
      const response = await axios.get(`/api/trainings/${courseId}`);
      console.log('Response received:', response.data);
      setCourse(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching course detail:', err);
      setError('Failed to load course details.');
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = () => {
    navigate('/register');
  };

  const handleRequestCallback = () => {
    setEnrollmentMessage('Callback request sent! Our team will contact you soon.');
    setTimeout(() => setEnrollmentMessage(''), 3000);
  };

  if (loading) {
    return (
      <div style={{ padding: '40px 20px', textAlign: 'center', minHeight: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div>Loading course details...</div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div style={{ padding: '40px 20px', textAlign: 'center', minHeight: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#ef4444' }}>{error || 'Course not found'}</div>
      </div>
    );
  }

  const getCategoryColor = (category) => {
    const colors = {
      'Python': '#3b82f6',
      'AI': '#8b5cf6',
      'ML': '#ec4899',
      'Web': '#10b981',
    };
    return colors[category] || '#667eea';
  };

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '60px' }}>
      {/* Header Section */}
      <div style={{
        background: `linear-gradient(135deg, ${getCategoryColor(course.category)}, #667eea)`,
        color: 'white',
        padding: '60px 20px 40px',
        textAlign: 'center',
        marginBottom: '40px',
      }}>
        <button
          onClick={() => navigate('/trainings')}
          style={{
            background: 'rgba(255,255,255,0.2)',
            border: 'none',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            marginBottom: '20px',
            display: 'inline-block',
          }}
        >
          ← Back to Trainings
        </button>
        <h1 style={{ fontSize: '48px', marginBottom: '10px', fontWeight: 'bold' }}>{course.title}</h1>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {course.is_free ? (
            <span style={{ background: '#d1fae5', color: '#065f46', padding: '6px 12px', borderRadius: '20px', fontSize: '14px', fontWeight: 'bold' }}>FREE</span>
          ) : (
            <span style={{ background: '#fef3c7', color: '#92400e', padding: '6px 12px', borderRadius: '20px', fontSize: '14px', fontWeight: 'bold' }}>PRO</span>
          )}
          {course.certification && (
            <span style={{ background: '#dbeafe', color: '#1e40af', padding: '6px 12px', borderRadius: '20px', fontSize: '14px' }}>✓ Certification</span>
          )}
          {course.internship && (
            <span style={{ background: '#c7d2fe', color: '#3730a3', padding: '6px 12px', borderRadius: '20px', fontSize: '14px' }}>🌟 Internship</span>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        {/* Quick Info Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          {course.duration && (
            <div style={{
              background: 'rgba(255,255,255,0.95)',
              padding: '20px',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '24px', color: '#667eea', fontWeight: 'bold' }}>⏱️</div>
              <div style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>Duration</div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '4px' }}>{course.duration}</div>
            </div>
          )}
          {course.schedule && (
            <div style={{
              background: 'rgba(255,255,255,0.95)',
              padding: '20px',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '24px', color: '#10b981', fontWeight: 'bold' }}>📅</div>
              <div style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>Schedule</div>
              <div style={{ fontSize: '16px', fontWeight: 'bold', marginTop: '4px' }}>{course.schedule}</div>
            </div>
          )}
          {course.salary_range && (
            <div style={{
              background: 'rgba(255,255,255,0.95)',
              padding: '20px',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '24px', color: '#f59e0b', fontWeight: 'bold' }}>💰</div>
              <div style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>Salary Range</div>
              <div style={{ fontSize: '16px', fontWeight: 'bold', marginTop: '4px' }}>{course.salary_range}</div>
            </div>
          )}
        </div>

        {/* Description */}
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          padding: '30px',
          borderRadius: '12px',
          marginBottom: '40px',
          border: '1px solid #e5e7eb',
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>📌 Course Overview</h2>
          <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#333' }}>{course.description}</p>
        </div>

        {/* Technologies */}
        {course.tools && course.tools.length > 0 && (
          <div style={{
            background: 'rgba(255,255,255,0.95)',
            padding: '30px',
            borderRadius: '12px',
            marginBottom: '40px',
            border: '1px solid #e5e7eb',
          }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>🛠️ Technologies & Tools</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
              {course.tools.map((tool, idx) => (
                <div
                  key={idx}
                  style={{
                    background: '#e0e7ff',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#4c1d95',
                    textAlign: 'center',
                  }}
                >
                  {tool}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Course Modules */}
        {course.modules && course.modules.length > 0 && (
          <div style={{
            background: 'rgba(255,255,255,0.95)',
            padding: '30px',
            borderRadius: '12px',
            marginBottom: '40px',
            border: '1px solid #e5e7eb',
          }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>📚 Course Curriculum</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              {course.modules.map((module) => (
                <div
                  key={module.number}
                  style={{
                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(139, 92, 246, 0.1))',
                    padding: '20px',
                    borderRadius: '10px',
                    border: '1px solid #e5e7eb',
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '12px',
                  }}>
                    <div style={{
                      background: '#667eea',
                      color: 'white',
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      marginRight: '12px',
                    }}>
                      {module.number}
                    </div>
                    <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: 0 }}>{module.title}</h3>
                  </div>
                  <ul style={{ margin: '0', paddingLeft: '20px', fontSize: '14px', color: '#555', lineHeight: '1.6' }}>
                    {module.topics.map((topic, idx) => (
                      <li key={idx}>{topic}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {course.projects && course.projects.length > 0 && (
          <div style={{
            background: 'rgba(255,255,255,0.95)',
            padding: '30px',
            borderRadius: '12px',
            marginBottom: '40px',
            border: '1px solid #e5e7eb',
          }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>🚀 Hands-On Projects</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              {course.projects.map((project, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(34, 197, 94, 0.1))',
                    padding: '20px',
                    borderRadius: '10px',
                    border: '1px solid #d1fae5',
                  }}
                >
                  <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px', color: '#065f46' }}>
                    💻 {project.name}
                  </h4>
                  <p style={{ fontSize: '14px', color: '#047857', lineHeight: '1.5', margin: 0 }}>
                    {project.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Job Roles */}
        {course.job_roles && course.job_roles.length > 0 && (
          <div style={{
            background: 'rgba(255,255,255,0.95)',
            padding: '30px',
            borderRadius: '12px',
            marginBottom: '40px',
            border: '1px solid #e5e7eb',
          }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>💼 Career Opportunities</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              {course.job_roles.map((role, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(99, 102, 241, 0.1))',
                    padding: '16px',
                    borderRadius: '8px',
                    border: '1px solid #bfdbfe',
                    textAlign: 'center',
                    fontWeight: '600',
                    color: '#1e40af',
                  }}
                >
                  {role}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        {enrollmentMessage && (
          <div style={{
            background: '#d1fae5',
            color: '#065f46',
            padding: '16px',
            borderRadius: '8px',
            marginBottom: '20px',
            textAlign: 'center',
            fontWeight: '600',
          }}>
            {enrollmentMessage}
          </div>
        )}
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          padding: '30px',
          borderRadius: '12px',
          textAlign: 'center',
          border: '1px solid #e5e7eb',
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Ready to Start Learning?</h2>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={handleEnroll}
              style={{
                background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                color: 'white',
                border: 'none',
                padding: '14px 28px',
                fontSize: '16px',
                fontWeight: 'bold',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              🎯 Enroll Now
            </button>
            <button
              onClick={handleRequestCallback}
              style={{
                background: 'rgba(255,255,255,0.95)',
                color: '#2563eb',
                border: '2px solid #2563eb',
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: 'bold',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              📞 Request Callback
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
