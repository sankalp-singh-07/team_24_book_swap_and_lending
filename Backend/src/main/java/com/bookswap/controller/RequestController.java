package com.bookswap.controller;

import com.bookswap.dto.RequestDto;
import com.bookswap.model.Book;
import com.bookswap.model.BookRequest;
import com.bookswap.model.Notification;
import com.bookswap.repository.BookRepository;
import com.bookswap.repository.BookRequestRepository;
import com.bookswap.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/requests")
public class RequestController {

    @Autowired
    private BookRequestRepository requestRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @PostMapping
    public ResponseEntity<?> createRequest(@RequestBody RequestDto.CreateRequest req) {
        Optional<Book> bookOpt = bookRepository.findById(req.getBookId());
        if (bookOpt.isEmpty()) {
            return ResponseEntity.status(404).body(Map.of("message", "Book not found"));
        }

        Book book = bookOpt.get();
        BookRequest request = new BookRequest();
        request.setBookId(book.getId());
        request.setOwnerId(book.getUser());
        request.setRequesterId(req.getRequesterId());
        request.setRequestType(req.getRequestType() == null ? "borrow" : req.getRequestType());
        request.setOfferedBookId(req.getOfferedBookId());
        request.setMessage(req.getMessage());
        request.setDueDate(LocalDate.now().plusDays(14));

        BookRequest saved = requestRepository.save(request);
        book.setStatus("requested");
        bookRepository.save(book);

        createNotification(book.getUser(), "new_request",
                "New " + saved.getRequestType() + " request for " + book.getName());
        return ResponseEntity.status(201).body(Map.of("message", "Request sent successfully", "request", saved));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getRequesterRequests(@PathVariable String userId) {
        return ResponseEntity.ok(requestRepository.findByRequesterId(userId));
    }

    @GetMapping("/owner/{ownerId}")
    public ResponseEntity<?> getOwnerRequests(@PathVariable String ownerId) {
        return ResponseEntity.ok(requestRepository.findByOwnerId(ownerId));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable String id, @RequestBody RequestDto.UpdateStatusRequest req) {
        Optional<BookRequest> requestOpt = requestRepository.findById(id);
        if (requestOpt.isEmpty()) {
            return ResponseEntity.status(404).body(Map.of("message", "Request not found"));
        }

        BookRequest request = requestOpt.get();
        request.setStatus(req.getStatus());
        request.setUpdatedAt(LocalDateTime.now());
        BookRequest saved = requestRepository.save(request);

        bookRepository.findById(request.getBookId()).ifPresent(book -> {
            if ("approved".equals(req.getStatus())) {
                book.setStatus("swap".equals(request.getRequestType()) ? "swapped" : "lent");
            } else if ("returned".equals(req.getStatus()) || "rejected".equals(req.getStatus())) {
                book.setStatus("available");
            }
            bookRepository.save(book);
        });

        createNotification(request.getRequesterId(), "request_" + req.getStatus(),
                "Your book request was " + req.getStatus());
        return ResponseEntity.ok(Map.of("message", "Request status updated", "request", saved));
    }

    private void createNotification(String userId, String type, String message) {
        Notification notification = new Notification();
        notification.setUserId(userId);
        notification.setType(type);
        notification.setMessage(message);
        notificationRepository.save(notification);
    }
}
