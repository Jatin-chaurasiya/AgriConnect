import SchemesGrid from "../Components/SchemesGrid";
import { useGovernmentSchemes } from "../Hooks/useGovernmentSchemes";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";

const GovernmentSchemes = () => {
  const { t } = useTranslation();
  const { state, dispatch, applyFilters, hasSearched, resetFilters } =
    useGovernmentSchemes();
  const [showValidation, setShowValidation] = useState(false);

  const handleFilterChange = (e) => {
    dispatch({
      type: "SET_FILTER",
      field: e.target.name,
      value: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await applyFilters();
    if (result?.error === "NO_FILTER") {
      setShowValidation(true);
    } else {
      setShowValidation(false);
    }
  };

  return (
    <>
      {/* HERO */}
      <section
        className="hero-section d-flex align-items-center text-center"
        style={{ background: "#2D5016", minHeight: "250px", padding: "50px 0" }}
      >
        <div className="container">
          <h1 className="display-4 fw-bold text-white mb-3">
            {t("governmentSchemes.title")}
          </h1>
          <p
            className="lead text-white mx-auto"
            style={{ maxWidth: "850px", opacity: 0.9 }}
          >
            {t("governmentSchemes.subtitle")}
          </p>
        </div>
      </section>

      {/* FILTER SECTION */}
      <section className="py-4">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-4">
                <select
                  className="form-select"
                  name="schemeType"
                  value={state.filters.schemeType}
                  onChange={handleFilterChange}
                >
                  <option value="SELECT" disabled>
                    {t("governmentSchemes.selectType")}
                  </option>
                  <option value="">{t("governmentSchemes.allTypes")}</option>
                  <option value="SUBSIDY">
                    {t("governmentSchemes.subsidy")}
                  </option>
                  <option value="LOAN">{t("governmentSchemes.loan")}</option>
                  <option value="INSURANCE">
                    {" "}
                    {t("governmentSchemes.insurance")}
                  </option>
                </select>
              </div>

              <div className="col-md-4">
                <select
                  className="form-select"
                  name="state"
                  value={state.filters.state}
                  onChange={handleFilterChange}
                >
                  <option value="SELECT" disabled>
                   {t("governmentSchemes.selectState")}
                  </option>
                  <option value="">All States</option>
                  <option value="UP">Uttar Pradesh</option>
                  <option value="MH">Maharashtra</option>
                  <option value="MP">Madhya Pradesh</option>
                  <option value="RJ">Rajasthan</option>
                </select>
              </div>

              <div className="col-md-4">
                <select
                  className="form-select"
                  name="category"
                  value={state.filters.category}
                  onChange={handleFilterChange}
                >
                  <option value="SELECT" disabled>
                    {t("governmentSchemes.selectCategory")}
                  </option>
                  <option value="">All Categories</option>
                  <option value="SMALL_FARMER">{t("governmentSchemes.smallFarmer")}</option>
                  <option value="MARGINAL_FARMER">{t("governmentSchemes.marginalFarmer")}</option>
                </select>
              </div>
            </div>

            <div className="mt-4 d-flex gap-2">
              <button type="submit" className="btn-agri-primary">
                {t("governmentSchemes.applyFilters")}
              </button>
              <button
                type="button"
                className="btn-agri-outline"
                onClick={resetFilters}
              >
                {t("governmentSchemes.reset")}
              </button>
            </div>

            {showValidation && (
              <p className="text-danger mt-2">
                {t("governmentSchemes.validationMessage")}
              </p>
            )}
          </form>
        </div>
      </section>

      {/* SCHEMES LIST */}
      <section className="py-5">
        <div className="container">
          {!state.filteredSchemes || state.filteredSchemes.length === 0 ? (
            <div className="text-center py-5">
              <div style={{ fontSize: "40px", color: "#adb5bd" }}>📄</div>
              {!hasSearched ? (
                <>
                  <h5 className="mt-3 mb-2">{t("governmentSchemes.noScheme")}</h5>
                  <p style={{ color: "#6c757d", fontSize: "14px" }}>
                    {t("governmentSchemes.searchInstruction")}
                  </p>
                </>
              ) : (
                <>
                  <h5 className="mt-3 mb-2 text-danger">
                    {t("governmentSchemes.noSchemeFilter")}
                  </h5>
                  <p style={{ color: "#6c757d", fontSize: "14px" }}>
                    {t("governmentSchemes.changeFilterMessage")}
                  </p>
                </>
              )}
            </div>
          ) : (
            <SchemesGrid filteredSchemes={state.filteredSchemes} />
          )}
        </div>
      </section>

      <Outlet />

      <style>{`
        .btn-agri-primary {
          background-color: #2D5016;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
        }
        .btn-agri-outline {
          border: 2px solid #2D5016;
          background: transparent;
          color: #2D5016;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default GovernmentSchemes;
