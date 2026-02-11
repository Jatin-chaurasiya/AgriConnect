import React from 'react';

const KnowledgeHub = () => {
  const articles = [
    {
      image: '/images/improvewheatyeild.jpg',
      tag: 'Crop Tips',
      title: 'Improving Wheat Yield',
      description: 'Simple methods to boost wheat production for small and large farms.',
      link: 'https://www.nature.com/articles/s41598-023-44879-w'
    },
    {
      image: '/images/smart-irrigation.webp',
      tag: 'Irrigation',
      title: 'Smart Irrigation Techniques',
      description: 'Learn modern irrigation methods that save water and increase productivity.',
      link: 'https://www.sciencedirect.com/science/article/abs/pii/S0168169925011147'
    },
    {
      image: '/images/organicmethod.avif',
      tag: 'Organic Farming',
      title: 'Transitioning to Organic Methods',
      description: "A beginner's guide to implementing organic farming practices.",
      link: 'https://krishijagran.com/news/mission-2047-transforming-india-into-an-organic-natural-and-profitable-agricultural-hub/#:~:text=MIONP%2C%20an%20initiative%20by%20Krishi%20Jagran%20in%20collaboration,India%20to%20organic%20and%20natural%20farming%20by%202047.'
    }
  ];

  const videos = [
    {
      thumbnail: '/images/soilhealth.jpg',
      duration: '12:30',
      title: 'Soil Health Basics',
      description: 'Understanding soil types and nutrients for better crop growth.',
      link: 'https://youtu.be/x3L1IAwUZK0?feature=shared'
    },
    {
      thumbnail: '/images/pestmgnt.webp',
      duration: '15:00',
      title: 'Pest Management Tips',
      description: 'Effective ways to manage pests without harming crops or soil.',
      link: 'https://youtu.be/Uo05345F1C8?feature=shared'
    },
    {
      thumbnail: '/images/croprotation.webp',
      duration: '18:45',
      title: 'Crop Rotation Strategies',
      description: 'Maximize soil health and yield with effective crop rotation techniques.',
      link: 'https://youtu.be/Nk83ASvbNKk?feature=shared'
    }
  ];

  const tools = [
    {
      title: 'Hand Trowel',
      description: 'Perfect for planting seedlings and small-scale gardening tasks.',
      link: '#'
    },
    {
      title: 'Sprinkler Irrigation',
      description: 'Modern irrigation solution to cover large areas efficiently.',
      link: '#'
    },
    {
      title: 'Soil Moisture Meter',
      description: 'Monitor soil moisture levels for optimal irrigation planning.',
      link: '#'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="py-5" style={{ backgroundColor: '#2D5016' }}>
        <div className="container text-center text-white">
          <h1 className="display-5 fw-bold mb-3">Knowledge Hub</h1>
          <p className="lead mb-4">
            Your comprehensive resource for modern farming techniques, expert advice, and practical tools to enhance your agricultural productivity.
          </p>
        </div>
      </section>

      <div className="container py-5">
        {/* Expert Articles Section */}
        <section className="mb-5">
          <h2 className="section-title">Expert Articles</h2>
          <div className="row justify-content-center">
            {articles.map((article, index) => (
              <div key={index} className="col-lg-4 col-md-6 mb-4">
                <div className="card knowledge-card h-100">
                  <img 
                    src={article.image} 
                    className="card-img-top" 
                    alt={article.title}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body d-flex flex-column">
                    <span className="tag align-self-start">{article.tag}</span>
                    <h5 className="card-title mt-2">{article.title}</h5>
                    <p className="card-text flex-grow-1">{article.description}</p>
                    <div className="mt-auto">
                      <a 
                        href={article.link} 
                        className="btn btn-sm btn-outline-success"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Read More
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Educational Videos Section */}
        <section className="mb-5">
          <h2 className="section-title">Educational Videos</h2>
          <div className="row justify-content-center">
            {videos.map((video, index) => (
              <div key={index} className="col-lg-4 col-md-6 mb-4">
                <div className="card knowledge-card h-100">
                  <div className="video-thumbnail">
                    <img 
                      src={video.thumbnail} 
                      className="card-img-top" 
                      alt={video.title}
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <div className="play-button">
                      <i className="fas fa-play"></i>
                    </div>
                  </div>
                  <div className="card-body d-flex flex-column">
                    <span className="tag align-self-start">{video.duration}</span>
                    <h5 className="card-title mt-2">{video.title}</h5>
                    <p className="card-text flex-grow-1">{video.description}</p>
                    <div className="mt-auto">
                      <a 
                        href={video.link} 
                        className="btn btn-sm btn-outline-success"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Watch Video
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Farming Tools Section */}
        <section className="mb-5">
          <h2 className="section-title">Farming Tools & Equipment</h2>
          <div className="row justify-content-center">
            {tools.map((tool, index) => (
              <div key={index} className="col-lg-4 col-md-6 mb-4">
                <div className="knowledge-category border p-4 h-100 d-flex flex-column">
                  <h5 className="card-title">{tool.title}</h5>
                  <p className="flex-grow-1">{tool.description}</p>
                  <div className="mt-auto">
                    <a href={tool.link} className="btn btn-sm btn-outline-success">
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <style>{`
        .section-title {
          color: #2D5016;
          font-weight: 700;
          font-size: 2rem;
          margin-bottom: 2rem;
          text-align: center;
        }

        .knowledge-card {
          border: 1px solid #e0e0e0;
          border-radius: 10px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          overflow: hidden;
        }

        .knowledge-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }

        .tag {
          display: inline-block;
          background-color: #e7f3e7;
          color: #28a745;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .video-thumbnail {
          position: relative;
          overflow: hidden;
        }

        .play-button {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 60px;
          height: 60px;
          background-color: rgba(255, 255, 255, 0.9);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .play-button i {
          color: #28a745;
          font-size: 1.5rem;
          margin-left: 4px;
        }

        .video-thumbnail:hover .play-button {
          background-color: #28a745;
          transform: translate(-50%, -50%) scale(1.1);
        }

        .video-thumbnail:hover .play-button i {
          color: white;
        }

        .knowledge-category {
          border-radius: 10px;
          transition: all 0.3s ease;
          background-color: #fff;
        }

        .knowledge-category:hover {
          border-color: #28a745;
          box-shadow: 0 4px 12px rgba(40, 167, 69, 0.2);
        }

        .btn-outline-success {
          border-color: #28a745;
          color: #28a745;
          transition: all 0.3s ease;
        }

        .btn-outline-success:hover {
          background-color: #28a745;
          color: white;
        }
      `}</style>
    </>
  );
};

export default KnowledgeHub;