import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import './App.css'
 
function App() {
const [postsPerPage] = useState(3);
const [offset, setOffset] = useState(1);
const [posts, setAllPosts] = useState([]);
const [pageCount, setPageCount] = useState(0);
const [searchCard, setSearchCard] = useState("");
 
const getPostData = (data) => {
   return (
	data.filter((val) => {
		 if(searchCard == ""){
		  return val;
		}else if(val.title.toLowerCase().includes(searchCard.toLowerCase())){
		  return val
		}
	}).map((val, key) => {
		return <div className="flex-div" key={val.id}>
			<p>{val.id}</p>
			<p><img src={val.thumbnailUrl} width="100%" alt="logo" /></p>
			<div className="flex-item">{val.title}</div>
		</div>
}))}
 
const getAllPosts = async () => {
	const res = await axios.get(`https://jsonplaceholder.typicode.com/photos`)
	const data = res.data;
	const slice = data.slice(offset - 1 , offset - 1 + postsPerPage)
	const postData = getPostData(slice)
	 
	   setAllPosts(postData)
	   setPageCount(Math.ceil(data.length / postsPerPage))
 }
 
const handlePageClick = (event) => {
   const selectedPage = event.selected;
   setOffset(selectedPage + 1)
};
 
useEffect(() => {
   getAllPosts()
 }, [offset])
 
return (
  	<>
		<div className="navbar">
			<a href="#">Home</a>
			<a href="#">People</a>
			<a href="#">More</a>
			<a href="#">About</a>
		</div>
		<div className="header">
			<h1>Welcome. Millions of movies, TV shows and people to discover. Explore now.</h1>
			<input type="text" className="search-input" placeholder="Search..." onChange={event =>{setSearchCard(event.target.value);console.log("hi");} }/>
		</div>
		<div className="flex-container">{posts}</div>
		<div>
			<ReactPaginate
			previousLabel={"previous"}
			nextLabel={"next"}
			breakLabel={"..."}
			breakClassName={"break-me"}
			pageCount={pageCount}
			onPageChange={handlePageClick}
			containerClassName={"pagination"}
			subContainerClassName={"pages pagination"}
			activeClassName={"active"} />
		</div>
   	</>
 );
}
 
export default App;