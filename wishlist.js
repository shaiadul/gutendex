async function fetchWishlist() {
  const wishlist = getWishlist();
  const container = document.getElementById("wishlist-books");
  container.innerHTML = "";

  if (wishlist.length === 0) {
    container.innerHTML =
      "<p class='text-center mt-6 text-lg text-gray-600'>No books in wishlist</p>";
    return;
  }

  // Show skeletons while loading
  showSkeletons(container, wishlist.length);

  // Load actual data
  const bookCards = [];

  for (let bookId of wishlist) {
    try {
      const response = await fetch(`https://gutendex.com/books/?ids=${bookId}`);
      const data = await response.json();
      const book = data.results[0];

      const bookHTML = `
        <div class="bg-white shadow-lg rounded-lg p-4">
          <img src="${
            book.formats["image/jpeg"] || "default.jpg"
          }" alt="${book.title}" class="w-full h-40 object-cover rounded">
          <h3 class="font-semibold mt-2">${book.title}</h3>
          <p class="text-sm text-gray-600">by ${book.authors
            .map((a) => a.name)
            .join(", ")}</p>
          <a href="book.html?id=${book.id}" class="block mt-2 text-blue-500">View Details</a> <br>
          <button onclick="toggleWishlist(${book.id})" class="mt-2 bg-black text-white px-3 py-1 rounded">Remove</button>
        </div>
      `;
      bookCards.push(bookHTML);
    } catch (err) {
      console.error("Failed to load book:", err);
    }
  }

  // Replace skeletons with real content
  container.innerHTML = bookCards.join("");
}

function showSkeletons(container, count) {
  container.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const skeleton = document.createElement("div");
    skeleton.className =
      "bg-white shadow-lg rounded-lg p-4 animate-pulse space-y-4";
    skeleton.innerHTML = `
      <div class="w-full h-40 bg-gray-300 rounded"></div>
      <div class="h-4 bg-gray-300 rounded w-3/4"></div>
      <div class="h-4 bg-gray-200 rounded w-1/2"></div>
      <div class="h-6 bg-gray-300 rounded w-1/3 mt-4"></div>
    `;
    container.appendChild(skeleton);
  }
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
  fetchWishlist();
}

fetchWishlist();
