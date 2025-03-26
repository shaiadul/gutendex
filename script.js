let currentPage = 1;

async function fetchBooks(page = 1) {
  currentPage = page;
  document.getElementById("page-number").innerText = page;

  const search = document.getElementById("search").value.trim();
  const genre = document.getElementById("genre").value;
  let url = `https://gutendex.com/books/?page=${page}`;

  if (search) url += `&search=${search}`;
  if (genre) url += `&topic=${genre}`;

  const response = await fetch(url);
  const data = await response.json();
  displayBooks(data.results);
}

function displayBooks(books) {
  const container = document.getElementById("book-list");
  container.innerHTML = "";

  books.forEach((book) => {
    const isWishlisted = getWishlist().includes(book.id);
    const heartFill = isWishlisted ? "red" : "white";

    const bookHTML = `
            <div class="relative bg-white shadow-lg rounded-lg p-4 group">
                <img src="${
                  book.formats["image/jpeg"] || "default.jpg"
                }" alt="${book.title}" class="w-full h-40 object-cover rounded">
                
                <!-- Wishlist Icon -->
                <button onclick="toggleWishlist(${
                  book.id
                })" class="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 transition" viewBox="0 0 24 24" fill=${heartFill}>
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                </button>

                <h3 class="font-semibold mt-2">${book.title}</h3>
                <p class="text-sm text-gray-600">by ${book.authors
                  .map((a) => a.name)
                  .join(", ")}</p>

                <a href="book.html?id=${
                  book.id
                }" class="block mt-2 text-blue-500">View Details</a>
            </div>
        `;

    container.innerHTML += bookHTML;
  });
}

function prevPage() {
  if (currentPage > 1) fetchBooks(currentPage - 1);
}

function nextPage() {
  fetchBooks(currentPage + 1);
}

function getWishlist() {
  return JSON.parse(localStorage.getItem("wishlist")) || [];
}

function toggleWishlist(bookId) {
  let wishlist = getWishlist();
  if (wishlist.includes(bookId)) {
    wishlist = wishlist.filter((id) => id !== bookId);
  } else {
    wishlist.push(bookId);
  }
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  fetchBooks(currentPage);
}

fetchBooks();
