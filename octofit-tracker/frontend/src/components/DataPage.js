import { useCallback, useEffect, useMemo, useState } from 'react';

function normalizeApiData(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && Array.isArray(payload.results)) {
    return payload.results;
  }

  return [];
}

function DataPage({ title, endpointPath, endpointLabel }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [selectedRow, setSelectedRow] = useState(null);

  const endpoint = useMemo(() => {
    return `/api/${endpointPath}/`;
  }, [endpointPath]);

  const fetchRows = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`Failed to load ${title.toLowerCase()} (${response.status})`);
      }

      const payload = await response.json();
      setRows(normalizeApiData(payload));
    } catch (fetchError) {
      setError(fetchError.message);
    } finally {
      setLoading(false);
    }
  }, [endpoint, title]);

  useEffect(() => {
    fetchRows();
  }, [fetchRows]);

  const columns = useMemo(() => {
    if (rows.length === 0) {
      return [];
    }

    const keyOrder = [];
    rows.forEach((row) => {
      if (!row || typeof row !== 'object') {
        return;
      }

      Object.keys(row).forEach((key) => {
        if (!keyOrder.includes(key)) {
          keyOrder.push(key);
        }
      });
    });

    return keyOrder;
  }, [rows]);

  const filteredRows = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) {
      return rows;
    }

    return rows.filter((row) => JSON.stringify(row).toLowerCase().includes(normalizedQuery));
  }, [query, rows]);

  return (
    <section className="data-page card shadow-sm border-0">
      <div className="card-body p-4 p-lg-5">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3">
          <h2 className="h3 mb-0 text-primary-emphasis">{title}</h2>
          <div className="d-flex align-items-center gap-2">
            <a
              className="link-primary text-decoration-none"
              href={endpoint}
              target="_blank"
              rel="noreferrer"
            >
              Open {endpointLabel} API
            </a>
            <button type="button" className="btn btn-primary" onClick={fetchRows}>
              Refresh
            </button>
          </div>
        </div>

        <form className="row g-2 align-items-end mb-4" onSubmit={(event) => event.preventDefault()}>
          <div className="col-12 col-md-7 col-lg-5">
            <label htmlFor={`${endpointPath}-search`} className="form-label fw-semibold">
              Search {title}
            </label>
            <input
              id={`${endpointPath}-search`}
              className="form-control"
              type="search"
              placeholder={`Filter ${title.toLowerCase()}...`}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <div className="col-12 col-md-auto">
            <button type="button" className="btn btn-outline-secondary w-100" onClick={() => setQuery('')}>
              Clear Filter
            </button>
          </div>
        </form>

        {loading ? <p className="mb-0">Loading {title.toLowerCase()}...</p> : null}
        {!loading && error ? <p className="text-danger mb-0">{error}</p> : null}

        {!loading && !error && (
          <>
            {filteredRows.length === 0 ? (
              <p className="mb-0">No {title.toLowerCase()} available.</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-striped table-hover table-bordered align-middle mb-0">
                  <thead className="table-dark">
                    <tr>
                      {columns.map((column) => (
                        <th scope="col" key={column}>
                          {column}
                        </th>
                      ))}
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRows.map((row, rowIndex) => (
                      <tr key={row.id || row._id || `${endpointPath}-${rowIndex}`}>
                        {columns.map((column) => (
                          <td key={`${row.id || row._id || rowIndex}-${column}`}>
                            {typeof row[column] === 'object' && row[column] !== null
                              ? JSON.stringify(row[column])
                              : String(row[column] ?? '')}
                          </td>
                        ))}
                        <td className="text-nowrap">
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => setSelectedRow(row)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>

      {selectedRow && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h3 className="modal-title h5">{title} details</h3>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => setSelectedRow(null)}
                  />
                </div>
                <div className="modal-body">
                  <pre className="bg-body-tertiary border rounded p-3 mb-0">{JSON.stringify(selectedRow, null, 2)}</pre>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setSelectedRow(null)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" onClick={() => setSelectedRow(null)} />
        </>
      )}
    </section>
  );
}

export default DataPage;