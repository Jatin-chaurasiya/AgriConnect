import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const GovernmentSchemes = () => {
  const [filters, setFilters] = useState({
    schemeType: '',
    state: '',
    category: ''
  });
  const [schemes, setSchemes] = useState([]);
  const [filteredSchemes, setFilteredSchemes] = useState([]);

  // Filter options
  const schemeTypes = [
    { value: 'subsidy', label: 'Subsidy' },
    { value: 'loan', label: 'Loan' },
    { value: 'insurance', label: 'Insurance' },
    { value: 'training', label: 'Training' },
    { value: 'equipment', label: 'Equipment' }
  ];

  const states = [
    { value: 'andhra-pradesh', label: 'Andhra Pradesh' },
    { value: 'bihar', label: 'Bihar' },
    { value: 'gujarat', label: 'Gujarat' },
    { value: 'haryana', label: 'Haryana' },
    { value: 'karnataka', label: 'Karnataka' },
    { value: 'madhya-pradesh', label: 'Madhya Pradesh' },
    { value: 'maharashtra', label: 'Maharashtra' },
    { value: 'punjab', label: 'Punjab' },
    { value: 'rajasthan', label: 'Rajasthan' },
    { value: 'tamil-nadu', label: 'Tamil Nadu' },
    { value: 'uttar-pradesh', label: 'Uttar Pradesh' },
    { value: 'west-bengal', label: 'West Bengal' }
  ];

  const categories = [
    { value: 'small', label: 'Small Farmer' },
    { value: 'marginal', label: 'Marginal Farmer' },
    { value: 'women', label: 'Women Farmer' },
    { value: 'sc-st', label: 'SC/ST Farmer' },
    { value: 'general', label: 'General' }
  ];

  // Sample schemes data (replace with API call)
  const sampleSchemes = [
    {
      id: 1,
      name: 'PM-KISAN',
      description: 'Direct income support of ₹6000 per year to all farmer families across the country in three equal installments.',
      schemeType: 'Subsidy',
      imageUrl: '/images/pm-kisan.jpg',
      amount: '₹6,000/year',
      frequency: 'Yearly',
      eligibility: 'All Farmers',
      status: 'Active',
      state: 'all',
      category: 'general'
    },
    {
      id: 2,
      name: 'Pradhan Mantri Fasal Bima Yojana',
      description: 'Crop insurance scheme providing financial support to farmers suffering crop loss/damage due to unforeseen events.',
      schemeType: 'Insurance',
      imageUrl: '/images/fasal-bima.jpg',
      amount: 'Up to ₹2 Lakh',
      frequency: 'Per Season',
      eligibility: 'All Farmers',
      status: 'Active',
      state: 'all',
      category: 'general'
    },
    {
      id: 3,
      name: 'Kisan Credit Card',
      description: 'Provides adequate and timely credit support to farmers for their cultivation needs and related activities.',
      schemeType: 'Loan',
      imageUrl: '/images/kcc.jpg',
      amount: 'Up to ₹3 Lakh',
      frequency: 'One-time',
      eligibility: 'Land Owning Farmers',
      status: 'Active',
      state: 'all',
      category: 'general'
    },
    {
      id: 4,
      name: 'Soil Health Card Scheme',
      description: 'Provides soil health cards to farmers to promote balanced use of fertilizers and improve soil productivity.',
      schemeType: 'Training',
      imageUrl: '/images/soil-health.jpg',
      amount: 'Free',
      frequency: 'Every 3 Years',
      eligibility: 'All Farmers',
      status: 'Active',
      state: 'all',
      category: 'general'
    },
    {
      id: 5,
      name: 'Pradhan Mantri Krishi Sinchayee Yojana',
      description: 'Aims to expand cultivated area with assured irrigation, improve water use efficiency, and adopt precision irrigation.',
      schemeType: 'Equipment',
      imageUrl: '/images/pmksy.jpg',
      amount: '75-90% Subsidy',
      frequency: 'One-time',
      eligibility: 'Small & Marginal Farmers',
      status: 'Active',
      state: 'all',
      category: 'small'
    },
    {
      id: 6,
      name: 'National Mission for Sustainable Agriculture',
      description: 'Promotes sustainable agriculture practices through suitable soil health management and efficient water management.',
      schemeType: 'Training',
      imageUrl: '/images/nmsa.jpg',
      amount: 'Varies',
      frequency: 'Ongoing',
      eligibility: 'All Farmers',
      status: 'Active',
      state: 'all',
      category: 'general'
    }
  ];

  useEffect(() => {
    // Load schemes (replace with actual API call)
    setSchemes(sampleSchemes);
    setFilteredSchemes(sampleSchemes);
  }, []);

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  // Apply filters
  const handleApplyFilters = (e) => {
    e.preventDefault();
    
    let filtered = schemes;

    if (filters.schemeType) {
      filtered = filtered.filter(scheme => 
        scheme.schemeType.toLowerCase() === filters.schemeType.toLowerCase()
      );
    }

    if (filters.state && filters.state !== 'all') {
      filtered = filtered.filter(scheme => 
        scheme.state === 'all' || scheme.state === filters.state
      );
    }

    if (filters.category) {
      filtered = filtered.filter(scheme => 
        scheme.category === 'general' || scheme.category === filters.category
      );
    }

    setFilteredSchemes(filtered);
  };

  // Reset filters
  const handleResetFilters = () => {
    setFilters({
      schemeType: '',
      state: '',
      category: ''
    });
    setFilteredSchemes(schemes);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="c1 py-5" style={{ backgroundColor: '#2D5016' }}>
        <div className="container">
          <div className="text-center py-4">
            <h1 className="text-white fw-bold mb-3">Government Schemes for Farmers</h1>
            <p className="text-white lead mx-auto" style={{ maxWidth: '800px' }}>
              Discover and apply for various government initiatives designed to support and empower farmers across India.
              Find subsidies, financial assistance, and development programs tailored to your needs.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-4">
        <div className="container">
          <div className="card shadow-sm border-0 rounded-3">
            <div className="card-body p-4">
              <h5 className="card-title fw-semibold mb-4" style={{ color: '#2D5016' }}>
                Find Schemes That Match Your Needs
              </h5>
              <form onSubmit={handleApplyFilters}>
                <div className="row g-3">
                  {/* Scheme Type Filter */}
                  <div className="col-md-4">
                    <label htmlFor="scheme-type" className="form-label fw-medium">Scheme Type</label>
                    <select
                      className="form-select"
                      id="scheme-type"
                      name="schemeType"
                      value={filters.schemeType}
                      onChange={handleFilterChange}
                    >
                      <option value="">All Types</option>
                      {schemeTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* State Filter */}
                  <div className="col-md-4">
                    <label htmlFor="state" className="form-label fw-medium">State</label>
                    <select
                      className="form-select"
                      id="state"
                      name="state"
                      value={filters.state}
                      onChange={handleFilterChange}
                    >
                      <option value="">All States</option>
                      {states.map(state => (
                        <option key={state.value} value={state.value}>{state.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Category Filter */}
                  <div className="col-md-4">
                    <label htmlFor="category" className="form-label fw-medium">Farmer Category</label>
                    <select
                      className="form-select"
                      id="category"
                      name="category"
                      value={filters.category}
                      onChange={handleFilterChange}
                    >
                      <option value="">All Categories</option>
                      {categories.map(category => (
                        <option key={category.value} value={category.value}>{category.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="d-flex gap-2 mt-4">
                  <button type="submit" className="btn-agri-primary">
                    <i className="fas fa-filter me-2"></i>Apply Filters
                  </button>
                  <button type="button" onClick={handleResetFilters} className="btn-agri-outline">
                    <i className="fas fa-redo me-2"></i>Reset Filters
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Schemes Grid */}
      <section className="py-5">
        <div className="container">
          <h2 className="section-title mb-4">Available Schemes</h2>

          {/* Empty State */}
          {filteredSchemes.length === 0 && (
            <div className="text-center py-5">
              <div className="alert alert-info d-inline-block">
                <i className="fas fa-info-circle me-2"></i>
                No schemes found matching your filters. Please try different criteria.
              </div>
            </div>
          )}

          {/* Schemes Grid */}
          {filteredSchemes.length > 0 && (
            <>
              <div className="row g-4">
                {filteredSchemes.map(scheme => (
                  <div key={scheme.id} className="col-md-6 col-lg-4">
                    <div className="scheme-card card h-100 border-0 shadow-sm hover-shadow">
                      {/* Scheme Image with Badge */}
                      <div className="position-relative">
                        <span className="scheme-badge position-absolute top-0 start-0 m-3 badge bg-primary">
                          {scheme.schemeType}
                        </span>
                        <img
                          src={scheme.imageUrl}
                          className="card-img-top"
                          alt={scheme.name}
                          style={{ height: '200px', objectFit: 'cover' }}
                          onError={(e) => { e.target.src = '/images/scheme-placeholder.png'; }}
                        />
                      </div>

                      <div className="card-body d-flex flex-column">
                        {/* Scheme Name */}
                        <h5 className="card-title fw-semibold mb-3" style={{ color: '#2D5016' }}>
                          {scheme.name}
                        </h5>

                        {/* Scheme Description */}
                        <p className="card-text flex-grow-1 text-muted">
                          {scheme.description.length > 120
                            ? `${scheme.description.substring(0, 120)}...`
                            : scheme.description}
                        </p>

                        <div className="row g-2 mb-3 small">
                          <div className="col-6">
                            <div className="d-flex align-items-center">
                              <i className="fas fa-rupee-sign me-2 text-success"></i>
                              <small className="fw-medium">{scheme.amount}</small>
                            </div>
                          </div>

                          <div className="col-6">
                            <div className="d-flex align-items-center">
                              <i className="fas fa-clock me-2 text-info"></i>
                              <small className="fw-medium">{scheme.frequency}</small>
                            </div>
                          </div>

                          <div className="col-6">
                            <div className="d-flex align-items-center">
                              <i className="fas fa-users me-2 text-warning"></i>
                              <small className="fw-medium">{scheme.eligibility}</small>
                            </div>
                          </div>

                          <div className="col-6">
                            <div className="d-flex align-items-center">
                              <i className={`fas fa-check-circle me-2 ${scheme.status === 'Active' ? 'text-success' : 'text-secondary'}`}></i>
                              <small className="fw-medium">{scheme.status}</small>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="d-flex gap-2 mt-auto">
                          <Link
                            to={`/apply-scheme/${scheme.id}`}
                            className="btn btn-agri-primary flex-fill text-center"
                          >
                            <i className="fas fa-paper-plane me-1"></i>Apply Now
                          </Link>
                          <Link
                            to={`/scheme-details/${scheme.id}`}
                            className="btn btn-agri-outline flex-fill text-center"
                          >
                            <i className="fas fa-info-circle me-1"></i>Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Results Count */}
              <div className="text-center mt-4">
                <p className="text-muted">
                  Showing <strong>{filteredSchemes.length}</strong> scheme(s)
                </p>
              </div>
            </>
          )}
        </div>
      </section>

      <style>{`
        .section-title {
          color: #2D5016;
          font-weight: 700;
          font-size: 2rem;
          text-align: center;
        }

        .btn-agri-primary {
          background-color: #2D5016;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .btn-agri-primary:hover {
          background-color: #1B2D12;
          transform: translateY(-2px);
        }

        .btn-agri-outline {
          background-color: transparent;
          color: #2D5016;
          border: 2px solid #2D5016;
          padding: 10px 20px;
          border-radius: 6px;
          font-weight: 500;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
        }

        .btn-agri-outline:hover {
          background-color: #2D5016;
          color: white;
        }

        .scheme-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .hover-shadow:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15) !important;
        }

        .scheme-badge {
          font-size: 0.85rem;
          font-weight: 600;
        }
      `}</style>
    </>
  );
};

export default GovernmentSchemes;