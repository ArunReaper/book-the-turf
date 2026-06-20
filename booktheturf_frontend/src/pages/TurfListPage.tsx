import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllTurfs } from "../api/turfService";
import TurfCard from "../components/TurfCard";
import type { Turf } from "../types/Turf";
import Layout from "../components/Layout";

const ALL_SPORTS = "All Sports";

/** Parse sportsType which may be a ~-delimited string (e.g. "Cricket~Tennis~Football") */
export function parseSportsString(sportsType: string | undefined | null, sportsTypes?: string[]): string[] {
  if (sportsTypes?.length) {
    return sportsTypes;
  }
  if (sportsType) {
    if (sportsType.includes("~")) {
      return sportsType.split("~").map((s) => s.trim()).filter(Boolean);
    }
    return [sportsType];
  }
  return [];
}

function TurfListPage() {
  const [searchParams] = useSearchParams();
  const [turfs, setTurfs] = useState<Turf[]>([]);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [selectedSport, setSelectedSport] = useState(
    searchParams.get("sport") || ALL_SPORTS
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sync when URL params change
    const urlSearch = searchParams.get("search");
    const urlSport = searchParams.get("sport");
    if (urlSearch !== null && urlSearch !== searchQuery) {
      setSearchQuery(urlSearch);
    }
    if (urlSport !== null && urlSport !== selectedSport && urlSport !== ALL_SPORTS) {
      setSelectedSport(urlSport);
    }
  }, [searchParams]);

  useEffect(() => {
    getAllTurfs()
      .then((data: Turf[]) => {
        setTurfs(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch turfs:", error);
        setLoading(false);
      });
  }, []);

  // Extract unique sports from all turfs (handles both array and ~-separated strings)
  const sportsList = useMemo(() => {
    const sportSet = new Set<string>();
    turfs.forEach((turf) => {
      const sports = parseSportsString(turf.sportsType, turf.sportsTypes);
      sports.forEach((s) => sportSet.add(s));
    });
    return [ALL_SPORTS, ...Array.from(sportSet).sort()];
  }, [turfs]);

  // Filtered and searched turfs
  const filteredTurfs = useMemo(() => {
    return turfs.filter((turf) => {
      // Sport filter (handles both array and ~-separated strings)
      const turfSports = parseSportsString(turf.sportsType, turf.sportsTypes);
      const matchesSport =
        selectedSport === ALL_SPORTS || turfSports.includes(selectedSport);

      // Search filter
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        turf.name.toLowerCase().includes(query) ||
        turf.location.toLowerCase().includes(query) ||
        (turf.area && turf.area.toLowerCase().includes(query));

      return matchesSport && matchesSearch;
    });
  }, [turfs, selectedSport, searchQuery]);

  return (
    <Layout>
      <div className="turf-list-page">
        {/* Header */}
        <div className="turf-list__header">
          <h1 className="turf-list__title">
            Available Turfs
            {!loading && (
              <span className="turf-list__count">
                ({filteredTurfs.length})
              </span>
            )}
          </h1>

          {/* Search & Filter Bar */}
          <div className="turf-list__controls">
            {/* Search */}
            <div className="turf-list__search">
              <svg
                className="turf-list__search-icon"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search by venue name or location"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="turf-list__search-input"
              />
            </div>

            {/* Sport Filter */}
            <div className="turf-list__filter">
              <svg
                className="turf-list__filter-icon"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="8" y1="12" x2="20" y2="12" />
                <line x1="12" y1="18" x2="20" y2="18" />
              </svg>
              <select
                value={selectedSport}
                onChange={(e) => setSelectedSport(e.target.value)}
                className="turf-list__select"
              >
                {sportsList.map((sport) => (
                  <option key={sport} value={sport}>
                    {sport}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="turf-list__loading">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="turf-card-skeleton">
                <div className="skeleton-image" />
                <div className="skeleton-content">
                  <div className="skeleton-line skeleton-line--title" />
                  <div className="skeleton-line skeleton-line--subtitle" />
                  <div className="skeleton-line skeleton-line--short" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredTurfs.length === 0 && (
          <div className="turf-list__empty">
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="turf-list__empty-icon"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
            <h3>No turfs found</h3>
            <p>
              {searchQuery
                ? `No results matching "${searchQuery}"`
                : "Try adjusting your filters"}
            </p>
            <button
              className="turf-list__reset-btn"
              onClick={() => {
                setSearchQuery("");
                setSelectedSport(ALL_SPORTS);
              }}
            >
              Reset filters
            </button>
          </div>
        )}

        {/* Turf Grid */}
        {!loading && filteredTurfs.length > 0 && (
          <div className="turf-list__grid">
            {filteredTurfs.map((turf) => (
              <TurfCard key={turf.id} turf={turf} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default TurfListPage;