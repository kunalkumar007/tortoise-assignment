import React, { useEffect, useState } from "react";
import "./App.css";
import InfiniteScroll from "react-infinite-scroll-component";

const client_id = "YHmWPy299c_uT8U7J0ibyUpr_0V779I_yobB1oa-WtI";

const App = () => {
  const [data, setPhotosResponse] = useState([]);
  const [query, setQuery] = useState("men");
  const [page, setPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [hasMore, setHasMore] = useState(true);
  const fetchUrl = `https://api.unsplash.com/search/photos?client_id=${client_id}&query=${query}&page=${page}`;

  useEffect(() => {
    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const fetchImages = async () => {
    const res = await fetch(fetchUrl);
    const response = await res.json();
    console.log("res=>", response);
    setPhotosResponse([...data, ...response.results]);
    setPage(page + 1);
  };

  const searchImages = (e) => {
    if (e.keyCode === 13) {
      setQuery(e.target.value);
      setPhotosResponse([]);
    }
  };

  return (
    <div className="App flex">
      <input
        type="text"
        onKeyDown={(e) => searchImages(e)}
        placeholder="Search For Images 🔎"
      />
      <InfiniteScroll
        dataLength={data.length}
        next={fetchImages}
        hasMore={hasMore}
        loader={<p>Scroll for more...</p>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="main flex">
          {data.map((data, key) => (
            <div className="container" key={key}>
              <img
                src={data.urls.small}
                className="image"
                alt={data.alt_description}
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default App;
