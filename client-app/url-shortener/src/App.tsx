import { useEffect, useState } from "react";
import Header from "./components/Header";
import FormContainer from "./components/FormContainer";
import DataTable from "./components/DataTable";
import { serverUrl } from "./helpers/Constants";
import axios from "axios";
import "./App.css";

type UrlEntry = {
  _id: string;
  fullUrl: string;
  shortUrl: string;
  clicks: number;
  lastClickedAt: string | null;
};

const App = () => {
  const [urlData, setUrlData] = useState<UrlEntry[]>([]);

  const fetchUrls = async () => {
    try {
      const response = await axios.get(`${serverUrl}/shorturl`);
      console.log("Fetched data:", response.data);
      setUrlData(response.data);
    } catch (error) {
      console.error("Failed to fetch URLs:", error);
    }
  };

  useEffect(() => {
    console.log("useEffect triggered");
    fetchUrls();
    const interval = setInterval(() => {
      if (document.visibilityState === "visible") {
        console.log("Refetching visible tab");
        fetchUrls();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${serverUrl}/shorturl/${id}`);
      setUrlData((prev) => prev.filter((entry) => entry._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleCopy = (shortUrl: string) => {
    navigator.clipboard.writeText(`${import.meta.env.VITE_SHORT_LINK_BASE}/${shortUrl}`);
    alert("Short URL copied to clipboard!");
  };

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <FormContainer onSubmitSuccess={fetchUrls} />
      </main>
      <DataTable
        data={urlData.map((entry) => ({
          id: entry._id,
          fullUrl: entry.fullUrl,
          shortUrl: entry.shortUrl,
          clicks: entry.clicks ?? 0,
          lastClickedAt: entry.lastClickedAt ?? null,
        }))}
        onDelete={handleDelete}
        onCopy={handleCopy}
      />
    </div>
  );
};

export default App;
