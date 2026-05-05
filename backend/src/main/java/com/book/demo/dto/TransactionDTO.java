package com.book.demo.dto;

import com.book.demo.model.Book;
import com.book.demo.model.Transaction;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TransactionDTO {
    private Long id;
    private Long bookId;
    private String bookTitle;
    private Long requesterId;
    private String requesterName;
    private Long ownerId;
    private String ownerName;
    private Transaction.TransactionStatus status;
    private Book.ListingType type;
    private LocalDateTime dueDate;
    private LocalDateTime returnedAt;
    private String message;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
