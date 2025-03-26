async function fetchBookDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const bookId = urlParams.get("id");

  const response = await fetch(`https://gutendex.com/books/?ids=${bookId}`);
  const data = await response.json();
  const book = data.results[0];

  document.getElementById("book-details").innerHTML = `
        <h2 style="font-weight: bold;">${book.title}</h2>
        <img style="display: flex; justify-content: center; align-items: center; margin: 0 auto;" src="${book.formats["image/jpeg"]}" alt="${book.title}" /> <br>
        <p style="font-weight: bold;">by ${book.authors
          .map((a) => a.name)
          .join(", ")} </p> 
        <p>( ${book.authors.map((p) => p.birth_year)} - ${book.authors.map(
    (p) => p.death_year
  )} )</p>
        <p style="font-weight: bold; text-align: start;">Subjects:</p>
        <ul
            style="list-style-type: disc; margin-left: 20px; text-align: start;">
             ${book.subjects.map((b) => `<li>${b}</li>`).join("")}
        </ul>
         <br>
        <p style="font-weight: bold; text-align: start;">bookshelves:</p>
        <ul style="list-style-type: disc; margin-left: 20px; text-align: start;">
         ${book.bookshelves.map((b) => `<li>${b}</li>`).join("")}
        </ul> <br>
        <p style="text-align: justify; margin-bottom: 50px;">${book.summaries}</p>

    `;
}

fetchBookDetails();
