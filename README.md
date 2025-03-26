# 📚 Bookstore App
A simple bookstore web application that fetches books from an API and displays them with a smooth **fade-in animation**. Users can also **wishlist** books and view details.

## 🚀 Features
- Fetch books dynamically from API
- **Smooth animation** on book load
- **Wishlist feature** with local storage
- **Responsive design** for different screen sizes
- Hover effects for an interactive UI

## 🎨 UI Enhancements
### **Book Animation**
Each book appears with a **fade-in and scale-up effect**, making the UI more engaging.
```css
.book-item {
  opacity: 0;
  transform: scale(0.95);
  animation: fadeInUp 0.5s ease-in-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
```

### **Wishlist Button**
- Users can click the **heart icon** to add/remove books from their wishlist.
- The heart turns **red** when added to the wishlist.

```js
function toggleWishlist(bookId) {
  let wishlist = getWishlist();
  if (wishlist.includes(bookId)) {
    wishlist = wishlist.filter(id => id !== bookId);
  } else {
    wishlist.push(bookId);
  }
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  displayBooks(currentBooks); // Re-render books
}
```

## 📦 Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/bookstore-app.git
   ```
2. Open `index.html` in your browser.

## 📷 Screenshots
| Home Page | Wishlist Feature |
|-----------|-----------------|
| ![Homepage](screenshots/home.png) | ![Wishlist](screenshots/wishlist.png) |

## 🤝 Contributing
Feel free to submit issues or pull requests!

## 🛠 Technologies Used
- HTML
- CSS (TailwindCSS for styling)
- JavaScript (ES6+)
- Fetch API

## 📜 License
This project is open-source under the MIT License.
