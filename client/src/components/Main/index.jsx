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

	const [isPut, setIsPut] = useState(false);
	const [updatedBook, setUpdatedBook] = useState({
		title: "",
		author: "",
		year: "",
		id: "",
	})

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

	function deleteBook(id) {
		const url = "http://localhost:8080/api/books/";
		axios.delete(url + id);
		alert("Book deleted");
	}

	function openUpdate(id) {
		setIsPut(true);
		setUpdatedBook(prevInput => {
			return(
				{
					...prevInput,
					id: id,
				}
			)
		})
	}

	function updateBook(id) {
		const url = "http://localhost:8080/api/books/";
		axios.put(url + id, updatedBook)
		alert("Book updated");
		console.log("Book updated");
	}

	function handleUpdate(event) {
		const {name, value} = event.target;
		setUpdatedBook((prevInput) => {
			return(
				{
					...prevInput,
					[name]: value
				}
			);
		});
		console.log(updatedBook)
	}

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>BOOKS</h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
			{!isPut ? 
			(<div>
				<input onChange={handleChange} name="title" value={book.title} placeholder="title"></input>
				<input onChange={handleChange} name="author" value={book.author} placeholder="author"></input>
				<input onChange={handleChange} name="year" value={book.year} placeholder="year"></input>
				<button onClick={addBook}>ADD BOOK</button>
			</div>) : (
			<div>
			<input onChange={handleUpdate} name="title" value={updatedBook.title} placeholder="title"></input>
			<input onChange={handleUpdate} name="author" value={updatedBook.author} placeholder="author"></input>
			<input onChange={handleUpdate} name="year" value={updatedBook.year} placeholder="year"></input>
			<button onClick={() => updateBook(updatedBook.id)}>UPDATE BOOK</button>
			</div>	
			)}
			{books.map((book) => {
				return(
					<div key={book._id} style={{ background: "grey", width: "40%", margin: "auto auto"}}>
						<p>{book.title}</p>
						<p>{book.author}</p>
						<p>{book.year}</p>
						<button onClick={() => deleteBook(book._id)}>DELETE</button>
						<button onClick={() => openUpdate(book._id)}>UPDATE</button>
					</div>
				)
			})}
		</div>
	);
};

export default Main;