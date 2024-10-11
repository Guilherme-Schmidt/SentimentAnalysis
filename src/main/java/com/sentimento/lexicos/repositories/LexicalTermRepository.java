package com.sentimento.lexicos.repositories;

import com.sentimento.lexicos.domain.LexicalTerm;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LexicalTermRepository extends JpaRepository<LexicalTerm, Long> {
}
