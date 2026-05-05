package com.book.demo.repository;

import com.book.demo.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    List<Book> findByOwnerId(Long ownerId);

    List<Book> findByStatus(Book.BookStatus status);

    List<Book> findByListingType(Book.ListingType listingType);

    List<Book> findByStatusAndListingType(Book.BookStatus status, Book.ListingType listingType);

    @Query("SELECT b FROM Book b WHERE " +
           "(LOWER(b.title) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           " LOWER(b.author) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           " LOWER(b.genre) LIKE LOWER(CONCAT('%', :query, '%'))) " +
           "AND b.status = 'AVAILABLE'")
    List<Book> searchAvailableBooks(@Param("query") String query);
}
