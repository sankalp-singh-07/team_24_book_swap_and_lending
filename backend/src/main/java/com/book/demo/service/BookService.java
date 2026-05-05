package com.book.demo.service;

import com.book.demo.dto.BookDTO;
import com.book.demo.dto.BookRequest;
import com.book.demo.model.Book;
import com.book.demo.model.User;
import com.book.demo.repository.BookRepository;
import com.book.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;
    private final UserRepository userRepository;

    public BookDTO createBook(BookRequest request) {
        User owner = userRepository.findById(request.getOwnerId())
                .orElseThrow(() -> new IllegalArgumentException("Owner not found: " + request.getOwnerId()));

        Book book = Book.builder()
                .title(request.getTitle())
                .author(request.getAuthor())
                .isbn(request.getIsbn())
                .description(request.getDescription())
                .genre(request.getGenre())
                .condition(request.getCondition())
                .listingType(request.getListingType())
                .imageUrl(request.getImageUrl())
                .owner(owner)
                .build();

        return toDTO(bookRepository.save(book));
    }

    public BookDTO getBookById(Long id) {
        return toDTO(bookRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Book not found: " + id)));
    }

    public List<BookDTO> getAllBooks() {
        return bookRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    public List<BookDTO> getAvailableBooks() {
        return bookRepository.findByStatus(Book.BookStatus.AVAILABLE)
                .stream().map(this::toDTO).collect(Collectors.toList());
    }

    public List<BookDTO> getBooksByUser(Long userId) {
        return bookRepository.findByOwnerId(userId)
                .stream().map(this::toDTO).collect(Collectors.toList());
    }

    public List<BookDTO> searchBooks(String query) {
        return bookRepository.searchAvailableBooks(query)
                .stream().map(this::toDTO).collect(Collectors.toList());
    }

    public List<BookDTO> getBooksByType(Book.ListingType type) {
        return bookRepository.findByStatusAndListingType(Book.BookStatus.AVAILABLE, type)
                .stream().map(this::toDTO).collect(Collectors.toList());
    }

    public BookDTO updateBook(Long id, BookRequest request) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Book not found: " + id));
        book.setTitle(request.getTitle());
        book.setAuthor(request.getAuthor());
        book.setIsbn(request.getIsbn());
        book.setDescription(request.getDescription());
        book.setGenre(request.getGenre());
        book.setCondition(request.getCondition());
        book.setListingType(request.getListingType());
        book.setImageUrl(request.getImageUrl());
        return toDTO(bookRepository.save(book));
    }

    public BookDTO updateBookStatus(Long id, Book.BookStatus status) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Book not found: " + id));
        book.setStatus(status);
        return toDTO(bookRepository.save(book));
    }

    public void deleteBook(Long id) {
        if (!bookRepository.existsById(id)) {
            throw new IllegalArgumentException("Book not found: " + id);
        }
        bookRepository.deleteById(id);
    }

    private BookDTO toDTO(Book book) {
        BookDTO dto = new BookDTO();
        dto.setId(book.getId());
        dto.setTitle(book.getTitle());
        dto.setAuthor(book.getAuthor());
        dto.setIsbn(book.getIsbn());
        dto.setDescription(book.getDescription());
        dto.setGenre(book.getGenre());
        dto.setCondition(book.getCondition());
        dto.setListingType(book.getListingType());
        dto.setStatus(book.getStatus());
        dto.setImageUrl(book.getImageUrl());
        dto.setOwnerId(book.getOwner().getId());
        dto.setOwnerName(book.getOwner().getName());
        dto.setCreatedAt(book.getCreatedAt());
        dto.setUpdatedAt(book.getUpdatedAt());
        return dto;
    }
}
