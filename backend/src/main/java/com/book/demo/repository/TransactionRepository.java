package com.book.demo.repository;

import com.book.demo.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findByRequesterId(Long requesterId);

    List<Transaction> findByOwnerId(Long ownerId);

    List<Transaction> findByBookId(Long bookId);

    List<Transaction> findByStatus(Transaction.TransactionStatus status);

    List<Transaction> findByRequesterIdOrOwnerId(Long requesterId, Long ownerId);
}
