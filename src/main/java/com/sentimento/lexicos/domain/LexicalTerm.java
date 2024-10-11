package com.sentimento.lexicos.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "sentimentos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LexicalTerm {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String term;
    private int polarity;
}
