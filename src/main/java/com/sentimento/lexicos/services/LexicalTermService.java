package com.sentimento.lexicos.services;


import com.sentimento.lexicos.domain.LexicalTerm;
import com.sentimento.lexicos.repositories.LexicalTermRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LexicalTermService {
    @Autowired
    private LexicalTermRepository lexicalTermRepository;

    public LexicalTerm addTerm(LexicalTerm lexicalTerm) {
        return lexicalTermRepository.save(lexicalTerm);
    }

    public List<LexicalTerm> getAllTerms() {
        return lexicalTermRepository.findAll();
    }

    public Optional<LexicalTerm> updateTerm(Long id, LexicalTerm termDetails) {
        return lexicalTermRepository.findById(id).map(term -> {
            term.setTerm(termDetails.getTerm());
            term.setPolarity(termDetails.getPolarity());
            return lexicalTermRepository.save(term);
        });
    }

    public boolean deleteTerm(Long id) {
        if(lexicalTermRepository.existsById(id)) {
            lexicalTermRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
