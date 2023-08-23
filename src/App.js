import { useEffect, useState } from "react";
import "./App.css";
// import axios from "axios";
import list from "./postsList.json";
import InfiniteScroll from "react-infinite-scroll-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [postsData, setPostsData] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagSearch, setTagSearch] = useState("");
  // altered list info

  useEffect(() => {
    let count = 0;
    list = list.map((item) => {
      return { ...item, tag: count++ };
    });

    // creating categories so I can practice my dropdown filter
    const newList = list.map((item) => {
      if (item.tag < 10) {
        item.tag = "orange";
      } else if (item.tag >= 10 && item.tag < 20) {
        item.tag = "red";
      } else if (item.tag >= 20 && item.tag < 30) {
        item.tag = "blue";
      } else if (item.tag >= 30 && item.tag < 40) {
        item.tag = "purple";
      } else if (item.tag >= 40 && item.tag < 50) {
        item.tag = "black";
      } else if (item.tag >= 50 && item.tag < 60) {
        item.tag = "pink";
      } else if (item.tag >= 60 && item.tag < 70) {
        item.tag = "yellow";
      } else if (item.tag >= 80 && item.tag < 90) {
        item.tag = "green";
      } else {
        item.tag = "red";
      }

      return item;
    });

    const tagList = newList
      .filter((obj, index) => {
        return newList.findIndex((item) => item.tag === obj.tag) === index;
      })
      .map((item) => item.tag);
    setPostsData(newList);
    console.log(newList);
    setTags(tagList);
  }, []);

  // ! LOGIC FOR DROWNDOWN SEARCH!
  const handleCategoryChange = () => {
    const select = document.getElementById("select").value;
    setTagSearch(select);
  };

  useEffect(() => {
    handleCategoryChange();
  }, [tagSearch]);

  // get data function | axios
  // const getData = () => {
  //   axios.get(`https://jsonplaceholder.typicode.com/posts`).then((response) => {
  //     setPostsData(response.data);
  //   });
  // };

  // useEffect(() => {
  //   getData();
  // }, []);
  // ! LOGIC FOR DROWNDOWN SEARCH!
  let updatedList = list.filter((item) => {
    return item.tag === tagSearch;
  });

  return (
    <div className="App">
      <div className="main-container">
        <div className="title">
          <h1>Testing Dropdown Search Feature</h1>
          <select id="select" onChange={handleCategoryChange}>
            <option value="" disabled selected>
              Select your color
            </option>
            {tags.map((item) => {
              return (
                <option id={item} key={item} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
        {/* <div className="display"> */}
        <a className="icon" href="#top">
          <FontAwesomeIcon size="2x" icon={faArrowUp} />
        </a>
        <InfiniteScroll
          className="display"
          hasMore={true} // Replace with a condition based on your data source
          height={620}
          width={100}
          style={{ border: "solid 3px lime", width: "100%}" }}
          dataLength={postsData.length}
        >
          <div id="top"></div>{" "}
          <div className="results-container">
            {/* {// ! LOGIC FOR DROWNDOWN SEARCH!} */}
            {tagSearch
              ? updatedList.map((item) => {
                  return (
                    <Cards
                      color={item.tag}
                      key={item.id}
                      title={item.title}
                      body={item.body}
                      tag={item.tag}
                    />
                  );
                })
              : postsData.map((item) => {
                  return (
                    <Cards
                      color={item.tag}
                      key={item.id}
                      title={item.title}
                      body={item.body}
                      tag={item.tag}
                    />
                  );
                })}
          </div>
        </InfiniteScroll>
        {/* </div> */}
      </div>
    </div>
  );
}

export default App;

export const Cards = ({ title, body, tag, color }) => {
  return (
    <div className="card-container">
      <h4 className="card-title">{title}</h4>
      <p className="posts">{body}</p>
      <p style={{ color: color }} className="tags">
        {tag}
      </p>
    </div>
  );
};
