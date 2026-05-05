package com.book.demo.controller;

import com.book.demo.dto.BookDTO;
import com.book.demo.dto.BookRequest;
import com.book.demo.model.Book;
import com.book.demo.service.BookService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class BookController {

    private final BookService bookService;

    @PostMapping
    public ResponseEntity<BookDTO> createBook(@Valid @RequestBody BookRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(bookService.createBook(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookDTO> getBookById(@PathVariable Long id) {
        return ResponseEntity.ok(bookService.getBookById(id));
    }

    @GetMapping
    public ResponseEntity<List<BookDTO>> getBooks(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) String type,
            @RequestParam(required = false, defaultValue = "false") boolean availableOnly) {

        if (query != null && !query.isBlank()) {
            return ResponseEntity.ok(bookService.searchBooks(query));
        }
        if (type != null) {
            return ResponseEntity.ok(bookService.getBooksByType(Book.ListingType.valueOf(type.toUpperCase())));
        }
        if (availableOnly) {
            return ResponseEntity.ok(bookService.getAvailableBooks());
        }
        return ResponseEntity.ok(bookService.getAllBooks());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BookDTO>> getBooksByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(bookService.getBooksByUser(userId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BookDTO> updateBook(@PathVariable Long id,
                                               @Valid @RequestBody BookRequest request) {
        return ResponseEntity.ok(bookService.updateBook(id, request));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<BookDTO> updateBookStatus(@PathVariable Long id,
                                                     @RequestParam String status) {
        return ResponseEntity.ok(bookService.updateBookStatus(id, Book.BookStatus.valueOf(status.toUpperCase())));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return ResponseEntity.noContent().build();
    }
}
