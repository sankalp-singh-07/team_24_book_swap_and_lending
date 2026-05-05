package com.bookswap.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Document(collection = "book_requests")
public class BookRequest {

    @Id
    private String id;

    private String bookId;
    private String requesterId;
    private String ownerId;
    private String requestType = "borrow"; // "borrow" or "swap"
    private String offeredBookId;
    private String message;
    private String status = "pending"; // "pending", "approved", "rejected", "returned"
    private LocalDate dueDate;
    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();
}
