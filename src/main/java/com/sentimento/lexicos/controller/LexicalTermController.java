package com.sentimento.lexicos.controller;


import com.sentimento.lexicos.domain.LexicalTerm;
import com.sentimento.lexicos.services.LexicalTermService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/lexical")
public class LexicalTermController {
    @Autowired
    private LexicalTermService lexicalTermService;

    @PostMapping("/addTerms")
    public ResponseEntity<LexicalTerm> addTerm(@RequestBody LexicalTerm lexicalTerm) {
        LexicalTerm createdTerm = lexicalTermService.addTerm(lexicalTerm);
        return ResponseEntity.ok(createdTerm);
    }

    @GetMapping("/listTerms")
    public ResponseEntity<List<LexicalTerm>> getAllTerms() {
        List<LexicalTerm> terms = lexicalTermService.getAllTerms();
        return ResponseEntity.ok(terms);
    }

    @PutMapping("/updateTerm/{id}")
    public ResponseEntity<LexicalTerm> updateTerm(@PathVariable Long id,@RequestBody LexicalTerm termDetails) {
        Optional<LexicalTerm> updateTerm  = lexicalTermService.updateTerm(id, termDetails);
        return updateTerm.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());

    }
    @DeleteMapping("/deleteTerm/{id}")
    public ResponseEntity<Void> deleteTerm(@PathVariable Long id) {
      if (lexicalTermService.deleteTerm(id)) {
          return ResponseEntity.ok().build();
      }
      else{
          return ResponseEntity.notFound().build();
      }
    }
}
