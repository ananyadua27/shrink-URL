import React from "react";
import "./DataTable.css";

type UrlEntry = {
  id: string;
  fullUrl: string;
  shortUrl: string;
  //clicks removed
};

type DataTableProps = {
  data: UrlEntry[];
  onDelete: (id: string) => void;
  onCopy: (shortUrl: string) => void;
};

const DataTable: React.FC<DataTableProps> = ({ data, onDelete, onCopy }) => {
  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Full URL</th>
            <th>Shortened URL</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={3} className="empty-row">No data available.</td>
            </tr>
          ) : (
            data.map((entry) => (
              <tr key={entry.id}>
                <td className="truncate">{entry.fullUrl}</td>
                <td>
                  <a
                    href={`http://localhost:5001/api/shortUrl/${entry.shortUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link"
                  >
                    {`http://localhost:5001/api/shortUrl/${entry.shortUrl}`}
                  </a>
                </td>
                <td>
                  <button
                    className="action-btn copy-btn"
                    onClick={() => onCopy(entry.shortUrl)}
                  >
                    Copy
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => onDelete(entry.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
