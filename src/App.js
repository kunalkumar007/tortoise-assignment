import React, { useEffect, useState } from "react";
// import { createApi } from "unsplash-js";
import "./App.css";
import InfiniteScroll from "react-infinite-scroll-component";

const client_id = "RCq8sCwrtRITbyNTMjUd4aIvalfdyaMOiPH4k6SL5bA";
// const api = createApi({
//   accessKey: client_id,
// });

const App = () => {
  const [data, setPhotosResponse] = useState([]);
  const [query, setQuery] = useState("code");
  const [page, setPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [hasMore, setHasMore] = useState(true);
  const fetchUrl = `https://api.unsplash.com/search/photos?client_id=${client_id}&query=${query}&page=${page}`;

  // useEffect(() => {
  //   api.search
  //     .getPhotos({ query: "cat", page: 1, perPage: 100 })
  //     .then((result) => {
  //       setPhotosResponse(result);
  //       console.log(result);
  //     })
  //     .catch(() => {
  //       console.log("something went wrong!");
  //     });
  // }, []);

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

  // if (data === null) {
  //   return <div>loading . . .</div>;
  // }
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
        loader={<p>Load more...</p>}
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
      {/* <div className="row">
        <div className="column">
          {data.response.results.map((photo) => (
            <img className="img" src={photo.urls.regular} alt="" />
          ))}
        </div>
        <div className="column">
          {data.response.results.map((photo) => (
            <img className="img" src={photo.urls.regular} alt="" />
          ))}
        </div>
        <div className="column">
          {data.response.results.map((photo) => (
            <img className="img" src={photo.urls.regular} alt="" />
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default App;
