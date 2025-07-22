import React from "react";
import "./DataTable.css";

type UrlEntry = {
  id: string;
  fullUrl: string;
  shortUrl: string;
  clicks: number;
  lastClickedAt: string | null;
};

type DataTableProps = {
  data: UrlEntry[];
  onDelete: (id: string) => void;
  onCopy: (shortUrl: string) => void;
};

const DataTable: React.FC<DataTableProps> = ({ data, onDelete, onCopy }) => {
  const shortLinkBase = import.meta.env.VITE_SHORT_LINK_BASE;

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Full URL</th>
            <th>Shortened URL</th>
            <th>Clicks</th>
            <th>Last Clicked At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={5} className="empty-row">No data available.</td>
            </tr>
          ) : (
            data.map((entry) => {
              const shortUrlFull = `${shortLinkBase}/${entry.shortUrl}`;
              return (
                <tr key={entry.id}>
                  <td className="truncate">{entry.fullUrl}</td>
                  <td>
                    <a
                      href={shortUrlFull}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link"
                    >
                      {shortUrlFull}
                    </a>
                  </td>
                  <td>{entry.clicks}</td>
                  <td>
                    {entry.lastClickedAt
                      ? new Date(entry.lastClickedAt).toLocaleString()
                      : "Never"}
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
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
