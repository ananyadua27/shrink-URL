import React from "react";
import "./DataTable.css";

type UrlEntry = {
  id: string;
  fullUrl: string;
  shortUrl: string;
  clicks: number;
  lastClickedAt: string | null;
  lastClickedLocation: string;
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
            <th>Clicks</th>
            <th>Last Clicked At</th>
            <th>Last Click Location</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={6} className="empty-row">No data available.</td>
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
                <td>{entry.clicks}</td>
                <td>
                  {entry.lastClickedAt
                    ? new Date(entry.lastClickedAt).toLocaleString()
                    : "Never"}
                </td>
                <td>{entry.lastClickedLocation}</td> 
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
