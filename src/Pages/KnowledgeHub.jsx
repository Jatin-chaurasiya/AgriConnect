import React from 'react';
import image1 from '../assets/images/improvewheatyeild.jpg';
import image2 from '../assets/images/smart-irrigation.webp';
import image3 from '../assets/images/organicmethod.avif';
import video1 from '../assets/images/soilhealth.jpg';
import video2 from '../assets/images/pestmgnt.webp';
import video3 from '../assets/images/croprotation.webp';
import { useTranslation } from 'react-i18next';

const KnowledgeHub = () => {
  const { t } = useTranslation();
  const articles = [
  {
    image: image1,
    tag: t("knowledgeHub.cropTips"),
    title: t("knowledgeHub.improvingWheatYield"),
    description: t("knowledgeHub.improvingWheatYieldDesc"),
    link: "https://www.nature.com/articles/s41598-023-44879-w"
  },
  {
    image: image2,
    tag: t("knowledgeHub.irrigation"),
    title: t("knowledgeHub.smartIrrigationTechniques"),
    description: t("knowledgeHub.smartIrrigationTechniquesDesc"),
    link: "https://www.sciencedirect.com/science/article/abs/pii/S0168169925011147"
  },
  {
    image: image3,
    tag: t("knowledgeHub.organicFarming"),
    title: t("knowledgeHub.transitioningToOrganicMethods"),
    description: t("knowledgeHub.transitioningToOrganicMethodsDesc"),
    link: "https://krishijagran.com/..."
  }
];

 const videos = [
  {
    thumbnail: video1,
    duration: "12:30",
    title: t("knowledgeHub.soilHealthBasics"),
    description: t("knowledgeHub.soilHealthBasicsDesc"),
    link: "https://youtu.be/x3L1IAwUZK0"
  },
  {
    thumbnail: video2,
    duration: "15:00",
    title: t("knowledgeHub.pestManagementTips"),
    description: t("knowledgeHub.pestManagementTipsDesc"),
    link: "https://youtu.be/Uo05345F1C8"
  },
  {
    thumbnail: video3,
    duration: "18:45",
    title: t("knowledgeHub.cropRotationStrategies"),
    description: t("knowledgeHub.cropRotationStrategiesDesc"),
    link: "https://youtu.be/Nk83ASvbNKk"
  }
];

  const tools = [
  {
    title: t("knowledgeHub.handTrowel"),
    description: t("knowledgeHub.handTrowelDesc"),
    link: "#"
  },
  {
    title: t("knowledgeHub.sprinklerIrrigation"),
    description: t("knowledgeHub.sprinklerIrrigationDesc"),
    link: "#"
  },
  {
    title: t("knowledgeHub.soilMoistureMeter"),
    description: t("knowledgeHub.soilMoistureMeterDesc"),
    link: "#"
  }
];

  return (
    <>
      {/* Hero Section */}
      <section className="py-5" style={{ backgroundColor: '#2D5016' }}>
        <div className="container text-center text-white">
          <h1 className="display-5 fw-bold mb-3">{t("knowledgeHub.title")}</h1>
          <p className="lead mb-4">
            {t("knowledgeHub.heroDescription")}
          </p>
        </div>
      </section>

      <div className="container py-5">
        {/* Expert Articles Section */}
        <section className="mb-5">
          <h2 className="section-title">{t("knowledgeHub.expertArticles")}</h2>
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
                        {t("knowledgeHub.readMore")}
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
          <h2 className="section-title">{t("knowledgeHub.educationalVideos")}</h2>
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
                        {t("knowledgeHub.watchVideo")}
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
          <h2 className="section-title">{t("knowledgeHub.tools")}</h2>
          <div className="row justify-content-center">
            {tools.map((tool, index) => (
              <div key={index} className="col-lg-4 col-md-6 mb-4">
                <div className="knowledge-category border p-4 h-100 d-flex flex-column">
                  <h5 className="card-title">{tool.title}</h5>
                  <p className="flex-grow-1">{tool.description}</p>
                  <div className="mt-auto">
                    <a href={tool.link} className="btn btn-sm btn-outline-success">
                      {t("knowledgeHub.learnMore")}
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