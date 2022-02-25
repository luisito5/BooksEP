import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import axios from 'axios';

const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	const[book, setBook] = useState({
		title: "", 
		author: "",
		year: "",
	})

	const [books, setBooks] = useState([
		{
			title: "",
			author: "",
			year: "",
			_id: "",
		},
	]);

	//Get the books from server to show them
	useEffect(() => {
			fetch("http://localhost:8080/api/books").then((res) => {
			if(res.ok) {
				return res.json();
			}
		})
		.then((jsonRes) => setBooks(jsonRes))
		.catch((err) => console.log(err));
	}, [books]);

	function handleChange(event) {
		const {name, value} = event.target
		setBook(prevInput => {
			return({
				...prevInput,
				[name]: value,
			})
		})
		console.log(book);
	}

	//Send the book to the server
	function addBook(event) {
		event.preventDefault();
		const newBook = {
			title: book.title,
			author: book.author,
			year: book.year
		}

		const url = "http://localhost:8080/api/books";
		axios.post(url, newBook);
		console.log(newBook);
		alert('Book added');

		setBook({
			title: "",
			author: 0,
			year: 0,
		})
	}

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>BOOKS</h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
			<div>
				<input onChange={handleChange} name="title" value={book.title} placeholder="title"></input>
				<input onChange={handleChange} name="author" value={book.author} placeholder="author"></input>
				<input onChange={handleChange} name="year" value={book.year} placeholder="year"></input>
				<button onClick={addBook}>ADD BOOK</button>
			</div>
			{books.map((book) => {
				return(
					<div key={book._id}>
						<h1>{book.title}</h1>
						<h1>{book.author}</h1>
						<h1>{book.year}</h1>
					</div>
				)
			})}
		</div>
	);
};

export default Main;