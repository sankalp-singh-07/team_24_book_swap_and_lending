package com.book.demo.service;

import com.book.demo.dto.TransactionDTO;
import com.book.demo.dto.TransactionRequest;
import com.book.demo.model.Book;
import com.book.demo.model.Transaction;
import com.book.demo.model.User;
import com.book.demo.repository.BookRepository;
import com.book.demo.repository.TransactionRepository;
import com.book.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final BookRepository bookRepository;
    private final UserRepository userRepository;

    @Transactional
    public TransactionDTO createTransaction(TransactionRequest request) {
        Book book = bookRepository.findById(request.getBookId())
                .orElseThrow(() -> new IllegalArgumentException("Book not found: " + request.getBookId()));

        if (book.getStatus() != Book.BookStatus.AVAILABLE) {
            throw new IllegalStateException("Book is not available for swap/lending");
        }

        User requester = userRepository.findById(request.getRequesterId())
                .orElseThrow(() -> new IllegalArgumentException("Requester not found: " + request.getRequesterId()));

        if (book.getOwner().getId().equals(request.getRequesterId())) {
            throw new IllegalArgumentException("Owner cannot request their own book");
        }

        Transaction transaction = Transaction.builder()
                .book(book)
                .requester(requester)
                .owner(book.getOwner())
                .type(book.getListingType())
                .dueDate(request.getDueDate())
                .message(request.getMessage())
                .build();

        book.setStatus(Book.BookStatus.PENDING);
        bookRepository.save(book);

        return toDTO(transactionRepository.save(transaction));
    }

    @Transactional
    public TransactionDTO updateTransactionStatus(Long id, Transaction.TransactionStatus newStatus) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Transaction not found: " + id));

        transaction.setStatus(newStatus);

        Book book = transaction.getBook();
        switch (newStatus) {
            case ACCEPTED -> book.setStatus(
                    transaction.getType() == Book.ListingType.SWAP ? Book.BookStatus.SWAPPED : Book.BookStatus.LENT);
            case REJECTED, CANCELLED -> book.setStatus(Book.BookStatus.AVAILABLE);
            case COMPLETED -> {
                book.setStatus(Book.BookStatus.AVAILABLE);
                transaction.setReturnedAt(LocalDateTime.now());
            }
            default -> {}
        }
        bookRepository.save(book);

        return toDTO(transactionRepository.save(transaction));
    }

    public TransactionDTO getTransactionById(Long id) {
        return toDTO(transactionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Transaction not found: " + id)));
    }

    public List<TransactionDTO> getTransactionsByUser(Long userId) {
        return transactionRepository.findByRequesterIdOrOwnerId(userId, userId)
                .stream().map(this::toDTO).collect(Collectors.toList());
    }

    public List<TransactionDTO> getAllTransactions() {
        return transactionRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    private TransactionDTO toDTO(Transaction t) {
        TransactionDTO dto = new TransactionDTO();
        dto.setId(t.getId());
        dto.setBookId(t.getBook().getId());
        dto.setBookTitle(t.getBook().getTitle());
        dto.setRequesterId(t.getRequester().getId());
        dto.setRequesterName(t.getRequester().getName());
        dto.setOwnerId(t.getOwner().getId());
        dto.setOwnerName(t.getOwner().getName());
        dto.setStatus(t.getStatus());
        dto.setType(t.getType());
        dto.setDueDate(t.getDueDate());
        dto.setReturnedAt(t.getReturnedAt());
        dto.setMessage(t.getMessage());
        dto.setCreatedAt(t.getCreatedAt());
        dto.setUpdatedAt(t.getUpdatedAt());
        return dto;
    }
}
