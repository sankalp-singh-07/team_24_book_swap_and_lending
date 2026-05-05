package com.bookswap.controller;

import com.bookswap.dto.BookDto;
import com.bookswap.model.Book;
import com.bookswap.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/book")
public class BookController {

    @Autowired
    private BookRepository bookRepository;

    // GET /book/search?query=...
    @GetMapping("/search")
    public ResponseEntity<?> searchBooks(@RequestParam(defaultValue = "") String query,
                                         @RequestParam(defaultValue = "") String location,
                                         @RequestParam(defaultValue = "") String type) {
        try {
            List<Book> results = bookRepository.searchCatalog(query, location, type);
            return ResponseEntity.ok(results);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("message", "Internal Server Error", "error", e.getMessage()));
        }
    }

    // GET /book/
    @GetMapping({"", "/"})
    public ResponseEntity<?> getAllBooks() {
        try {
            List<Book> books = bookRepository.findAll();
            return ResponseEntity.ok(books);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("message", "Error fetching books"));
        }
    }

    // GET /book/book/:userId
    @GetMapping("/book/{userId}")
    public ResponseEntity<?> getBooksByUser(@PathVariable String userId) {
        try {
            List<Book> books = bookRepository.findByUser(userId);
            return ResponseEntity.ok(books);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("message", "Error fetching books"));
        }
    }

    // GET /book/:id
    @GetMapping("/{id}")
    public ResponseEntity<?> getBookById(@PathVariable String id) {
        try {
            Optional<Book> book = bookRepository.findById(id);
            if (book.isEmpty()) {
                return ResponseEntity.status(404).body(Map.of("message", "Book not found"));
            }
            return ResponseEntity.ok(book.get());
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("message", "Error fetching the book"));
        }
    }

    // POST /book/
    @PostMapping({"", "/"})
    public ResponseEntity<?> addBook(@RequestBody BookDto.AddBookRequest req) {
        try {
            Book book = new Book();
            book.setName(req.getName());
            book.setPrice(req.getPrice());
            book.setCategory(req.getCategory());
            book.setImage(req.getImage());
            book.setTitle(req.getTitle());
            book.setUser(req.getUserId());
            book.setAuthor(req.getAuthor());
            book.setGenre(req.getGenre());
            book.setLocation(req.getLocation());
            book.setCondition(req.getCondition());
            book.setDescription(req.getDescription());
            if (req.getAvailabilityType() != null && !req.getAvailabilityType().isBlank()) {
                book.setAvailabilityType(req.getAvailabilityType());
            }
            Book saved = bookRepository.save(book);
            return ResponseEntity.status(201).body(Map.of("book", saved));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("message", "Error adding book"));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateBook(@PathVariable String id, @RequestBody BookDto.AddBookRequest req) {
        try {
            Optional<Book> bookOpt = bookRepository.findById(id);
            if (bookOpt.isEmpty()) {
                return ResponseEntity.status(404).body(Map.of("message", "Book not found"));
            }

            Book book = bookOpt.get();
            if (req.getName() != null) book.setName(req.getName());
            if (req.getPrice() != null) book.setPrice(req.getPrice());
            if (req.getCategory() != null) book.setCategory(req.getCategory());
            if (req.getImage() != null) book.setImage(req.getImage());
            if (req.getTitle() != null) book.setTitle(req.getTitle());
            if (req.getAuthor() != null) book.setAuthor(req.getAuthor());
            if (req.getGenre() != null) book.setGenre(req.getGenre());
            if (req.getLocation() != null) book.setLocation(req.getLocation());
            if (req.getAvailabilityType() != null) book.setAvailabilityType(req.getAvailabilityType());
            if (req.getCondition() != null) book.setCondition(req.getCondition());
            if (req.getDescription() != null) book.setDescription(req.getDescription());

            Book saved = bookRepository.save(book);
            return ResponseEntity.ok(Map.of("message", "Book updated successfully", "book", saved));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("message", "Error updating book"));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBook(@PathVariable String id) {
        if (!bookRepository.existsById(id)) {
            return ResponseEntity.status(404).body(Map.of("message", "Book not found"));
        }
        bookRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Book removed successfully"));
    }
}
